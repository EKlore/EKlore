var subscriptions = new SubsManager();

Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
});

Router.route('/', {
	layoutTemplate: 'layout',
	name: 'home',
	waitOn: function() {
		return subscriptions.subscribe('allVolunteers');
	},
	fastRender: true
});

Router.route('/myProfile', {
	layoutTemplate: 'layout',
	name: 'myProfile',
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
	},
	fastRender: false
});

Router.route('/myDay', {
	layoutTemplate: 'layout',
	name: 'myDay',
	fastRender: false
});

Router.route('/meeting', {
	layoutTemplate: 'layout',
	name: 'meeting',
	fastRender: false
});

Router.route('/admin', {
	layoutTemplate: 'adminLayout',
	name: 'admin',
	waitOn: function() {
		return [subscriptions.subscribe('allUniverses'), subscriptions.subscribe('allWorkshops'), subscriptions.subscribe('allQuestionsGroups'), subscriptions.subscribe('allEKloreQuestions')];
	},
	fastRender: true
});

Router.route('/admin/universes/new', {
	layoutTemplate: 'adminLayout',
	name: 'newUniverse',
	fastRender: false
});

Router.route('/admin/universes/:_id/edit', {
	layoutTemplate: 'adminLayout',
	name: 'editUniverse',
	waitOn: function() {
		return [subscriptions.subscribe('anUniverse', this.params._id), subscriptions.subscribe('allWorkshops')];
	},
	data: function() {
		return Universes.findOne(this.params._id);
	},
	fastRender: true
});

Router.route('/admin/workshops/new', {
	layoutTemplate: 'adminLayout',
	name: 'newWorkshop',
	fastRender: false
});

Router.route('/admin/workshops/:_id/edit', {
	layoutTemplate: 'adminLayout',
	name: 'editWorkshop',
	waitOn: function() {
		return [subscriptions.subscribe('aWorkshop', this.params._id), subscriptions.subscribe('allUniverses')];
	},
	data: function() {
		return Workshops.findOne(this.params._id);
	},
	fastRender: true
});

Router.route('/admin/questionsGroups/new', {
	layoutTemplate: 'adminLayout',
	name: 'newQuestionsGroup',
	fastRender: false
});

Router.route('/admin/questionsGroups/:_id/edit', {
	layoutTemplate: 'adminLayout',
	name: 'editQuestionsGroup',
	waitOn: function() {
		return [subscriptions.subscribe('aQuestionsGroup', this.params._id), subscriptions.subscribe('allEKloreQuestions')];
	},
	data: function() {
		return QuestionsGroups.findOne(this.params._id);
	},
	fastRender: true
});
