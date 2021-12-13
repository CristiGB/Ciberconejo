const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const numero = [0,1,2,3,4,5,6,7,8,9];
const alfabeto_telex = ["00011","11001","01110","01001","00001","01101","11010","10100","00110","01011","01111","10010","11100","01100","11000","10110","10111","01010","00101","10000","00111","11110","10011","11101","10101","10001","01000","00010","11111","11011","00100","00000"];
const caracteres = ["-","?",":","$","3","!","&","#","8","`","(",")",".",",","9","0","1","4","´","5","7",";","2","/","6","+"];
const grupo_letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","CR","LF","LTRS","FIGS", " ",null];
const contendor_cifrador = document.querySelector(".Main_cifrador"),
texto_original = contendor_cifrador.querySelector(".texto_original"),
cifrador = contendor_cifrador.querySelector("#cifradores"),
clave = contendor_cifrador.querySelector("#key"),
resultado = contendor_cifrador.querySelector(".texto_cifrado"),
CifrarBtn = contendor_cifrador.querySelector("#button"),
form = contendor_cifrador.querySelector(".cifraForm");
const minusculas = [...(alfabeto.toString().replaceAll( ',', '')).toLowerCase()];

CifrarBtn.addEventListener('click', ()=>{
    texto_cifrado = "";
    texto_original.value == "" ? alert("falta texto a cifrar") : 
    cifrador.value == "vernam"? MessageBinary() : cifrador.value == "vernam2"? MessageBinaryletx() : shifMessage();
    
});

const shifMessage = () => {
    var texto = texto_original.value.replace( /\s+/g, '');
    const wordArrayC = [...texto.toUpperCase()];
    var texto = clave.value.replace( /\s+/g, '');
    const claveArrayC = [...texto.toUpperCase()];
    const key = SeleccionClave(claveArrayC,wordArrayC,cifrador);
    cifrar(0,wordArrayC,key);
}

const MessageBinary=() =>{
    var texto = texto_original.value.replace( /\s+/g, '');
    const wordArrayC = [...texto];
    var texto = clave.value.replace( /\s+/g, '');
    const claveArrayC = [...texto];
    const NuevoAlfabeto = [...numero,...alfabeto,...minusculas];
    cifrarbinario(0,wordArrayC,claveArrayC,matrizBinaria(NuevoAlfabeto),NuevoAlfabeto);
}

const MessageBinaryletx=() =>{
    const wordArrayC = [...texto_original.value.toUpperCase()];
    const claveArrayC = [...clave.value.toUpperCase()];
    cifrarbinarioletex(0,wordArrayC,claveArrayC,0);
}


function cifrar(indexLetra, cadena,key){
    if(indexLetra == cadena.length) return;
    letraSinCifrar = cadena[indexLetra];
    console.log(key[indexLetra]);
    switch(cifrador.value){
        case 'Vigenere':
            M = alfabeto.indexOf(letraSinCifrar);
            K = alfabeto.indexOf(key[indexLetra]);
            C = (M + K) % alfabeto.length;
            break;
        case 'Autoclave':
            M = alfabeto.indexOf(letraSinCifrar);
            K = alfabeto.indexOf(key[indexLetra]);
            C = (M + K) % alfabeto.length;
            break;
        case 'Beafourt':
            M = alfabeto.indexOf(letraSinCifrar);
            K = alfabeto.indexOf(key[indexLetra]);
            C = (K - M) % alfabeto.length;
            break;
        default:
            alert("Seleccione un cifrador");
            return;
        break;
    }
    C < 0 ? texto_cifrado = texto_cifrado + alfabetoInvertido[C*-1-1] : texto_cifrado = texto_cifrado + alfabeto[C];
    resultado.innerText = texto_cifrado;
    cifrar(indexLetra + 1, cadena,key);

}

