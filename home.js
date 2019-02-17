var parentesesStart = ["("]; //id=1
var parentesesEnd = [")"]; //id=2
var chavesStart = ["{"]; //id=3
var chavesEnd = ["}"]; //id=4
var ponto = ["."]; //id=5
var doisPontos = [":"]; //id=6
var virgula = [","]; //id=7
var pontoVirgula = [";"]; //id=8
var hashtag = ["#"]; //id=9
var comentarioLinha = ["//"]; //id=10
var opAritmetico = ["+", "-", "/", "*", "%"]; //id=11
var opLogico = ["<",">","!","=","&","|"]; //id=12
var letras = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v",'w',"x","y",'z',"_","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];//id=13
var numero = ["0","1","2","3","4","5","6","7","8","9"]; //id=14
var pReservada = ["asm", "auto", "break", "case", "char", "const", "continue", "default", "do", "double", "else", "enum", "extern", "float", "for", "goto", "if", "int", "long", "register", "return", "short", "signed", "sizeof", "static", "struct", "switch", "typedef", "union", "unsigned", "void", "volatile", "while"];//id=15
var stringSimbolo = ["\""];//id=16

var unicoSimbolo = ["(",")","{","}",".",";",",","#",":"];
var espaco = [" ", "\n",""];
var comentarioStart = ["/*"];
var comentarioEnd = ["*/"];
var opAritmeticoDuplo = ["++", "--"];
var opLogicoDuplo =["<=",">=","==","!=","&&","||"];

var pAsm = "asm"; //id=17
var pAuto = "auto"; //id=18
var pBreak = "break"; //id=19
var pCase = "case"; //id=20
var pChar = "char"; //id=21
var pConst = "const"; //id=22
var pContinue = "continue"; //id=23
var pDefault = "default"; //id=24
var pDo = "do"; //id=25
var pDouble = "double"; //id=26
var pElse = "else"; //id=27
var pEnum = "enum"; //id=28
var pExtern = "extern"; //id=29
var pFloat = "float"; //id=30
var pFor = "for"; //id=31
var pGoto = "goto"; //id=32
var pIf = "if"; //id=33
var pInt = "int"; //id=34
var pLong = "long"; //id=35
var pRegister = "register"; //id=36
var pReturn = "return"; //id=37
var pShort = "short"; //id=38
var pSigned = "signed"; //id=39
var pSizeof = "sizeof"; //id=40
var pStatic = "static"; //id=41
var pStruct = "struct";  //id=42
var pSwitch = "switch"; //id=43
var pTypedef = "typedef"; //id=44
var pUnion = "union"; //id=45
var pUnsigned = "unsigned"; //id=46
var pVoid = "void"; //id=47
var pVolatile = "volatile"; //id=48
var pWhile = "while"; //id=49




var tokenss = [];
var linha = [];
var coluna = [];



function analisar(){
    var entrada = document.getElementById("entrada").value;
    var tokenss = separar(entrada);
    var saida = classificar(tokenss);
    var tabela = makeTableHTML(saida);
    document.getElementById("saida").innerHTML = tabela;
};

