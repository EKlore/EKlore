import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { lodash } from 'meteor/stevezhu:lodash';

import { UserQuestions } from '../../../api/userQuestions/schema.js';

import './barometer.jade';

Template.barometer.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allQuestionsForScore', Meteor.userId());
	});
});

Template.barometer.helpers({
	surveyIsOver() {
		let stillQuestionsNotAnswered = UserQuestions.find({ userId: Meteor.userId(), answered: false }).count();
		if (Meteor.user().profile.questionsGroups.length === 3 && stillQuestionsNotAnswered === 0) {
			return true;
		} else {
			return false;
		}
	},
	algoForPhrases() {
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
				return 3;
			} else if (choiceSelected === 'Non') {
				return 2;
			} else {
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

		let data = UserQuestions.find({
			userId: Meteor.userId(),
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
		data.map((cur, index, array) => {
			let ind = lodash.findIndex(cur.choices, ['choiceId', cur.choiceSelected]);
			let labelForChoiceSelected = cur.choices[ind].label;
			if (cur.level === 2 || cur.level === 3) {
				return result.score = result.score + pointForScaleQuestion(Number(labelForChoiceSelected));
			} else if (cur.level <= 7) {
				return result.case1 = result.case1.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
			} else if (cur.level <= 11) {
				return result.case2 = result.case2.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
			} else if (cur.level <= 15) {
				return result.case3 = result.case3.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
			} else if (cur.level <= 19) {
				return result.case4 = result.case4.concat(patternForQCMOrYesNoQuestion(labelForChoiceSelected));
			} else if (cur.level >= 22 && cur.level <= 32) {
				return result.case5 = result.case5 + pointForQCMOrYesNoQuestion(labelForChoiceSelected);
			} else if (cur.level >= 34 && cur.level <= 37) {
				return result.case6 = result.case6 + pointForQCMOrYesNoQuestion(labelForChoiceSelected);
			} else if (cur.level >= 38 && cur.level <= 46) {
				return result.case7 = result.case7 + pointForQCMOrYesNoQuestion(labelForChoiceSelected);
			} else if (cur.level >= 47 && cur.level <= 53) {
				return result.case8 = result.case8 + pointForQCMOrYesNoQuestion(labelForChoiceSelected);
			} else if (cur.level >= 56 && cur.level <= 58) {
				return result.case9 = result.case9 + pointForQCMOrYesNoQuestion(labelForChoiceSelected);
			} else if (cur.level === 60) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case10 = 'Vous semblez avoir des idées sur les secteurs d\'activités qui vous motivent; continuez à investiguer';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case10 = 'Renseignez-vous sur les différents secteurs d\'activités et trouver ceux qui vous motivent!';
				}
			} else if (cur.level === 61) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case11 = 'Vous semblez avoir une idée du pôle fonctionnel que vous visez la fonction que vous souhaitez occuper dans l\'entreprise';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case11 = 'Un projet professionnel fait partie d\'une organisation globale, pole "opérationnel" ou "support" renseignez- vous et choisissez';
				}
			} else if (cur.level === 62) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case12 = 'Bravo vous avez une bonne culture du mode de fonctionnement des entreprises, n\'hésitez pas à poser des questions en entretien';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case12 = 'Le mode de fonctionnement d\'un poste peut être différent suivant les entreprises, renseignez-vous!';
				}
			} else if (cur.level === 63) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case13 = 'Vous avez une bonne idée des phases de développement des entreprises n\'hésitez pas à poser des questions en entretien';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case13 = 'En fonction de votre projet professionnel vous pouvez souhaiter rejoindre des entreprises dans des situations de développement différents, renseignez-vous avant et pendant les entretiens!';
				}
			} else if (cur.level === 64) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case14 = 'Vous savez déjà dans quel type d\'entreprise vous souhaitez évoluer, avancez vers votre cible';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case14 = 'Les tailles des entreprises impliquent des modes d\'organisation différents, faites  votre opinion!';
				}
			} else if (cur.level === 65) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case15 = 'Vous êtes motivé(e) par une culture d\'entreprise ciblez votre recherche et contactez les';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case15 = 'Les cultures d\'entreprises sont différentes et correspondent plus ou moins à votre profil, renseignez-vous (privé, public, associatif, anglosaxonne…)';
				}
			} else if (cur.level === 66) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case16 = 'Vous avez compris qu\'un statut de collaboration définit un mode de travail qui doit correspondre à votre profil';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case16 = 'Il existe différents statuts de collaboration renseignez-vous sur ce qui peut vous convenir (cdi, cdd, freelance, vacataire…)';
				}
			} else if (cur.level === 67) {
				if (labelForChoiceSelected === 'Moins d’un an') {
					return result.case17 = 'Vous semblez maintenir à jour les connaissances qui vous permettent d\'acquérir des compétences continuez à vous former';
				} else if (labelForChoiceSelected === 'Moins de deux ans') {
					return result.case17 = 'N\'attendez pas pour vous former les connaissances vous permettent d\'acquérir des compétences';
				} else {
					return result.case17 = 'Prenez conscience de l\'importance de vous former régulièrement : les connaissances permettent le développement des compétences';
				}
			} else if (cur.level === 68) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case18 = 'Continuez de vous tenir au courant des impacts technologiques et économiques qui influent sur le poste et les secteurs d\'activité que vous visez';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case18 = 'Il faut vous tenir au courant des impacts technologiques et économiques qui influent sur le poste et les secteurs d\'activité que vous visez';
				}
			} else if (cur.level === 69) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case19 = 'Posez-vous la question de  la qualité de l\'information que vous allez chercher et comment accroitre votre efficacité';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case19 = 'Vous devez vous renseigner sur les différents canaux d\'informations relatifs à vos centres d\'intérêts (internet, réseau personnel, presse…)';
				}
			} else if (cur.level === 70) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case20 = 'Vous pouvez éventuellement la qualité et la pertinence des informations que vous  allez chercher';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case20 = 'Il vous faut instaurer de la régularité de votre flux d\'informations (newsletter, abonnements, groupes d\'échanges…)';
				}
			} else if (cur.level === 71) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case21 = 'Vous identifiez les évolutions des compétences que vous avez, renseignez-vous pour les maintenir à jour (programmes de formation)';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case21 = 'Tenez-vous au courant de l\'évolution des compétences nécessaires au poste que vous visez (programme de formation, annonce de recrutement, cv similaires au votre…)';
				}
			} else if (cur.level === 72) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case22 = 'Vous avez compris que les innovations d\'aujourd\'hui auront un impact sur votre métier de demain, continuez votre veille!';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case22 = 'Les innovations d\'aujourd\'hui auront un impact sur votre métier de demain, soyez en veille!';
				}
			} else if (cur.level === 73) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case23 = 'Vous utilisez les réseaux sociaux, faites bien le distinguo entre réseaux sociaux professionnels et personnels';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case23 = 'Les réseaux sociaux sont utilisés par plus d\'un milliard de personnes dans le monde';
				}
			} else if (cur.level === 74) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case24 = 'Rappelez-vous qu\'utiliser votre réseau est un échange, renvoyez aussi de l\'information';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case24 = 'Votre réseau personnel est aussi une source d\'information et d\'opportunité qu\'il ne faut pas hésiter à utiliser, vous renverrez l\'ascenseur!';
				}
			} else if (cur.level === 75) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case25 = 'Votre réseau professionnel est le premier cercle d\'informations que vous pouvez obtenir, soignez le et osez !';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case25 = 'Votre réseau professionnel est le premier cercle d\'informations que vous pouvez obtenir, soignez le et osez !';
				}
			} else if (cur.level === 76) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case25 = 'Rappelez-vous que chaque personnes que vous rencontrez doit vos donner deux noms sur lesquels rebondir';
				} else if (labelForChoiceSelected === 'Non') {
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
					return result.case28 = 'Une entreprise recherche tout autant  des compétences que des motivations, sachez parler des deux';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case28 = 'Un recrutement est un engagement bilatéral : identifiez les attentes de votre interlocuteur';
				}
			} else if (cur.level === 79) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case29 = 'Continuer à montrer votre motivation avec détermination';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case29 = 'Nous  vous encourageons à  rencontrer  des professionnels  pour cerner les aspects humains et techniques de votre motivation';
				}
			} else if (cur.level === 80) {
				if (labelForChoiceSelected === 'Oui') {
					return result.case30 = 'Prenez en compte votre zone de performance et réfléchissez sur vos points de progression';
				} else if (labelForChoiceSelected === 'Non') {
					return result.case30 = 'Ne vous découragez pas et continuez  à construire un projet professionnel réaliste et réalisable';
				}
			} else if (cur.level === 81) {
				if (pointForScaleQuestion(labelForChoiceSelected) === 3) {
					return result.case31 = 'Continuer de cultiver la pensée positive et l\'humilité';
				} else if (pointForScaleQuestion(labelForChoiceSelected) === 2) {
					return result.case31 = 'Vous pouvez améliorer votre confiance en vous, cultivez la pensée positive';
				} else {
					return result.case31 = 'Vous devez reprendre confiance en vous, entourez-vous de personnes positives et aidantes';
				}
			}
		});
		return result;
	},
	phrase1() {
		let result1 = false;
		let result2 = false;
		let result3 = false;
		let result4 = false;
		if (this.case1 === 'ABAB' || this.case1 === 'BABA') {
			result1 = true;
		}
		if (this.case2 === 'ABBA' || this.case2 === 'BAAB') {
			result2 = true;
		}
		if (this.case3 === 'ABAB' || this.case3 === 'BABA') {
			result3 = true;
		}
		if (this.case4 === 'ABBA' || this.case4 === 'BAAB') {
			result4 = true;
		}
		if (result1 && result2 && result3 && result4) {
			return true;
		} else {
			return false;
		}
	},
	phrase2() {
		if (this.case5 >= 26) {
			return 'Il semble que vous avez une bonne appropriation des compétences que vous maitrisez et des possibilités de les approfondir ou d\'en acquérir de nouvelles - bravo';
		} else if (this.case5 >= 17) {
			return 'Vous devez progresser dans l\'expression de vos compétences: vous devez y mettre de la mesure quantitative et qualitative- lire les programmes de formation, les fiches de postes, échanger avec professionnels est un exercice qui peut vous apprendre beaucoup';
		} else {
			return 'Vous avez certainement des compétences mais vous semblez avoir des difficultés à les identifier. Souvenez-vous la différence entre une connaissance (savoir ce qu\'est un clou et un marteau) du savoir - faire(j\'ai déjà planté un clou et je peux le refaire) et une compétence(\"savoir faire éprouvé\": je plante régulièrement des clous - combien et dans quel type de surface = mesure quantitative et qualitative)';
		}
	},
	phrase3() {
		if (this.case6 >= 10) {
			return 'Bravo il semblerait que vous ayez identifié un ou des talents que vous exercez avec plaisir et enthousiasme, à vous d\'identifier les postes, les organisations et les stratégies d\'entreprise qui vous permettent de vous réaliser';
		} else if (this.case6 >= 7) {
			return 'Vous avez certainement des talents qu\'il vous reste à découvrir : rapprochez-vous de ce qui vous fait le plus plaisir!';
		} else {
			return 'Vous avez certainement des talents qu\'il vous reste à découvrir : rapprochez-vous de ce qui vous fait le plus plaisir!';
		}
	},
	phrase4() {
		if (this.case7 >= 24) {
			return 'Vous êtes au clair de vos motivations personnelles et professionnelles, exprimez-vous et allez de l\'avant';
		} else if (this.case7 >= 13) {
			return 'Vous devez prendre le temps de mener une réflexion sur ce qui est important pour vous et ce que vous attendez de votre projet de vie professionnelle';
		} else {
			return 'Vous devez prendre le temps de mener une réflexion sur ce qui est important pour vous et ce que vous attendez de votre projet de vie professionnelle';
		}
	},
	phrase5() {
		if (this.case8 >= 19) {
			return 'Bravo vous avez une appropriation de toutes les composantes de ce qui fait un équilibre de vie - à vous de le cultiver et de le maintenir';
		} else if (this.case8 >= 10) {
			return 'Vous devez prendre le temps de mener une réflexion sur ce qui est important pour entretenir votre équilibre de vie - les 7 composantes communément admises sont: familiale, sociale, financière, spirituellle (pas forcément au sens religieux), professionnelle, la santé et le lieu de vie.';
		} else {
			return 'Vous devez prendre le temps de mener une réflexion sur ce qui est important pour entretenir votre équilibre de vie - les 7 composantes communément admises sont: familiale, sociale, financière, spirituellle (pas forcément au sens religieux), professionnelle, la santé et le lieu de vie.';
		}
	},
	phrase6() {
		if (this.case9 >= 8) {
			return 'Vous semblez avoir une bonne approche du poste que vous visez, continuez à prendre des informations le monde évolue!';
		} else if (this.case9 >= 5) {
			return 'Vous avez la nécessité de définir plus clairement votre projet professionnel et de vous renseigner sur les postes qui vous intéressent';
		} else {
			return 'Vous avez la nécessité de définir plus clairement votre projet professionnel et de vous renseigner sur les postes qui vous intéressent';
		}
	}
});
