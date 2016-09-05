import { sitemaps } from 'meteor/gadicohen:sitemaps';

sitemaps.add('/sitemap.xml', function() {
	// required: page
	// optional: lastmod, changefreq, priority, xhtmlLinks, images, videos
	return [{
		page: '/',
		lastmod: "2016-09-05T21:40-02:00",
		images: [{
			loc: "/pictures/banniere.jpg",
			title: "Festival EKlore des Talents et de l'Emploi"
		}]
	}, {
		page: '/aboutFETE',
		lastmod: "2016-09-05T21:40-02:00"
	}, {
		page: '/aboutEKlore',
		lastmod: "2016-09-05T21:40-02:00"
	}, {
		page: '/universes',
		lastmod: "2016-09-05T21:40-02:00",
		images: [{
			loc: "/universes/art_artisanat.png",
			title: "Univers Art et Artisanat"
		}, {
			loc: "/universes/entrepreunariat.png",
			title: "Univers Eutrepreunariat"
		}, {
			loc: "/universes/personnes_extra.png",
			title: "Univers Personnes Extra-Ordinaires"
		}, {
			loc: "/universes/reconversion.png",
			title: "Univers Reconversion"
		}, {
			loc: "/universes/salariat.png",
			title: "Univers Salariat"
		}, {
			loc: "/universes/sens.png",
			title: "Univers Sens"
		}, {
			loc: "/universes/travail_demain.png",
			title: "Univers Travail de Demain"
		}]
	}];
});
