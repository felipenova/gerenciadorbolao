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
 return Participantes.find({"userId":this.userId}); 
});

Meteor.methods({
  participar: function(bolaoId){
   Participantes.insert({"userId":this.userId,"bolaoId":bolaoId});
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