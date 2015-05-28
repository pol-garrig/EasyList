// -------------------------- //
// Define Angular controller  //
// -------------------------- //

angular.module('itemController', [])

	// Inject Item Factory
	.controller('mainController', ['$scope','$http','Items', function($scope, $http, Items) {
		$scope.formData = {};

		// get() : Return all the items
		Items.get()
			.success(function(data) {
				// Reload item list
				reloadItem(data);
			});

		// createItem() : Grab input from the add form, call the API to create the item
		$scope.createItem = function() {

			// Ensure item text is not empty
			if ($scope.formData.text != undefined) {
				// Call item factory to create item
				Items.create($scope.formData)
					.success(function(data) {
						// Clear the form
						$scope.formData = {};
						// Reload item list
						reloadItem(data);
					});
			}
		};

		// closeItem(id) : Close an opened item
		$scope.closeItem = function(id) {

			Items.close(id)
				.success(function(data) {
					//Reload item list
					reloadItem(data);
				});
		};

		// deleteItem(id) : Delete the item corresponding to the given id
		$scope.deleteItem = function(id) {

			Items.delete(id)
				.success(function(data) {
					//Reload item list
					reloadItem(data);
				});
		};

		// Set $scope with all item and opened/closed items
		var reloadItem = function(data) {
			$scope.items = data;
			$scope.opened = [];
			$scope.closed = [];
			angular.forEach(data, function(item) {
				if(!item.closed) {
					$scope.opened.push(item);
				}else {
					$scope.closed.push(item);
				}
			});
		}
	}]);