angular.module('underscore', [])
.factory('_', function() {
	return window._;
});

angular.module('todoApp', ['underscore'])
// .config(function($routeProvider) {
// 	$routeProvider
// 		.when('/login', {
// 			controller:'LoginCtrl',
// 			templateUrl:'view/login.html'
// 		}).when('/todolist', {
// 			controller:'ListCtrl',
// 			templateUrl:'todoList.html'
// 		})
// 		.otherwise({
// 			redirectTo:'/login'
// 		});
// })
.controller('ListCtrl', function($scope) {
	$scope.taskList = localStorage.taskList ? JSON.parse(localStorage.taskList) : [];
	$scope.$watch('taskList.length', function() {
		console.log('taskList');
		localStorage.taskList = JSON.stringify($scope.taskList);
	});
	$scope.newTaskName = '';
	$scope.filterBy = 'all';

	$scope.addTask = function($event) {
		if($scope.newTaskName != '') {
			if($event === undefined || $event && $event.keyCode === 13) {
				$scope.taskList.push({name: $scope.newTask, status: 0});
				$scope.newTaskName = '';
			}
		}
	}

	$scope.setFilter = function(filter) {
		$scope.filterBy = filter;
	}

	$scope.completeTask = function(task) {
		if(task.status === 0) {
			task.status = 1;
		}
	}

	$scope.isCompleted = function(task) {
		return (task.status === 1);
	}
})
.filter('filterTasks', function() {
    return function(data, filterBy) {
    	console.log('filterby',filterBy);
        return _.filter(data, function(obj) {
        	return filterBy === 'all' ||
        		   filterBy === 'completed' && obj.status === 1 ||
        		   filterBy === 'uncompleted' && obj.status === 0
        })
    }
});