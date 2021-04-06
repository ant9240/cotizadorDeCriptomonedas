const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const monedaSeleccionada = document.querySelector('#moneda').value;
const criptoSeleccionada = document.querySelector('#criptomonedas').value;
const critoMonedaOption = document.querySelector('#criptomonedas');

const apiKey = 'afbcebf4aab12758c535c66d5ffec66498aa2cde3fa994176ecb0eea208fadd9';

// Espera a que la pagina cargue por completo para consultar la API
document.addEventListener('DOMContentLoaded', () => {
  consultarCriptomonedas();
})

// Consulta las CriptoMonedas de la API de CryptoCompare
const consultarCriptomonedas = () => {
  const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  fetch(url)
    .then( respusta =>  respusta.json() )
    .then( resultado =>  imprimirResultado(resultado.Data))
}

// Rellena el Option con las criptomonedas Obtenidas de la API
const imprimirResultado = datos => {
  datos.forEach(criptoMoneda => {
    console.log(criptoMoneda.CoinInfo);
    console.log(criptoMoneda.RAW);
  });
}