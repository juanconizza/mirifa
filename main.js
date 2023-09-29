// CREACIÓN DE LA RIFA POR PARTE DEL USUARIO QUE LUEGO COMPARTIRÁ LA MISMA. FALTA AGREGAR INFORMCIÓN DE PAGO POR MERCADOPAGO UTILIZANDO LA API.

//FUNCION NOMBRE DE LA RIFA

function crearRifa() {
  alert("Bienvenido a MI RIFA, haga click en ACEPTAR para crear tu Rifa");

  let nombreRifa = prompt(
    "Ingrese el nombre de tu institución o nombre a asignarle a su Rifa"
  );
}

//FUNCION PREMIOS A SORTEAR

function premios() {
  let cantPremios = Number(prompt("Ingrese la cantidad de premios a rifar"));

  if (isNaN(cantPremios) || cantPremios <= 0) {
    alert("La cantidad de premios debe ser un número válido mayor que cero.");
    cantPremios = Number(prompt("Ingrese la cantidad de premios a rifar"));
  }

  let baseDeDatosPremios = [];

  for (let i = 1; i <= cantPremios; i++) {
    let nombrePremio = prompt(`Ingrese el nombre del premio #${i}`);
  }

  let valorDeLaRifa = Number(prompt(`Ingrese el valor de la Rifa`));

  if (isNaN(valorDeLaRifa) || valorDeLaRifa <= 0) {
    alert("El valor de la rifa debe ser un número válido mayor que cero.");
    valorDeLaRifa = Number(prompt(`Ingrese el valor de la Rifa`));
  }

  let numerosAEmitir = Number(prompt(`Ingrese la cantidad de Rifas a Emitir`));

  if (isNaN(numerosAEmitir) || numerosAEmitir <= 0) {
    alert("La cantidad de Rifas debe ser un número válido mayor que cero.");
    numerosAEmitir = Number(prompt(`Ingrese la cantidad de Rifas a Emitir`));
  }

  let fechaSorteo = prompt("Ingrese la fecha del sorteo (formato dd/mm/aaaa)");

  let totalARecuadar = numerosAEmitir * valorDeLaRifa;

  alert("Rifa creada exitosamente. ¡Ya puedes salir a vender tu Rifa!");

  alert(
    `Aquí tienes un resumen de la rifa creada para ${crearRifa.nombreRifa}: Premios: ${cantPremios}, Valor de la Rifa $${valorDeLaRifa}, Numeros Emitidos: ${numerosAEmitir}, Fecha del Sorteo: ${fechaSorteo}. El Total a Recaudar Será de: $${totalARecuadar}  ¡Gracias!`
  );

  baseDeDatosPremios.push({
    nombre: nombreRifa,
    valor: valorDeLaRifa,
    cantNumeros: numerosAEmitir,
    fechaSorteo: fechaSorteo,
    aRecaudar: totalARecuadar,
  });
}

crearRifa();
premios();
