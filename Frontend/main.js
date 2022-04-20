let renderBooks = async () => {

    let response = await axios.get('http://localhost:1337/api/books?populate=*');
    console.log(response.data,"books");

    response.data.data.forEach((book) => {
        let bookContainer = document.createElement("article");
        let bookName = document.createElement("h2");
        let bookScribe = document.createElement("p");
        let bookPages = document.createElement("p");
        let bookRating = document.createElement("p");
        let bookOwner = document.createElement("p");
        let bookImageBox = document.createElement("div");

        bookName.innerText = `Book: ${book.attributes.titel}`;
        bookScribe.innerText = `Scribe: ${book.attributes.scribe}`;
        bookPages.innerText = `Pages: ${book.attributes.pages}`;
        bookRating.innerText = `Rating: ${book.attributes.rating}`;
        bookOwner.innerHTML = `<strong>Shared by:</strong> </br>
        Email: ${book.attributes.owner.Email}</br>
        Username: ${book.attributes.owner.Username}`;
        bookImageBox.innerHTML =  `<img src="http://localhost:1337${book.attributes.cover.data.attributes.url}"> `;

        let genreTitle = document.createElement("h3");
        genreTitle.innerText = `Genres:`
        bookContainer.append(bookImageBox, bookName, bookScribe, bookPages, bookRating, genreTitle);
        
        book.attributes.genres.data.forEach(gen => {
            let bookGenre = document.createElement("p"); //creatar element ist för att queryselecta en .p, pga foreachen skriver över första genretypen.
            bookGenre.innerText = `${gen.attributes.genreType}`;
            bookContainer.append(bookGenre, bookOwner);
        });
            
            document.querySelector("#main").append(bookContainer);
    });
};

const renderAudiobooks = async () => {

    let response = await axios.get("http://localhost:1337/api/audiobooks?populate=*");
    console.log(response.data,"audiobooks");

    response.data.data.forEach((audiobook) => {
        let audiobookContainer = document.createElement("article");
        let audiobookName = document.createElement("h2");
        let audiobookDate = document.createElement("p");
        let audiobookDuration = document.createElement("p");
        let audiobookRating = document.createElement("p");
        let audiobookOwner = document.createElement("p");
        let audiobookImageBox = document.createElement("div");
        
        audiobookName.innerText = `Audiobook: ${audiobook.attributes.titel}`;
        audiobookDate.innerText = `Date of Release: ${audiobook.attributes.releaseDate}`;
        audiobookDuration.innerText = `Hours: ${audiobook.attributes.duration}`;
        audiobookRating.innerText = `Rating: ${audiobook.attributes.rating}`;
        audiobookOwner.innerHTML = `<strong>Shared by:</strong> </br>
        Email: ${audiobook.attributes.owner.Email}</br>
        Username: ${audiobook.attributes.owner.Username}`;
        audiobookImageBox.innerHTML =  `<img src="http://localhost:1337${audiobook.attributes.cover.data.attributes.url}" >`;
        
        let genreTitle = document.createElement("h3");
        genreTitle.innerText = `Genres:`

        audiobookContainer.append(audiobookImageBox, audiobookName, audiobookDate, audiobookDuration, audiobookRating, genreTitle);

        audiobook.attributes.genres.data.forEach(gen => {
            let audiobookGenre = document.createElement("p"); //creatar element ist för att queryselecta en .p, pga foreachen skriver över första genretypen.
            audiobookGenre.innerText = `${gen.attributes.genreType}`;
            audiobookContainer.append(audiobookGenre, audiobookOwner);
            });
            
            document.querySelector("#main").append(audiobookContainer);
    });
};


renderBooks()
renderAudiobooks()

//////////LOGIN////////////
let userLogin = document.querySelector("#identifier");
let userPassword = document.querySelector("#password");
let loginRegisterBox = document.querySelector("#loginRegisterBox");


const login = async () => {
    
    // Axios
    let response = await axios.post("http://localhost:1337/api/auth/local",{
        //request body
        identifier: userLogin.value,
        password: userPassword.value
    });
    console.log(response, "HEEEEEEEEEEJ");
    sessionStorage.setItem("token", response.data.jwt);
    
}

//funktion som visar att man är inloggad
const loggedin = () => {
    if (sessionStorage.getItem("token")){
        document.querySelector(".formLogin").classList.add("hidden");
        document.querySelector(".register").classList.add("hidden");
        document.querySelector(".borderline").classList.add("hidden");
        
        let loginMessage = document.createElement("h2");
        loginMessage.innerText = `Welcome Aboard ${userLogin.value} `;
        loginRegisterBox.append(loginMessage);
        
        
        
        let myPage = document.createElement("div");
        myPage.innerHTML = `
        <a href="mypage.html">My Page</a>`;
        loginMessage.append(myPage);
        
    }
};

//sätter funcs på login-knapptryck 
document.querySelector("#login").addEventListener("click", (e) => {

e.preventDefault();
login();
setTimeout(function() {
        loggedin(); //delayar func pga login func är async
    }, 1000);
    registerMessage.classList.add("hidden");
});

////////////REGISTER////////////
let registerName = document.querySelector("#registerName");
let registerPassword = document.querySelector("#registerPassword");
let registerEmail = document.querySelector("#registerEmail");
let registerMessage = document.createElement("p");

const register = async () => {

    //With Axios
    let response = await axios.post("http://localhost:1337/api/auth/local/register",{
        //request body
        username: registerName.value,
        password: registerPassword.value,
        email: registerEmail.value
    });
    console.log(response, "registrerat");
    sessionStorage.setItem("token", response.data.jwt);

}

const registered = () => {
    if (sessionStorage.getItem("token")){
        document.querySelector(".register").classList.add("hidden");
        document.querySelector(".borderline").classList.add("hidden");
        
        registerMessage.innerHTML = `Congratulations ${registerName.value} <br> You're a member of Bookducks!<br> Please Log in. `;
        loginRegisterBox.append(registerMessage);
        
    }
};

document.querySelector("#registerBtn").addEventListener("click", (e) => {
    e.preventDefault();
    register();
    registered();
    });