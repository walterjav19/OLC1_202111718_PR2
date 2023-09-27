
%{
const Dato = require('../interprete/expresiones/Dato.js');
const Print = require('../interprete/instrucciones/Print.js');
const Aritmetica = require('../interprete/expresiones/Aritmetica.js');
%}



// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares
decimal ([0-9]+)"."([0-9]+)
entero  [0-9]+



%%
// -----> Reglas Lexicas
'('          {return 'PARIZQ'}
')'          {return 'PARDER'}
';'          {return 'PYC'}
'+'          {return 'MAS'}
'-'          {return 'MENOS'}
'*'          {return 'POR'}
'/'          {return 'DIV'}
'print'      {return 'PRINT'}

{decimal}                { return 'DECIMAL'; }	
{entero}                 { return 'ENTERO'; } 


// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}



// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// ################## ANALIZADOR SINTACTICO ######################
// -------> Precedencia

%left 'MAS' 'MENOS'
%left 'POR' 'DIV'

// -------> Simbolo Inicial
%start inicio


%% // ------> Gramatica

inicio
	: lista_instrucciones EOF {$$=$1; return $$;}
;

lista_instrucciones
    : lista_instrucciones instruccion  {$$=$1; $$.push($2);}
    | instruccion  {$$=[]; $$.push($1);}
;

instruccion
	: PRINT expresion {$$=new Print($2);}
	| error 	{console.error('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);}
;

expresion
    : expresion MAS expresion {$$=new Aritmetica($1,'+',$3);}
    | ENTERO {$$ = new Dato($1,'INT')}
    | DECIMAL {$$ = new Dato($1,'DOUBLE')}
;