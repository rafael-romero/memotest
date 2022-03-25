let primeraCartaSeleccionada = false;
let cantidadDeCartasPares = 0;
let primeraCarta;
const DOS_SEGUNDOS = 2000;

function activarBotonJugar() {
  $botonJugar.classList.remove("disabled");
};

function habilitarCarta(carta) {
  const padre = carta.parentNode;
  const abuelo = padre.parentNode;
  carta.style.pointerEvents = "auto";
  padre.style.pointerEvents = "auto";
  abuelo.style.pointerEvents = "auto";
};

function taparCartas(carta) {
  carta.src = "img/reverso-carta.png";
};

function compararCartas(cartaUno, cartaDos) {
  if (cartaUno.alt !== cartaDos.alt) {
    setTimeout(taparCartas, DOS_SEGUNDOS, cartaUno);
    setTimeout(taparCartas, DOS_SEGUNDOS, cartaDos);
    setTimeout(
      mostrarMensajePorPantalla,
      DOS_SEGUNDOS / 2,
      "Intenta de Nuevo!!!"
    );
    setTimeout(habilitarCarta, DOS_SEGUNDOS, cartaUno);
    setTimeout(habilitarCarta, DOS_SEGUNDOS, cartaDos);
  } else {
    cantidadDeCartasPares++;
    setTimeout(
      mostrarMensajePorPantalla,
      DOS_SEGUNDOS / 2,
      "Muy Bien, as acertado!!!"
    );
  };
  if (6 === cantidadDeCartasPares) {
    setTimeout(
      mostrarMensajePorPantalla,
      DOS_SEGUNDOS * 2,
      "Felicitaciones, ganaste el juego!!!"
    );
    setTimeout(activarBotonJugar, DOS_SEGUNDOS * 2);
  };
  setTimeout(activarTocarCartas, DOS_SEGUNDOS);
};

function desactivarTocarCartas() {
    document.querySelectorAll(".card").forEach(function ($carta) {
      $carta.onclick = function () {};
    });
};

function anularCarta(carta) {
    const padre = carta.parentNode;
    const abuelo = padre.parentNode;
    carta.style.pointerEvents = "none";
    padre.style.pointerEvents = "none";
    abuelo.style.pointerEvents = "none";
};

function mostrarCarta(carta) {
  const nombreDeLaCarta = carta.alt;
  carta.src = `img/${nombreDeLaCarta}.png`;
};

function seleccionarCarta(e) {
  const $carta = e.target;
  mostrarCarta($carta);
  if (false === primeraCartaSeleccionada) {
    primeraCartaSeleccionada = true;
    primeraCarta = $carta;
    anularCarta($carta);
  } else {
    anularCarta($carta);
    desactivarTocarCartas();
    compararCartas(primeraCarta, $carta);
    primeraCartaSeleccionada = false;
  };
};

function activarTocarCartas() {
  document.querySelectorAll(".card").forEach(function ($carta) {
    $carta.onclick = seleccionarCarta;
  });
};

function mezclarCartasAleatoriamente() {
  const ordenCartas = [];
  const NUMERO_DE_CARTAS = 12;
  let numero = "";
  while (ordenCartas.length < NUMERO_DE_CARTAS) {
    numero = Math.floor(Math.random() * NUMERO_DE_CARTAS);
    if (!ordenCartas.includes(numero)) {
      ordenCartas.push(numero);
    };
  };
  document.querySelectorAll(".tarjetas").forEach(function ($tarjeta, index) {
    $tarjeta.classList.add(`orden${ordenCartas[index]}`);
    const tarjeta = $tarjeta.querySelector("div > img");
    tarjeta.src = "img/reverso-carta.png";
  });
};

function mostrarMensajePorPantalla(mensaje) {
  document.querySelector("#mensajesAlUsuario").textContent = mensaje;
  setTimeout(function () {
    document.querySelector("#mensajesAlUsuario").textContent = "";
  }, DOS_SEGUNDOS);
};

function desarrollarJuego() {
  mezclarCartasAleatoriamente();
  activarTocarCartas();
};

function desactivarBotonJugar() {
  $botonJugar.classList.add("disabled");
};

function habilitarTodasLasCartas() {
  document.querySelectorAll("img").forEach(function ($carta) {
    habilitarCarta($carta);
  });
};

function reiniciarVariables() {
  primeraCartaSeleccionada = false;
  cantidadDeCartasPares = 0;
};

const $botonJugar = document.querySelector("#btn-jugar");
$botonJugar.onclick = function () {
  reiniciarVariables();
  habilitarTodasLasCartas();
  desactivarBotonJugar();
  desarrollarJuego();
  mostrarMensajePorPantalla("Buen Juego!!!");
};

mostrarMensajePorPantalla("Bienvenido, que disfrute el juego!!!");
