const dom = document.getElementById("replace_with_navbar");
const newDom = document.createElement("nav")
newDom.classList.add("navbar", "navbar-dark", "bg-dark", "navbar-expand-sm")

newDom.innerHTML = `
<div class="container"> <a class="navbar-brand mb-0 h1" href="https://hycord.is-a.dev">Masen Toplak</i></a>

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
        <ul class="dropdown-menu dropdown-menu-dark text-center" aria-labelledby="socialsDropdown">
          <li><a href="https://twitter.com/HycordIsADev"
              class="font-monospace text-white text-decoration-none social-logo"><i
                class="social-logo fa-brands fa-lg fa-twitter text<-white"></i> Twitter</a></li>
          <li><a href="https://github.com/hycord"
              class="font-monospace text-white text-decoration-none social-logo"><i
                class="social-logo fa-brands fa-lg fa-github text-white"></i> Github</a></li>
          <li><a href="mailto:mtoplak@kish.edu"
              class="font-monospace text-white text-decoration-none social-logo"><i
                class="social-logo fa-solid fa-lg fa-envelope text-white"></i> Email</a></li>
          <!-- <p class="d-inline" id="counter">0</p> -->
        </ul>
      </li>
      <li class="nav-item">
        <a href="links/index.html" class="nav-link">
          Useful Links
        </a>
      </li> 
    </ul>
  </div>
</div>`
dom.replaceWith(newDom)