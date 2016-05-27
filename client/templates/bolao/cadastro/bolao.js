import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


Template.cadBolao.onCreated( () => {
	
});

Template.editBolao.helpers({
	isOwner: function() {
		return this.autor === Meteor.userId();
	},
	concursosDoBolao: function(){	
		return Concs.find({bolaoId: this._id}, {sort: {dataConcurso: -1}});
	}
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




