
%{
const Dato = require('../interprete/expresiones/Dato.js');
const Print = require('../interprete/instrucciones/Print.js');
const Aritmetica = require('../interprete/expresiones/Aritmetica.js');
const Logica = require('../interprete/expresiones/Logica.js');
const Access = require('../interprete/expresiones/Access.js');
const BeginEnd= require('../interprete/instrucciones/BeginEnd.js');
const Declaration= require('../interprete/instrucciones/Declaration.js');
const Assigment= require('../interprete/expresiones/Assigment.js');
const ListDeclaration= require('../interprete/instrucciones/ListDeclaration.js');
const Token= require('../interprete/Estructuras/Tokens.js');
const Lista_Tokens= require('../interprete/Estructuras/ListaTokens.js')
const ConsolaSalida= require('../interprete/Estructuras/ConsoleOut.js')
const Select= require('../interprete/instrucciones/Select.js')
const Lower= require('../interprete/instrucciones/Lower.js');
const Upper= require('../interprete/instrucciones/Upper.js');
const Round= require('../interprete/instrucciones/Round.js');
const Len= require('../interprete/instrucciones/Length.js');
const Truncate= require('../interprete/instrucciones/Truncate.js');
const Typeof= require('../interprete/instrucciones/Typeof.js');

%}



// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares

decimal ([0-9]+)"."([0-9]+)
entero  [0-9]+
comentario "--".*
mcomentario [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // se saco de https://github.com/jd-toralla/OLC1-1S2023/blob/main/JisonInterprete/src/Grammar/Grammar.jison}
fecha \"[0-9]{4}"-"([0][1-9]|[1][0-2])"-"([0-2][0-9]|[3][0-1])\"
cadena (\"(\\.|[^\\"])*\") | (\'(\\.|[^\\'])*\')// se saco de https://github.com/jd-toralla/OLC1-1S2023/blob/main/JisonInterprete/src/Grammar/Grammar.jison
variable "@"[a-zA-Z_][a-zA-Z0-9_]*


%%
// -----> Reglas Lexicas


{comentario}             {/*no se hace nada*/}
{mcomentario}            {/*no se hace nada*/}
{fecha}                  {Lista_Tokens.push(new Token("FECHA", yytext, yylloc.first_line, yylloc.first_column));
                         return 'FECHA';}
{variable}               {Lista_Tokens.push(new Token("VARIABLE", yytext, yylloc.first_line, yylloc.first_column));
                         return 'VARIABLE';}
'('          {Lista_Tokens.push(new Token("PARIZQ", yytext, yylloc.first_line, yylloc.first_column));
             return 'PARIZQ'}
')'          {Lista_Tokens.push(new Token("PARDER", yytext, yylloc.first_line, yylloc.first_column));
              return 'PARDER'}
';'          {Lista_Tokens.push(new Token("PYC", yytext, yylloc.first_line, yylloc.first_column));
              return 'PYC'}
','          {Lista_Tokens.push(new Token("COMA", yytext, yylloc.first_line, yylloc.first_column));
              return 'COMA'}

'+'          {Lista_Tokens.push(new Token("MAS", yytext, yylloc.first_line, yylloc.first_column));
              return 'MAS'}
'-'          {Lista_Tokens.push(new Token("MENOS", yytext, yylloc.first_line, yylloc.first_column));
              return 'MENOS'}
'*'          {  Lista_Tokens.push(new Token("POR", yytext, yylloc.first_line, yylloc.first_column));
                return 'POR'}
'/'          {  Lista_Tokens.push(new Token("DIV", yytext, yylloc.first_line, yylloc.first_column));
                return 'DIV'}
'%'          {  Lista_Tokens.push(new Token("MOD", yytext, yylloc.first_line, yylloc.first_column));
                return 'MOD'} 
'='          {  Lista_Tokens.push(new Token("IGUAL", yytext, yylloc.first_line, yylloc.first_column));
                return 'IGUAL'}         
'print'      {  Lista_Tokens.push(new Token("PRINT", yytext, yylloc.first_line, yylloc.first_column));
                return 'PRINT'}
'true'       {  Lista_Tokens.push(new Token("TRUE", yytext, yylloc.first_line, yylloc.first_column));
                return 'TRUE'}
'false'      {  Lista_Tokens.push(new Token("FALSE", yytext, yylloc.first_line, yylloc.first_column));
                return 'FALSE'}
'null'       {  Lista_Tokens.push(new Token("NULL", yytext, yylloc.first_line, yylloc.first_column));
                return 'NULL'}
'=='         {  Lista_Tokens.push(new Token("EQUALS", yytext, yylloc.first_line, yylloc.first_column));
                return 'EQUALS'}
'!='         {  Lista_Tokens.push(new Token("NOTEQUALS", yytext, yylloc.first_line, yylloc.first_column));
                return 'NOTEQUALS'}
'>'          {  Lista_Tokens.push(new Token("MAYOR", yytext, yylloc.first_line, yylloc.first_column));
                return 'MAYOR'}
'<'          {  Lista_Tokens.push(new Token("MENOR", yytext, yylloc.first_line, yylloc.first_column));
                return 'MENOR'}
'>='         {  Lista_Tokens.push(new Token("MAYORIGUAL", yytext, yylloc.first_line, yylloc.first_column));
                return 'MAYORIGUAL'}
'<='         {  Lista_Tokens.push(new Token("MENORIGUAL", yytext, yylloc.first_line, yylloc.first_column));
                return 'MENORIGUAL'}
'not'         {  Lista_Tokens.push(new Token("NOT", yytext, yylloc.first_line, yylloc.first_column));
                return 'NOT'}
'or'          {  Lista_Tokens.push(new Token("OR", yytext, yylloc.first_line, yylloc.first_column));
                return 'OR'}
