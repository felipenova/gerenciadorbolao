import { Meteor } from 'meteor/meteor';
Concs = new Mongo.Collection('concursos');
Resultados = new Mongo.Collection('resultados');

Meteor.startup(() => {
  // code to run on server at startup
  
	 
});

Meteor.methods({
		restServiceCall: function (url) {
			var result = Meteor.http.get(url, {timeout:30000});
			if(result.statusCode==200) {
				var respJson = JSON.parse(result.content);
				console.log("response received.");
				return respJson;
			} else {
				console.log("Response issue: ", result.statusCode);
				var errorJson = JSON.parse(result.content);
				throw new Meteor.Error(result.statusCode, errorJson.error);
			}
		},
	    insertResultado: function(resultado){
		  Resultados.insert(resultado);
	    },
	    finalizaConcurso: function(concursoId,jogos,totalGanhoConcurso){
		  Concs.update({_id : concursoId},{$set:{jogos : jogos, finalizado: true, totalGanhoConcurso: totalGanhoConcurso}});
	    }

    }); 

Meteor.publish("concursos", function(){
   return Concs.find();	
});
			   
Meteor.publish("resultados", function(){
   return Resultados.find();	
});

