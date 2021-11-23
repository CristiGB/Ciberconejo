const Estadisticas =["E","S","O","I","N","R","D","T", "C","L","U","M"];
const container2 = document.querySelector(".Main_decifrador"),
texto_original_cifrado = container2.querySelector(".texto_original_cifrado"),
cifradores = container2.querySelector("#dccifradores"),
resultado_decifrado = container2.querySelector(".texto_decifrado"),
DecifrarBtn = container2.querySelector("#buttonDC"),
NextBtn = container2.querySelector("#buttonDC_next"),
formDC = container2.querySelector(".decifraForm");

var texto_decifrado ="";
var M = 0;
var a =0,b =0;
const N = alfabeto.length;
const alfabetoInvertido = [...alfabeto].reverse();
var MisFrecuencias;
var estado = 0, intentos =0;

DecifrarBtn.addEventListener('click', ()=>{
    estado =0;
    intentos=0;
    texto_decifrado = "";
    shifMessageDC();

});
NextBtn.addEventListener('click', ()=>{
    texto_decifrado = "";
    IntentarNuevamente();
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
            C = alfabeto.indexOf(letraSinDecifrar);
            M = (C - b) % N;
            break;
        default:
            alert("Seleccione un cifrador");
            return;
         break;
    }

    M < 0 ? texto_decifrado = texto_decifrado + alfabetoInvertido[M*-1-1] : texto_decifrado = texto_decifrado + alfabeto[M];
    resultado_decifrado.innerText = texto_decifrado;
    decifrar(indexLetra + 1, cadena);
}

function sistema(cadena){
    
    var Frecuent = [];
    MisFrecuencias=[];
    for (var j = 0; j < N; j++){
        frecuencias = [];
        if(Frecuent.length > cadena.length) break ;
        letra = alfabeto[j];
        for(var i = 0; i < cadena.length; i++) {
            
	        if(cadena[i] === letra){ 
                frecuencias.push(i) ;
                Frecuent.push(i); 
            }

        }
        if( frecuencias.length > 0) {
            MisFrecuencias.push({frecuencia:parseInt(frecuencias.length), letra:letra});
            
        }

    } 

    MisFrecuencias.sort((a, b) => {
        let keyA = a.frecuencia ;
        let keyB = b.frecuencia ;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;}).reverse();

    frecuencias = [];
    i =0;
    console.log(MisFrecuencias)
    switch(cifradores.value){

        case 'A_Fin':
            do{ 
                if(i > 2 ) break;    
                    b = alfabeto.indexOf(MisFrecuencias[estado].letra);
                    a = (alfabeto.indexOf(MisFrecuencias[estado+1].letra)-b)*parseInt(inv(alfabeto.indexOf(Estadisticas[0]),N)) % N;
                    console.log(MisFrecuencias[estado].letra)
                    console.log(estado)
                    estado++; 
            }while(mcd(a,N)!=1 || a < 0 || b < 0)
            break;
        case 'Des_Puro':  
                do{
                b = alfabeto.indexOf(MisFrecuencias[estado].letra) - alfabeto.indexOf(Estadisticas[0]) ;
                console.log(MisFrecuencias[estado].letra)
                console.log(b)
                estado++;
                }while( b < 0);
            break;
        default:
            alert("Seleccione un cifrador");
            return;
         break;
    }
     

}

const IntentarNuevamente=()=>{
    switch(cifradores.value){

        case 'A_Fin':
            if(intentos > Estadisticas.length) alert("No mas intentos"); else{ 
            do{ 
                if(estado + 2 > MisFrecuencias.length ) { 
                    estado=0;
                    intentos > Estadisticas.length? Break : intentos++;
                } 
                mcd(alfabeto.indexOf(Estadisticas[intentos]),N) !=1 ? intentos++:      
                b = alfabeto.indexOf(MisFrecuencias[estado].letra);
                alfabeto.indexOf(Estadisticas[intentos]) == 3 ? intentos ++:
                a = (alfabeto.indexOf(MisFrecuencias[estado+1].letra)-b)*parseInt(inv(alfabeto.indexOf(Estadisticas[intentos]),N)) % N;
                console.log(alfabeto.indexOf(Estadisticas[intentos]))
                estado++; 
                    //console.log(alfabeto.indexOf(MisFrecuencias[estado+1].letra))
            }while(mcd(a,N)!=1 || a < 0 );
        }
            break;

        case 'Des_Puro':  
        do{
            estado++;
            b = alfabeto.indexOf(MisFrecuencias[estado].letra) - alfabeto.indexOf(Estadisticas[0]) ; 
            console.log(estado)   
         }while( b < 0);
            break;
        default:
            alert("Seleccione un cifrador");
            return;
         break;
    }
    

     var texto = texto_original_cifrado.value.replace( /\s+/g, '');
     const wordArrayDC = [...texto.toUpperCase()];
     decifrar(0,wordArrayDC);
}


function inv (a,n) { 
    let matriz =[];
    for(var i = 0 ; i <= N; i++){
        matriz.push([[i],[n*(i)],[a*(i)]]);
        
    }

    for(var i =0 ; i <=N; i++){
        for(var j =0; j <= N; j++){       
            if(parseInt(matriz[i][1]) + 1  == parseInt(matriz[j][2]) ) return(matriz[j][0]);
        }
    }

}


const mcd = (A, B) => {
    if (B === 0) return A;
    return mcd(B, A % B);
};



