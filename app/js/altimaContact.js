// Controlleur du formulaire de contact
altima.controller('altimaContact', function($scope) {
	
	$scope.sent = false;
	$scope.error = false;
	$scope.subjects = [
		'Demande de contact',
		'Demande de devis',
		'Candidature'
	];
	
	$scope.submit = function(form) {
		// Bloque l'envoi si invalide
		if(form.$invalid) {
			console.log("Le formulaire n'est pas valide.");
			$scope.error = true;
			return false;
		}
		
		console.log("Ici il faut envoyer les données du formulaire 'contact' pour les enregister en base.");
		$scope.error = false;
		$scope.sent = true;
		
		return true;
	};

});