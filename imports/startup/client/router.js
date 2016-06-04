import { Router } from 'meteor/iron:router';
import { loading } from 'meteor/sacha:spin';

// Base components/layouts
import '../../ui/layouts/layout.js';
import '../../ui/layouts/adminLayout.js';
import '../../ui/components/loading.jade';
import '../../ui/components/notFound.jade';

// Pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/myProfile/myProfile.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/newUniverse/newUniverse.js';
import '../../ui/pages/editUniverse/editUniverse.js';
import '../../ui/pages/newWorkshop/newWorkshop.js';
import '../../ui/pages/editWorkshop/editWorkshop.js';
import '../../ui/pages/newQuestionsGroup/newQuestionsGroup.js';
import '../../ui/pages/editQuestionsGroup/editQuestionsGroup.js';
import '../../ui/pages/newEkloreQuestion/newEkloreQuestion.js';
import '../../ui/pages/editEkloreQuestion/editEkloreQuestion.js';
import '../../ui/pages/answerQuestions/answerQuestions.js';
import '../../ui/pages/myDay/myDay.js';

Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/', {
	layoutTemplate: 'layout',
	name: 'home'
});

Router.route('/myProfile', {
	layoutTemplate: 'layout',
	name: 'myProfile'
});

Router.route('/answerQuestions', {
	layoutTemplate: 'layout',
	name: 'answerQuestions'
});

Router.route('/myDay', {
	layoutTemplate: 'layout',
	name: 'myDay'
});

Router.route('/meeting', {
	layoutTemplate: 'layout',
	name: 'meeting'
});

Router.route('/admin', {
	layoutTemplate: 'adminLayout',
	name: 'admin'
});

Router.route('/admin/universes/new', {
	layoutTemplate: 'adminLayout',
	name: 'newUniverse'
});

Router.route('/admin/universes/:_id/edit', {
	layoutTemplate: 'adminLayout',
	name: 'editUniverse'
});

Router.route('/admin/workshops/new', {
	layoutTemplate: 'adminLayout',
	name: 'newWorkshop'
});

Router.route('/admin/workshops/:_id/edit', {
	layoutTemplate: 'adminLayout',
	name: 'editWorkshop'
});

Router.route('/admin/questionsGroups/new', {
	layoutTemplate: 'adminLayout',
	name: 'newQuestionsGroup'
});

Router.route('/admin/questionsGroups/:_id/edit', {
	layoutTemplate: 'adminLayout',
	name: 'editQuestionsGroup'
});

Router.route('/admin/ekloreQuestions/new', {
	layoutTemplate: 'adminLayout',
	name: 'newEkloreQuestion'
});

Router.route('/admin/ekloreQuestions/:_id/edit', {
	layoutTemplate: 'adminLayout',
	name: 'editEkloreQuestion'
});
