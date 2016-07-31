import { Template } from 'meteor/templating';
import 'meteor/bevanhunt:leaflet';

import './map.jade';

Template.map.onRendered(function() {
	L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
	let map = L.map('map', {
		doubleClickZoom: true
	}).setView([48.8957518, 2.3879761], 15);
	let marker = L.marker([48.8957518, 2.3879761]).addTo(map);

	L.tileLayer.provider('OpenStreetMap.France').addTo(map);
});