'and'         {  Lista_Tokens.push(new Token("AND", yytext, yylloc.first_line, yylloc.first_column));
                return 'AND'}

'int'          {  Lista_Tokens.push(new Token("INT", yytext, yylloc.first_line, yylloc.first_column));
                return 'INT'}

'double'      {  Lista_Tokens.push(new Token("DOUBLE", yytext, yylloc.first_line, yylloc.first_column));
                return 'DOUBLE'}

'date'        {  Lista_Tokens.push(new Token("DATE", yytext, yylloc.first_line, yylloc.first_column));
                return 'DATE'}

'varchar'     {  Lista_Tokens.push(new Token("VARCHAR", yytext, yylloc.first_line, yylloc.first_column));
                return 'VARCHAR'}

'boolean'     {  Lista_Tokens.push(new Token("BOOLEAN", yytext, yylloc.first_line, yylloc.first_column));
                return 'BOOLEAN'}

'BEGIN'      {  Lista_Tokens.push(new Token("BEGIN", yytext, yylloc.first_line, yylloc.first_column));
                return 'BEGIN'}
'END'        {  Lista_Tokens.push(new Token("END", yytext, yylloc.first_line, yylloc.first_column));
                return 'END'}
'LOWER'      {  Lista_Tokens.push(new Token("LOWER", yytext, yylloc.first_line, yylloc.first_column));
                return 'LOWER'}
'DECLARE'    {  Lista_Tokens.push(new Token("DECLARE", yytext, yylloc.first_line, yylloc.first_column));
                return 'DECLARE'}
'SET'         {  Lista_Tokens.push(new Token("SET", yytext, yylloc.first_line, yylloc.first_column));
                return 'SET'}

'DEFAULT'     {  Lista_Tokens.push(new Token("DEFAULT", yytext, yylloc.first_line, yylloc.first_column));
                return 'DEFAULT'}

'SELECT'      {  Lista_Tokens.push(new Token("SELECT", yytext, yylloc.first_line, yylloc.first_column));
                return 'SELECT'}

'UPPER'       {  Lista_Tokens.push(new Token("UPPER", yytext, yylloc.first_line, yylloc.first_column));
                return 'UPPER'}

'ROUND'       {  Lista_Tokens.push(new Token("ROUND", yytext, yylloc.first_line, yylloc.first_column));
                return 'ROUND'}

'LEN'          {Lista_Tokens.push(new Token("LEN", yytext, yylloc.first_line, yylloc.first_column));
                return 'LEN'}

'TRUNCATE'     {Lista_Tokens.push(new Token("TRUNCATE", yytext, yylloc.first_line, yylloc.first_column));
                return 'TRUNCATE'}

'TYPEOF'       {Lista_Tokens.push(new Token("TYPEOF", yytext, yylloc.first_line, yylloc.first_column));
                return 'TYPEOF'}

{cadena}        {Lista_Tokens.push(new Token("CADENA", yytext, yylloc.first_line, yylloc.first_column));
                return 'CADENA'; }
{decimal}       { Lista_Tokens.push(new Token("DECIMAL", yytext, yylloc.first_line, yylloc.first_column));
                return 'DECIMAL'; }	
{entero}        { Lista_Tokens.push(new Token("ENTERO", yytext, yylloc.first_line, yylloc.first_column));
                return 'ENTERO'; } 


// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}



// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { ConsolaSalida.push('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column)  }


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
	: print_instruccion PYC{$$=$1;}
    | begin_end PYC{$$=$1;}
    | declare PYC{$$=$1;}
    | assigment PYC{$$=$1;}
    | select PYC{$$=$1;}
	| error{ConsolaSalida.push('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column)}
;

print_instruccion
    : PRINT expresion {$$=new Print($2);}
;

begin_end
    : BEGIN lista_instrucciones END {$$=new BeginEnd($2);}
;

nativas
    : LOWER PARIZQ expresion PARDER {$$=new Lower($3);}
    | UPPER PARIZQ expresion PARDER {$$=new Upper($3);}
    | ROUND PARIZQ expresion COMA expresion PARDER {$$=new Round($3,$5,this._$.first_line, this._$.first_column);}
    | LEN PARIZQ expresion PARDER {$$=new Len($3);}
    | TRUNCATE PARIZQ expresion COMA expresion PARDER {$$=new Truncate($3,$5,this._$.first_line, this._$.first_column);}
    | TYPEOF PARIZQ expresion PARDER {$$=new Typeof($3);}
;


assigment
         :SET VARIABLE IGUAL expresion {$$=new Assigment($2,$4);}
;

select
    : SELECT expresion {$$=new Select($2);}
;

declare : DECLARE listavariable {$$=new ListDeclaration($2);}
        | DECLARE VARIABLE tipo DEFAULT expresion{$$=new Declaration($2,$5,$3);}
;

listavariable
    : listavariable COMA VARIABLE tipo {$$=$1; $$.push(new Declaration($3,new Dato($1,'NULL', this._$.first_line, this._$.first_column),$4));}
    | VARIABLE tipo {$$=[]; $$.push(new Declaration($1,new Dato($1,'NULL', this._$.first_line, this._$.first_column),$2));}
;
tipo: INT{$$=$1;}
    | DOUBLE{$$=$1;}
    | DATE{$$=$1;}
    | VARCHAR{$$=$1;}
    | BOOLEAN{$$=$1;}
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
    | FECHA   {$$ = new Dato($1,'DATE', this._$.first_line, this._$.first_column);}
    | VARIABLE{$$=  new Access($1, this._$.first_line, this._$.first_column);}
    | NULL    {$$ = new Dato($1,'NULL', this._$.first_line, this._$.first_column)}
    | nativas {$$=$1}
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

