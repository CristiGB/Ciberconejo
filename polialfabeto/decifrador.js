const container2 = document.querySelector(".Main_decifrador"),
texto_original_cifrado = container2.querySelector(".texto_original_cifrado"),
cifradores = container2.querySelector("#dccifradores"),
resultado_decifrado = container2.querySelector(".texto_decifrado"),
DecifrarBtn = container2.querySelector("#buttonDC"),
claveDC = container2.querySelector(".clave_cifradora"),
formDC = container2.querySelector(".decifraForm");

const alfabetoInvertido = [...alfabeto].reverse();
var i;

DecifrarBtn.addEventListener('click', ()=>{
    i =0;
    texto_decifrado = "";
    texto_original_cifrado.value == "" ? alert("falta texto a cifrar") :
    cifradores.value == "vernam"? MessageBinaryDC() : cifradores.value == "vernam2"? MessageBinaryletxDC() : shifMessageDC();
    
});

const shifMessageDC = () => {
    var texto = texto_original_cifrado.value.replace( /\s+/g, '');
    const wordArrayDC = [...texto.toUpperCase()];
    var texto = claveDC.value.replace( /\s+/g, '');
    const claveArrayDC = [...texto.toUpperCase()];
    const keyDC = SeleccionClave(claveArrayDC,wordArrayDC,cifradores);
    decifrar(0,wordArrayDC,keyDC);
}

const MessageBinaryDC=() =>{
    var texto = texto_original_cifrado.value.replace( /\s+/g, '');
    const wordArrayDC = [...texto];
    var texto = claveDC.value.replace( /\s+/g, '');
    const claveArrayDC = [...texto];
    const NuevoAlfabeto = [...numero,...alfabeto,...minusculas];
    cifrarbinarioDC(0,wordArrayDC,claveArrayDC,matrizBinaria(NuevoAlfabeto),NuevoAlfabeto);
}
const MessageBinaryletxDC=() =>{
    const wordArrayDC = [...texto_original_cifrado.value.toUpperCase()];
    const claveArrayDC = [...claveDC.value.toUpperCase()];
    cifrarbinarioletex(0,wordArrayDC,claveArrayDC,1);
}

function decifrar(indexLetra, cadena,key){
    if(indexLetra == cadena.length) return;
    letraSinCifrar = cadena[indexLetra];
    switch(cifradores.value){
        case 'Vigenere':
            C = alfabeto.indexOf(letraSinCifrar);
            K = alfabeto.indexOf(key[indexLetra]);
            M = (C - K) % alfabeto.length;
            break;
        case 'Autoclave':
            if(indexLetra >= claveDC.value.length){
                var result = Array.from(resultado_decifrado.value);
                K=alfabeto.indexOf(result[i])
                console.log(result)
                i++;
            }else{K = alfabeto.indexOf(key[indexLetra]);}
            C = alfabeto.indexOf(letraSinCifrar);    
            M = (C - K) % alfabeto.length;
            console.log(alfabeto[K])
            break;
        case 'Beafourt':
            C = alfabeto.indexOf(letraSinCifrar);
            K = alfabeto.indexOf(key[indexLetra]);
            M = (K - C) % alfabeto.length;
            break;
        default:
            alert("Seleccione un cifrador");
            return;
        break;
    }

    M < 0 ? texto_decifrado = texto_decifrado + alfabetoInvertido[M*-1-1] : texto_decifrado = texto_decifrado + alfabeto[M];
    resultado_decifrado.innerText = texto_decifrado;
    decifrar(indexLetra + 1, cadena,key);

}

/// EMPIEZA USO BINARIO
function cifrarbinarioDC(indexLetra, cadena,key,Ascci,ArrayAscci){
    if(indexLetra == cadena.length) return;
    letraCifrada = cadena[indexLetra];
    letraClave = key[indexLetra];
    bin = SumaBinaria(letraClave,letraCifrada,Ascci);
    texto_decifrado = texto_decifrado +ArrayAscci[bin];
    resultado_decifrado.innerText = texto_decifrado; 
    cifrarbinarioDC(indexLetra+1,cadena,key,Ascci,ArrayAscci);
}
