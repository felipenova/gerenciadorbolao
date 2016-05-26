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



});

AutoForm.hooks({
  cadBolaoForm: {
    onSubmit: function (doc) {
        Boloes.clean(doc);
        this.done();
        return false;
    },
    onSuccess:function(operation, result, template){
    	console.log(result);
        Router.go('bolaoedit.show',{'_id':result});
    },
    onError: function(operation, error, template) {
        console.log(operation,error)
    }
  }
});




