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

//CARGO ESTE DOMCONTENTLOADED al comienzo ya que de otra forma no funciona en el panel de usuario ///

let cantPremiosInput;

document.addEventListener("DOMContentLoaded", function () {
  //VALIDAMOS SI EL USUARIO ESTÁ LOGEADO O NO///
  function checkLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      window.location.href = "../pages/rifa-user-panel.html";
    } else {
      window.location.href = "../pages/login.html";
    }
  }

  const botonInicioSession = document.getElementById("botonInicioSession");

  if (botonInicioSession) {
    botonInicioSession.addEventListener("click", function (event) {
      event.preventDefault(); // Para evitar que el enlace redireccione inmediatamente

      checkLoggedIn(); // Llamar a la función checkLoggedIn al hacer clic en el enlace
    });
  }

  cantPremiosInput = document.getElementById("cantPremios");
  document.getElementById("crearRifa").addEventListener("click", crearRifa);

  if (cantPremiosInput) {
    cantPremiosInput.addEventListener("input", agregarCasillasDePremios);
  }

  //Función para validad si hay rifas creadas o no en el login
  function validarRifas() {
    const rifas = JSON.parse(localStorage.getItem("rifas")) || [];

    if (!rifas.length) {
      // No hay rifas almacenadas
      document.querySelector("#noRifasContainer").innerHTML = `
    <section class="inner-page">
      <div class="container text-center">
        <h1>No hay Rifas Creadas</h1>
        <p>Parece que no se ha creado ninguna rifa hasta el momento.</p>
        <button class="btn-get-started" onclick="abrirFormulario()">Crear Rifa</button>
    </section>
  `;
      document.querySelector("#crearRifaForm").style.display = "none";
    } else {
      mostrarRifas();
    }
  }
  validarRifas();
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

//Cerrar Sesion//

function logout() {
  // Elimina la información de la sesión del usuario
  localStorage.removeItem("loggedInUser");
  let timerInterval;
  Swal.fire({
    title: "Cerraste la Sesión",
    html: "Saliendo en... <b></b> segundos.",
    timer: 3000, 
    timerProgressBar: true,
    icon: `success`,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0); 
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    
    if (result.dismiss === Swal.DismissReason.timer) {
      // Redirige al usuario a la página de inicio de sesión u otra página deseada
      window.location.href = "../index.html";
    }
  });
}


/********* FIN - LOGIN ************/

//////////////////////////////////
/////////////////////////////////

/***** PANEL DE USUARIO *******/

//FUNCION VALIDADORA SI HAY RIFAS O NO CREADAS

function validarRifas() {
  const rifas = JSON.parse(localStorage.getItem("rifas")) || [];

  if (!rifas.length) {
    // No hay rifas almacenadas
    document.querySelector("#noRifasContainer").innerHTML = `
      <section class="inner-page">
        <div class="container text-center">
          <h1>No hay Rifas Creadas</h1>
          <p>Parece que no se ha creado ninguna rifa hasta el momento.</p>
          <button class="btn-get-started" onclick="abrirFormulario()">Crear Rifa</button>
      </section>
    `;
    document.querySelector("#crearRifaForm").style.display = "none";
  } else {
    mostrarRifas();
  }
}

// Función para abrir formulario de nueva rifa.
function abrirFormulario() {
  // Mostrar el formulario de creación de rifas
  document.querySelector("#crearRifaForm").style.display = "block";
  document.querySelector("#noRifasContainer").style.display = "none";
  document.querySelector("#nuevaRifaBoton").style.display = "none";
  document.querySelector("#creaRifaTitle").classList.add("mt-5");
}

// Función para agregar casillas de premios al formulario de nueva rifa //

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

// ***** FUNCION VALIDADORA DE FECHA *****

