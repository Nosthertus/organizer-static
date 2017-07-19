(function(){
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

	function formSubmission(){
		let forms = document.forms;

		for(i = 0; i < forms.length; i++){
			let form = forms.item(i);

			form.addEventListener("submit", submit);
		}
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
})();