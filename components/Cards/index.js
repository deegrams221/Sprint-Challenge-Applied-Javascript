// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

window.addEventListener('load', (e) => {

    let cardsContainer = document.querySelector(".cards-container");

    axios.get('https://lambda-times-backend.herokuapp.com/articles')
        .then((axiosData) => {
            console.log(axiosData);
            cardMaker(axiosData.data.articles);
        });

    const cardMaker = ((obj) => {
        for(let key in obj) {
            obj[key].forEach((article) => {
                cardsContainer.appendChild(createArticle(article));
            });
        }
    })    
    const createArticle = ((data) => {
        // define new elements
        const card = document.createElement('div');
        const headline = document.createElement('div');
        const author = document.createElement('div');
        const imgContainer = document.createElement('div');
        const img = document.createElement('img');
        const authorsName = document.createElement('span');
        
        // structure setup (append elements)
        card.appendChild(headline);
        card.appendChild(author);
        author.appendChild(imgContainer);
        author.appendChild(authorsName);
        imgContainer.appendChild(img);
        author.appendChild(authorsName);
        
        // set content
        headline.textContent = data.headline;
        img.src = data.authorPhoto;
        authorsName.textContent = `By: ${data.authorName}`;

        // set class names
        card.classList.add('card');
        headline.classList.add('headline');
        author.classList.add('author');
        imgContainer.classList.add('img-container');
        
        // return
        return card;
    });
});