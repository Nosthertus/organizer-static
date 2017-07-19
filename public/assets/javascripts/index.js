(function(){
	// Change this when host address is different
	var $hostAPI = "http://0.0.0.0";

	var registerButton,
		backButton,
		loginForm,
		registerForm;

	window.addEventListener("DOMContentLoaded", function(){
		formSubmission();

		loginForm      = document.getElementById("login-form");
		registerForm   = document.getElementById("register-form");
		registerButton = document.getElementById("register-btn");
		backButton     = document.getElementById("back-btn");

		registerButton.onclick = () => {
			switchForm("register")
		};

		backButton.onclick     = () => {
			switchForm("login")
		};
	});

	/**
	 * Sets the submission event to all forms
	 */
	function formSubmission(){
		let forms = document.forms;

		for(i = 0; i < forms.length; i++){
			let form = forms.item(i);

			form.addEventListener("submit", submit);
		}
	}

	/**
	 * Gathers the data of the form as plain object
	 * $this should send data to the host
	 * 
	 * @param  {Event} evt The event object of the submission
	 */
	function submit(evt){
		let data = getFormData(evt.target, true);
		let uri  = evt.target.id == "login-form" ? "authenticate" : "register";

		// Cancel default submission
		evt.preventDefault();

		if(uri == "register" && data.password != data.repassword){
			alert("Passwords do not match");

			return;
		}

		// Send data to the server
		send(data, uri);
	}

	/**
	 * Parses the data of the @form name
	 * this returns a plain object if @obj is true, otherwise is FormData
	 * 
	 * @param  {Element}         form The form element to extract the data
	 * @param  {Boolean}         obj  Whether the data should be returned as plain object
	 * @return {Object|FormData}      The data extracted from the form
	 */
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

	/**
	 * Switches the displayed form between login and register
	 * 
	 * @param  {String} formName The name of the form to transition to
	 */
	function switchForm(formName){
		if(formName == "login"){
			registerForm.classList.add("hidden");
			loginForm.classList.remove("hidden");
		}

		else{
			loginForm.classList.add("hidden");
			registerForm.classList.remove("hidden");
		}
	}

	function send(data, uri){
		return new Promise((resolve, reject) => {
			var http = new XMLHttpRequest();

			http.responseType = "json";

			http.open("POST", `${$hostAPI}/${uri}`);
			http.setRequestHeader("Content-Type", "application/json");
		
			http.onload = function(){
				console.log(this);
			};

			http.send(JSON.stringify(data));
		});
	}
})();