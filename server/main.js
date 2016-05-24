import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  
	 
});


// Generate user initials after Facebook login
Accounts.onCreateUser((options, user) => {
  
 if (user.services.facebook && options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
  }


  // Don't forget to return the new user object at the end!
  return user;
});


Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'services': 1, 'others': 1}});
  } else {
    this.ready();
  }
});

