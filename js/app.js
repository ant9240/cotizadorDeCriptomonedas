const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const monedaSelect = document.querySelector('#moneda');
const criptoSelect = document.querySelector('#criptomonedas');

// Crear Objeto de Busqueda
const objBusqueda = {
  moneda: '',
  criptomoneda: ''
}

// Espera a que la pagina cargue por completo para consultar la API
document.addEventListener('DOMContentLoaded', () => {
  consultarCriptomonedas();

  formulario.addEventListener('submit', submitFormulario);

  criptoSelect.addEventListener('change', leerValor);
  monedaSelect.addEventListener('change', leerValor);
})

// Consulta las CriptoMonedas de la API de CryptoCompare
const consultarCriptomonedas = () => {
  const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
  const apiKey = 'afbcebf4aab12758c535c66d5ffec66498aa2cde3fa994176ecb0eea208fadd9';
  fetch(url)
    .then( respusta =>  respusta.json() )
    .then( resultado =>  rellenarOptionCripto(resultado.Data))
}

// Rellena el Option con las criptomonedas Obtenidas de la API
const rellenarOptionCripto = datos => {
  datos.forEach(criptoMoneda => {
    const {Name, FullName} = criptoMoneda.CoinInfo;

    const option = document.createElement('option')
    option.value = Name;
    option.textContent = FullName;

    criptoSelect.appendChild(option)
  });
}

// Asignar Valores al Objeto de Busqueda
function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
}

// Validar los Datos y Consultar la API
function submitFormulario(e) {
  e.preventDefault();

  // Validar
  const {moneda, criptomoneda} = objBusqueda;

  if (moneda === '' || criptomoneda === '') {
    mostrarAlerta('Ambos Campos Son Obligatorios');
    return;
  }

  // Consultar la API
  consultarAPI();
}

function mostrarAlerta(mensaje) {

  const existeError = document.querySelector('.error')

  if(!existeError) {
    const divMensaje = document.createElement('div');
    divMensaje.innerText = mensaje;
    divMensaje.classList.add('error');

    resultado.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
  
}

function consultarAPI(params) {
  const { moneda, criptomoneda } = objBusqueda;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  mostrarSpinner()
  fetch(url)
    .then( respusta => respusta.json() )
    .then( resultado => {
      mostrarResultado(resultado.DISPLAY[criptomoneda][moneda]) 
    })
}

function mostrarResultado(cotizacion) {
  limpiarHTML()
  const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = cotizacion;

  const precio = document.createElement('p');
  precio.classList.add('precio');
  precio.innerHTML = `El Precio es de <span>${PRICE}</span>`;

  const precioAlto = document.createElement('p');
  precioAlto.innerHTML = `Precio más alto del dia: <span>${HIGHDAY}</span>`

  const precioBajo = document.createElement('p');
  precioBajo.innerHTML = `Precio más bajo del dia: <span>${LOWDAY}</span>`

  const ultimasHoras = document.createElement('p');
  ultimasHoras.innerHTML = `Variación las últimas 24 horas: <span>${CHANGEPCT24HOUR}</span>`

  const ultimaActualizacion = document.createElement('p');
  ultimaActualizacion.innerHTML = `Última Actualización: <span>${LASTUPDATE}</span>`

  resultado.appendChild(precio);
  resultado.appendChild(precioAlto);
  resultado.appendChild(precioBajo);
  resultado.appendChild(ultimasHoras);
  resultado.appendChild(ultimaActualizacion);
}

function limpiarHTML() {
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild)
  }
}

function mostrarSpinner() {
  limpiarHTML();

  const spinner = document.createElement('div');
  spinner.classList.add('spinner');

  spinner.innerHTML = `
  <div class="spinner">
    <div class="cube1"></div>
    <div class="cube2"></div>
  </div>
  `
  resultado.appendChild(spinner)
}