const SeleccionClave = (laclave,N,select)=>{
    var key=[], i=0;
    switch(select.value){
        case 'Vigenere':
            
            while(key.length < N.length){
                if(i>=laclave.length)i=0;
                key.push(laclave[i]);
                i++;
            }
            break;
        case 'Autoclave':
            var j=0;
            while(key.length < N.length){
                if(i>=laclave.length){
                    key.push(N[j])
                    j++
                }else{
                    key.push(laclave[i]);
                    i++;
                }
            }
            break;
        case 'Beafourt':
            while(key.length < N.length){
                if(i>=laclave.length)i=0;
                key.push(laclave[i]);
                i++;
            }
            break;
        default:
            alert("Seleccione un cifrador");
        break;
    }
    return(key);
}


/// EMPIEZA USO BINARIO
function cifrarbinarioletex(indexLetra,cadena,key,bandera){
    if(indexLetra == cadena.length) return;
    letraSinCifrar = cadena[indexLetra];
    letraClave = key[indexLetra];
    bin1 = alfabeto_telex[grupo_letras.indexOf(letraSinCifrar)];
    bin2 = alfabeto_telex[grupo_letras.indexOf(letraClave)];
    
    var acarreo=0,suma=[],line=bin1.length;
    while (line > 0 ){
        if(bin1[line-1] == 1 && bin2[line-1] == 1){ suma.unshift(0); acarreo=1 }
        else { suma.unshift(parseInt(bin1[line-1])+parseInt(bin2[line-1]))}
        line--;
    }
    suma=alfabeto_telex.indexOf(suma.toString().replaceAll( ',', ''));
    if ( bandera ==0){
        texto_cifrado = texto_cifrado + grupo_letras[suma];
        resultado.innerText = texto_cifrado; 
    }else{
        texto_cifrado = texto_cifrado + grupo_letras[suma];
        resultado.innerText = texto_cifrado; 
    }
    cifrarbinarioletex(indexLetra+1,cadena,key);
}


function cifrarbinario(indexLetra, cadena,key,Ascci,ArrayAscci){
    if(indexLetra == cadena.length) return;
    letraSinCifrar = cadena[indexLetra];
    letraClave = key[indexLetra];
    bin = SumaBinaria(letraClave,letraSinCifrar,Ascci);
    texto_cifrado = texto_cifrado +ArrayAscci[bin];
    resultado.innerText = texto_cifrado; 
    cifrarbinario(indexLetra+1,cadena,key,Ascci,ArrayAscci);
}

const matrizBinaria=(Ascci)=>{
    const matrix =[];
    w=0;
    for(var i=0; i<=7;i++){
        matrix.push([[Ascci[i]],[Ascci[8+w]],[Ascci[(8*2)+w]],[Ascci[(8*3)+w]],[Ascci[(8*4)+w]],[Ascci[(8*5)+w]],
        [Ascci[(8*6)+w]],[Ascci[(8*7)+w]]]);
        w++;
    }
    return matrix;
}

function SumaBinaria(letraClave,letraSinCifrar,Ascci){
    var [x , y]= encontrar(Ascci,letraSinCifrar);
    var [x1 , y1]= encontrar(Ascci,letraClave);
    x=x.toString(2), y=y.toString(2), x1=x1.toString(2),y1=y1.toString(2);
    while(x.length<3) x='0'+ x;
    while(y.length<3) y='0'+ y;
    while(x1.length<3) x1='0'+ x1;
    while(y1.length<3) y1='0'+ y1;
    
    bin1= [...y + x];
    bin2= [...y1 + x1];
    var acarreo=0,suma=[],line=bin1.length;
    while (line > 0 ){
        if(bin1[line-1] == 1 && bin2[line-1] == 1){ suma.unshift(0); acarreo=1 }
        else { suma.unshift(parseInt(bin1[line-1])+parseInt(bin2[line-1]))}
        line--;
        
    }
    suma=parseInt(suma.toString().replaceAll( ',', ''),2);
    console.log(suma)
    return(suma);
}


const encontrar=(matrix,letra)=>{
    for(var i=0; i<8;i++){
        for(var j=0; j<8;j++){
           if( matrix[i][j] == letra){
               return [i,j];
           }
        }
    }
}