// Función para validar el formato de la fecha y que sea mayor que la fecha actual
function validarFecha() {
  const fechaInput = document.getElementById("fechaSorteo");
  const fechaSorteoError = document.getElementById("fechaSorteoError");
  const fechaRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  const match = fechaInput.value.match(fechaRegex);
  if (!match) {
    fechaSorteoError.textContent = "El formato de la fecha debe ser dd/mm/aaaa";
    fechaSorteoError.style.color = "red";
    fechaInput.focus();
    return false;
  }

  const dia = parseInt(match[1], 10);
  const mes = parseInt(match[2], 10) - 1; // Restamos 1 al mes porque los meses en JavaScript van de 0 a 11
  const anio = parseInt(match[3], 10);

  const fechaIngresada = new Date(anio, mes, dia);
  const fechaActual = new Date();

  if (fechaIngresada <= fechaActual) {
    fechaSorteoError.textContent =
      "La fecha del sorteo debe ser mayor que la fecha actual.";
    fechaSorteoError.style.color = "red";
    fechaInput.focus();
    return false;
  }

  fechaSorteoError.textContent = "";
  return true;
}

document.getElementById("crearRifa").addEventListener("click", crearRifa);

// ***** FIN FUNCION VALIDADORA DE FECHA *****///

// ***** FUNCION CREAR RIFAS CON ID DINAMICO USANDO FETCH DE API ******////

async function obtenerIdDinamico() {
  try {
    const response = await fetch("https://www.uuidgenerator.net/api/version1");
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error al obtener el ID:", error);
    return null;
  }
}

async function crearRifa() {
  if (validarFecha()) {
    const nombreRifa = document.getElementById("nombreRifa").value;
    const cantPremios = parseInt(cantPremiosInput.value, 10);
    const valorDeLaRifa = document.getElementById("valorDeLaRifa").value;
    const numerosAEmitir = document.getElementById("numerosAEmitir").value;
    const fechaSorteo = document.getElementById("fechaSorteo").value;

    //Creamos un array de premios
    const premios = [];
    const premiosInputs = document.querySelectorAll("#premiosContainer input");
    premiosInputs.forEach((input) => {
      premios.push(input.value);
    });

    // Obtener el ID dinámico de la API
    const idDinamico = await obtenerIdDinamico();

    if (idDinamico !== null) {
      const rifa = {
        id: idDinamico,
        nombre: nombreRifa,
        cantidadPremios: cantPremios,
        valor: valorDeLaRifa,
        cantidadNumeros: numerosAEmitir,
        fechaSorteo: fechaSorteo,
        premios: premios,
        participantes: [],
      };

      let rifas = JSON.parse(localStorage.getItem("rifas")) || [];
      rifas.push(rifa);
      localStorage.setItem("rifas", JSON.stringify(rifas));

      mostrarRifas();
    }
  }
}

// Limpia el formulario al crear una nueva rifa //

document.getElementById("rifaForm").reset();

// FUNCION MOSTRAR RIFAS CREADAS EN EL DOM //

