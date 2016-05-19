import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Concs = new Mongo.Collection('concursos');
Resultados = new Mongo.Collection('resultados');

Meteor.subscribe("concursos");
Meteor.subscribe("resultados");

	
	Template.body.helpers({	
		concs: function(){			
			return Concs.find();
		}
		

		
	});
 
	Template.body.events({
		'click .btnBuscarResultado': function (event, instance) {
			var jogos = this.jogos;
			var concurso = this;
			console.log(this);
			var numeroConcurso = this.numeroConcurso;
			var concursoId = this._id;
			var totalGanhoConcurso = 0;
			
			Meteor.call('restServiceCall', 'http://wsloterias.azurewebsites.net/api/sorteio/getresultado/3/'+numeroConcurso, function(err, respJson) {
				if(err) {
					window.alert("Error: " + err.reason);
					console.log("error occured on receiving data on server. ", err );
				} else {
					var resultado = respJson.Sorteios[0].Numeros;
					
					var resultadoDB = Resultados.find({"NumeroConcurso":numeroConcurso}).fetch();
					if(resultadoDB.length == 0){
							Meteor.call("insertResultado",respJson);	
					}
					
					
					
					$.each(jogos, function( index, value ) {
						var acertos = 0;
						var jogo = value;
						$.each(value.numeros, function( index2, value2 ) {
							if($.inArray( value2 , resultado ) != -1){
								acertos += 1;
							}
						});
						
						jogo.acertos = acertos;
						$.each(respJson.Sorteios[0].Premios, function( indexPrem, valuePrem ) {
							var numAcertos = valuePrem.Faixa.substring(0, 2);
							if(numAcertos == acertos){
								jogo.valorGanho = valuePrem.Valor;
								totalGanhoConcurso += jogo.valorGanho;
							}
						});
						
						
						
					});
					
					
					Meteor.call("finalizaConcurso",concursoId,jogos,totalGanhoConcurso);
					
				}
				
			});
			
			
		}
	});




