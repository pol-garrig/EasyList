// -------------------------------------- //
// Define Angular factory to manage Item  //
// -------------------------------------- //

angular.module('itemService', [])

	// Map actions to routes
	.factory('Items', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/items');
			},
			create : function(itemData) {
				return $http.post('/api/items', itemData);
			},
			delete : function(id) {
				return $http.delete('/api/items/' + id);
			},
			close : function(id) {
				return $http.post('/api/items/' + id);
			}
		}
	}]);