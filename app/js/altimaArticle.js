// Controlleur de la home
altima.controller('altimaArticle', function($rootScope, $scope, $routeParams) {
	$rootScope.page = 'article';
	
	$scope.article = {};
	$scope.articleIndex = $routeParams.articleIndex;
	$scope.index = $routeParams.articleIndex;
	$scope.error = function() {
		return ($scope.index === undefined || $rootScope.articles[$scope.index] === undefined);
	};
	
	$scope.parargaphs = function() {
		if ($rootScope.articles[$scope.index] === undefined) return;
		return $rootScope.articles[$scope.index].content.replace(/(<([^>]+)>)/ig,"").split('</p>');
	};	
});