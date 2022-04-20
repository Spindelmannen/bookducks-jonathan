let userData = [];
let userSharedBooks = [];
let userSharedAudiobooks = [];

const onlineUser = async () => {
    let response = await fetch("http://localhost:1337/api/users/me",{
        headers:{
            Authorization:`Bearer ${sessionStorage.getItem("token")}`
        }
    }
    );
    let json = await response.json();
    console.log(json,"Hello im Json");
    
    //destructing json
    let { id, username, email, createdAt } = json
    //pushing in datan till tomma arrayen
    userData.push({id}, {username}, {email}, {createdAt});
    //appendar
    let userInfo = document.createElement("section");
    userInfo.innerHTML = `
    <p> ID#: ${userData[0].id}</p>
    <p> Username: ${userData[1].username}</p>
    <p> Email: ${userData[2].email}</p>
    <p> Registered: ${userData[3].createdAt}</p>
    `;
    
    document.querySelector("#userBox").prepend(userInfo);
    

};

const sharedItems = async () => {
    let response = await fetch ("http://localhost:1337/api/books?populate=*",{
        headers:{
            Authorization:`Bearer ${sessionStorage.getItem("token")}`
        }
    }
    );
    let json = await response.json();
    console.log(json,"Hello im Json too");

    let { title, scribe, pages, rating } = json
    
    if (sessionStorage.getItem("token").id) {
        userSharedBooks.push({title}, {scribe}, {pages}, {rating});
        let userBookCollection = document.createElement("div");
        userBookCollection.innerHTML = `
        <p> Book: ${userSharedBooks[0].title}</p>
        <p> Book: ${userSharedBooks[1].scribe}</p>
        <p> Book: ${userSharedBooks[2].pages}</p>
        <p> Book: ${userSharedBooks[3].rating}</p>
        `;
        
        document.querySelector("#collection").append(userBookCollection);
    }        
    

    
};
onlineUser();
sharedItems();

