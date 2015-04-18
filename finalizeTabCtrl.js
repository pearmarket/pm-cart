var App = require('module');

App
.service('finalizeTab', [function() { return {}; }])
.controller('finalizeTabCtrl', ['$scope', 'finalizeTab', function($scope, finalizeTab) {
	var checkoutBtn = true;

	finalizeTab.state = $scope.Cart ? 'submitted' : 'dirty';

	$scope.logic = angular.extend($scope.logic, {
		checkoutBtn: function() {
			return checkoutBtn;
		}
	});

	$scope.$watch('finalizeTabForm.$dirty', function(val) {
		if(!$scope.Cart.contents.length && val) {
			finalizeTab.state = 'dirty';
		}
	});
	$scope.$watch('finalizeTabForm.$pristine', function(val) {
		if(!$scope.Cart.contents.length && val) {
			finalizeTab.state = 'pristine';
		}
	});


	$scope.removeProduct = function(id) {
		// TODO: remove product from cart
	};
	$scope.acceptCart = function() {
		$('#customerTab a:last').tab('show');
	};
	$scope.submitCart = function() {
		$scope.$emit('submitCart', {
		    customer: $scope.Cart.contact.id,
		    shipping: 'delivery',
		    gateway:  'manual',
		    bill_to:  $scope.Cart.address.id,
		    ship_to:  $scope.Cart.address.id
		}, function() { /* success */ }, function() { /* failure */ });
		$scope.loading = true;
		checkoutBtn = false;
	};
}]);