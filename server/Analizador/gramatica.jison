
%{
const Dato = require('../interprete/expresiones/Dato.js');
const Print = require('../interprete/instrucciones/Print.js');
const Aritmetica = require('../interprete/expresiones/Aritmetica.js');
const Logica = require('../interprete/expresiones/Logica.js');
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
cadena (\"(\\.|[^\\"])*\") | (\'(\\.|[^\\'])*\')



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
'=='         {return 'EQUALS'}
'!='         {return 'NOTEQUALS'}
'>'          {return 'MAYOR'}
'<'          {return 'MENOR'}
'>='         {return 'MAYORIGUAL'}
'<='         {return 'MENORIGUAL'}
'not'         {return 'NOT'}
'or'          {return 'OR'}
'and'         {return 'AND'}

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

%left 'OR'
%left 'AND'
%left 'NOT'
%left 'EQUALS' 'NOTEQUALS' 'MAYOR' 'MENOR' 'MAYORIGUAL' 'MENORIGUAL'
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

expresion :  symbols{$$=$1}
            | unario{$$=$1}
            | aritmetica{$$=$1}
            | logica{$$=$1}
            | PARIZQ expresion PARDER{$$=$2}
;

symbols:DECIMAL {$$ = new Dato($1,'DOUBLE', this._$.first_line, this._$.first_column)}
    | ENTERO  {$$ = new Dato($1,'INT', this._$.first_line, this._$.first_column)} 
    | CADENA  {$$ = new Dato($1,'VARCHAR', this._$.first_line, this._$.first_column)}
    | TRUE    {$$ = new Dato($1,'BOOLEAN', this._$.first_line, this._$.first_column)}
    | FALSE   {$$ = new Dato($1,'BOOLEAN', this._$.first_line, this._$.first_column)}
    | FECHA   {$$ = new Dato($1,'DATE', this._$.first_line, this._$.first_column)}
    | NULL    {$$ = new Dato($1,'NULL', this._$.first_line, this._$.first_column)}
;

aritmetica
    : expresion MAS expresion {$$=new Aritmetica($1,'+',$3, this._$.first_line, this._$.first_column);}
    | expresion MENOS expresion {$$=new Aritmetica($1,'-',$3, this._$.first_line, this._$.first_column);}
    | expresion POR expresion {$$=new Aritmetica($1,'*',$3, this._$.first_line, this._$.first_column);}
    | expresion DIV expresion {$$=new Aritmetica($1,'/',$3, this._$.first_line, this._$.first_column);}
    | expresion MOD expresion {$$=new Aritmetica($1,'%',$3, this._$.first_line, this._$.first_column);}
;


logica
    :expresion OR expresion {$$=new Logica($1,'OR',$3);}
    |expresion AND expresion {$$=new Logica($1,'AND',$3);}
    |expresion EQUALS expresion {$$=new Logica($1,'==',$3);}
    |expresion NOTEQUALS expresion {$$=new Logica($1,'!=',$3);}
    |expresion MAYOR expresion {$$=new Logica($1,'>',$3);}
    |expresion MENOR expresion {$$=new Logica($1,'<',$3);}
    |expresion MAYORIGUAL expresion {$$=new Logica($1,'>=',$3);}
    |expresion MENORIGUAL expresion {$$=new Logica($1,'<=',$3);}
    
;


unario: MENOS expresion %prec UMINUS {$$=new Aritmetica($2,'-',null, this._$.first_line, this._$.first_column);}
       | NOT expresion {$$=new Logica($2,'NOT',null, this._$.first_line, this._$.first_column);}
;

