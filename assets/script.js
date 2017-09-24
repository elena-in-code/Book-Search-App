// var to target result container
var resultContainer = document.querySelector('#result-container');
// var to target result container of users list of visited books
var userBookList = document.querySelector('.user-book-list');
// var to target result container userBookList + static content inside of it
var recentUserContainerInfo = document.querySelector('.conatiner-user-info');
// var to target button "catalogo completo"
var btn = document.getElementById("btn");
// var to target button "reset"
var btnReset = document.getElementById("btn-reset");
// var to target input 
var searchInput = document.querySelector('.search');
// var to target X  inside of recentUserContainerInfo
var btnRemove = document.querySelector('.remove');
//JSON
var endpoint = 'https://raw.githubusercontent.com/elena-in-code/books/master/bookcollection.json';
//empty data var
var books = [];

//eventlisteners for search
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

//************************************************************Search**********************************************
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
		//loop to show all user´s names that visited each book:
		var nameList = [];
		for (i = 0; i < book.users.length; i++){
			var names = book.users[i].name;
			nameList.push(names);
		}
		return ` 
			<li>
				<span class="name"> Título: ${book.title} <br>
					 Autor: ${book.author} <br>
					 ISBN: ${isbn} <br> 
					 Género: ${genre} <br>
					 Usuarios que han visitado recientemente este recurso: <br>
					 <ul class="recentUsers">
					 	<li class="individualUsers">${nameList[0]}</li> 
					 	<li class="individualUsers">${nameList[1]}</li> 
					 	<li class="individualUsers">${nameList[2]}</li>
					 </ul>
				</span>
			</li>
		`;
	}).join('');
	resultContainer.innerHTML = html;
	
	// user name click event
	var btnUser = document.querySelectorAll(".individualUsers");
		for (var i = 0; i < btnUser.length; i++) {
		  btnUser[i].addEventListener("click", function() {
		  	//user clicked match and show the other books seen by the same user:
		  	var clickedUser = this.innerText
			var userBooks = books
			  .filter(book => book.users.some(user => user.name.indexOf(clickedUser) > -1))
			  .map(book => `<li>${book.title} de ${book.author}`);

		  	userBookList.innerHTML = userBooks;
		  	//Show the recentUserContainerInfo
		  	recentUserContainerInfo.classList.remove("hide");
		  });	
		}
}
//hide the recentUserContainerInfo
btnRemove.addEventListener("click", function() {
	recentUserContainerInfo.classList.add("hide");
});
//************************************************Cátalogo Completo**********************************************
btn.addEventListener("click", function() {
	var fullCatalog =  books.map(book => `<li> Título: ${book.title} <br> Autor: ${book.author}`); 
	resultContainer.innerHTML = fullCatalog;
});
