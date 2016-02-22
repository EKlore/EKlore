Meteor.startup(function() {
	if (UserQuestions.find({}).count() === 0) {
		var user = Accounts.createUser({
			password: '123456',
			email: 'abc@def.com',
		});
		var questionList = [{
			questionId: Random.id(),
			userId: user,
			answered: false,
			level: 0,
			version: 1,
			choices: [{
				choiceId: Random.id(),
				label: 'Salarié',
				universLinked: [{
					universId: 'A',
					matchingPower: 0.9
				}, {
					universId: 'B',
					matchingPower: 0.8
				}],
				workshopLinked: [{
					workshopId: 'C',
					matchingPower: 0.7
				}, {
					workshopId: 'D',
					matchingPower: 0.6
				}]
			}, {
				choiceId: Random.id(),
				label: 'Chômeur',
				universLinked: [{
					universId: 'C',
					matchingPower: 0.9
				}, {
					universId: 'D',
					matchingPower: 0.8
				}],
				workshopLinked: [{
					workshopId: 'A',
					matchingPower: 0.7
				}, {
					workshopId: 'B',
					matchingPower: 0.6
				}]
			}, {
				choiceId: Random.id(),
				label: 'Etudiant',
				universLinked: [{
					universId: 'E',
					matchingPower: 0.9
				}, {
					universId: 'F',
					matchingPower: 0.8
				}],
				workshopLinked: [{
					workshopId: 'G',
					matchingPower: 0.7
				}, {
					workshopId: 'H',
					matchingPower: 0.6
				}]
			}, {
				choiceId: Random.id(),
				label: 'Autre',
				universLinked: [{
					universId: 'G',
					matchingPower: 0.9
				}, {
					universId: 'H',
					matchingPower: 0.8
				}],
				workshopLinked: [{
					workshopId: 'E',
					matchingPower: 0.7
				}, {
					workshopId: 'F',
					matchingPower: 0.6
				}]
			}],
			deprecated: false,
			universLinked: [{
				universId: 'G',
				matchingPower: 0.9
			}, {
				universId: 'H',
				matchingPower: 0.8
			}, {
				universId: 'A',
				matchingPower: 0.9
			}, {
				universId: 'B',
				matchingPower: 0.8
			}, {
				universId: 'C',
				matchingPower: 0.9
			}, {
				universId: 'D',
				matchingPower: 0.8
			}, {
				universId: 'E',
				matchingPower: 0.9
			}, {
				universId: 'F',
				matchingPower: 0.8
			}],
			workshopLinked: [{
				workshopId: 'G',
				matchingPower: 0.9
			}, {
				workshopId: 'H',
				matchingPower: 0.8
			}, {
				workshopId: 'A',
				matchingPower: 0.9
			}, {
				workshopId: 'B',
				matchingPower: 0.8
			}, {
				workshopId: 'C',
				matchingPower: 0.9
			}, {
				workshopId: 'D',
				matchingPower: 0.8
			}, {
				workshopId: 'E',
				matchingPower: 0.9
			}, {
				workshopId: 'F',
				matchingPower: 0.8
			}],
			questionType: 'standard',
			displayType: 'text',
			title: 'Qui suis je là maintenant ?'
		}, {
			questionId: Random.id(),
			userId: user,
			answered: false,
			level: 0,
			version: 1,
			choices: [{
				choiceId: Random.id(),
				label: 'Seul',
				universLinked: [{
					universId: 'A',
					matchingPower: 0.9
				}, {
					universId: 'B',
					matchingPower: 0.8
				}],
				workshopLinked: [{
					workshopId: 'C',
					matchingPower: 0.7
				}, {
					workshopId: 'D',
					matchingPower: 0.6
				}]
			}, {
				choiceId: Random.id(),
				label: 'Perdu',
				universLinked: [{
					universId: 'C',
					matchingPower: 0.9
				}, {
					universId: 'D',
					matchingPower: 0.8
				}],
				workshopLinked: [{
					workshopId: 'A',
					matchingPower: 0.7
				}, {
					workshopId: 'B',
					matchingPower: 0.6
				}]
			}, {
				choiceId: Random.id(),
				label: 'Concentré sur un objectif',
				universLinked: [{
					universId: 'E',
					matchingPower: 0.9
				}, {
					universId: 'F',
					matchingPower: 0.8
				}],
				workshopLinked: [{
					workshopId: 'G',
					matchingPower: 0.7
				}, {
					workshopId: 'H',
					matchingPower: 0.6
				}]
			}, {
				choiceId: Random.id(),
				label: "Envie d'agir",
				universLinked: [{
					universId: 'G',
					matchingPower: 0.9
				}, {
					universId: 'H',
					matchingPower: 0.8
				}],
				workshopLinked: [{
					workshopId: 'E',
					matchingPower: 0.7
				}, {
					workshopId: 'F',
					matchingPower: 0.6
				}]
			}],
			deprecated: false,
			universLinked: [{
				universId: 'G',
				matchingPower: 0.9
			}, {
				universId: 'H',
				matchingPower: 0.8
			}, {
				universId: 'A',
				matchingPower: 0.9
			}, {
				universId: 'B',
				matchingPower: 0.8
			}, {
				universId: 'C',
				matchingPower: 0.9
			}, {
				universId: 'D',
				matchingPower: 0.8
			}, {
				universId: 'E',
				matchingPower: 0.9
			}, {
				universId: 'F',
				matchingPower: 0.8
			}],
			workshopLinked: [{
				workshopId: 'G',
				matchingPower: 0.9
			}, {
				workshopId: 'H',
				matchingPower: 0.8
			}, {
				workshopId: 'A',
				matchingPower: 0.9
			}, {
				workshopId: 'B',
				matchingPower: 0.8
			}, {
				workshopId: 'C',
				matchingPower: 0.9
			}, {
				workshopId: 'D',
				matchingPower: 0.8
			}, {
				workshopId: 'E',
				matchingPower: 0.9
			}, {
				workshopId: 'F',
				matchingPower: 0.8
			}],
			questionType: 'standard',
			displayType: 'text',
			title: 'Comment je me sens ?'
		}];
		for (var i = 0; i < questionList.length; i++) {
			Meteor.call('insertQuestions', questionList[i], function(error, result) {
				if (error) {
					console.log(error.message, error);
				}
			});
		}
	}
	if (Volunteers.find({}).count() === 0) {
		var volunteers = [{
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
		for (var j = 0; j < volunteers.length; j++) {
			Meteor.call('addAVolunteer', volunteers[j], function(error, result) {
				if (error) {
					console.log(error.message, error);
				}
			});
		}
	}
});
