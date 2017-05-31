(function(){
	window.addEventListener("DOMContentLoaded", function(){
		formSubmission();
	});

	function formSubmission(){
		var form = document.getElementById("login-form");

		form.addEventListener("submit", submit);
	}

	function submit(evt){
		var data = getFormData(evt.target, true);

		console.log(data);

		// Cancel default submission
		evt.preventDefault();
	}

	function getFormData(form, obj = false){
		var formData = new FormData(form);

		if(obj == true){
			var data = {};

			for(pair of formData.entries()){
				data[pair[0]] = pair[1];
			}

			return data;
		}

		return formData;
	}
})();