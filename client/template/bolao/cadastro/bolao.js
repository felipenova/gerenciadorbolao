import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';



//Boloes = new Mongo.Collection('boloes');
//Participantes = new Mongo.Collection('participantes');


Template.cadBolao.onCreated( () => {
	
});

Template.cadBolao.helpers({
	/*searching() {
		return Template.instance().searching.get();
	},
	query() {
		return Template.instance().searchQuery.get();
	},
	boloes() {
		let boloes = Boloes.find();
		if ( boloes ) {
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
	}*/
});

Template.cadBolao.events({
	'keyup [name="search"]': _.debounce(function(event, template) {
		let value = event.target.value.trim();

   // if ( value !== '' && event.keyCode === 13 ) {
   	template.searchQuery.set( value );
   	template.searching.set( true );
   	Session.set("loadingSplash",true);
    //}

    if ( value === '' ) {
    	template.searchQuery.set( value );
    }
}, 300),
	'click [name="btnParticipar"]': function(event, template) {
		console.log(this);
		Meteor.call("participar",this);
	}



});




