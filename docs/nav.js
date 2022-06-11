


const dom = document.getElementById("replace_with_navbar");
const newDom = document.createElement("nav")
newDom.classList.add("navbar", "navbar-dark", "bg-dark", "navbar-expand-sm")

newDom.innerHTML = `
<div class="container"> <a class="navbar-brand mb-0 h1" href="${window.location.origin}">Masen Toplak</i></a>

  <button type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle Navigation Menu"
    data-bs-toggle="collapse" data-bs-target="#navbarNav" class="navbar-toggler">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav bg-dark">
      <li class="nav-item dropdown active">
        <a href="" id="projectsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"
          class="nav-link dropdown-toggle">
          Projects
        </a>
        <ul class="dropdown-menu dropdown-menu-dark " aria-labelledby="projectsDropdown">
          <li><a href="https://github.com/hycord/hycord.github.io" class="dropdown-item">Portfolio</a></li>
          <!-- <li><a href="./test.html" class="dropdown-item">Card test</a></li>
          <li><a href="" class="dropdown-item">null 2</a></li> -->
        </ul>
      </li>
      <li class="nav-item dropdown active">
        <a href="" id="socialsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"
          class="nav-link dropdown-toggle">
          Socials
        </a>
        <ul id="socialsList" class="dropdown-menu dropdown-menu-dark text-center" aria-labelledby="socialsDropdown">
        <!-- <li><a href="https://twitter.com/HycordIsADev"
              class="font-monospace text-white text-decoration-none social-logo"><i
                class="social-logo fa-brands fa-lg fa-twitter text<-white"></i> Twitter</a></li>
          <li><a href="https://github.com/hycord"
              class="font-monospace text-white text-decoration-none social-logo"><i
                class="social-logo fa-brands fa-lg fa-github text-white"></i> Github</a></li>
          <li><a href="mailto:mtoplak@kish.edu"
              class="font-monospace text-white text-decoration-none social-logo"><i
                class="social-logo fa-solid fa-lg fa-envelope text-white"></i> Email</a></li>
          <p class="d-inline" id="counter">0</p> -->
        </ul>
      </li>
      <!-- <li class="nav-item">
        <a href="${window.location.origin}/links" class="nav-link" data-bs-toggle="tooltip" title="These may not be useful for you, but they act as my link hub/notepad">
          Useful Links
        </a> -->
      </li> 
    </ul>
  </div>
</div>`
dom.replaceWith(newDom)

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

async function populateSocials(data) {

  const links = JSON.parse(data)
  console.log(links)

  const container = document.getElementById("socialsList");

  // We do this so that you can call populateCards() from the console and it will refresh the cards, purging old cards.
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }

  for (let i = 0; i < links.length; i++) {
    const socialData = links[i]

    const listEl = document.createElement('li');
    const social = document.createElement(`a`);
    social.classList.add("font-monospace", "text-white", "text-decoration-none", "social-logo");

    {/*
    <li>
      <a 
      href="mailto:mtoplak@kish.edu"
      class="font-monospace text-white text-decoration-none social-logo">
        <i
        class="social-logo fa-solid fa-lg fa-envelope text-white">
        </i>
        Email
      </a>
    </li> 
    */}

    /* 
    {
      url: "",
      name: "",
      iconClasses: ""
    }*/

    social.href = socialData.url

    const iconEl = document.createElement("i")
    //social-logo fa-brands fa-lg fa-twitter text<-white
    for (const c of [...socialData.iconClasses, "social-logo", "fa-lg", "text-white"]) {
      iconEl.classList.add(c);
    }

    social.innerHTML = `${iconEl.outerHTML} ${socialData.name}`

    listEl.appendChild(social);
    container.appendChild(listEl)
  }
  // container.lastChild.classList.add("mb-5")
}

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

let navReq = new XMLHttpRequest();

navReq.onreadystatechange = () => {
  if (navReq.readyState == XMLHttpRequest.DONE) {
    populateSocials(navReq.responseText);
  }
};

navReq.open("GET", "https://api.npoint.io/db128cd94ecd23d88c3d", true);
navReq.send();