
Participantes = new Mongo.Collection('participantes');
Concs = new Mongo.Collection('concursos');
Resultados = new Mongo.Collection('resultados');

// On Client and Server
Boloes = new Mongo.Collection('boloes'),
BoloesIndex = new EasySearch.Index({
	collection: Boloes,
	fields: ['nome'],
	engine: new EasySearch.Minimongo()
});

Boloes.attachSchema(new SimpleSchema({
	autor:{
		type: String,
		autoValue: function(){return Meteor.userId()}
	},
	nome:{
		type: String,
		max: 100
	},
	descricao:{
		type: String,
		max: 255,
		label: "Descrição"
	},
	dataCriacao:{
		type: Date,
		autoValue: function(){return new Date()}
	},
	ativo:{
		type: Boolean,
		autoValue: function(){return true}
	}
}));

Concs.attachSchema(new SimpleSchema({
	numeroConcurso:{
		type: Number,
		label:"Número"
	},
	jogos:{
		type: [Object],
		blackbox:true // allows all objects
	},
	totalGanhoConcurso:{
		type: Number,
		autoValue: function(){
			if (this.isInsert) {
				return 0;
			}
		}
	},
	dataConcurso:{
		type: Date,
		label:"Data do Concurso"
	},
	finalizado:{
		type: Boolean,
		autoValue: function(){
			if (this.isInsert) {
				return false
			}
		}
	},
	bolaoId:{
		type: String
	}

	
}));

Boloes.allow({
	insert: function(userId, doc){
		return true;
	}
});

Concs.allow({
	insert: function(userId, doc){
		return true;
	}
});

