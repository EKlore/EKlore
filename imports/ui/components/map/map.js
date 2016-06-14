import { Template } from 'meteor/templating';
import 'meteor/bevanhunt:leaflet';

import './map.jade';

Template.map.onRendered(function() {
	L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
	let map = L.map('map', {
		doubleClickZoom: true
	}).setView([48.866117, 2.313074], 15);
	let marker = L.marker([48.866117, 2.313074]).addTo(map);

	L.tileLayer.provider('OpenStreetMap.France').addTo(map);
});
