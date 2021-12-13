const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const contendor_cifrador = document.querySelector(".Main_cifrador"),
texto_original = contendor_cifrador.querySelector(".texto_original"),
cifrador = contendor_cifrador.querySelector("#cifradores"),
clave = contendor_cifrador.querySelector("#key"),
resultado = contendor_cifrador.querySelector(".texto_cifrado"),
CifrarBtn = contendor_cifrador.querySelector("#button"),
eliminada1 = contendor_cifrador.querySelector(".letra_eliminada1"),
eliminada2 = contendor_cifrador.querySelector(".letra_eliminada2"),
relleno = contendor_cifrador.querySelector(".letra_relleno"),
form = contendor_cifrador.querySelector(".cifraForm");
var micadenita;
var realalfabeto;
var LosEliminados;
var suma;

cifrador.addEventListener('change', (event) => {
    const resultado = contendor_cifrador.querySelector(".ingresar_fair");
    const resultado2 = contendor_cifrador.querySelector("#ingresar_fair2");
    if(cifrador.value=="fair"){
        resultado.style.display = "block";
        resultado2.style.display = "block";
    }else{
        resultado.style.display = "none";
        resultado2.style.display = "none";
    }
});


CifrarBtn.addEventListener('click', ()=>{
    texto_cifrado = "";
    micadenita=[];  
    texto_original.value == "" ? alert("falta texto a cifrar") : shifMessage();
    
});

const shifMessage = () => {
    var texto = texto_original.value.replace( /\s+/g, '');
    const wordArrayC = [...texto.toUpperCase()];
    var texto = clave.value.replace( /\s+/g, '');
    const claveArrayC = [...texto.toUpperCase()];
    switch(cifrador.value){
        case 'fair':
            LosEliminados=[];
            realalfabeto="";
            nuevoAlfabeto();
            completeWord(0,wordArrayC,relleno.value.toUpperCase());
            const WordC = micadenita;
            console.log(micadenita)
            const MiMatriz = MatrizDeCifra(claveArrayC);
            cifrarFair(0,WordC,MiMatriz);
        break;
        case 'hill':
            suma=0;
            const mimatrizClave = claveMatriz(claveArrayC); // se crea una matriz par con la clave 
            //console.log(mimatrizClave);
            verifiDeterminante = verifiMatriz(mimatrizClave); //encontramos su determinante
            if(verifiDeterminante<0) verifiDeterminante=(verifiDeterminante+alfabeto.length) % alfabeto.length;
            while(wordArrayC.length%mimatrizClave.length!=0) wordArrayC.push("X");

            console.log(wordArrayC)
            if(verifiDeterminante!=0 && mcd(verifiDeterminante,alfabeto.length)==1) cumple=true; else cumple=false;
            cumple==true?cifrarHill(0,wordArrayC,mimatrizClave): resultado.innerText="clave no cumple"; // verificamos que cumpla su determinante
            break;
        default:
            alert("selecciona cifrador");
            break;
    }
}

function cifrarFair(indexLetra, cadena,matriz){
    if(indexLetra == cadena.length) return;
    m1 = cadena[indexLetra];
    m2 = cadena[indexLetra+1];
    console.log(matriz)
    console.log(m1)
    console.log(m2)
    var [x , y]= encontrar(matriz,m1);
    var [x1 , y1]= encontrar(matriz,m2);
    x==x1 ? caso=1: y==y1? caso=2: (x!=x1 && y!=y1) ? caso=3: caso=4;
    console.log(x,y)
    console.log(x1,y1)
    switch(caso){
        case 1:
            if(y==4) y=-1
            if(y1==4) y1=-1 
            c1 = matriz[x][y+1]
            c2 = matriz[x1][y1+1]
            break;
        case 2:
            if(x==4) x=-1
            if(x1==4) x1=-1 
            c1 = matriz[x+1][y]
            c2 = matriz[x1+1][y1]
            break;
        case 3:
            c1 = matriz[x][y1]
            c2 = matriz[x1][y]
            break;
        default:
            alert("algo anda mal");
            break;
    }
    texto_cifrado = texto_cifrado + c1 + c2;
    resultado.innerText = texto_cifrado;
    cifrarFair(indexLetra + 2, cadena,matriz);
}

