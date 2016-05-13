// Controlleur du fcarousel
altima.controller('altimaCarousel', function($scope, $timeout, $window) {

	// Liste des images à afficehr
	$scope.imagesList = [
		{
			url: '/images/new1.jpg', title: 'Image 1'
		},
		{
			url: '/images/new2.jpg', title: 'Image 2'
		},
		{
			url: '/images/new3.jpg', title: 'Image 3'
		},
		{
			url: '/images/new4.jpg', title: 'Image 4'
		},
		{
			url: '/images/new5.jpg', title: 'Atecna'
		},
		{
			url: '/images/new6.jpg', title: 'Atecna mobile'
		}
	];
	
	// Défilement automatique
	var timer;
    var autoMove = function() {
        $scope.move(1);
		$scope.play();
    };

	// Paramètres
	$scope.pos = 0;
	$scope.nbMD = 4;	// Nb affiché en desktop
	$scope.nbXS = 2;	// Nb affiché en mobile	
	$scope.speed = 5000;
	
    var nbImages = function() {
        return ($window.innerWidth < 768 ? $scope.nbXS : $scope.nbMD);
    };
	
	$scope.nbShow = nbImages();
	
	// Change le nombre affiché sous 728px de large
	angular.element($window).bind('resize', function () {
		$scope.nbShow = nbImages();
	});
	
	// Donne la position maximale dans la liste
	$scope.maxPos = function() {
		return $scope.imagesList.length - $scope.nbShow;
	};
	
	// Précédent
	$scope.prev = function() {
		$scope.stop();
		$scope.move(-2);
	};

	// Suivant
	$scope.next = function() {
		$scope.stop();
		$scope.move(2);
	};
	
	// Se déplace de delta
	$scope.move = function(delta) {
		$scope.pos += delta;
		$scope.pos = Math.max($scope.pos, 0);
		$scope.pos = Math.min($scope.pos, $scope.maxPos());
	};
	
	// Arrete de défilement automatique
	$scope.play = function() {
		timer = $timeout(autoMove, $scope.speed);
	};
	
	// Arrete de défilement automatique
	$scope.stop = function() {
		$timeout.cancel(timer);
	};
	
	
	// Lecture auto des le depart
	$scope.play();
});