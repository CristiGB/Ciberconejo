const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const container = document.querySelector(".Main_decifrador"),
texto_original = container.querySelector(".texto_original_cifrado"),
cifrador = container.querySelector("#cifradores"),
rango = container.querySelector("#rango2"),
resultado = container.querySelector(".texto_decifrado"),
DecifrarBtn = container.querySelector("#buttonDC"),
form = container.querySelector(".decifraForm");

var texto_decifrado = "";
let M = 0; 

DecifrarBtn.addEventListener('click', ()=>{
    texto_decifrado = "";
    shifMessage();
});
