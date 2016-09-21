import { Template } from 'meteor/templating';

import './home.jade';
import '../../components/map/map.js';
import '../../components/majorPartners/majorPartners.jade';
import '../../components/majorVolunteers/majorVolunteers.js';
import '../../components/share/share.js';

Template.home.helpers({
	shareData() {
		return {
			title: 'Festival EKlore Talents Emploi',
			author: 'EKloreFrance',
			description: 'Le Festival Eklore Talents & Emploi rassemble le 3 octobre à la Cité des métiers 1 000 acteurs engagés pour accompagner l\'évolution du travail',
			summary: 'Le Festival Eklore Talents & Emploi rassemble le 3 octobre à la Cité des métiers 1 000 acteurs engagés pour accompagner l\'évolution du travail',
			excerpt: 'Le Festival Eklore Talents & Emploi rassemble le 3 octobre à la Cité des métiers 1 000 acteurs engagés pour accompagner l\'évolution du travail',
			thumbnail: 'http://festivaleklore.fr/pictures/banniere.png'
		};
	}
});