function mostrarRifas() {
  const rifasContainer = document.getElementById("rifasContainer");
  rifasContainer.innerHTML = "";

  const rifas = JSON.parse(localStorage.getItem("rifas")) || [];

  const newRifaButton = document.createElement("div");
  newRifaButton.className =
    "d-flex justify-content-center align-items-center mt-4";
  newRifaButton.innerHTML = `
    <button id=nuevaRifaBoton class="btn-get-started" onclick="abrirFormulario()">Nueva Rifa</button>
  `;

  rifasContainer.appendChild(newRifaButton);

  //FUNCION PARA CONTAR LOS PARTICIPANTES Y MOSTRAR EN RESUMEN DE RIFA //

  function contarParticipantes(idRifa, nombreRifa) {
    // Obtener las rifas desde el localStorage
    const rifas = JSON.parse(localStorage.getItem("rifas")) || [];

    // Encontrar la rifa correspondiente por ID y nombre
    const rifaActual = rifas.find(
      (rifa) => rifa.id === idRifa && rifa.nombre === nombreRifa
    );

    // Verificar si la rifa fue encontrada
    if (rifaActual) {
      // Obtener la cantidad de participantes
      const cantidadParticipantes = rifaActual.participantes.length;

      return cantidadParticipantes;
    }

    return 0; // Retornar 0 si no se encontró la rifa
  }

  rifas.forEach((rifa, index) => {
    const rifaDiv = document.createElement("div");
    rifaDiv.className =
      "rifa col-lg-4 col-md-6 col-sm-12 border border-dark m-4";
    rifaDiv.innerHTML = `
       
            <h2 class="card-header text-center">${rifa.nombre}</h2>
            <div class="card-body m-3">
              <p><span class="fw-bold">Cantidad de Premios:</span> ${
                rifa.cantidadPremios
              }</p>
              <p><span class="fw-bold">Cantidad de Rifas Emitidas:</span> ${
                rifa.cantidadNumeros
              }</p>
              <p><span class="fw-bold">Participantes:</span> ${contarParticipantes(
                rifa.id,
                rifa.nombre
              )}</p>
              <p><span class="fw-bold">Valor de la Rifa:</span> $${
                rifa.valor
              }</p>
              <p><span class="fw-bold">Fecha del Sorteo:</span> ${
                rifa.fechaSorteo
              }</p>
              <p class="fw-bold">Premios:</p>
              <ul>
                    ${rifa.premios
                      .map(
                        (premio, i) => `<li>Premio #${i + 1}: ${premio}</li>`
                      )
                      .join("")}
              </ul>
            </div>
            <div class="card-footer text-center m-2">
              <button class="btn btn-warning m-1" onclick="eliminarRifa(${index})">Eliminar</button>
              <button class="btn btn-primary m-1" onclick="compartirRifa('${
                rifa.nombre
              }')">Compartir</button>
              <button class="btn btn-success m1-1" onclick="sortearRifa(${index})">Sortear</button>
            </div>
          
    `;

    rifasContainer.appendChild(rifaDiv);
    document.querySelector("#crearRifaForm").style.display = "none";
  });
}

// Función para eliminar una rifa

function eliminarRifa(index) {
  let rifas = JSON.parse(localStorage.getItem("rifas")) || [];
  rifas.splice(index, 1);
  localStorage.setItem("rifas", JSON.stringify(rifas));

  validarRifas();
  location.reload();
}

// FUNCION COMPARTIR RIFA: Si hizo así sino generaba un error con el DOM y no cargaba la rifa dinamicamente //

function compartirRifa(nombreRifa) {
  // Guardar el nombre de la rifa selecionada en el local storage
  localStorage.setItem("nombreRifaSeleccionada", nombreRifa);
  window.open("participar.html", "width=500,height=500"); //SE ABRE VENTANA PARA QUE SEA MAS FACIL SIMULAR PARTICIPANTES
}

//FUNCION DE COMPRAR RIFA DINAMICA //

function rifaDinamica() {
  const nombreRifa = localStorage.getItem("nombreRifaSeleccionada");
  const formularioParticipar = document.querySelector("#formularioParticipar");
  const participarDiv = document.createElement("div");
  participarDiv.innerHTML = `


  <div class="row mt-4"> 
<h1 class="text-center col-lg-12 container">Comprá tu Rifa de ${nombreRifa}</h1>
<p class="text-center col-12">Completá tus datos para participar y realizar el pago</p>

