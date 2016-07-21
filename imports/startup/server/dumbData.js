/*eslint no-console: "off"*/

import { Meteor } from 'meteor/meteor';

import { Volunteers } from '../../api/volunteers/schema.js';
import { Universes } from '../../api/universes/schema.js';
import { EkloreQuestions } from '../../api/ekloreQuestions/schema.js';

Meteor.startup(() => {
	if (Volunteers.find({}).count() === 0) {
		let volunteers = [{
			firstName: 'Solenn',
			lastName: 'Thomas',
			pictureUrl: '/volunteers/solenn_thomas.jpg',
			functionInFete: 'Fondatrice d\'EKlore et de FETE'
		}, {
			firstName: 'Jeremy',
			lastName: 'Fourna',
			pictureUrl: '/volunteers/jeremy_fourna.jpg',
			functionInFete: 'Développeur de ce site !'
		}, {
			firstName: 'Alizée',
			lastName: 'Thurneyssen',
			functionInFete: 'Responsable programmation'
		}];
		console.log('begin volunteers adding');
		volunteers.map((cur, index, array) => {
			return Meteor.call('addAVolunteer', cur, (error, result) => {
				if (error) {
					return console.log(error.message);
				} else {
					console.log('addAVolunteer : ' + cur.firstName + ' ' + cur.lastName + ' : Done');
				}
			});
		});
	}
	if (Universes.find({}).count() === 0) {
		let universes = [{
			name: 'ARTI',
			label: 'ARTI'
		}, {
			name: 'AUDA',
			label: 'AUDA'
		}, {
			name: 'DEM1',
			label: 'DEM1'
		}, {
			name: 'ENTR',
			label: 'ENTR'
		}, {
			name: 'FORM',
			label: 'FORM'
		}, {
			name: 'SALA',
			label: 'SALA'
		}, {
			name: 'SENS',
			label: 'SENS'
		}];
		universes.map((cur, index, array) => {
			return Meteor.call('addAUniverse', cur, (error, result) => {
				if (error) {
					return console.log(error.message);
				} else {
					console.log('addAUniverse : ' + cur.name + ' ' + cur.label + ' : Done');
				}
			});
		});
	}
	if (EkloreQuestions.find({}).count() === 0) {
		let questionsEgoCentrees = [{
			title: 'Sur une échelle de 1 à 10, pensez-vous avoir une bonne connaissance de vous-même ?',
			level: 2,
			displayType: 'range'
		}, {
			title: 'Sur une échelle de 1 à 10, pensez-vous avoir une bonne connaissance de votre comportement ?',
			level: 3,
			displayType: 'range'
		}, {
			title: 'Appréciez-vous de travailler en toute autonomie ?',
			level: 4,
			displayType: 'qcm'
		}, {
			title: 'Appréciez-vous de travailler en équipe ?',
			level: 5,
			displayType: 'qcm'
		}, {
			title: 'Préférez-vous échanger avec une seule personne ?',
			level: 6,
			displayType: 'qcm'
		}, {
			title: 'Préférez-vous échanger avec plusieurs personnes ?',
			level: 7,
			displayType: 'qcm'
		}, {
			title: 'On dit de vous que vous avez souvent les pieds sur terre ?',
			level: 8,
			displayType: 'qcm'
		}, {
			title: 'On dit de vous que vous avez souvent des idées inattendues ?',
			level: 9,
			displayType: 'qcm'
		}, {
			title: 'Vous sentez vous à l’aise dans l’extrapolation ?',
			level: 10,
			displayType: 'qcm'
		}, {
			title: 'Vous avez souvent le sens du détail ?',
			level: 11,
			displayType: 'qcm'
		}, {
			title: 'Vous appréciez les raisonnements logiques ?',
			level: 12,
			displayType: 'qcm'
		}, {
			title: 'Vous êtes attentif et sensible à vos propres émotions et celles des autres ?',
			level: 13,
			displayType: 'qcm'
		}, {
			title: 'Lorsque vous avez une décision à prendre, vous le faites selon des critères objectifs ?',
			level: 14,
			displayType: 'qcm'
		}, {
			title: 'Lorsque vous avez une décision à prendre, vous vous laissez guider en priorité par votre cœur ?',
			level: 15,
			displayType: 'qcm'
		}, {
			title: 'Vous aimez un style de vie plutôt organisé ?',
			level: 16,
			displayType: 'qcm'
		}, {
			title: 'Vous aimez un style de vie plutôt « bohème » ?',
			level: 17,
			displayType: 'qcm'
		}, {
			title: 'Vous aimez travailler dans l’urgence ?',
			level: 18,
			displayType: 'qcm'
		}, {
			title: 'Vous aimez planifier à l’avance votre travail ?',
			level: 19,
			displayType: 'qcm'
		}, {
			title: 'Compte tenu de vos réponses et sur une échelle de 1 à 10, pensez-vous avoir une bonne connaissance de votre comportement ?',
			level: 20,
			displayType: 'scale'
		}];
		let questionsCompetences = [{
			title: 'Sur une échelle de 1 à 10, est-il facile pour vous d’identifier vos compétences ?',
			level: 21,
			displayType: 'range'
		}, {
			title: 'Etes-vous capable de faire la différence entre connaissances et compétences ?',
			level: 22,
			displayType: 'qcm'
		}, {
			title: 'Avez-vous déjà pu utiliser ce que vous considérez comme vos compétences ?',
			level: 23,
			displayType: 'qcm'
		}, {
			title: 'Etes-vous capable d’exprimer de façon chiffrée l’utilisation de vos compétences (combien, budget, burée, chiffre d’affaires…) ?',
			level: 24,
			displayType: 'qcm'
		}, {
			title: 'Etes-vous capable d’exprimer de façon qualitative l’utilisation de vos compétences (périmètre d’intervention, niveau d’interlocuteurs, taux de marges…)',
			level: 25,
			displayType: 'qcm'
		}, {
			title: 'Y a-t-il des compétences que vous maitrisez mais que vous ne souhaitez plus utiliser dans le futur ?',
			level: 26,
			displayType: 'qcm'
		}, {
			title: 'Y a-t-il des compétences que vous souhaitez approfondir ?',
			level: 27,
			displayType: 'qcm'
		}, {
			title: 'Y a-t-il des compétences nouvelles que vous souhaitez acquérir ?',
			level: 28,
			displayType: 'qcm'
		}, {
			title: 'Avez-vous identifié les programmes de formation nécessaires ?',
			level: 29,
			displayType: 'qcm'
		}, {
			title: 'Lors de votre dernière expérience professionnelle (emploi ou stage) avez-vous pu prendre conscience de vos marges de progression en compétences ?',
			level: 30,
			displayType: 'qcm'
		}, {
			title: 'Avez-vous identifié les compétences que vous maitrisez déjà pour le poste que vous visez ?',
			level: 31,
			displayType: 'qcm'
		}, {
			title: 'Avez-vous identifié les compétences que vous allez acquérir dans le poste que vous visez ?',
			level: 32,
			displayType: 'qcm'
		}, {
			title: 'Aux vues de ces questions et sur une échelle de 1 à 10, est-il facile pour vous d’identifier vos compétences ?',
			level: 33,
			displayType: 'scale'
		}, {
			title: 'Savez-vous faire quelque chose mieux que tout le monde ? Un talent ?',
			level: 34,
			displayType: 'qcm'
		}, {
			title: 'Pouvez-vous identifier une ou plusieurs personnes en résonance avec ce talent ?',
			level: 35,
			displayType: 'qcm'
		}, {
			title: 'Y a-t-il une tâche que vous faites facilement ?',
			level: 36,
			displayType: 'qcm'
		}, {
			title: 'Y a-t-il une tâche que vous faites avec joie ?',
			level: 37,
			displayType: 'qcm'
		}];
		let questionsMotivations = [{
			title: 'Sur une échelle de 1 à 10, quel est votre degré de conscience de vos motivations ?',
			level: 38,
			displayType: 'range'
		}, {
			title: 'Vous souhaitez : Un job alimentaire ?',
			level: 39,
			displayType: 'qcm'
		}, {
			title: 'Vous souhaitez accroître vos savoirs faire ?',
			level: 40,
			displayType: 'qcm'
		}, {
			title: 'Vous souhaitez apporter votre pierre à une construction collective ?',
			level: 41,
			displayType: 'qcm'
		}, {
			title: 'Vous souhaitez AVOIR la satisfaction d’un travail accompli ?',
			level: 42,
			displayType: 'qcm'
		}, {
			title: 'Vous souhaitez EVOLUER vers du management ?',
			level: 43,
			displayType: 'qcm'
		}, {
			title: 'Vous souhaitez EVOLUER vers de l’expertise ?',
			level: 44,
			displayType: 'qcm'
		}, {
			title: 'Vous souhaitez PROGRESSER en autonomie ?',
			level: 45,
			displayType: 'qcm'
		}, {
			title: 'Vous souhaitez ETRE entrepreneur',
			level: 46,
			displayType: 'qcm'
		}, {
			title: 'Pour vous, un équilibre de vie passe par : Un équilibre de la vie sociale ?',
			level: 47,
			displayType: 'qcm'
		}, {
			title: 'Pour vous, un équilibre de vie passe par : Son Logement ?',
			level: 48,
			displayType: 'qcm'
		}, {
			title: 'Pour vous, un équilibre de vie passe par : Un équilibre de la vie financière ?',
			level: 49,
			displayType: 'qcm'
		}, {
			title: 'Pour vous, un équilibre de vie passe par : Un équilibre de la vie familiale ?',
			level: 50,
			displayType: 'qcm'
		}, {
			title: 'Pour vous, un équilibre de vie passe par : Un équilibre santé ?',
			level: 51,
			displayType: 'qcm'
		}, {
			title: 'Pour vous, un équilibre de vie passe par : Un équilibre spirituel ?',
			level: 52,
			displayType: 'qcm'
		}, {
			title: 'Pour vous, un équilibre de vie passe par : Un équilibre de la vie professionnelle ?',
			level: 53,
			displayType: 'qcm'
		}, {
			title: 'Sur une échelle de 1 à 10 vos motivations sont-elles bien en phase avec vos compétences et les points forts de votre comportement ?',
			level: 54,
			displayType: 'scale'
		}, {
			title: 'Après avoir répondu à ces questions comment évaluez-vous les connaissances que vous avez de vous-même (1 à 10) ?',
			level: 55,
			displayType: 'scale'
		}, {
			title: 'Quel est votre degré de connaissance du contenu du poste que vous visez (1 à 10) ?',
			level: 56,
			displayType: 'scale'
		}, {
			title: 'Etes-vous capable de nommer ce poste précisément ?',
			level: 57,
			displayType: 'yesNo'
		}, {
			title: 'Connaissez-vous l’environnement de travail de ce type de poste (bureau, open space, atelier…) ?',
			level: 58,
			displayType: 'yesNo'
		}, {
			title: 'Savez à qui le poste est rattaché  (titre du responsable) ?',
			level: 59,
			displayType: 'yesNo'
		}, {
			title: 'Avez-vous déjà identifié le secteur d’activité que vous visez (services, industrie,  transport, assurances, medias…) ?',
			level: 60,
			displayType: 'qcm'
		}, {
			title: 'Avez-vous identifié à quel pôle fonctionnel appartient le poste que vous visez (marketing, finance, ressource humaine, commercial, production…) ?',
			level: 61,
			displayType: 'qcm'
		}, {
			title: 'Avez-vous identifié le mode de travail du poste que vous visez : fonctionnement hiérarchique, transverse, matriciel… ?',
			level: 62,
			displayType: 'qcm'
		}, {
			title: 'Parmis les types d’entreprises suivants, choisissez laquelle vous attire le plus ?',
			level: 63,
			displayType: 'qcm'
		}, {
			title: 'Avez-vous une idée de la taille de l’entreprise que vous visez ?',
			level: 64,
			displayType: 'qcm'
		}, {
			title: 'Avez-vous une préférence de culture d’entreprise ?',
			level: 65,
			displayType: 'qcm'
		}, {
			title: 'Avez-vous réfléchi à votre statut ?',
			level: 66,
			displayType: 'qcm'
		}, {
			title: 'A quand remonte votre dernière formation ?',
			level: 67,
			displayType: 'qcm'
		}, {
			title: 'Tous les métiers évoluent, pouvez-vous mesurer la force du changement qui impacte le poste que vous visez ?',
			level: 68,
			displayType: 'qcm'
		}];
	}
});
