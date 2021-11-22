const container2 = document.querySelector(".Main_decifrador"),
texto_original_cifrado = container2.querySelector(".texto_original_cifrado"),
cifradores = container2.querySelector("#dccifradores"),
resultado_decifrado = container2.querySelector(".texto_decifrado"),
DecifrarBtn = container2.querySelector("#buttonDC"),
formDC = container2.querySelector(".decifraForm");

var texto_decifrado ="";
let M = 0;
const N = alfabeto.length;
const alfabetoInvertido = [...alfabeto].reverse();
console.log(alfabetoInvertido[15])
console.log(alfabetoInvertido)
var a =0,b =0;

DecifrarBtn.addEventListener('click', ()=>{
    texto_decifrado = "";
    shifMessageDC();
});

const shifMessageDC = () => {
    var texto = texto_original_cifrado.value.replace( /\s+/g, '');
    const wordArrayDC = [...texto.toUpperCase()];
    sistema(wordArrayDC);
    decifrar(0,wordArrayDC);
}

function decifrar(indexLetra, cadena){
    if(indexLetra == cadena.length) return;
    letraSinDecifrar = cadena[indexLetra];
    
    switch(cifradores.value){

        case 'A_Fin':
            C = alfabeto.indexOf(letraSinDecifrar);
            M = ( (C - b) * parseInt(inv(a,N))) % N;
            break;
        case 'Des_Puro':
            M = alfabeto.indexOf(letraSinCifrar);
            C = (M + parseInt(rango.value)) % N;
            break;
        default:
            alert("Seleccione un cifrador");
            return;
         break;
    }
    console.log(( (21 - b) * parseInt(inv(a,N))) % N)
    M < 0 ? texto_decifrado = texto_decifrado + alfabetoInvertido[M*-1-1] : texto_decifrado = texto_decifrado + alfabeto[M];
    
    resultado_decifrado.innerText = texto_decifrado;
    decifrar(indexLetra + 1, cadena);
}

function sistema(cadena){
    let Fr1 = 0, Fr2 = 0, c1="",c2="";
    var Frecuent = []
    
    for (var j = 0; j < N; j++){
        if(Frecuent.length > cadena.length) break ;
        frecuencias = [];
        letra = alfabeto[j];
        for(var i = 0; i < cadena.length; i++) {
            
	        if(cadena[i] === letra){ 
                frecuencias.push(i) ;
                Frecuent.push(i);
                
            }

        }
       if( frecuencias.length > Fr1 ){
            Fr1 = frecuencias.length ;
            c1 = letra;
       }
       else{ 
            if(frecuencias.length > Fr2 ){ 
                Fr2 = frecuencias.length ;
                c2 = letra;
                
            }
        }

    } 

     b = alfabeto.indexOf(c1);
     a = (alfabeto.indexOf(c2)-b)*parseInt(inv(4,N)) % N; 
     

}

function inv (a,n) { 
    let matriz =[];
    for(var i = 0 ; i <= N; i++){
        matriz.push([[i],[n*(i)],[a*(i)]]);
        
    }

    for(var i =0 ; i <=N; i++){
        for(var j =0; j <= N; j++){
            
            if(matriz[i][1] == parseInt(matriz[j][2]) + 1 ) return(matriz[j][0]);
        }
    }

}

