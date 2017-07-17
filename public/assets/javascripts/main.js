window.addEventListener("DOMContentLoaded", function(){
	initInputs();
});

/*
 * Set all the class listeners to all input containers
 */
function initInputs(){
	// Select all the containers that must have floated labels
	var inputContainers = document.querySelectorAll(".input-container.input-floated");

	inputContainers.forEach(container => {
		var input = container.querySelector("input");
		var label = container.querySelector("label");

		// Isolate the function to avoid event duplication
		(function(){
			// Add the floated class if the input has value upon init
			if(input.value.length != 0){
				container.classList.add("floated");
			}

			input.addEventListener("focus", function(){
				container.classList.add("floated")
			});

			input.addEventListener("blur", function(){
				// Remove the floated class only if input has no value
				if(input.value.length == 0){
					container.classList.remove("floated");
				}
			});
		})();
	});
}