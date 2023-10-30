
//CARGO ESTE DOMCONTENTLOADED al comienzo ya que de otra forma no funciona en el panel de usuario



(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Initiate  glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();



let cantPremiosInput;

document.addEventListener("DOMContentLoaded", function() {
  cantPremiosInput = document.getElementById("cantPremios");
  if (cantPremiosInput) {
    cantPremiosInput.addEventListener("input", agregarCasillasDePremios);
  }
});

/********* LOGIN ************/

// Función para iniciar sesión


function login(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "rifa-user-panel.html";
  } else {
    const loginError = document.getElementById("login-error");
    loginError.textContent =
      "Inicio de sesión fallido. Verifica Email y Constrseña.";
  }
}

// Funcion para "REGISTRATE AQUÍ"
document
  .getElementById("show-register-form")
  .addEventListener("click", function () {
    document.getElementById("register-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
  });
  
  
// Función para registrar un nuevo usuario
function register(event) {
  event.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const passwordError = document.getElementById("password-error");
  const registrationSuccess = document.getElementById("registration-success");
  const redirectCounter = document.getElementById("redirect-counter");

  if (password !== confirmPassword) {
    passwordError.textContent =
      "Las contraseñas no coinciden. Por favor, inténtalo de nuevo.";
    return; // Detener el proceso de registro si las contraseñas no coinciden
  }

  // Continuar con el registro si las contraseñas coinciden
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = { email, password };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  registrationSuccess.style.display = "block";
  redirectCounter.style.display = "block";
  redirectUserToLogin(5); // Redirige al usuario después de 5 segundos
}


// Función para redirigir al usuario después de un cierto número de segundos
function redirectUserToLogin(seconds) {
  const redirectCounter = document.getElementById("redirect-counter");
  let countdown = seconds;

  const interval = setInterval(function () {
    countdown -= 1;
    redirectCounter.textContent = `Serás redirigido al inicio de sesión en... ${countdown} segundos`;

    if (countdown === 0) {
      clearInterval(interval); // Detener el contador
      window.location.href = "login.html"; // Redirigir al usuario
    }
  }, 1000);
}


//Cerrar Sesion

function logout() {
  // Elimina la información de la sesión del usuario
  localStorage.removeItem("loggedInUser");
  // Redirige al usuario a la página de inicio de sesión u otra página deseada
  window.location.href = "../index.html";
}

/********* FIN - LOGIN ************/

/***** PANEL DE USUARIO *******/

// Función para agregar casillas de premios
function agregarCasillasDePremios() {
  const cantPremios = parseInt(cantPremiosInput.value, 10);
  const premiosContainer = document.getElementById("premiosContainer");

  // Limpia el contenedor actual
  premiosContainer.innerHTML = "";

  for (let i = 1; i <= cantPremios; i++) {
    const nuevoCampo = document.createElement("div");
    nuevoCampo.className = "mb-3";

    const label = document.createElement("label");
    label.textContent = `Nombre del Premio #${i}:`;
    label.className = "form-label";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";

    nuevoCampo.appendChild(label);
    nuevoCampo.appendChild(input);
    premiosContainer.appendChild(nuevoCampo);
  }
}

// Función para verificar si el usuario está logeado. SIMPRE AL FINAL DEL CODIGO. 
function checkLoggedIn() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    window.location.href = "rifa-user-panel.html";
       
  } else {
    document.getElementById("login-form").style.display = "block";
  }
}

// Verificar si el usuario está logeado al cargar la página. SIMPRE AL FINAL DEL CODIGO. 
checkLoggedIn();


