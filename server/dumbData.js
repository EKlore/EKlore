Meteor.startup(function() {
	/*if (Universes.find({}).count() === 0 && Workshops.find({}).count() === 0 && UserQuestions.find({}).count() === 0) {
		var dem1 = Universes.insert({
			name: 'DEM1',
			label: 'Métiers de demain',
		});
		var reso = Universes.insert({
			name: 'RESO',
			label: 'Réseauter',
		});
		var arti = Universes.insert({
			name: 'ARTI',
			label: 'Vivre de son art',
		});
		var entr = Universes.insert({
			name: 'ENTR',
			label: 'Entreprendre ou reprendre',
		});
		var form = Universes.insert({
			name: 'FORM',
			label: 'Formations',
		});
		var sala = Universes.insert({
			name: 'SALA',
			label: 'Salariat',
		});
		var sens = Universes.insert({
			name: 'SENS',
			label: 'Apporter du sens',
		});
		var dem11 = Workshops.insert({
			name: 'Atelier 1',
			description: 'BLA BLA',
			dateStart: new Date(2016, 8, 24, 8, 0, 0),
			dateEnd: new Date(2016, 8, 24, 9, 0, 0),
			universLinked: [{
				UniverseId: dem1,
				matchingPower: 0.9
			}, {
				UniverseId: reso,
				matchingPower: 0.8
			}, {
				UniverseId: arti,
				matchingPower: 0.7
			}]
		});
		var reso1 = Workshops.insert({
			name: 'Atelier 2',
			description: 'BLA BLA',
			dateStart: new Date(2016, 8, 24, 8, 0, 0),
			dateEnd: new Date(2016, 8, 24, 9, 0, 0),
			universLinked: [{
				UniverseId: reso,
				matchingPower: 0.9
			}, {
				UniverseId: sala,
				matchingPower: 0.8
			}, {
				UniverseId: form,
				matchingPower: 0.7
			}]
		});
		var sens1 = Workshops.insert({
			name: 'Atelier 3',
			description: 'BLA BLA',
			dateStart: new Date(2016, 8, 24, 9, 0, 0),
			dateEnd: new Date(2016, 8, 24, 10, 0, 0),
			universLinked: [{
				UniverseId: sens,
				matchingPower: 0.9
			}, {
				UniverseId: sala,
				matchingPower: 0.8
			}, {
				UniverseId: entr,
				matchingPower: 0.7
			}]
		});
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
					universeId: dem1,
					matchingPower: 0.9
				}, {
					universeId: reso,
					matchingPower: 0.8
				}],
				workshopLinked: [{
					workshopId: dem11,
					matchingPower: 0.7
				}, {
					workshopId: reso1,
					matchingPower: 0.6
				}]
			}, {
				choiceId: Random.id(),
				label: 'Chômeur',
				universLinked: [{
					universeId: sala,
					matchingPower: 0.9
				}, {
					universeId: entr,
					matchingPower: 0.8
				}],
				workshopLinked: [{
					workshopId: sens1,
					matchingPower: 0.7
				}, {
					workshopId: 'B',
					matchingPower: 0.6
				}]
			}, {
				choiceId: Random.id(),
				label: 'Etudiant',
				universLinked: [{
					universeId: 'E',
					matchingPower: 0.9
				}, {
					universeId: 'F',
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
					universeId: 'G',
					matchingPower: 0.9
				}, {
					universeId: 'H',
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
				universeId: reso,
				matchingPower: 0.9
			}, {
				universeId: sens,
				matchingPower: 0.8
			}, {
				universeId: form,
				matchingPower: 0.9
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
					universeId: 'A',
					matchingPower: 0.9
				}, {
					universeId: 'B',
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
					universeId: 'C',
					matchingPower: 0.9
				}, {
					universeId: 'D',
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
					universeId: 'E',
					matchingPower: 0.9
				}, {
					universeId: 'F',
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
					universeId: 'G',
					matchingPower: 0.9
				}, {
					universeId: 'H',
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
				universeId: 'G',
				matchingPower: 0.9
			}, {
				universeId: 'H',
				matchingPower: 0.8
			}, {
				universeId: 'A',
				matchingPower: 0.9
			}, {
				universeId: 'B',
				matchingPower: 0.8
			}, {
				universeId: 'C',
				matchingPower: 0.9
			}, {
				universeId: 'D',
				matchingPower: 0.8
			}, {
				universeId: 'E',
				matchingPower: 0.9
			}, {
				universeId: 'F',
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
	}*/
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
