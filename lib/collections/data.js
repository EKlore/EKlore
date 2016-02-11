Test = new Mongo.Collection('test');

var Schemas = {};

Schemas.Test = new SimpleSchema({});

Test.attachSchema(Schemas.Test);

Meteor.methods({
	testInsert: function(test) {
		return Mangas.insert({});
	}
});
