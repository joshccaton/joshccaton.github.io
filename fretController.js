var app = angular.module('guitarApp', []);
app.controller('fretController', ['$scope', '$http', function($scope, $http) {
    
	$scope.numFrets = 22; //default
	var strings = ['E', 'A', 'D', 'G', 'B', 'E'];
	$scope.strings = strings.reverse();
	var buttons = [];
	$scope.frets = [];
	var thisString = [];
	const notes = new circularray(['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'])

	notes.pointer.value = $scope.strings[0];

	setFretboard();

	

	$scope.setScale = function(scaleName) {
		var scales = [];
		var notes = [];

		// Load the JSON file containing the scales
		$http.get('scales.json').then(function(response) {
			scales = response.data.scales;
			// Filter the scales to find the one with the matching name
			var matchingScale = scales.filter(function(scale) {
				return scale.name === scaleName;
			});
			if (matchingScale.length > 0) {
			// Extract the notes array from the matching scale and return it
				notes = matchingScale[0].notes;

				let buttons = document.querySelectorAll('.button');
				buttons.forEach(button => {
					if (notes.includes(button.innerText)) {
					button.classList.add('selected');
					}
				});
				document.getElementById("my-dialog").close();

			} else {
			// If no matching scale was found, return null
				console.log('No matching scale found');
			}
  		});
	  };

	function setFretboard(){
		$scope.frets = [];
		//populate the frets nested array by iterating through strings and utilizing the note rotation
		for(let i=0; i<$scope.strings.length; i++){
			thisString = [];
			setString($scope.strings[i]);
			for(let x=0; x<$scope.numFrets+1; x++){
				if(x>=$scope.numFrets+1){break;}
				thisString.push({"note": notes.pointer.value, "fret": x})
				notes.rotate(-1)
			}
			$scope.frets.push({ "notes": thisString });
		}		
	};
	
	function setString(note){ 
		//rotate the circle to the note we want
		while(notes.pointer.value != note){
			notes.rotate(-1);
		}
	  }
	
}]);


