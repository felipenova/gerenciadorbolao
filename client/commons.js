import { Template } from 'meteor/templating';

Meteor.subscribe("boloes");
Meteor.subscribe("concursos");
Meteor.subscribe("participantes");
Meteor.subscribe("resultados");

Template.registerHelper('formatDate', function(date) {
	return moment(date).format('DD/MM/YYYY');
});

