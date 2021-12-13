const container2 = document.querySelector(".Main_decifrador"),
texto_original_cifrado = container2.querySelector(".texto_original_cifrado"),
cifradores = container2.querySelector("#dccifradores"),
resultado_decifrado = container2.querySelector(".texto_decifrado"),
DecifrarBtn = container2.querySelector("#buttonDC"),
eliminadaDC1 = container2.querySelector(".letra_eliminadaDC1"),
eliminadaDC2 = container2.querySelector(".letra_eliminadaDC2"),
rellenoDC = container2.querySelector(".letra_rellenoDC"),
claveDC = container2.querySelector(".clave_cifradora"),
formDC = container2.querySelector(".decifraForm");
var invers;
var suma;
var detInversa;


cifradores.addEventListener('change', (event) => {
    const resultado = container2.querySelector("#ingresar_fairdc");
    const resultado2 = container2.querySelector("#ingresar_fairdc2");
    if(cifradores.value=="fair"){
        resultado.style.display = "block";
        resultado2.style.display = "block";
    }else{
        resultado.style.display = "none";
        resultado2.style.display = "none";
    }
});

DecifrarBtn.addEventListener('click', ()=>{
    texto_decifrado = "";
    texto_original_cifrado.value == "" ? alert("falta texto a cifrar") : shifMessageDC();
    
});

const shifMessageDC = () => {
    var texto = texto_original_cifrado.value.replace( /\s+/g, '');
    const wordArrayDC = [...texto.toUpperCase()];
    var texto = claveDC.value.replace( /\s+/g, '');
    const claveArrayDC = [...texto.toUpperCase()];
    switch(cifradores.value){
        case 'fair':
            LosEliminados=[];
            realalfabeto="";
            nuevoAlfabeto();
            Rellenar = rellenoDC.value.toUpperCase();
            const keyDC = MatrizDeCifra(claveArrayDC);
            console.log(keyDC)
            decifrarFair(0,wordArrayDC,keyDC);
            break;
        case 'hill':
            suma=0;
            detInversa=0;
            const mimatrizClaveDC = claveMatriz(claveArrayDC);
            console.log(mimatrizClaveDC);
            if(mimatrizClaveDC!=null)invers=[...Array(mimatrizClaveDC.length)].map(e => Array(mimatrizClaveDC));
            verifiDeterminanteDC = verifiMatriz(mimatrizClaveDC);
            if(verifiDeterminanteDC<0) verifiDeterminanteDC=(verifiDeterminanteDC+alfabeto.length) % alfabeto.length;
            var inversa = MatrizInversa(mimatrizClaveDC,verifiDeterminanteDC);
            console.log(inversa)
            mimatrizClaveDC!=null? decifrarHill(0,wordArrayDC,inversa): resultado_decifrado.value="clave no cumple";
            break;
        default:
            alert("selecciona cifrador");
            break;
    }
    
}

function decifrarFair(indexLetra, cadena,matriz){
    if(indexLetra == cadena.length) return;
    c1 = cadena[indexLetra];
    c2 = cadena[indexLetra+1];
    console.log(c1,c2)
    var [x , y]= encontrar(matriz,c1);
    var [x1 , y1]= encontrar(matriz,c2);
    x==x1 ? caso=1: y==y1? caso=2: (x!=x1 && y!=y1) ? caso=3: caso=4;
    console.log(caso)
    switch(caso){
        case 1:
            if(y==0) y=matriz.length
            if(y1==0) y1=5 
            m1 = matriz[x][y-1]
            m2 = matriz[x1][y1-1]
            break;
        case 2:
            if(x==0) x=5
            if(x1==0) x1=5 
            m1 = matriz[x-1][y]
            m2 = matriz[x1-1][y1]
            break;
        case 3:
            m1 = matriz[x][y1]
            m2 = matriz[x1][y]
            break;
        default:
            alert("algo anda mal");
            break;
    }
    console.log(m1,m2)
    texto_decifrado = texto_decifrado + m1 + m2;

    resultado_decifrado.innerText = texto_decifrado;
    decifrarFair(indexLetra + 2, cadena,matriz);
}

