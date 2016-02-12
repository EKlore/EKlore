var subscriptions = new SubsManager();

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
});

Router.route('/', {
	name: 'home',
	fastRender: true
});

Router.route('/myProfile', {
	name: 'myProfile',
	fastRender: false
});
