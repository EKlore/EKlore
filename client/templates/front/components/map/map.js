Template.map.onRendered(() => {
	L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
	var map = L.map('map', {
		doubleClickZoom: true
	}).setView([48.866117, 2.313074], 15);
	var marker = L.marker([48.866117, 2.313074]).addTo(map);

	L.tileLayer.provider('OpenStreetMap.France').addTo(map);
})
