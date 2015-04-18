var App = require('module');

App
.service('contactTab', [function() { return {}; }])
.controller('contactFormCtrl', ['$scope', 'moltin', 'contactTab', function($scope, moltin, contactTab) {

	$scope.contactFormModel = {};
    $scope.logic = angular.extend($scope.logic, {});

	contactTab.state = $scope.Cart.contact ? 'submitted' : 'pristine';
	$scope.$watch('contactForm.$dirty', function(val) {
		if(!$scope.Cart.contact.email && val) {
			contactTab.state = 'dirty';
		}
	});
	$scope.$watch('contactForm.$pristine', function(val) {
		if(!$scope.Cart.contact.email && val) {
			contactTab.state = 'pristine';
		}
	});

	$scope.editCustomer = function() {
		$scope.Cart.contact = {};
		$scope.contactForm.$setPristine();
	};

	$scope.saveContactInfo = function(contact) {
		$('#addressTab a:last').tab('show');
		if(contact) {
			moltin.Customer.Find({
				email: contact.email
			}, function(results) {
				if(results.length === 0) {
					moltin.Customer.Create({
						// group: 951443338437853235, // group setup in forge for beta users
					    'first_name': contact.name.split(' ')[0],
					    'last_name': contact.name.split(' ')[1],
					    email: contact.email
					}, function(customer) {
						$scope.Cart.contact = customer;
						contactFM.state = 'submitted';
						if(!$scope.$$phase) {
							$scope.$apply();
						}
					}, function(error) {
					    // Something went wrong...
					    console.log('error saving customer: ', error);
					});				
				} else {
					$scope.Cart.contact = results[0];
					contactFM.state = 'submitted';
					if(!$scope.$$phase) {
						$scope.$apply();
					}
				}
			}, function() {});			
		}
	};	
}]);