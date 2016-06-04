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

Template.editBolao.events({
	'click .badge': function (event, instance) {
		console.log(event.currentTarget);
		console.log($(event.currentTarget));

		var numeroSelecionado = parseInt(event.currentTarget.innerText);
		if (typeof Session.get("numerosAdd") === "undefined") {
			Session.set("numerosAdd",[]);
		}
		var numerosAdicionados = Session.get("numerosAdd") ;
		if($.inArray( numeroSelecionado , numerosAdicionados ) != -1){
			numerosAdicionados = jQuery.grep(numerosAdicionados, function(value) {
				return value != numeroSelecionado;
			});
			$(event.currentTarget).css("background-color","#777777");
		}else{
			numerosAdicionados.push(numeroSelecionado);
			$(event.currentTarget).css("background-color","#00b300");
		}
		
		Session.set("numerosAdd",numerosAdicionados);
		console.log(Session.get("numerosAdd"));
	}


});

AutoForm.hooks({
	cadBolaoForm: {
		onSubmit: function (doc) {
			Boloes.clean(doc);
			this.done();
			return false;
		},
		onSuccess:function(operation, result, template){
			Meteor.call("participar", result, function(err, data) {
				if (err)
					console.log(err);

				Router.go('bolaoedit.show',{'_id':result});
			});
			
		},
		onError: function(operation, error, template) {
			console.log(operation,error)
		}
	},
	insertConcursoForm: {
		onSubmit: function (insertDoc, updateDoc, currentDoc) {
			console.log(insertDoc);
			console.log(updateDoc);
			console.log(currentDoc);
			Concs.clean(insertDoc);
			this.done();
			return false;
		},
		formToDoc: function(doc, autoform) {
			console.log(doc);
			console.log(this.template.data.params);
			doc.bolaoId = this.template.data.params;
			console.log(moment.utc(doc.dataConcurso));
			console.log(moment(doc.dataConcurso).set('hour', 0));
			doc.jogos = [
			{
				"numeros": [
				1,
				4,
				5,
				7,
				8,
				9,
				10,
				13,
				14,
				15,
				18,
				20,
				21,
				22,
				25
				],
				"acertos": 8,
				"valorGanho": 0
			},
			{
				"numeros": [
				1,
				4,
				5,
				6,
				7,
				8,
				10,
				13,
				14,
				15,
				16,
				18,
				19,
				20,
				22
				],
				"acertos": 7,
				"valorGanho": 0
			},
			{
				"numeros": [
				1,
				2,
				4,
				5,
				6,
				8,
				9,
				10,
				12,
				14,
				16,
				22,
				23,
				24,
				25
				],
				"acertos": 11,
				"valorGanho": 4
			},
			{
				"numeros": [
				2,
				6,
				7,
				8,
				10,
				11,
				13,
				14,
				16,
				17,
				18,
				19,
				20,
				21,
				22
				],
				"acertos": 7,
				"valorGanho": 0
			},
			{
				"numeros": [
				3,
				4,
				6,
				8,
				10,
				12,
				13,
				14,
				15,
				16,
				18,
				21,
				23,
				24,
				25
				],
				"acertos": 11,
				"valorGanho": 4
			},
			{
				"numeros": [
				1,
				2,
				3,
				5,
				7,
				10,
				11,
				12,
				14,
				16,
				17,
				18,
				19,
				21,
				24
				],
				"acertos": 8,
				"valorGanho": 0
			},
			{
				"numeros": [
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				15,
				18,
				19,
				20,
				24,
				25
				],
				"acertos": 8,
				"valorGanho": 0
			},
			{
				"numeros": [
				2,
				3,
				4,
				6,
				8,
				9,
				10,
				11,
				13,
				15,
				16,
				17,
				20,
				22,
				23
				],
				"acertos": 10,
				"valorGanho": 0
			},
			{
				"numeros": [
				1,
				3,
				4,
				6,
				8,
				9,
				11,
				13,
				14,
				15,
				17,
				21,
				22,
				23,
				24
				],
				"acertos": 11,
				"valorGanho": 4
			},
			{
				"numeros": [
				5,
				6,
				7,
				8,
				10,
				12,
				14,
				15,
				16,
				17,
				19,
				20,
				21,
				23,
				24
				],
				"acertos": 7,
				"valorGanho": 0
			}
			]
			return doc;
		},
		onSuccess:function(operation, result, template){

		},
		onError: function(operation, error, template) {
			console.log(operation,error)
		}
	}
});




