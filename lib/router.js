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
	fastRender: false,
	waitOn: function() {
		return subscriptions.subscribe('oneQuestionAtATime', Meteor.userId());
	},
	data: function() {
		return UserQuestions.findOne({
			userId: Meteor.userId(),
			answered: false,
			deprecated: false
		}, {
			sort: {
				level: 1,
				version: 1
			}
		});
	}
});

Router.route('/myDay', {
	name: 'myDay',
	fastRender: false
});

Router.route('/meeting', {
	name: 'meeting',
	fastRender: false
});
