import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base'

import './main.html';

Meteor.subscribe("userData");

Template['override_loginButtonsLoggedOutDropdown'].replaces('_loginButtonsLoggedOutDropdown');
Template['override_loginButtonsLoggedInDropdown'].replaces('_loginButtonsLoggedInDropdown');

Avatar.setOptions({
  fallbackType: "initials",
   defaultImageUrl: "utilities_avatar/default.png" 
});


Template.body.helpers({	
    logUser: function() {
    	console.log(Meteor.user());
    return Meteor.user();
  }
});

Template.body.events({

});

Template.loading.rendered = function () {
  if ( ! Session.get('loadingSplash') ) {
    this.loading = window.pleaseWait({
      logo: '/images/Meteor-logo.png',
      backgroundColor: '#7f8c8d',
      loadingHtml: message + spinner
    });
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.loading.destroyed = function () {
  if ( this.loading ) {
    this.loading.finish();
  }
};

var message = '<p class="loading-message">Loading Message</p>';
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD/MM/YYYY');
});