function decifrarHill(indexLetra, cadena,matriz){
    if(indexLetra == cadena.length) return;

    for(var i=0;i<matriz.length;i++){
        m=0
        for(var j=0;j<matriz.length;j++){
            m=m+matriz[i][j]*alfabeto.indexOf(cadena[indexLetra+j])
        }
        m=m%alfabeto.length;
       
        texto_decifrado=texto_decifrado + alfabeto[m];
        
    }
    resultado_decifrado.innerText = texto_decifrado;
    decifrarHill(indexLetra + matriz.length, cadena,matriz)
}


//funciones con otras operaciones

function nuevoAlfabeto(){
    LosEliminados=[... eliminadaDC1.value.toUpperCase(),...eliminadaDC2.value.toUpperCase()];
    if( eliminadaDC2.value=="" && eliminadaDC1.value==""){
        LosEliminados.push("Ñ");
        LosEliminados.push("J");
    }
    if( rellenoDC.value==""){
        rellenoDC.value = "X";
    }
    stringalfabeto = alfabeto.toString().replaceAll(',','');
    realalfabeto = stringalfabeto.replace(LosEliminados[0],'');
    realalfabeto = Array.from(realalfabeto.replace(LosEliminados[1],''))
}


const  MatrizInversa=(matriz,deter)=>{

    if(matriz==null)return;
    if(matriz.length==2){
        var det = ((matriz[0][0]*matriz[1][1])-(matriz[1][0]*matriz[0][1])) % alfabeto.length  ;
        K = parseInt(inv(deter,27));
        detInversa=det;
        var inver =[...Array(2)].map(e => Array(2));
        var q=1,z=1;
        for(var i=0;i<2;i++){
            for(var j=0;j<2;j++){
                if(K*Math.pow(-1,(i+j+2))*matriz[q][z] % alfabeto.length < 0) {
                    inver[i][j]=(K*Math.pow(-1,(i+j+2))*matriz[z][q] % alfabeto.length + alfabeto.length) % alfabeto.length;
                }else {
                    inver[i][j]=K*Math.pow(-1,(i+j+2))*matriz[z][q] % alfabeto.length;
                }
                z--;
            }
            q--;
            z=1;
        }

        return  det,inver;
    }else{
        for(var i=0;i<matriz.length;i++){
            for(var t=0;t<matriz.length;t++){
             nueva=[...Array(matriz.length-1)].map(e => Array(matriz.length-1));
             u=0;
                for(var j=0;j<matriz.length;j++){
                    m=0;
                    for(var k=0;k<matriz.length;k++ ){
                        if(j!=i && k!=t){
                            nueva[u][m]=matriz[j][k];
                            m++;
                            if(m==matriz.length-1)u++;
                        }
                    }
                }
            
            var detmenor,x = MatrizInversa(nueva,deter);

            console.log(detInversa)
            K = parseInt(inv(deter,27));
            invers[t][i]=detInversa*Math.pow((-1),(i+t+2))*K %alfabeto.length;
            if(invers[t][i]<0) invers[t][i]=(invers[t][i]+alfabeto.length) %alfabeto.length
            console.log(invers[t][i])
            if(i==0) {var a = matriz[0][t]*Math.pow((-1),(1+t+1))*detInversa;suma=suma+a % alfabeto.length;}
            //console.log(suma)
            }
        }

        return suma,invers;
    }


}


function inv (a,n) { 
    let matriz =[];
    N = alfabeto.length;
    for(var i = 0 ; i <= N; i++){
        matriz.push([[i],[n*(i)],[a*(i)]]);
        
    }

    for(var i =0 ; i <=N; i++){
        for(var j =0; j <= N; j++){       
            if(parseInt(matriz[i][1]) + 1  == parseInt(matriz[j][2]) ) return(matriz[j][0]);
        }
    }

}