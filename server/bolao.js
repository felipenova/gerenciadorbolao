import { Meteor } from 'meteor/meteor';
Boloes = new Mongo.Collection('boloes');
Participantes = new Mongo.Collection('participantes');

Boloes._ensureIndex({
	nome: 1,
  descricao: 1,
  dataCriacao: 1
});

Meteor.startup(() => {
  // code to run on server at startup
  
  
});


Meteor.publish( 'boloesSearch', function( search ) {
  check( search, Match.OneOf( String, null, undefined ) );

  let query      = {},
  projection = { limit: 10, sort: { dataCriacao: 1 } };
  
  if ( search ) {

  let regex = new RegExp( search, 'i' );
    query = {
      ativo:true,
      $or: [
        { nome: regex }
       // { descricao: regex }
      ]
    };

    projection.limit = 100;
  } 

var retorno =  Boloes.find(query, projection);

return retorno;

});

Meteor.publish("participantes", function(){
   return Participantes.find(); 
});


Meteor.methods({
	 participar: function(bolao){
     Participantes.insert({"usuario":this.userId,"bolao":bolao._id});
    }

}); 



