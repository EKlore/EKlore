import { Template } from 'meteor/templating';

import './map.jade';

Template.map.onRendered(() => {
	let map = L.map('map', {
		doubleClickZoom: true
	}).setView([48.866117, 2.313074], 15);
	let marker = L.marker([48.866117, 2.313074]).addTo(map);

	L.tileLayer.provider('OpenStreetMap.France').addTo(map);
});
