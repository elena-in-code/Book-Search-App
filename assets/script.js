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
	ourRequest.open('GET', 'https://raw.githubusercontent.com/elena-in-code/books/master/bookcollection.json');
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
		//Metadata break into isbn & genre:
		var meta = data[i].metadata;
		var isbn = meta.substr(1, 17);
		var genre = meta.substr(18, 30);


		htmlString += "<li>" + "Título: " +  data[i].title + "<br>" + "Autor: " + data[i].author + "<br>" + "ISBN: " + isbn + "<br>" + "Género: " + genre + "</li>";
	}
	// arguments ( where and what) we want to add to html
	resultContainer.insertAdjacentHTML('beforeend', htmlString);
}
//************************************************************Search**********************************************

var endpoint = 'https://raw.githubusercontent.com/elena-in-code/books/master/bookcollection.json';

var books = [];

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => books.push(...data))

function findMatches(wordToMatch, books) {
	return books.filter(book => {

	var regex = new RegExp(wordToMatch, 'gi');
	return book.title.match(regex) || book.author.match(regex) || book.metadata.match(regex) 
	});
}

function displayMatches (){
	var matchArray = findMatches(this.value, books);
	
	var html = matchArray.map(book => {
	//Metadata break into isbn & genre:
	var meta = book.metadata;
		var isbn = meta.substr(1, 17);
		var genre = meta.substr(18, 30);
	//loop to show all user´s names in each book:
	var nameList = [];
	for (i = 0; i < book.users.length; i++){
		var names = book.users[i].name;
		nameList.push(names);
	}
		return ` 
			<li>
				<span class="name"> Título: ${book.title} <br> Autor: ${book.author} <br> ISBN: ${isbn} <br> Género: ${genre}
				<br> Usuarios que han visitado recientemente este recurso: <br> <ul class="recentUsers"><li class="individualUsers">${nameList[0]}</li> <li class="individualUsers">${nameList[1]}</li> <li class="individualUsers">${nameList[2]}</li></ul></span>
				
			</li>
		`;
	}).join('');
	suggestions.innerHTML = html;
	btn.classList.add("hide");

	// user name click event
	var btnUser = document.querySelectorAll(".individualUsers");
		for (var i = 0; i < btnUser.length; i++) {
		  btnUser[i].addEventListener("click", function() {
		  	//wip to define var test - to find the match the name of the user that have been clicked
		  	var test = "Cien años de soledad"
			var userBooks = books
			  .filter(x => x.title.indexOf(test) > -1)
			  .map(x => ` <li>${x.title}</li> <li>${x.author}</li>`);

		  console.log(userBooks);
		  });
		}

}
var searchInput = document.querySelector('.search');
var suggestions = document.querySelector('#result-container');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

//*****************************Lógicas que faltan:
//añadir a los resultado de las búsquedas que users han visitado cada libro en catalogo completo
//y poder ver de cada user qué otros libros han visitado
//***********Refactore:
//clean and DRY code

