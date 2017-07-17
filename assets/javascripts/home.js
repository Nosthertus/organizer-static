window.addEventListener("DOMContentLoaded", function(){
	setCards(8);
});

function setCards(count){
	for(i = 0; i < count; i++){
		insertCard();
	}
}

function insertCard(){
	var template = 	document.querySelector("#card-small-template");
	var container = document.querySelector("#main-content");

	var clone = document.importNode(template.content, true);

	container.appendChild(clone);
}