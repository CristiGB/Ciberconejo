const Estadisticas =["E","A","S","O","I","N","R","D","T", "C","L","U","M","P","G","B","F","V","Y","Q","H","Z","J","X","W","K","Ñ"];
const container2 = document.querySelector(".Main_decifrador"),
texto_original_cifrado = container2.querySelector(".texto_original_cifrado"),
cifradores = container2.querySelector("#dccifradores"),
resultado_decifrado = container2.querySelector(".texto_decifrado"),
DecifrarBtn = container2.querySelector("#buttonDC"),
NextBtn = container2.querySelector("#buttonDC_next"),
NextEsafinBtn = container2.querySelector("#buttonDC_next_esafin"),
formDC = container2.querySelector(".decifraForm");

var texto_decifrado ="";
var M = 0;
var a =0,b =0;
const N = alfabeto.length;
const alfabetoInvertido = [...alfabeto].reverse();
var MisFrecuencias;
var estado, intentos,i,w;

DecifrarBtn.addEventListener('click', ()=>{
    estado =0,intentos=0, w=0, i=0;
    texto_decifrado = "";
    shifMessageDC();

});

NextBtn.addEventListener('click', ()=>{
    texto_decifrado = "";
    IntentarNuevamente();
});
NextEsafinBtn.addEventListener('click', ()=>{
    texto_decifrado = "";
    IntentarNuevamente_EsAfin();
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
    console.log(MisFrecuencias)
    switch(cifradores.value){

        case 'A_Fin':
            
            do{    
                
                if( i + 1 > MisFrecuencias.length) {
                    i=0;
                    estado++;
                }
                if(estado + 1 > MisFrecuencias.length ) {w++;estado=0;}
                    while ((alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w])) <= 0 ){
                        w++;
                    }
                    a = (alfabeto.indexOf(MisFrecuencias[i].letra)-alfabeto.indexOf(MisFrecuencias[estado].letra))*parseInt(inv(alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w]),N)) % N;
                    b = alfabeto.indexOf(MisFrecuencias[estado].letra)-a*alfabeto.indexOf(Estadisticas[w]) % N;
                    console.log(MisFrecuencias[estado].letra)
                    console.log(w)
                    console.log(alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w]))
                    console.log(b)
                    console.log(a)
                    i++; 
            }while(mcd(a,N)!=1 || a < 0 || b < 0)
            break;
        case 'Des_Puro':  
                do{
                b = (alfabeto.indexOf(MisFrecuencias[estado].letra) - alfabeto.indexOf(Estadisticas[0])) % N;
                console.log(alfabeto.indexOf(MisFrecuencias[estado].letra))
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
            
            if(estado + 1 >= MisFrecuencias.length) alert("No mas intentos"); else{ 
            do{ 
                
                
                if(w + 1 > Estadisticas.length) { 
                    w=0;
                    intentos++;
                }
                if(intentos + 1 > Estadisticas.length ) {i++;intentos=0;}

                if( i + 1 > MisFrecuencias.length) {
                    i=0;
                    if( estado + 1> MisFrecuencias.length ) Break; else estado++;
                }

                
                
                while ((alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w])) <= 0 || mcd(Math.abs(alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w])),N) !=1 || (alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w])) == 3 ) {
                    w++;
                    console.log(alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w]))
                    if(w + 1 > MisFrecuencias.length) { 
                        w=0;
                        intentos++;
                        if(intentos + 1 > Estadisticas.length ) {i++;intentos=0;}
                
                        if( i + 1 > MisFrecuencias.length) {
                            i=0;
                            if( estado + 1> MisFrecuencias.length ) Break; else estado++;
                        }
                    }
                }
               
                a = (alfabeto.indexOf(MisFrecuencias[i].letra)-alfabeto.indexOf(MisFrecuencias[estado].letra))*parseInt(inv(alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w]),N)) % N;
                b = alfabeto.indexOf(MisFrecuencias[estado].letra)-a*alfabeto.indexOf(Estadisticas[w]) % N;
                console.log(MisFrecuencias[estado]);
                console.log(alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w]))
                console.log(estado)
                console.log(w)
                console.log(intentos)
                console.log(a)
                console.log(b)
                w++;
                    //console.log(alfabeto.indexOf(MisFrecuencias[estado+1].letra))
            }while(mcd(a,N)!=1  || a < 0 || b < 0);
        }
            break;

        case 'Des_Puro':  
        
        do{
            estado++;
            if(estado + 1 > MisFrecuencias.length ) { 
                estado=0;
                if( intentos > Estadisticas.length ) Break; else intentos++;
            } 
            b = alfabeto.indexOf(MisFrecuencias[estado].letra) - alfabeto.indexOf(Estadisticas[intentos]) ; 
            console.log(Estadisticas[intentos])
            console.log(b)  

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
const IntentarNuevamente_EsAfin=()=>{
  if( cifradores.value =='A_Fin'){
            
            if(intentos + 1 >= Estadisticas.length) alert("No mas intentos"); else{ 
            do{ 
                
                
                if(i + 1 > MisFrecuencias.length) { 
                    i=0;
                    estado++;
                }
                if(estado + 1 > MisFrecuencias.length ) {w++;estado=0;}

                if( w + 1 > Estadisticas.length) {
                    w=0;
                    if( intentos + 1> Estadisticas.length ) {alert("No mas intentos"); break;} else intentos++;
                }

                
                while ((alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w])) <= 0 || mcd(Math.abs(alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w])),N) !=1 || (alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w])) == 3 ) {
                    w++;
                    if(w + 1 > MisFrecuencias.length) { 
                        w=0; 
                        if(intentos + 1 > Estadisticas.length) {alert("No mas intentos"); break;} else intentos++;
                    }
                }
               
                a = (alfabeto.indexOf(MisFrecuencias[i].letra)-alfabeto.indexOf(MisFrecuencias[estado].letra))*parseInt(inv(alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w]),N)) % N;
                b = alfabeto.indexOf(MisFrecuencias[estado].letra)-a*alfabeto.indexOf(Estadisticas[w]) % N;
                console.log(MisFrecuencias[estado]);
                console.log(alfabeto.indexOf(Estadisticas[intentos])-alfabeto.indexOf(Estadisticas[w]))
                console.log(estado)
                console.log(intentos)
                console.log(w)
                console.log(i)
                console.log(a)
                console.log(b)
                i++;
                    //console.log(alfabeto.indexOf(MisFrecuencias[estado+1].letra))
            }while(mcd(a,N)!=1  || a < 0 || b < 0); 

        }
    }else IntentarNuevamente();
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



//create by IsaCrist