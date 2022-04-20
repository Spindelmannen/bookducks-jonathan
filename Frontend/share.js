let bookTitle = document.querySelector("#bookTitle");
let bookScribe = document.querySelector("#bookScribe");
let bookPages = document.querySelector("#bookPages");
let bookEmail = document.querySelector("#bookEmail");
let bookUsername = document.querySelector("#bookUsername");
let bookImage = document.querySelector("#bookImage");
let bookGenreType = document.querySelector("#bookGenreType");

const addBook = async () => {
    bookImage.files;
    let bookImageData = new FormData();
    bookImageData.append('files', bookImage[0]);
    
    
    axios.post("http://localhost:1337/api/upload", bookImageData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then(res => {
        let bookImageId = res.data[0].id;
        axios.post("http://localhost:1337/api/products", {
            //request body
                data: {
                    titel: bookTitle.value,
                    scribe: bookScribe.value,
                    pages: bookPages.value,
                    email: bookEmail.value,
                    username: bookUsername.value,
                    genreType: bookGenreType.value,
                    image: bookImageId
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            })
        })
    
}

document.querySelector("#addBook").addEventListener("click", (e) => {

    e.preventDefault();
    addBook()
    });