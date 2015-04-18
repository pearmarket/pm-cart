var App = require('module');

App
.service('addressTab', function() { return {}; })
.controller('addressTabCtrl', ['$scope', 'addressTab', 'moltin', function($scope, addressTab, motlin) {
	$scope.addressFormModel = $scope.addressFormModel || {};
	addressTab.state = $scope.Cart.contents.length ? 'pristine' : 'dirty';
	$scope.$watch('addressTabForm.$dirty', function(val) {
		if(!$scope.Cart.contents.length && val) {
			addressTab.state = 'dirty';
		}
	});
	$scope.$watch('addressTabForm.$pristine', function(val) {
		if(!$scope.Cart.contents.length && val) {
			addressTab.state = 'pristine';
		}
	});

	$scope.editAddress = function() {
		$scope.Cart.address = {};
		$scope.addressTabForm.$setPristine();
	};
	$scope.saveAddress = function(address) {
		$('#finalizeTab a:last').tab('show');
		if(address) {
			moltin.Address.Find($scope.Cart.contact.id, {
				address_1: address.street
			}, function(results) {
				if(results.length === 0) {
					moltin.Address.Create($scope.Cart.contact.id, {
						first_name: $scope.Cart.contact.first_name,
						last_name: $scope.Cart.contact.last_name,

					    address_1: address.address_1,
					    city: address.city,
					    county: address.county,
					    postcode: address.postcode,
					    country: 'US'
					}, function(address) {
						$scope.Cart.address = address;
						if(!$scope.$$phase) {
							$scope.$apply();
						}
					}, function(error) {
					    // Something went wrong...
					    console.log('error saving customer: ', error);
					});				
				} else {
					$scope.Cart.address = results[0];
					if(!$scope.$$phase) {
						$scope.$apply();
					}
				}
			}, function() {});			
		}
	};


}]);