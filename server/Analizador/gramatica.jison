
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
comentario "--".*
mcomentario [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // se saco de https://github.com/jd-toralla/OLC1-1S2023/blob/main/JisonInterprete/src/Grammar/Grammar.jison
fecha [0-9]{4}-[0-9]{2}-[0-9]{2}
cadena (\"(\\.|[^\\"])*\")



%%
// -----> Reglas Lexicas
{comentario}             {/*no se hace nada*/}
{mcomentario}            {/*no se hace nada*/}
'('          {return 'PARIZQ'}
')'          {return 'PARDER'}
';'          {return 'PYC'}
'+'          {return 'MAS'}
'-'          {return 'MENOS'}
'*'          {return 'POR'}
'/'          {return 'DIV'}
'%'          {return 'MOD'}
'print'      {return 'PRINT'}
'true'       {return 'TRUE'}
'false'      {return 'FALSE'}
'null'       {return 'NULL'}


{cadena}                 { return 'CADENA'; }
{decimal}                { return 'DECIMAL'; }	
{entero}                 { return 'ENTERO'; } 
{fecha}                  { return 'FECHA';}

// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}



// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// ################## ANALIZADOR SINTACTICO ######################
// -------> Precedencia

%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MOD'
%left UMINUS
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
    | expresion MENOS expresion {$$=new Aritmetica($1,'-',$3);}
    | expresion POR expresion {$$=new Aritmetica($1,'*',$3);}
    | expresion DIV expresion {$$=new Aritmetica($1,'/',$3);}
    | expresion MOD expresion {$$=new Aritmetica($1,'%',$3);}
    | MENOS expresion %prec UMINUS {$$=new Aritmetica($2,'-',null);}
    | ENTERO  {$$ = new Dato($1,'INT')}
    | DECIMAL {$$ = new Dato($1,'DOUBLE')}
    | CADENA  {$$ = new Dato($1,'STRING')}
    | TRUE    {$$ = new Dato($1,'BOOLEAN')}
    | FALSE   {$$ = new Dato($1,'BOOLEAN')}
;