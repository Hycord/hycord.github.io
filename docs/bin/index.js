async function populateCards(data) {

  const links = JSON.parse(data)

  const container = document.getElementById("cardContainer");

  // We do this so that you can call populateCards() from the console and it will refresh the cards, purging old cards.
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }

  for (let i = 0; i < links.length; i++) {
    const cardData = links[i]

    console.log(cardData)

    const cardUUID = uuidv4()

    const card = document.createElement('div');
    card.classList.add("card", "my-1")
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    if (cardData.name) {

      const cardTitle = document.createElement(cardData.url ? "a" : "p")
      if (cardData.url) cardTitle.href = cardData.url
      cardTitle.classList.add("card-header");
      cardTitle.innerHTML = cardData.name;

      card.appendChild(cardTitle)
    }

    if (cardData.description) {
      const cardContent = document.createElement("div")
      cardContent.classList.add('d-flex', 'flex-column', 'justify-content-center')
      cardContent.innerHTML = `
      <div class="card-text">
        ${cardData.description}
      </div>`
      cardBody.appendChild(cardContent)
    }

    card.appendChild(cardBody);


    container.appendChild(card)
  }
  // container.lastChild.classList.add("mb-5")
}


let linksReq = new XMLHttpRequest();

linksReq.onreadystatechange = () => {
  if (linksReq.readyState == XMLHttpRequest.DONE) {
    populateCards(linksReq.responseText);
  }
};

linksReq.open("GET", "https://api.npoint.io/cff848da1c9a2b7e190e", true);
linksReq.send();