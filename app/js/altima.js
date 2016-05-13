// Application centrale
var altima = angular.module('altima',['ngRoute']);

// Au lancement de l'application
altima.run(function($rootScope, $http) {
	$rootScope.articles = [];

	$rootScope.loadArticles = function() {
		$http
			.get('/api/articles.json')
			.then(function(res) {
				$rootScope.articles = res.data;
			});
	};
	
	$rootScope.loadArticles();
});

altima.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'home.html'
			})
			.when('/:articleIndex', {
				templateUrl: 'article.html',
				controller: 'altimaArticle'
			})
			.otherwise({
				templateUrl: '404.html'
			});
	}]
);

altima.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; // parse to int
			var s = input.slice(start);
            return s;	
        }
        return [];
    };
});