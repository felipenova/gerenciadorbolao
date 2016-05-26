import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/concursos', function () {
	this.render('concursoPag');
}, {
  name: 'concursos.show'
});

Router.route('/boloes', function () {
	this.render('boloesPag');
}, {
  name: 'boloes.show'
});

Router.route('/bolao', function () {
	this.render('bolaoPag');
}, {
  name: 'bolao.show'
});

Router.route('/bolao/:_id', function () {
  var item = Boloes.findOne({_id: this.params._id});
  console.log(item);
  this.render('editBolao', {data: item});
}, {
  name: 'bolaoedit.show'
});

Router.route('/', function () {
  this.render('home');
}, {
  name: 'home.show'
});