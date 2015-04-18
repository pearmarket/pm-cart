var App = require('module');

App
.service('cartTab', [function() { return {}; }])
.controller('cartTabCtrl', ['$scope', 'cartTab', function($scope, cartTab) {

	cartTab.state = $scope.Cart.contents.length ? 'pristine' : 'dirty';
	$scope.$watch('cartTabForm.$dirty', function(val) {
		if(!$scope.Cart.contents.length && val) {
			cartTab.state = 'dirty';
		}
	});
	$scope.$watch('cartTabForm.$pristine', function(val) {
		if(!$scope.Cart.contents.length && val) {
			cartTab.state = 'pristine';
		}
	});

	$scope.removeProduct = function(id) {
		// TODO: remove product from cart
	};
	$scope.acceptCart = function() {
		$('#customerTab a:last').tab('show');
	};
}]);