<form class=" text-center container col-lg-3 col-md-8 col-sm-12" action="/participar" method="post">
<div class="form-group">
<label class="mb-2 mt-2" for="nombre">Nombre</label>
<input type="text" class="form-control" id="nombre" name="nombre" required>
</div>
<div class="form-group">
<label class="mb-2 mt-2" for="apellido">Apellido</label>
<input type="text" class="form-control" id="apellido" name="apellido" required>
</div>
<div class="form-group">
<label class="mb-2 mt-2" for="dni">DNI</label>
<input type="text" class="form-control" id="dni" name="dni" required>
</div>
<div class="form-group">
<label class="mb-2 mt-2" for="telefono">Teléfono</label>
<input type="text" class="form-control" id="telefono" name="telefono" required>
</div>
<div class="form-group">
<label class="mb-2 mt-2" for="email">Email</label>
<input type="email" class="form-control" id="email" name="email" required>
</div>
<div class="form-group">
<label class="mb-2 mt-2" for="cantidadRifas">Seleccione la Cantidad de Rifas a Comprar</label>
<select class="form-control" id="cantidadRifas" name="cantidadRifas" required>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
</select>
<button type="submit" class="btn-get-started mt-4">Comprar</button>
</form>
</div>
`;
  formularioParticipar.appendChild(participarDiv);

  //ENVIAMOS LO RELLENADO EN EL FORMULARIO AL LOCAL STORAGE //

  formularioParticipar.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const cantidadRifas = document.getElementById("cantidadRifas").value;

    // Recuperar las rifas desde el localStorage
    const rifas = JSON.parse(localStorage.getItem("rifas")) || [];

    // Encontrar la rifa correspondiente por nombre
    const rifaActual = rifas.find((rifa) => rifa.nombre === nombreRifa);

    // Verificar si la rifa fue encontrada
    if (rifaActual) {
      // Crear participante
      const participante = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        telefono: telefono,
        email: email,
        cantidadRifas: cantidadRifas,
      };

      // Agregar participante a la rifa según la cantidad de rifas compradas
      for (let i = 0; i < cantidadRifas; i++) {
        rifaActual.participantes.push(participante);
      }

      // Actualizar la rifa en el arreglo de rifas
      const rifaIndex = rifas.indexOf(rifaActual);
      rifas[rifaIndex] = rifaActual;

      // Guardar las rifas actualizadas en el localStorage
      localStorage.setItem("rifas", JSON.stringify(rifas));

      Swal.fire({
        title: "¡Gracias por Participar!",
        text: "Si ganaste serás notificado vía Email",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      }).then(() => {
        window.location.href = "../index.html";
      });
    }
  });
}

/***** FIN PANEL DE USUARIO ********************/

/********/ // FUNCION SORTEAR RIFA ////*********

async function sortearRifa(index) {
  // Obtener las rifas desde el localStorage
  const rifas = JSON.parse(localStorage.getItem("rifas")) || [];

  // Encontrar la rifa correspondiente por índice
  const rifaSeleccionada = rifas[index];

  // Verificar si la rifa fue encontrada
  if (rifaSeleccionada) {
    const cantidadParticipantes = rifaSeleccionada.participantes.length;

    if (cantidadParticipantes === 0) {
      Swal.fire({
        title: "¡No hay participantes!",
        text: "No hay participantes registrados en esta rifa para realizar el sorteo.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Obtener un número aleatorio utilizando una API externa
    try {
      const randomNumberResponse = await fetch(
        `https://www.random.org/integers/?num=1&min=1&max=${cantidadParticipantes}&col=1&base=10&format=plain&rnd=new`
      );
      const randomNumber = await randomNumberResponse.text();

      const indiceGanador = parseInt(randomNumber.trim(), 10) - 1; // Restamos 1 porque los índices comienzan desde 0

      const participanteGanador = rifaSeleccionada.participantes[indiceGanador];

      let timerInterval;

      Swal.fire({
        title: "EL GANADOR ES...",
        html: " <b></b> ",
        timer: 10000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${(Swal.getTimerLeft() / 1000).toFixed(0)}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);

          Swal.fire({
            title: "¡Sorteo realizado!",
            html: `<p>El ganador es:</p><p><strong>${participanteGanador.nombre} ${participanteGanador.apellido}</strong></p>`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        },
      });
    } catch (error) {
      console.error("Error al obtener el número aleatorio:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al realizar el sorteo. Inténtalo nuevamente.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }
  } else {
    Swal.fire({
      title: "¡Rifa no encontrada!",
      text: "La rifa seleccionada no pudo ser encontrada.",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });
  }
}


checkLoggedIn();