function cifrarHill(indexLetra, cadena,matriz){
    if(indexLetra == cadena.length) return;
    console.log(cadena[indexLetra]);
    for(var i=0;i<matriz.length;i++){
        c=0
        for(var j=0;j<matriz.length;j++){
            c=c+matriz[i][j]*alfabeto.indexOf(cadena[indexLetra+j])
        }
        c=c%alfabeto.length;
        texto_cifrado=texto_cifrado + alfabeto[c];
        
    }
    resultado.innerText = texto_cifrado;
    cifrarHill(indexLetra + matriz.length, cadena,matriz)
}


//funciones de operacion

const completeWord=(indice,cadena,rellena)=>{

    if(indice +1 >= cadena.length) {
        if(cadena.length % 2 != 0){
            cadena.push(rellena);
        }
        micadenita = cadena;
        return ;
    };

    if(cadena[indice+1] === cadena[indice]){
        cadena.splice(indice+1, 0, rellena);
    }
    completeWord(indice+2,cadena,rellena);
}


const MatrizDeCifra=(cadenaClave)=>{
    matriz=[];
    var alfabetSinClave=realalfabeto.toString().replaceAll(',','');
    UniqClave = Array.from(new Set(cadenaClave)).join('');
    u=0;
    for(var i =0; i<5;i++){
        matriz.push([,,,,]);
        for(var j=0; j<5;j++){
            if((j+5*i)>= UniqClave.length) {
                Array.from(alfabetSinClave);
                matriz[i][j]=alfabetSinClave[u];
                u++;
            }else{
            matriz[i][j]=UniqClave[j+5*i];
            alfabetSinClave = alfabetSinClave.replace(UniqClave[j+5*i], '');
            }
            
        }
    }
    return matriz;
}

const encontrar=(matrix,letra)=>{
    for(var i=0; i<5;i++){
        for(var j=0; j<5;j++){
           if( matrix[i][j] == letra){
               return [i,j];
           }
        }
    }
}

///creador de alfabeto

function nuevoAlfabeto(){
    LosEliminados=[... eliminada1.value.toUpperCase(),...eliminada2.value.toUpperCase()];
    if( eliminada2.value=="" && eliminada1.value==""){
        LosEliminados.push("Ñ");
        LosEliminados.push("J");
    }
    if( relleno.value==""){
        relleno.value = "X";
    }
    stringalfabeto = alfabeto.toString().replaceAll(',','');
    realalfabeto = stringalfabeto.replace(LosEliminados[0],'');
    realalfabeto = Array.from(realalfabeto.replace(LosEliminados[1],''))
}

///matriz para hill

const claveMatriz=(key)=>{
    matriz=[];
    var d = 1;
    var lon = key.length;
    while(lon > Math.pow(d,2) ){d++;}
    if(lon != Math.pow(d,2)) {return;}
    matriz = [...Array(d)].map(e => Array(d));

    for(var i =0;i<d;i++){  
        for(var j=0;j<d;j++){
            matriz[i][j]=alfabeto.indexOf(key[j+d*i]);
        }
    }
   
    return matriz;

}

const  verifiMatriz=(matriz)=>{
    if(matriz==null)return;
    if(matriz.length==2){
        var det = ((matriz[0][0]*matriz[1][1])-(matriz[1][0]*matriz[0][1])) % alfabeto.length ;
        return det ;
    }else{
        for(var i=0;i<matriz.length;i++){
            nueva=[...Array(matriz.length-1)].map(e => Array(matriz.length-1));
            for(var j=1;j<matriz.length;j++){
                m=0;
                for(var k=0;k<matriz.length;k++ ){
                    if(j!=0 && k!=i){
                        nueva[j-1][m]=matriz[j][k];
                        m++;
                    }
                }
            }
            var detmenor = verifiMatriz(nueva);
            var a = matriz[0][i]*Math.pow((-1),(1+i+1))*detmenor;
            suma=suma+a % alfabeto.length;
            
        }
        return suma;
    }


}

const mcd = (A, B) => {
    if (B === 0) return A;
    return mcd(B, A % B);
};