function separar(analisar){
    var len = analisar.length;
    var t = 0;
    var l = 1;
    var c = 1;
    token = "";
    tokens = [];
    var charNow, charNext;
    for(var i=0;i<len;i++){
        charNow = analisar.charAt(i);
        charNext = analisar.charAt(i+1);
        tokens[t] = [];
        if(letras.indexOf(charNow)>-1){
            c=i+1;
            while(letras.indexOf(charNow) > -1 || numero.indexOf(charNow) > -1){
                token = token.concat(charNow);
                i++;
                charNow = analisar.charAt(i);
            }
            i--;
            tokens[t][0] = token;
            tokens[t][1] = l;
            tokens[t][2] = c;
            t++;
            token="";
            continue;
        }
        else if(numero.indexOf(charNow)>-1){
            c=i+1;
            while(numero.indexOf(charNow)>-1){
                token = token.concat(charNow);
                i++;
                charNow = analisar.charAt(i);
            }
            i--;
            tokens[t][0] = token;
            tokens[t][1] = l;
            tokens[t][2] = c;
            t++;
            token="";
            continue;
        }
        else if(stringSimbolo.indexOf(charNow)>-1){
            c=i+1;
            if(stringSimbolo.indexOf(charNext)>-1){
                token = token.concat(charNow);
                i++;
                token = token.concat(charNext);
            }
            else{
                token = token.concat(charNow);
                i++;
                charNow = analisar.charAt(i);

                while(charNow != "\""){
                    token = token.concat(charNow);
                    i++;
                    charNow = analisar.charAt(i);
                    if(charNow == ""){
                        break;
                    }
                }
                token = token.concat(charNow);
                i++;
            }
            i--;
            tokens[t][0] = token;
            tokens[t][1] = l;
            tokens[t][2] = c;
            t++;
            token="";
            continue;
        }
        else if(charNow == "/" && charNext == "*"){
            c=i+1;
            token = token.concat(charNow);
            token = token.concat(charNext);
            i = i+2;
            charNow = analisar.charAt(i);
            charNext = analisar.charAt(i+1);
            if(charNow == "*" && charNext == "/"){
                token = token.concat(charNow);
                token = token.concat(charNext);
                i = i+2;
            }
            else{
                token = token.concat(charNow);
                i++;
                charNow = analisar.charAt(i);
                charNext = analisar.charAt(i+1);
                while(charNow != "*" && charNext != "/"){
                    token = token.concat(charNow);
                    i++;
                    charNow = analisar.charAt(i);
                    charNext = analisar.charAt(i+1);
                    if(charNow == ""){
                        break;
                    }
                }
                token = token.concat(charNow);
                token = token.concat(charNext);
                i = i+2;
            }
            i--;
            tokens[t][0] = token;
            tokens[t][1] = l;
            tokens[t][2] = c;
            t++;
            token="";
            continue;
        }
        else if(charNow == "/" && charNext == "/"){
            c=i+1;
            token = token.concat(charNow);
            token = token.concat(charNext);
            i = i+2;
            charNow = analisar.charAt(i);
            charNext = analisar.charAt(i+1);
            if(charNow == "\n"){
            }
            else{
                token = token.concat(charNow);
                i++;
                charNow = analisar.charAt(i);
                charNext = analisar.charAt(i+1);
                while(charNow != "\n"){
                    token = token.concat(charNow);
                    i++;
                    charNow = analisar.charAt(i);
                    charNext = analisar.charAt(i+1);
                    if(charNext == "\n" || charNext == ""){
                        l++;
                        c=1;
                        break;
                    }
                }
                token = token.concat(charNow);
                token = token.concat(charNext);
                i = i+2;
            }
            i--;
            tokens[t][0] = token;
            tokens[t][1] = l-1;
            tokens[t][2] = c;
            t++;
            token="";
            continue;
        }
        else if(opLogico.indexOf(charNow)>-1){
            token = charNow;
            c=i+1;
            if(opLogico.indexOf(charNext)>-1){
                i++;
                charNow = analisar.charAt(i);
                charNext = analisar.charAt(i+1);
                token = token.concat(charNow);
            }
            tokens[t][0] = token;
            tokens[t][1] = l;
            tokens[t][2] = c;
            t++;
            token="";
            continue;
        }
        else if(opAritmetico.indexOf(charNow)>-1){
            token = charNow;
            c=i+1;
            if(opAritmetico.indexOf(charNext)>-1){
                i++;
                charNow = analisar.charAt(i);
                charNext = analisar.charAt(i+1);
                token = token.concat(charNow);
            }
            tokens[t][0] = token;
            tokens[t][1] = l;
            tokens[t][2] = c;
            t++;
            token="";
            continue;
        }
        else if(unicoSimbolo.indexOf(charNow)>-1){
            token = charNow;
            c=i+1;
            tokens[t][0] = token;
            tokens[t][1] = l;
            tokens[t][2] = c;
            t++;
            token="";
            continue;
        }
        else if(espaco.indexOf(charNow)>-1){
            if(charNow == "\n"){
                l++;
                c=1;
            }
            continue;
        }
        else{
            token = charNow;
            c=i+1;
            tokens[t][0] = token;
            tokens[t][1] = l;
            tokens[t][2] = c;
            t++;
            token="";
            continue;
        }
    }
    return tokens;
};

