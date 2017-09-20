// var to target result container
var resultContainer = document.getElementById("result-container");
// var to target button "catalogo completo"
var btn = document.getElementById("btn");
// var to target button "reset"
var btnReset = document.getElementById("btn-reset");

//****************************************************catálogo completo*****************************************
//Event when button clicked - catalogo completo
btn.addEventListener("click", function() {
	// AJAX call
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'http://www.json-generator.com/api/json/get/bPvxqJvOOG?indent=2');
	ourRequest.onload = function () {
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
	// end AJAX call
	};
	ourRequest.send();
	//hide button "catalogo completo" after clicked
	btn.classList.add("hide");
});

//add to our HTML
// data = our array of objects
function renderHTML(data){
	var htmlString = "";
	//loop to show full collection
	for (i = 0; i < data.length; i++) {
		htmlString += "<li>" + "Título: " +  data[i].title + "<br>" + "Autor: " + data[i].author + "</li>";
		}
	// arguments ( where and what) we want to add to html
	resultContainer.insertAdjacentHTML('beforeend', htmlString);
}
//************************************************************Search**********************************************

var endpoint = 'http://www.json-generator.com/api/json/get/bPvxqJvOOG?indent=2';

var books = [];

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => books.push(...data))

function findMatches(wordToMatch, books) {
	return books.filter(book => {

	var regex = new RegExp(wordToMatch, 'gi');
	return book.title.match(regex) || book.author.match(regex)
	});
}

function displayMatches (){
	var matchArray = findMatches(this.value, books);
	var html = matchArray.map(book => {
		return ` 
			<li>
				<span class="name"> Título: ${book.title} <br> Autor: ${book.author}</span>
				
			</li>
		`;
	}).join('');
	suggestions.innerHTML = html;
	btn.classList.add("hide");
}
var searchInput = document.querySelector('.search');
var suggestions = document.querySelector('#result-container');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

//*****************************Lógicas que faltan:
//añadir a la búsqueda la posibilidad de buscar por género literario
//añadir a la búsqueda la posibilidad de buscar por ISBN
//añadir a los resultado de las búsquedas que users han visitado cada libro 
//y poder ver de cada user qué otros libros han visitado

