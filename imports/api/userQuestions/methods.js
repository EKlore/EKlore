import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { lodash } from 'meteor/stevezhu:lodash';

import { UserQuestions } from './schema.js';

Meteor.methods({
	insertQuestion(data) {
		let UniverseSchema = new SimpleSchema({
			universeId: { type: String },
			matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
		});
		let WorkshopSchema = new SimpleSchema({
			workshopId: { type: String },
			matchingPower: { type: Number, decimal: true, min: 0.01, max: 1 }
		});
		let ChoicesSchema = new SimpleSchema({
			choiceId: { type: String },
			label: { type: String },
			universesLinked: { type: [UniverseSchema], minCount: 1 },
			workshopsLinked: { type: [WorkshopSchema], minCount: 1 }
		});
		let methodSchema = new SimpleSchema({
			title: { type: String },
			level: { type: Number, min: 1 },
			displayType: { type: String, allowedValues: ['yesNo', 'qcm', 'scale'] },
			version: { type: Number, min: 1 },
			deprecated: { type: Boolean },
			choices: { type: [ChoicesSchema], minCount: 2 },
			universesLinked: { type: [UniverseSchema], minCount: 1 },
			workshopsLinked: { type: [WorkshopSchema], minCount: 1 },
			answered: { type: Boolean },
			userId: { type: String },
			questionId: { type: String },
			questionGroupId: { type: String }
		});
		check(data, methodSchema);
		return UserQuestions.insert(data);
	},
	answerQuestion(data) {
		let methodSchema = new SimpleSchema({
			userQuestionId: { type: String },
			choiceSelected: { type: String }
		});
		check(data, methodSchema);
		return UserQuestions.update({ _id: data.userQuestionId }, {
			$set: {
				choiceSelected: data.choiceSelected,
				answered: true,
				answerDate: new Date()
			}
		});
	},
	saveQuestionResult(data) {
		let ResultSchema = new SimpleSchema({
			universeId: { type: String, optional: true },
			workshopId: { type: String, optional: true },
			result: { type: Number, decimal: true }
		});
		let methodSchema = new SimpleSchema({
			_id: { type: String },
			result: { type: [ResultSchema] }
		});
		check(data, methodSchema);
		check(data.result[0], Object);
		check(data.result[0].result, Number);
		if (data.result[0].universeId) {
			check(data.result[0].universeId, String);
		} else if (data.result[0].workshopId) {
			check(data.result[0].workshopId, String);
		}
		return UserQuestions.update({ _id: data._id }, {
			$set: {
				result: data.result
			}
		});
	},
	deleteDoublons() {
		let users = Meteor.users.find({}, {
			fields: {
				_id: 1
			}
		}).fetch();
		users.map((cur) => {
			let questionsForUser = UserQuestions.find({ userId: cur._id }, {
				fields: {
					_id: 1,
					answered: 1,
					questionId: 1
				},
				sort: {
					questionId: 1
				}
			}).fetch();
			let lastQuestion = { _id: null, questionId: null, answered: null };
			questionsForUser.map((cur1) => {
				if (lastQuestion._id === null) {
					lastQuestion._id = cur1._id;
					lastQuestion.questionId = cur1.questionId;
					lastQuestion.answered = cur1.answered;
				} else {
					if (lastQuestion.questionId === cur1.questionId && lastQuestion.answered === cur1.answered) {
						UserQuestions.remove({ _id: cur1._id });
					} else if (lastQuestion.questionId === cur1.questionId && lastQuestion.answered !== cur1.answered) {
						if (lastQuestion.answered === false) {
							UserQuestions.remove({ _id: lastQuestion._id });
							lastQuestion._id = cur1._id;
							lastQuestion.questionId = cur1.questionId;
							lastQuestion.answered = cur1.answered;
						} else {
							UserQuestions.remove({ _id: cur1._id });
						}
					} else if (lastQuestion.questionId !== cur1.questionId) {
						lastQuestion._id = cur1._id;
						lastQuestion.questionId = cur1.questionId;
						lastQuestion.answered = cur1.answered;
					}
				}
			});
		});
	},
	fixResults() {
		UserQuestions.update({}, {
			$set: {
				result: []
			}
		}, { multi: true });
		let data = UserQuestions.find({
			answered: true,
			deprecated: false
		}, {
			fields: {
				choices: 1,
				universesLinked: 1,
				workshopsLinked: 1,
				choiceSelected: 1
			}
		}).fetch();
		data.map((cur) => {
			const ind = lodash.findIndex(cur.choices, ['choiceId', cur.choiceSelected]);
			const choice = cur.choices[ind];
			let result = [];
			for (let i = 0; i < choice.universesLinked.length; i++) {
				for (let j = 0; j < cur.universesLinked.length; j++) {
					if (choice.universesLinked[i].universeId === cur.universesLinked[j].universeId) {
						result.push({
							universeId: choice.universesLinked[i].universeId,
							result: lodash.round((choice.universesLinked[i].matchingPower + cur.universesLinked[j].matchingPower) / 2, 4)
						});
						break;
					}
				}
			}
			for (let i = 0; i < choice.workshopsLinked.length; i++) {
				for (let j = 0; j < cur.workshopsLinked.length; j++) {
					if (choice.workshopsLinked[i].workshopId === cur.workshopsLinked[j].workshopId) {
						result.push({
							workshopId: choice.workshopsLinked[i].workshopId,
							result: lodash.round((choice.workshopsLinked[i].matchingPower + cur.workshopsLinked[j].matchingPower) / 2, 4)
						});
						break;
					}
				}
			}
			Meteor.call('saveQuestionResult', { result, _id: cur._id });
		});
	},
	fixYesNoChoicesForUser() {
		let data = UserQuestions.find({ displayType: 'yesNo' }, {
			fields: {
				_id: 1,
				'choices.choiceId': 1,
				'choices.label': 1,
				displayType: 1
			}
		}).fetch();
		data.map((cur) => {
			cur.choices.map((cur1, index1) => {
				if (cur1.label === 'yes') {
					let res = 'choices.' + index1 + '.label';
					return UserQuestions.update({ _id: cur._id }, {
						$set: {
							[res]: 'Oui'
						}
					});
				} else if (cur1.label === 'no') {
					let res = 'choices.' + index1 + '.label';
					return UserQuestions.update({ _id: cur._id }, {
						$set: {
							[res]: 'Non'
						}
					});
				}
			});
		});
	},
	fixDontKnowChoicesForUser() {
		let data = UserQuestions.find({ displayType: 'qcm' }, {
			fields: {
				_id: 1,
				'choices.choiceId': 1,
				'choices.label': 1,
				displayType: 1
			}
		}).fetch();
		data.map((cur) => {
			cur.choices.map((cur1, index1) => {
				if (cur1.label === 'Ne sait pas') {
					let res = 'choices.' + index1 + '.label';
					return UserQuestions.update({ _id: cur._id }, {
						$set: {
							[res]: 'Ne sais pas'
						}
					});
				}
			});
		});
	},
	insertScoreForUsers() {
		const users = Meteor.users.find({
			'profile.questionsGroups': {
				$size: 3
			}
		}).fetch();
		users.map((cur) => {
			let result = {
				score: 0,
				case1: '',
				case2: '',
				case3: '',
				case4: '',
				case5: 0,
				case6: 0,
				case7: 0,
				case8: 0,
				case9: 0
			};

			function pointForScaleQuestion(choiceSelected) {
				if (choiceSelected < 4) {
					return 1;
				} else if (choiceSelected < 7) {
					return 2;
				} else {
					return 3;
				}
			}

			function pointForQCMOrYesNoQuestion(choiceSelected) {
				if (choiceSelected === 'Oui') {
					result.score += 3;
					return 3;
				} else if (choiceSelected === 'Non') {
					result.score += 2;
					return 2;
				} else {
					result.score += 1;
					return 1;
				}
			}

			function patternForQCMOrYesNoQuestion(choiceSelected) {
				if (choiceSelected === 'Oui') {
					return 'A';
				} else if (choiceSelected === 'Non') {
					return 'B';
				} else {
					return 'NSP';
				}
			}

			function scoreForQCMOrYesNoQuestion(result) {
				let result1 = false;
				let result2 = false;
				let result3 = false;
				let result4 = false;
				if (result.case1 === 'ABAB' || result.case1 === 'BABA') {
					result1 = true;
				}
				if (result.case2 === 'ABBA' || result.case2 === 'BAAB') {
					result2 = true;
				}
				if (result.case3 === 'ABAB' || result.case3 === 'BABA') {
					result3 = true;
				}
				if (result.case4 === 'ABBA' || result.case4 === 'BAAB') {
					result4 = true;
				}
				if (result1 && result2 && result3 && result4) {
					result.score += 3;
					return result;
				} else {
					result.score += 1;
					return result;
				}
			}

			let data = UserQuestions.find({
				userId: cur._id,
				answered: true
			}, {
				sort: {
					level: 1
				},
				fields: {
					userId: 1,
					level: 1,
					choiceSelected: 1,
					['choices.choiceId']: 1,
					['choices.label']: 1
				}
			}).fetch();
			if (data.length === 82) {
				data.map((cur) => {
					let ind = lodash.findIndex(cur.choices, ['choiceId', cur.choiceSelected]);
					let labelForChoiceSelected = cur.choices[ind].label;
					if (cur.level === 2 || cur.level === 3) {
						return result.score += pointForScaleQuestion(Number(labelForChoiceSelected));
					} else if (cur.level <= 7) {
						return result.case1 = result.case1.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
					} else if (cur.level <= 11) {
						return result.case2 = result.case2.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
					} else if (cur.level <= 15) {
						return result.case3 = result.case3.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
					} else if (cur.level <= 19) {
						return result.case4 = result.case4.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
					} else if (cur.level >= 22 && cur.level <= 32) {
						return result.case5 += pointForQCMOrYesNoQuestion(labelForChoiceSelected);
					} else if (cur.level >= 34 && cur.level <= 37) {
						return result.case6 += pointForQCMOrYesNoQuestion(labelForChoiceSelected);
					} else if (cur.level >= 38 && cur.level <= 46) {
						return result.case7 += pointForQCMOrYesNoQuestion(labelForChoiceSelected);
					} else if (cur.level >= 47 && cur.level <= 53) {
						return result.case8 += pointForQCMOrYesNoQuestion(labelForChoiceSelected);
					} else if (cur.level >= 56 && cur.level <= 58) {
						return result.case9 += pointForQCMOrYesNoQuestion(labelForChoiceSelected);
					} else if (cur.level === 59) {
						return pointForQCMOrYesNoQuestion(labelForChoiceSelected);
					} else if (cur.level === 60) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case10 = 'Vous semblez avoir des idées sur les secteurs d\'activités qui vous motivent; continuez à investiguer';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case10 = 'Renseignez-vous sur les différents secteurs d\'activités et trouver ceux qui vous motivent!';
						}
					} else if (cur.level === 61) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case11 = 'Vous semblez avoir une idée du pôle fonctionnel que vous visez la fonction que vous souhaitez occuper dans l\'entreprise';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case11 = 'Un projet professionnel fait partie d\'une organisation globale, pole "opérationnel" ou "support" renseignez- vous et choisissez';
						}
					} else if (cur.level === 62) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case12 = 'Bravo vous avez une bonne culture du mode de fonctionnement des entreprises, n\'hésitez pas à poser des questions en entretien';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case12 = 'Le mode de fonctionnement d\'un poste peut être différent suivant les entreprises, renseignez-vous!';
						}
					} else if (cur.level === 63) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case13 = 'Vous avez une bonne idée des phases de développement des entreprises n\'hésitez pas à poser des questions en entretien';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case13 = 'En fonction de votre projet professionnel vous pouvez souhaiter rejoindre des entreprises dans des situations de développement différents, renseignez-vous avant et pendant les entretiens!';
						}
					} else if (cur.level === 64) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case14 = 'Vous savez déjà dans quel type d\'entreprise vous souhaitez évoluer, avancez vers votre cible';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case14 = 'Les tailles des entreprises impliquent des modes d\'organisation différents, faites  votre opinion!';
						}
					} else if (cur.level === 65) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case15 = 'Vous êtes motivé(e) par une culture d\'entreprise ciblez votre recherche et contactez les';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case15 = 'Les cultures d\'entreprises sont différentes et correspondent plus ou moins à votre profil, renseignez-vous (privé, public, associatif, anglosaxonne…)';
						}
					} else if (cur.level === 66) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case16 = 'Vous avez compris qu\'un statut de collaboration définit un mode de travail qui doit correspondre à votre profil';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case16 = 'Il existe différents statuts de collaboration renseignez-vous sur ce qui peut vous convenir (cdi, cdd, freelance, vacataire…)';
						}
					} else if (cur.level === 67) {
						if (labelForChoiceSelected === 'Moins d’un an') {
							result.score += 3;
							return result.case17 = 'Vous semblez maintenir à jour les connaissances qui vous permettent d\'acquérir des compétences continuez à vous former';
						} else if (labelForChoiceSelected === 'Moins de deux ans') {
							result.score += 2;
							return result.case17 = 'N\'attendez pas pour vous former les connaissances vous permettent d\'acquérir des compétences';
						} else {
							result.score += 1;
							return result.case17 = 'Prenez conscience de l\'importance de vous former régulièrement : les connaissances permettent le développement des compétences';
						}
					} else if (cur.level === 68) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case18 = 'Continuez de vous tenir au courant des impacts technologiques et économiques qui influent sur le poste et les secteurs d\'activité que vous visez';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case18 = 'Il faut vous tenir au courant des impacts technologiques et économiques qui influent sur le poste et les secteurs d\'activité que vous visez';
						}
					} else if (cur.level === 69) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case19 = 'Posez-vous la question de  la qualité de l\'information que vous allez chercher et comment accroitre votre efficacité';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case19 = 'Vous devez vous renseigner sur les différents canaux d\'informations relatifs à vos centres d\'intérêts (internet, réseau personnel, presse…)';
						}
					} else if (cur.level === 70) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case20 = 'Vous pouvez éventuellement la qualité et la pertinence des informations que vous  allez chercher';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case20 = 'Il vous faut instaurer de la régularité de votre flux d\'informations (newsletter, abonnements, groupes d\'échanges…)';
						}
					} else if (cur.level === 71) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case21 = 'Vous identifiez les évolutions des compétences que vous avez, renseignez-vous pour les maintenir à jour (programmes de formation)';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case21 = 'Tenez-vous au courant de l\'évolution des compétences nécessaires au poste que vous visez (programme de formation, annonce de recrutement, cv similaires au votre…)';
						}
					} else if (cur.level === 72) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case22 = 'Vous avez compris que les innovations d\'aujourd\'hui auront un impact sur votre métier de demain, continuez votre veille!';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case22 = 'Les innovations d\'aujourd\'hui auront un impact sur votre métier de demain, soyez en veille!';
						}
					} else if (cur.level === 73) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case23 = 'Vous utilisez les réseaux sociaux, faites bien le distinguo entre réseaux sociaux professionnels et personnels';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case23 = 'Les réseaux sociaux sont utilisés par plus d\'un milliard de personnes dans le monde';
						}
					} else if (cur.level === 74) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case24 = 'Rappelez-vous qu\'utiliser votre réseau est un échange, renvoyez aussi de l\'information';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case24 = 'Votre réseau personnel est aussi une source d\'information et d\'opportunité qu\'il ne faut pas hésiter à utiliser, vous renverrez l\'ascenseur!';
						}
					} else if (cur.level === 75) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case25 = 'Votre réseau professionnel est le premier cercle d\'informations que vous pouvez obtenir, soignez le et osez !';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case25 = 'Votre réseau professionnel est le premier cercle d\'informations que vous pouvez obtenir, soignez le et osez !';
						}
					} else if (cur.level === 76) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case25 = 'Rappelez-vous que chaque personnes que vous rencontrez doit vous donner deux noms sur lesquels rebondir';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case25 = 'Les opportunités sont faites de rencontres, il faut savoir provoquer le destin';
						}
					} else if (cur.level === 77) {
						if (pointForScaleQuestion(labelForChoiceSelected) === 3) {
							return result.case27 = 'Vous avez compris l\'importance d\'un projet professionnel en phase avec vos valeurs';
						} else if (pointForScaleQuestion(labelForChoiceSelected) === 2) {
							return result.case27 = 'Continuez votre réflexion et vos recherches vers un projet professionnel en phase avec vos valeurs personnelles';
						} else {
							return result.case27 = 'Vous auriez avantage à valider un projet professionnel en phase a minima avec vos valeurs  personnelles';
						}
					} else if (cur.level === 78) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case28 = 'Une entreprise recherche tout autant  des compétences que des motivations, sachez parler des deux';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case28 = 'Un recrutement est un engagement bilatéral : identifiez les attentes de votre interlocuteur';
						}
					} else if (cur.level === 79) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case29 = 'Continuer à montrer votre motivation avec détermination';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case29 = 'Nous  vous encourageons à  rencontrer  des professionnels  pour cerner les aspects humains et techniques de votre motivation';
						}
					} else if (cur.level === 80) {
						if (labelForChoiceSelected === 'Oui') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case30 = 'Prenez en compte votre zone de performance et réfléchissez sur vos points de progression';
						} else if (labelForChoiceSelected === 'Non') {
							pointForQCMOrYesNoQuestion(labelForChoiceSelected);
							return result.case30 = 'Ne vous découragez pas et continuez  à construire un projet professionnel réaliste et réalisable';
						}
					} else if (cur.level === 81) {
						if (pointForScaleQuestion(labelForChoiceSelected) === 3) {
							result.score += pointForScaleQuestion(labelForChoiceSelected);
							return result.case31 = 'Continuer de cultiver la pensée positive et l\'humilité';
						} else if (pointForScaleQuestion(labelForChoiceSelected) === 2) {
							result.score += pointForScaleQuestion(labelForChoiceSelected);
							return result.case31 = 'Vous pouvez améliorer votre confiance en vous, cultivez la pensée positive';
						} else {
							result.score = pointForScaleQuestion(labelForChoiceSelected);
							return result.case31 = 'Vous devez reprendre confiance en vous, entourez-vous de personnes positives et aidantes';
						}
					} else if (cur.level > 81) {
						pointForQCMOrYesNoQuestion(labelForChoiceSelected)
					}
				});
				scoreForQCMOrYesNoQuestion(result);
				return Meteor.users.update({ _id: cur._id }, {
					$set: { 'profile.score': result.score }
				});
			}
		});
	}
});
