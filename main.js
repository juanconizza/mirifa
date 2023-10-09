class Rifa {
  constructor(
    nombre,
    cantPremios,
    premios,
    valorDeLaRifa,
    numerosAEmitir,
    fechaSorteo
  ) {
    this.nombre = nombre;
    this.cantPremios = cantPremios;
    this.premios = premios;
    this.valorDeLaRifa = valorDeLaRifa;
    this.numerosAEmitir = numerosAEmitir;
    this.fechaSorteo = fechaSorteo;
    this.totalARecuadar = numerosAEmitir * valorDeLaRifa;
  }
}

const baseDeDatosRifas = [];

function crearRifa() {
  alert("Bienvenido a MI RIFA, haga click en ACEPTAR para crear tu Rifa");

  let nombreRifa = prompt(
    "Ingrese el nombre de tu institución o nombre a asignarle a su Rifa"
  );

  let cantPremios = Number(prompt("Ingrese la cantidad de premios a rifar"));
  let premios = [];

  while (isNaN(cantPremios) || cantPremios <= 0) {
    alert("La cantidad de premios debe ser un número válido mayor que cero.");
    cantPremios = Number(prompt("Ingrese la cantidad de premios a rifar"));
  }

  for (let i = 1; i <= cantPremios; i++) {
    let nombrePremio = prompt(`Ingrese el nombre del premio #${i}`);
    premios.push(nombrePremio);
  }

  let valorDeLaRifa = Number(prompt(`Ingrese el valor de la Rifa`));

  while (isNaN(valorDeLaRifa) || valorDeLaRifa <= 0) {
    alert("El valor de la rifa debe ser un número válido mayor que cero.");

    valorDeLaRifa = Number(prompt(`Ingrese el valor de la Rifa`));
  }

  let numerosAEmitir = Number(prompt(`Ingrese la cantidad de Rifas a Emitir`));

  while (isNaN(numerosAEmitir) || numerosAEmitir <= 0) {
    alert("La cantidad de Rifas debe ser un número válido mayor que cero.");

    numerosAEmitir = Number(prompt(`Ingrese la cantidad de Rifas a Emitir`));
  }

  let fechaSorteo;
  do {
    fechaSorteo = prompt("Ingrese la fecha del sorteo (formato dd/mm/aaaa)");
    fechaSorteo = validarFecha(fechaSorteo);
    if (!fechaSorteo) {
      alert(
        "La fecha ingresada no es válida. Por favor, utilice el formato dd/mm/aaaa."
      );
    }
  } while (!fechaSorteo);

  // Crear una instancia de la clase Rifa y agregarla al array baseDeDatosRifas
  const nuevaRifa = new Rifa(
    nombreRifa,
    cantPremios,
    premios,
    valorDeLaRifa,
    numerosAEmitir,
    fechaSorteo
  );
  baseDeDatosRifas.push(nuevaRifa);

  alert("Rifa creada exitosamente. ¡Ya puedes salir a vender tu Rifa!");

  alert(
    `Aquí tienes un resumen de la rifa creada para ${nombreRifa}: Premios: ${cantPremios}, Valor de la Rifa $${valorDeLaRifa}, Numeros Emitidos: ${numerosAEmitir}, Fecha del Sorteo: ${fechaSorteo}. El Total a Recaudar Será de: $${nuevaRifa.totalARecuadar}  ¡Gracias!`
  );
}

// ***** FUNCION VALIDADORA DE FECHA *****

function validarFecha(fecha) {
  // Expresión regular para validar el formato de fecha dd/mm/aaaa
  const formatoValido = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!fecha.match(formatoValido)) {
    return null; // La fecha no tiene el formato correcto
  }

  const partesFecha = fecha.split("/");
  const dia = parseInt(partesFecha[0], 10);
  const mes = parseInt(partesFecha[1], 10);
  const anio = parseInt(partesFecha[2], 10);

  // Verificar que la fecha sea válida
  if (isNaN(dia) || isNaN(mes) || isNaN(anio)) {
    return null; // Alguna parte de la fecha no es un número válido
  }

  // Verificar rangos de día, mes y año
  if (dia < 1 || dia > 31 || mes < 1 || mes > 12) {
    return null; // Día o mes fuera de rango
  }

  if (anio < 2023 || anio > 2040) {
    return null; // Año fuera de rango
  }

  // Formatear la fecha como "dd/mm/aaaa" y devolverla
  return `${dia}/${mes}/${anio}`;
}