function classificar(tokenArray){
    tokens = tokenArray;
    var tokenNow = [];
    for(var i = 0; i < tokens.length; i++){
        tokenNow = tokens[i][0];
        if(parentesesStart.indexOf(tokenNow)>-1){
            tokens[i][3]=1;
            tokens[i][4]="Abre Parênteses";
        }
        else if(parentesesEnd.indexOf(tokenNow)>-1){
            tokens[i][3]=2;
            tokens[i][4]="Fecha Parênteses";
        }
        else if(chavesStart.indexOf(tokenNow)>-1){
            tokens[i][3]=3;
            tokens[i][4]="Abre Chaves";
        }
        else if(chavesEnd.indexOf(tokenNow)>-1){
            tokens[i][3]=4;
            tokens[i][4]="Fecha Chaves";
        }
        else if(ponto.indexOf(tokenNow)>-1){
            tokens[i][3]=5;
            tokens[i][4]="Ponto";
        }
        else if(doisPontos.indexOf(tokenNow)>-1){
            tokens[i][3]=6;
            tokens[i][4]="Dois Pontos";
        }
        else if(virgula.indexOf(tokenNow)>-1){
            tokens[i][3]=7;
            tokens[i][4]="Vírgula";
        }
        else if(pontoVirgula.indexOf(tokenNow)>-1){
            tokens[i][3]=8;
            tokens[i][4]="Ponto e Vírgula";
        }
        else if(hashtag.indexOf(tokenNow)>-1){
            tokens[i][3]=9;
            tokens[i][4]="Hashtag";
        }
        else if(comentarioLinha.indexOf(tokenNow)>-1){
            tokens[i][3]=10;
            tokens[i][4]="Comentário ";/////////////////////////
        }
        else if(tokenNow.charAt(0) == "/" && tokenNow.charAt(1)){
            tokens[i][3]= 10;
            tokens[i][4]="Comentário";
        }
        else if(opAritmetico.indexOf(tokenNow)>-1 || opAritmeticoDuplo.indexOf(tokenNow)>-1){
            console.log("oi");
            tokens[i][3]=11;
            tokens[i][4]="Operador Aritmético";
        }
        else if(opLogico.indexOf(tokenNow)>-1 || opLogicoDuplo.indexOf(tokenNow)>-1){
            tokens[i][3]=12;
            tokens[i][4]="Operador Lógico";
        }
        else if(pReservada.indexOf(tokenNow)>-1){
            tokens[i][3]=15;
            tokens[i][4]="Palavra Reservada";
        }
        else if(letras.indexOf(tokenNow.charAt(0))>-1){
            tokens[i][3]=13;
            tokens[i][4]="Identificador";
        }
        else if(numero.indexOf(tokenNow.charAt(0))>-1){
            tokens[i][3]=14;
            tokens[i][4]="Número";
        }
        else if(stringSimbolo.indexOf(tokenNow.charAt(0))>-1){
            tokens[i][3]= 16;
            tokens[i][4]="String";
        }
        else{
            tokens[i][3] = 0;
            tokens[i][4] = "Token Desconhecido";
        }
    }
    
    console.log(tokens);
    return tokens;
}

function makeTableHTML(myArray) {
    var result = "<table border=1><tr><th>Token</th><th>Linha</th><th>Coluna</th><th>ID</th><th>Tipo de Token</th></tr>";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<myArray[i].length; j++){
            result += "<td>"+myArray[i][j]+"</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}