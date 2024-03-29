angular.module('underscore', [])
.factory('_', function() {
	return window._;
});

angular.module('todoApp', ['underscore'])
.controller('ListCtrl', function($scope) {
	$scope.taskList = localStorage.taskList ? JSON.parse(localStorage.taskList) : [];
	$scope.$watch('taskList.length', function() {
		localStorage.taskList = JSON.stringify($scope.taskList);
	});
	$scope.$watch('changed', function() {
		localStorage.taskList = JSON.stringify($scope.taskList);
		$scope.changed = false;
	});
	$scope.newTaskName = '';
	$scope.filterBy = 'all';

	$scope.addTask = function($event) {
		if($scope.newTaskName != '') {
			if($event === undefined || $event && $event.keyCode === 13) {
				$scope.taskList.push({name: $scope.newTaskName, status: 0});
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
			$scope.changed = true;
		}
	}

	$scope.isCompleted = function(task) {
		return (task.status === 1);
	}
})
.filter('filterTasks', function() {
    return function(data, filterBy) {
    	return _.filter(data, function(obj) {
        	return filterBy === 'all' ||
        		   filterBy === 'completed' && obj.status === 1 ||
        		   filterBy === 'uncompleted' && obj.status === 0
        })
    }
});