// Ejecutar la creación de rifas. Llamamos para Crear 2 Rifas
crearRifa();
crearRifa(); 

// PARTICIPAR EN LAS RIFAS ///

// Array para almacenar a los participantes y la rifa a la que pertenecen
const participantes = [];

// Función para que el participante elija una rifa y se registre
function participar() {
  // Verificar si hay rifas disponibles
  if (baseDeDatosRifas.length === 0) {
    alert("No hay rifas disponibles para participar");
    return;
  }

  // Mostrar las opciones de rifas disponibles
  let opcionesRifas = "Elige una rifa para participar. UTILICE EL NUMERO CORRESPONDIENTE AL TITULO DE LA RIFA \n";
  for (let i = 0; i < baseDeDatosRifas.length; i++) {
    opcionesRifas += `${i + 1}. ${baseDeDatosRifas[i].nombre}\n`;
  }

  let eleccion = prompt(opcionesRifas);
  eleccion = parseInt(eleccion);

  // Verificar si la elección es válida
  while (isNaN(eleccion) || eleccion < 1 || eleccion > baseDeDatosRifas.length) {
    alert("La elección no es válida. Debes seleccionar una rifa existente.");
    eleccion = prompt(opcionesRifas);
    eleccion = parseInt(eleccion);
  }

  // Obtener la rifa elegida
  const rifaElegida = baseDeDatosRifas[eleccion - 1];

  // Solicitar información al participante
  let nombre = prompt("Ingrese su nombre:");
  let apellido = prompt("Ingrese su apellido:");
  let dni = prompt("Ingrese su DNI:");
  let telefono = prompt("Ingrese su número de teléfono:");

  // Agregar al participante al array de participantes
  participantes.push({
    nombre,
    apellido,
    dni,
    telefono,
    rifa: rifaElegida.nombre, // Asociar al participante con la rifa elegida
  });

  // Mostrar un mensaje de agradecimiento
  alert("Gracias por participar, mucha suerte!");
}

// Ejecutar la función para que el participante elija y se registre
participar();
participar();
participar();


// Función para mostrar las rifas disponibles y realizar un sorteo
function realizarSorteo() {
  // Verificar si hay rifas disponibles
  if (baseDeDatosRifas.length === 0) {
    alert("No hay rifas disponibles para sortear.");
    return;
  }

  // Mostrar las opciones de rifas disponibles
  let opcionesRifas = "Selecciona una rifa para realizar el sorteo:\n";
  for (let i = 0; i < baseDeDatosRifas.length; i++) {
    opcionesRifas += `${i + 1}. ${baseDeDatosRifas[i].nombre}\n`;
  }

  let eleccion = prompt(opcionesRifas);
  eleccion = parseInt(eleccion);

  // Verificar si la elección es válida
  while (isNaN(eleccion) || eleccion < 1 || eleccion > baseDeDatosRifas.length) {
    alert("La elección no es válida. Debes seleccionar una rifa existente.");
    eleccion = prompt(opcionesRifas);
    eleccion = parseInt(eleccion);
  }

  // Obtener la rifa elegida
  const rifaElegida = baseDeDatosRifas[eleccion - 1];

  // Realizar el sorteo de la rifa elegida
  sortearRifa(rifaElegida.nombre);
}

// Llamar a la función para mostrar las rifas disponibles y realizar un sorteo
realizarSorteo();



// Función para realizar el sorteo de una rifa específica
function sortearRifa(nombreRifa) {
  // Encontrar la rifa en baseDeDatosRifas
  const rifa = baseDeDatosRifas.find((rifa) => rifa.nombre === nombreRifa);

  if (!rifa) {
    alert("No se encontró la rifa especificada.");
    return;
  }

  // Obtener la lista de participantes para esta rifa
  const participantesRifa = participantes.filter((participante) => participante.rifa === nombreRifa);

  if (participantesRifa.length === 0) {
    alert("No hay participantes para esta rifa.");
    return;
  }

  // Realizar el sorteo aleatorio
  const ganadorIndex = Math.floor(Math.random() * participantesRifa.length);
  const ganador = participantesRifa[ganadorIndex];

  // Mostrar al ganador en un alert
  alert(`¡El ganador de la rifa "${nombreRifa}" es: ${ganador.nombre} ${ganador.apellido}!`);
}

// Ejemplo de cómo realizar el sorteo de una rifa específica (reemplaza "Nombre de la Rifa" con el nombre de la rifa que quieras sortear)

sortearRifa(rifaElegida.nombre);





