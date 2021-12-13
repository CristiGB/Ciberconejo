const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const container = document.querySelector(".Main_cifrador"),
texto_original = container.querySelector(".texto_original"),
cifrador = container.querySelector("#cifradores"),
rango = container.querySelector("#rangoC"),
resultado = container.querySelector(".texto_cifrado"),
decimaC = container.querySelector(".decimador_cifrador"),
CifrarBtn = container.querySelector("#button"),
form = container.querySelector(".cifraForm");

var texto_cifrado ="";
let C = 0; 

CifrarBtn.addEventListener('click', ()=>{
    texto_cifrado = "";
    shifMessage();
});

const shifMessage = () => {
    var texto = texto_original.value.replace( /\s+/g, '');
    const wordArrayC = [...texto.toUpperCase()];
    cifrar(0,wordArrayC);
}

function cifrar(indexLetra, cadena){
    if(indexLetra == cadena.length) return;
    letraSinCifrar = cadena[indexLetra];
    switch(cifrador.value){
        case 'A_Fin':
            M = alfabeto.indexOf(letraSinCifrar);
            C = (decimaC.value*M + parseInt(rango.value)) % alfabeto.length;
            break;
        case 'Des_Puro':
            M = alfabeto.indexOf(letraSinCifrar);
            C = (M + parseInt(rango.value)) % alfabeto.length;
            break;
        default:
            alert("Seleccione un cifrador");
            return;
        break;
    }

    texto_cifrado = texto_cifrado + alfabeto[C];
    resultado.innerText = texto_cifrado;
    cifrar(indexLetra + 1, cadena);
}





