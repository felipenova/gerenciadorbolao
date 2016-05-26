import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Meteor.subscribe("boloes");

Template.searchBolao.onCreated( () => {
	let template = Template.instance();
	template.subscribe('participantes');
});

Template.searchBolao.helpers({
	boloesIndex: () => BoloesIndex,
	inputAttributes: () => {
		return {
			placeholder: 'Buscar bolão...',
			type: 'text',
			class: 'form-control'
		};
	},
	boloes() {
		let boloes = Boloes.find();
		if ( boloes ) {
			Session.set("resultBoloes", boloes);
			return boloes;
		}
	},
	verificaUsuarioParticipante() {
		var resposta = false;
		let participantes = Participantes.find({usuario: Meteor.userId(), bolao: this._id});
		if ( participantes.fetch().length > 0 ) {
			resposta = true;
		}
		return resposta;
	}
});

Template.searchBolao.events({
	'click [name="btnParticipar"]': function(event, template) {
		Meteor.call("participar",this);
	}
});