// console.log("Welcome!")
// let count = 0;
// let counter = document.getElementById("counter");
// setInterval(() => {
//     counter.innerText = count++;
// }, 100)

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function formatDate(date) {
  if (typeof date !== 'object') {
      date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
      intervalType = 'Year';
  } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
          intervalType = 'Month';
      } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
              intervalType = 'Day';
          } else {
              interval = Math.floor(seconds / 3600);
              if (interval >= 1) {
                  intervalType = "Hour";
              } else {
                  interval = Math.floor(seconds / 60);
                  if (interval >= 1) {
                      intervalType = "Minute";
                  } else {
                      interval = seconds;
                      intervalType = "Second";
                  }
              }
          }
      }
  }

  if (interval > 1 || interval === 0) {
      intervalType += 's';
  }

  return interval + ' ' + intervalType;
}

// console.log(formatDate(1653976882465))

async function populateCards(v = "latest") {
  // console.log("populating")
  const url = "https://api.jsonbin.io/v3/b/6295b2dd05f31f68b3afa07a/" + v
  const request = new Request(url);

  const res = await fetch(request);
  const { record } = await res.json();
  const { cards } = record;

  const container = document.getElementById("cardContainer");

  // We do this so that you can call populateCards() from the console and it will refresh the cards, purging old cards.
  while (container.firstChild) {
      container.removeChild(container.firstChild)
  }

  for (let i = 0; i < cards.length; i++) {
      const cardData = cards[i]

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

populateCards()