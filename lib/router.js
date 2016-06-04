import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('notAuthorized');
  } else {
    this.next();
  }
});

Router.route('/boloes', function () {
	this.render('boloesPag');
}, {
  name: 'boloes.show'
});


Router.route('/meus_boloes', function () {
  this.render('boloesPag');
}, {
  name: 'meusboloes.show'
});


Router.route('/bolao', function () {
	this.render('bolaoPag');
}, {
  name: 'bolao.show'
});



Router.route('/bolao/:_id', {
  name: 'bolaoedit.show',
  template: 'editBolao',
  onBeforeAction: function(){
      var participante = Participantes.find({bolaoId: this.params._id}).fetch();
      console.log(participante);
      if(participante.length > 0){
         var item = Boloes.findOne({_id: this.params._id});
        this.render("editBolao",{data:item});
      } else {
        this.render("notAuthorized");
      }
  }
});

Router.route('/', function () {
  this.render('home');
}, {
  name: 'home.show'
});