import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base'

Meteor.subscribe("userData");

Template['override_loginButtonsLoggedOutDropdown'].replaces('_loginButtonsLoggedOutDropdown');
Template['override_loginButtonsLoggedInDropdown'].replaces('_loginButtonsLoggedInDropdown');

Avatar.setOptions({
	fallbackType: "initials",
	defaultImageUrl: "utilities_avatar/default.png" 
});