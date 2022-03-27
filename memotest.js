let primeraCartaSeleccionada = false;
let cantidadDeCartasParesEncontradas = 0;
let primeraCarta;
const DOS_SEGUNDOS_EN_MS = 2000;
const NUMEROS_PARES_PARA_GANAR = 6;

function activarBotonJugar() {
  $botonJugar.classList.remove("disabled");
};

function habilitarCarta(carta) {
  const nodoPadreDeCarta = carta.parentNode;
  const nodoAbueloDeCarta = nodoPadreDeCarta.parentNode;
  carta.style.pointerEvents = "auto";
  nodoPadreDeCarta.style.pointerEvents = "auto";
  nodoAbueloDeCarta.style.pointerEvents = "auto";
};

function taparCarta(carta) {
  carta.src = "img/reverso-carta.png";
};

function compararCartas(cartaUno, cartaDos) {
  if (cartaUno.alt !== cartaDos.alt) {
    setTimeout(taparCarta, DOS_SEGUNDOS_EN_MS, cartaUno);
    setTimeout(taparCarta, DOS_SEGUNDOS_EN_MS, cartaDos);
    setTimeout(
      mostrarMensaje,
      DOS_SEGUNDOS_EN_MS / 2,
      "Intenta de Nuevo!!!"
    );
    setTimeout(habilitarCarta, DOS_SEGUNDOS_EN_MS, cartaUno);
    setTimeout(habilitarCarta, DOS_SEGUNDOS_EN_MS, cartaDos);
  } else {
    cantidadDeCartasParesEncontradas++;
    setTimeout(
      mostrarMensaje,
      DOS_SEGUNDOS_EN_MS / 2,
      "Muy Bien, has acertado!!!"
    );
  };
  if (NUMEROS_PARES_PARA_GANAR === cantidadDeCartasParesEncontradas) {
    setTimeout(
      mostrarMensaje,
      DOS_SEGUNDOS_EN_MS * 2,
      "Felicitaciones, ganaste el juego!!!"
    );
    setTimeout(activarBotonJugar, DOS_SEGUNDOS_EN_MS * 2);
  };
  setTimeout(activarTocarCartas, DOS_SEGUNDOS_EN_MS);
};

function desactivarTocarCartas() {
    document.querySelectorAll(".card").forEach(function ($carta) {
      $carta.onclick = function () {};
    });
};

function anularCarta(carta) {
    const nodoPadreDeCarta = carta.parentNode;
    const nodoAbueloDeCarta = nodoPadreDeCarta.parentNode;
    carta.style.pointerEvents = "none";
    nodoPadreDeCarta.style.pointerEvents = "none";
    nodoAbueloDeCarta.style.pointerEvents = "none";
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
  const ordenDeLasCartas = [];
  const NUMERO_DE_CARTAS = 12;
  let numero = "";
  while (ordenDeLasCartas.length < NUMERO_DE_CARTAS) {
    numero = Math.floor(Math.random() * NUMERO_DE_CARTAS);
    if (!ordenDeLasCartas.includes(numero)) {
      ordenDeLasCartas.push(numero);
    };
  };
  document.querySelectorAll(".tarjetas").forEach(function ($tarjeta, index) {
    $tarjeta.classList.add(`orden${ordenDeLasCartas[index]}`);
    const tarjeta = $tarjeta.querySelector("div > img");
    tarjeta.src = "img/reverso-carta.png";
  });
};

function mostrarMensaje(mensaje) {
  document.querySelector("#mensajesAlUsuario").textContent = mensaje;
  setTimeout(function () {
    document.querySelector("#mensajesAlUsuario").textContent = "";
  }, DOS_SEGUNDOS_EN_MS);
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
  cantidadDeCartasParesEncontradas = 0;
};

const $botonJugar = document.querySelector("#btn-jugar");
$botonJugar.onclick = function () {
  reiniciarVariables();
  habilitarTodasLasCartas();
  desactivarBotonJugar();
  desarrollarJuego();
  mostrarMensaje("Buen Juego!!!");
};

mostrarMensaje("Bienvenido, que disfrute el juego!!!");
