

// console.log(formatDate(1653976882465))

async function populateSocials(data) {

    const { cards } = JSON.parse(data);


    const container = document.getElementById("cardContainer");

    // We do this so that you can call populateCards() from the console and it will refresh the cards, purging old cards.
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }

    for (let i = 0; i < cards.length; i++) {
        const cardData = cards[i]

        console.log(cardData)

        const cardUUID = uuidv4()

        const card = document.createElement('div');
        card.classList.add("card", "my-1")
        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        if (cardData.image) {
            const cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top")
            cardImage.src = cardData.image.url
            cardImage.alt = cardData.image.alt
            card.appendChild(cardImage)
        }
        if (cardData.title) {
            const cardTitle = document.createElement("h5")
            cardTitle.classList.add("card-header");
            cardTitle.innerHTML = cardData.title;

            card.appendChild(cardTitle)
        }

        if (cardData.content) {
            const cardContent = document.createElement("div")
            cardContent.classList.add('d-flex', 'flex-column', 'justify-content-center')
            cardContent.innerHTML = `<button class="btn btn-primary mb-1 text-center" data-bs-toggle="collapse" type="button" data-bs-target="#cardText-${cardUUID}" aria-expanded="false" aria-controls="cardText">View Text</button>
    <div class="collapse" id="cardText-${cardUUID}">
      <div class="card-text">
        ${cardData.content}
      </div>
    </div>`
            cardBody.appendChild(cardContent)
        }

        card.appendChild(cardBody);

        if (cardData.author || cardData.published) {
            const cardFooter = document.createElement("div")
            cardFooter.classList.add("card-footer", "text-muted", "text-center", "font-monospace")
            let text = '';
            if (cardData.author) text += cardData.author
            if (cardData.published && cardData.author) text += " - " + formatDate(cardData.published) + " Ago."
            if (cardData.published && !cardData.author) text += formatDate(cardData.published) + " Ago."

            cardFooter.innerText = text;
            card.appendChild(cardFooter)
        }
        container.appendChild(card)
    }
    // container.lastChild.classList.add("mb-5")
}

let indexReq = new XMLHttpRequest();

    indexReq.onreadystatechange = () => {
      if (indexReq.readyState == XMLHttpRequest.DONE) {
        populateSocials(indexReq.responseText);
      }
    };
    
    indexReq.open("GET", "https://api.npoint.io/35087afa42a4e4049e09", true);
    indexReq.send();