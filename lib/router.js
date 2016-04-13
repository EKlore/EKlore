var subscriptions = new SubsManager();

Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/', {
	layoutTemplate: 'layout',
	name: 'home',
	waitOn() {
		return subscriptions.subscribe('allVolunteers');
	},
	fastRender: true
});

Router.route('/myProfile', {
	layoutTemplate: 'layout',
	name: 'myProfile',
	waitOn() {
		return subscriptions.subscribe('oneQuestionAtATime', Meteor.userId());
	},
	data() {
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
	waitOn() {
		return [
			subscriptions.subscribe('allUniverses'),
			subscriptions.subscribe('allWorkshops'),
			subscriptions.subscribe('allQuestionsGroups'),
			subscriptions.subscribe('allEkloreQuestions')
		];
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
	waitOn() {
		return [subscriptions.subscribe('anUniverse', this.params._id), subscriptions.subscribe('allWorkshopsLinkableToUniverse')];
	},
	data() {
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
	waitOn() {
		return [subscriptions.subscribe('aWorkshop', this.params._id), subscriptions.subscribe('allUniversesLinkableToWorkshop')];
	},
	data() {
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
	waitOn() {
		return [subscriptions.subscribe('aQuestionsGroup', this.params._id), subscriptions.subscribe('allEkloreQuestions')];
	},
	data() {
		return QuestionsGroups.findOne(this.params._id);
	},
	fastRender: true
});

Router.route('/admin/ekloreQuestions/new', {
	layoutTemplate: 'adminLayout',
	name: 'newEkloreQuestion',
	fastRender: false
});

Router.route('/admin/ekloreQuestions/:_id/edit', {
	layoutTemplate: 'adminLayout',
	name: 'editEkloreQuestion',
	waitOn() {
		return [
			subscriptions.subscribe('anEkloreQuestion', this.params._id),
			subscriptions.subscribe('allQuestionsGroups')
		];
	},
	data() {
		return EkloreQuestions.findOne(this.params._id);
	},
	fastRender: true
});
