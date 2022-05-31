let count = 0;
let counter = document.getElementById("counter");
setInterval(() => {
    if (counter) counter.innerText = count++;
}, 100)

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
    console.log("populating")
    const url = "https://api.jsonbin.io/v3/b/6295e7f0402a5b380216324a/" + v
    const request = new Request(url);

    const res = await fetch(request);
    const { record } = await res.json();
    const { links } = record;

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
            const cardTitle = document.createElement("a")
            cardTitle.classList.add("card-header");
            cardTitle.href = cardData.url
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

populateCards()