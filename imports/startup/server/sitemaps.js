import { sitemaps } from 'meteor/gadicohen:sitemaps';

sitemaps.add('/sitemap.xml', function() {
	// required: page
	// optional: lastmod, changefreq, priority, xhtmlLinks, images, videos
	return [{
		page: 'http://festivaleklore.fr/',
		lastmod: '2016-09-05T21:40-02:00',
		images: [{
			loc: 'http://festivaleklore.fr/pictures/banniere.jpg',
			title: 'Festival EKlore des Talents et de l\'Emploi'
		}]
	}, {
		page: 'http://festivaleklore.fr/aboutFETE',
		lastmod: '2016-09-05T21:40-02:00'
	}, {
		page: 'http://festivaleklore.fr/aboutEKlore',
		lastmod: '2016-09-05T21:40-02:00'
	}, {
		page: 'http://festivaleklore.fr/universes',
		lastmod: '2016-09-05T21:40-02:00',
		images: [{
			loc: 'http://festivaleklore.fr/universes/art_artisanat.png',
			title: 'Univers Art et Artisanat'
		}, {
			loc: 'http://festivaleklore.fr/universes/entrepreunariat.png',
			title: 'Univers Eutrepreunariat'
		}, {
			loc: 'http://festivaleklore.fr/universes/personnes_extra.png',
			title: 'Univers Personnes Extra-Ordinaires'
		}, {
			loc: 'http://festivaleklore.fr/universes/reconversion.png',
			title: 'Univers Reconversion'
		}, {
			loc: 'http://festivaleklore.fr/universes/salariat.png',
			title: 'Univers Salariat'
		}, {
			loc: 'http://festivaleklore.fr/universes/sens.png',
			title: 'Univers Sens'
		}, {
			loc: 'http://festivaleklore.fr/universes/travail_demain.png',
			title: 'Univers Travail de Demain'
		}]
	}];
});
