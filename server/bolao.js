import { Meteor } from 'meteor/meteor';

Boloes._ensureIndex({
	nome: 1,
  descricao: 1,
  dataCriacao: 1
});

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.publish("boloes", function(){
 return Boloes.find(); 
});

Meteor.publish("participantes", function(){
 return Participantes.find({"usuario":this.userId}); 
});

Meteor.methods({
  participar: function(bolao){
   Participantes.insert({"usuario":this.userId,"bolao":bolao._id});
 },
 buscar: function(search){
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
   console.log(retorno.fetch());
   return retorno.fetch();
 }
}); 