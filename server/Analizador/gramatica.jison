
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
const Lista_Errores= require('../interprete/Estructuras/ListaErrores.js')
const Error= require('../interprete/Estructuras/Errores.js')
const Select= require('../interprete/instrucciones/Select.js')
const Lower= require('../interprete/instrucciones/Lower.js');
const Upper= require('../interprete/instrucciones/Upper.js');
const Round= require('../interprete/instrucciones/Round.js');
const Len= require('../interprete/instrucciones/Length.js');
const Truncate= require('../interprete/instrucciones/Truncate.js');
const Typeof= require('../interprete/instrucciones/Typeof.js');
const Columna=require('../interprete/Estructuras/Columna.js');
const Create=require('../interprete/expresiones/Create.js');
const Add=require('../interprete/expresiones/Add.js');
const DropColumn=require('../interprete/expresiones/DropColumn.js');
const Rename=require('../interprete/expresiones/Rename.js');
const RenameColumn=require('../interprete/expresiones/RenameColumn.js');
const DropTable=require('../interprete/expresiones/DropTable.js');
const Insert=require('../interprete/expresiones/Insert.js');
const SelectColumn=require('../interprete/instrucciones/SelectColumn.js');
const SelectTable=require('../interprete/instrucciones/SelectTable.js');
const SelectAs=require('../interprete/instrucciones/SelectAs.js');
const TruncateTable=require('../interprete/instrucciones/TruncateTable.js');
const SelectWhere=require('../interprete/instrucciones/SelectWhere.js');
const If=require('../interprete/instrucciones/If.js');
const IfElse=require('../interprete/instrucciones/IfElse.js');
const While=require('../interprete/instrucciones/while.js');
const Cast=require('../interprete/instrucciones/Cast.js');
const Condicion=require('../interprete/expresiones/condicion.js');
const For=require('../interprete/instrucciones/For.js');
const Update=require('../interprete/instrucciones/Update.js');
const Delete=require('../interprete/instrucciones/Delete.js');
const Break=require('../interprete/expresiones/Break.js');
const Continue=require('../interprete/expresiones/Continue.js');
const When=require('../interprete/expresiones/When.js');
const CaseSimple=require('../interprete/expresiones/CaseSimple.js');
const CaseBuscado=require('../interprete/expresiones/CaseBuscado.js');
const Function=require('../interprete/expresiones/Function.js');
const Procedure=require('../interprete/expresiones/Procedure.js');
const CallFunction=require('../interprete/expresiones/CallFunction.js');
const CallProcedure=require('../interprete/expresiones/CallProcedure.js');
const SelectAllTable=require('../interprete/instrucciones/SelectAllTable.js');
let condicion=[];
%}



// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares

decimal ([0-9]+)"."([0-9]+)
entero  [0-9]+
comentario "--".*
mcomentario [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // se saco de https://github.com/jd-toralla/OLC1-1S2023/blob/main/JisonInterprete/src/Grammar/Grammar.jison}
fecha (\"[0-9]{4}"-"([0][1-9]|[1][0-2])"-"([0-2][0-9]|[3][0-1])\")|(\'[0-9]{4}"-"([0][1-9]|[1][0-2])"-"([0-2][0-9]|[3][0-1])\')
cadena (\"(\\.|[^\\"])*\") | (\'(\\.|[^\\'])*\')// se saco de https://github.com/jd-toralla/OLC1-1S2023/blob/main/JisonInterprete/src/Grammar/Grammar.jison
id ([a-zA-Z_])[a-zA-Z0-9_ñÑ]*
variable ("@"[a-zA-Z_][a-zA-Z0-9_]*)
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
'>='         {  Lista_Tokens.push(new Token("MAYORIGUAL", yytext, yylloc.first_line, yylloc.first_column));
                return 'MAYORIGUAL'}
'<='         {  Lista_Tokens.push(new Token("MENORIGUAL", yytext, yylloc.first_line, yylloc.first_column));
                return 'MENORIGUAL'}

'>'          {  Lista_Tokens.push(new Token("MAYOR", yytext, yylloc.first_line, yylloc.first_column));
                return 'MAYOR'}
'<'          {  Lista_Tokens.push(new Token("MENOR", yytext, yylloc.first_line, yylloc.first_column));
                return 'MENOR'}
'='          {  Lista_Tokens.push(new Token("IGUAL", yytext, yylloc.first_line, yylloc.first_column));
                return 'IGUAL'} 


        
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

'CREATE'       {Lista_Tokens.push(new Token("CREATE", yytext, yylloc.first_line, yylloc.first_column));
                return 'CREATE'}

'TABLE'        {Lista_Tokens.push(new Token("TABLE", yytext, yylloc.first_line, yylloc.first_column));
                return 'TABLE'}

'ALTER'        {Lista_Tokens.push(new Token("ALTER", yytext, yylloc.first_line, yylloc.first_column));
                return 'ALTER'}

'ADD'           {Lista_Tokens.push(new Token("ADD", yytext, yylloc.first_line, yylloc.first_column));
                return 'ADD'}

'DROP'          {Lista_Tokens.push(new Token("DROP", yytext, yylloc.first_line, yylloc.first_column));
                return 'DROP'}

'COLUMN'        {Lista_Tokens.push(new Token("COLUMN", yytext, yylloc.first_line, yylloc.first_column));
                return 'COLUMN'}

'RENAME'        {Lista_Tokens.push(new Token("RENAME", yytext, yylloc.first_line, yylloc.first_column));
                return 'RENAME'}

'TO'            {Lista_Tokens.push(new Token("TO", yytext, yylloc.first_line, yylloc.first_column));
                return 'TO'}

'INSERT'        {Lista_Tokens.push(new Token("INSERT", yytext, yylloc.first_line, yylloc.first_column));
                return 'INSERT'}

'INTO'          {Lista_Tokens.push(new Token("INTO", yytext, yylloc.first_line, yylloc.first_column));
                return 'INTO'}

'VALUES'        {Lista_Tokens.push(new Token("VALUES", yytext, yylloc.first_line, yylloc.first_column));
                return 'VALUES'}

'FROM'          {Lista_Tokens.push(new Token("FROM", yytext, yylloc.first_line, yylloc.first_column));
                return 'FROM'}

'AS'            {Lista_Tokens.push(new Token("AS", yytext, yylloc.first_line, yylloc.first_column));
                return 'AS'}

'WHERE'         {Lista_Tokens.push(new Token("WHERE", yytext, yylloc.first_line, yylloc.first_column));
                return 'WHERE'}   

'IF'            {Lista_Tokens.push(new Token("IF", yytext, yylloc.first_line, yylloc.first_column));
                return 'IF'}

'THEN'          {Lista_Tokens.push(new Token("THEN", yytext, yylloc.first_line, yylloc.first_column));
                return 'THEN'}

'ELSE'          {Lista_Tokens.push(new Token("ELSE", yytext, yylloc.first_line, yylloc.first_column));
                return 'ELSE'}

'WHILE'         {Lista_Tokens.push(new Token("WHILE", yytext, yylloc.first_line, yylloc.first_column));
                return 'WHILE'}


'CAST'          {Lista_Tokens.push(new Token("CAST", yytext, yylloc.first_line, yylloc.first_column));
                return 'CAST'}  

'FOR'           {Lista_Tokens.push(new Token("FOR", yytext, yylloc.first_line, yylloc.first_column));
                return 'FOR'}

'IN'            {Lista_Tokens.push(new Token("IN", yytext, yylloc.first_line, yylloc.first_column));
                return 'IN'}

'..'            {Lista_Tokens.push(new Token("RANGO", yytext, yylloc.first_line, yylloc.first_column));
                return 'RANGO'}

'UPDATE'       {Lista_Tokens.push(new Token("UPDATE", yytext, yylloc.first_line, yylloc.first_column));
                return 'UPDATE'}

'DELETE'       {Lista_Tokens.push(new Token("DELETE", yytext, yylloc.first_line, yylloc.first_column));
                return 'DELETE'}

'BREAK'        {Lista_Tokens.push(new Token("BREAK", yytext, yylloc.first_line, yylloc.first_column));
                return 'BREAK'}

'CONTINUE'     {Lista_Tokens.push(new Token("CONTINUE", yytext, yylloc.first_line, yylloc.first_column));
                return 'CONTINUE'} 

'CASE'         {Lista_Tokens.push(new Token("CASE", yytext, yylloc.first_line, yylloc.first_column));
                return 'CASE'}

'WHEN'          {Lista_Tokens.push(new Token("WHEN", yytext, yylloc.first_line, yylloc.first_column));
                return 'WHEN'}

'FUNCTION'      {Lista_Tokens.push(new Token("FUNCTION", yytext, yylloc.first_line, yylloc.first_column));
                return 'FUNCTION'}

'RETURNS'       {Lista_Tokens.push(new Token("RETURNS", yytext, yylloc.first_line, yylloc.first_column));
                return 'RETURNS'}

'RETURN'        {Lista_Tokens.push(new Token("RETURN", yytext, yylloc.first_line, yylloc.first_column));
                return 'RETURN'} 

'PROCEDURE'     {Lista_Tokens.push(new Token("PROCEDURE", yytext, yylloc.first_line, yylloc.first_column));
                return 'PROCEDURE'}             

'CALL'          {Lista_Tokens.push(new Token("CALL", yytext, yylloc.first_line, yylloc.first_column));
                return 'CALL'}

{cadena}        {Lista_Tokens.push(new Token("CADENA", yytext, yylloc.first_line, yylloc.first_column));
                return 'CADENA'; }
{decimal}       { Lista_Tokens.push(new Token("DECIMAL", yytext, yylloc.first_line, yylloc.first_column));
                return 'DECIMAL'; }	
{entero}        { Lista_Tokens.push(new Token("ENTERO", yytext, yylloc.first_line, yylloc.first_column));
                return 'ENTERO'; } 
// * ID

{id}            {Lista_Tokens.push(new Token("ID", yytext, yylloc.first_line, yylloc.first_column));
                return 'ID';}



// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}



// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { Lista_Errores.push(new Error("Lexico", "Carater no reconocido "+yytext, yylloc.first_line, yylloc.first_column));
    ConsolaSalida.push('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column)  }


/lex
// ################## ANALIZADOR SINTACTICO ######################
// -------> Precedencia

%left 'OR'
%left 'AND'
%left 'NOT'
%left 'EQUALS' 'NOTEQUALS' 'MAYOR' 'MENOR' 'MAYORIGUAL' 'MENORIGUAL','IGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MOD'
%left UMINUS,IG
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
    | create PYC{$$=$1;}
    | alter PYC{$$=$1;}
    | insert PYC{$$=$1;}
    | truncate PYC{$$=$1;} 
    | update PYC{$$=$1;}   
    | delete PYC{$$=$1;}
    | if PYC{$$=$1;}
    | while PYC{$$=$1;}
    | for PYC{$$=$1;}
    | flow PYC{$$=$1;}
    | case PYC{$$=$1;}
    | function PYC  {$$=$1;}
    | procedure PYC {$$=$1;}
    | call PYC{$$=$1;}
    | case {$$=$1;}
	| error{
         Lista_Errores.push(new Error("Sintactico", `componente ${yytext} `, this._$.first_line,this._$.first_column));
        ConsolaSalida.push('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column)}
;

procedure:CREATE PROCEDURE ID listavariable AS BEGIN lista_instrucciones END{$$=new Procedure($3,new ListDeclaration($4),$7, this._$.first_line, this._$.first_column);}
         |CREATE PROCEDURE ID AS BEGIN lista_instrucciones END{$$=new Procedure($3,null,$6, this._$.first_line, this._$.first_column);}
;

call: CALL ID PARIZQ listaexpresion PARDER{$$=new CallProcedure($2,$4);}
    | CALL ID PARIZQ PARDER{$$=new CallProcedure($2,null);}
;

function
        :CREATE FUNCTION ID PARIZQ listavariable PARDER RETURNS tipo BEGIN lista_instrucciones RETURN expresion PYC END{$$=new Function($3,new ListDeclaration($5),$8,$10,$12, this._$.first_line, this._$.first_column);}
        |CREATE FUNCTION ID PARIZQ listavariable PARDER RETURNS tipo BEGIN RETURN expresion PYC END{$$=new Function($3,new ListDeclaration($5),$8,null,$11, this._$.first_line, this._$.first_column);}
        |CREATE FUNCTION ID PARIZQ  PARDER RETURNS tipo BEGIN lista_instrucciones RETURN expresion PYC END{$$=new Function($3,null,$7,$9,$11, this._$.first_line, this._$.first_column);}
        |CREATE FUNCTION ID PARIZQ  PARDER RETURNS tipo BEGIN RETURN expresion PYC END{$$=new Function($3,null,$7,null,$10, this._$.first_line, this._$.first_column);}
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


cast
   : CAST PARIZQ expresion AS tipo PARDER {$$=new Cast($3,$5);}
;
assigment
         :SET VARIABLE IGUAL expresion {$$=new Assigment($2,$4);}
;

select
    : SELECT expresion {$$=new Select($2);}
    | SELECT listaid FROM ID {$$=new SelectColumn($2,$4);}
    | SELECT POR FROM ID {$$=new SelectTable($4);}
    | SELECT expresion AS ID{$$=new SelectAs($2,$4);}
    | SELECT listaid FROM ID WHERE expresion{$$=new SelectWhere($2,$4,$6,condicion);condicion=[];} 
    | SELECT POR FROM ID WHERE expresion{$$=new SelectAllTable($4,$6,condicion);condicion=[];}
;


delete:DELETE FROM ID WHERE expresion{$$=new Delete($3,$5,condicion);condicion=[];}
;

update
      :UPDATE ID SET lista_seteo WHERE expresion{$$=new Update($2,$4,$6,condicion);condicion=[];}
;

lista_seteo: lista_seteo COMA ID IGUAL expresion {$$=$1; $$.set($3,$5);}
            | ID IGUAL expresion {$$=new Map(); $$.set($1,$3);}
;

declare : DECLARE listavariable {$$=new ListDeclaration($2, this._$.first_line, this._$.first_column);}
        | DECLARE VARIABLE tipo DEFAULT expresion{$$=new Declaration($2,$5,$3, this._$.first_line, this._$.first_column);}
;

create: CREATE TABLE ID PARIZQ listacolumnas PARDER {$$=new Create($3,$5, this._$.first_line, this._$.first_column);}
;

truncate: TRUNCATE TABLE ID {$$=new TruncateTable($3);}
;

listacolumnas:listacolumnas COMA columna {$$=$1; $$.push($3);}
            | columna {$$=[]; $$.push($1);}
;

columna: ID tipo {$$=new Columna($1,$2);}
;

alter
     : ALTER TABLE ID ADD ID tipo{$$=new Add($3,$5,$6);}
     | ALTER TABLE ID DROP COLUMN ID {$$=new DropColumn($3,$6);}
     | ALTER TABLE ID RENAME TO ID {$$=new Rename($3,$6);}
     | ALTER TABLE ID RENAME COLUMN ID TO ID {$$=new RenameColumn($3,$6,$8);}
     | DROP TABLE ID {$$=new DropTable($3);}
;

insert:INSERT INTO ID PARIZQ listaid PARDER VALUES PARIZQ listaexpresion PARDER {$$=new Insert($3,$5,$9);}
;


listaid:  listaid COMA ID {$$=$1; $$.push($3);}
        | ID {$$=[]; $$.push($1);}
;

listaexpresion: listaexpresion COMA expresion {$$=$1; $$.push($3);}
        | expresion {$$=[]; $$.push($1);}
;

listavariable
    : listavariable COMA VARIABLE tipo {$$=$1; $$.push(new Declaration($3,new Dato($1,'NULL', this._$.first_line, this._$.first_column),$4));}
    | VARIABLE tipo {$$=[]; $$.push(new Declaration($1,new Dato($1,'NULL', this._$.first_line, this._$.first_column),$2));}
;

if
    : IF expresion THEN lista_instrucciones END IF{$$=new If($2,$4);}
    | IF expresion THEN lista_instrucciones ELSE lista_instrucciones END IF{$$=new IfElse($2,$4,$6);}
;


for
    : FOR VARIABLE IN expresion RANGO expresion BEGIN lista_instrucciones END {$$=new For($2,$4,$6,$8);}
;

while
    : WHILE expresion BEGIN lista_instrucciones END {$$=new While($2,$4);}
;

case
    : CASE VARIABLE lista_when ELSE expresion END{$$=new CaseSimple($2,$3,$5);}
    | CASE lista_when ELSE expresion END{$$=new CaseBuscado($2,$4);}
;

lista_when
    : lista_when WHEN expresion THEN expresion {$$=$1; $$.push(new When($3,$5));}
    | WHEN expresion THEN expresion {$$=[]; $$.push(new When($2,$4));}
;


flow: BREAK {$$=new Break($1,this._$.first_line, this._$.first_column);}
    | CONTINUE {$$=new Continue($1,this._$.first_line, this._$.first_column);}
;

tipo: INT{$$=$1;}
    | DOUBLE{$$=$1;}
    | DATE{$$=$1;}
    | VARCHAR{$$=$1;}
    | BOOLEAN{$$=$1;}
;

expresion :   symbols{$$=$1}
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
    | cast    {$$=$1}
    | PARIZQ ID PARDER{$$=new Access($2, this._$.first_line, this._$.first_column);}
    | case    {$$=$1;}
    | ID PARIZQ listaexpresion PARDER{$$=new CallFunction($1,$3);}
    | ID PARIZQ  PARDER{$$=new CallFunction($1,null);}
;

aritmetica
    : expresion MAS expresion {$$=new Aritmetica($1,'+',$3, this._$.first_line, this._$.first_column);}
    | expresion MENOS expresion {$$=new Aritmetica($1,'-',$3, this._$.first_line, this._$.first_column);}
    | expresion POR expresion {$$=new Aritmetica($1,'*',$3, this._$.first_line, this._$.first_column);}
    | expresion DIV expresion {$$=new Aritmetica($1,'/',$3, this._$.first_line, this._$.first_column);}
    | expresion MOD expresion {$$=new Aritmetica($1,'%',$3, this._$.first_line, this._$.first_column);}
;


logica
    :expresion OR expresion {$$=new Logica($1,'OR',$3, this._$.first_line, this._$.first_column);}
    |expresion AND expresion {$$=new Logica($1,'AND',$3, this._$.first_line, this._$.first_column);}
    |expresion EQUALS expresion {$$=new Logica($1,'==',$3, this._$.first_line, this._$.first_column);}
    |expresion IGUAL expresion {$$=new Logica($1,'==',$3, this._$.first_line, this._$.first_column);}
    |expresion NOTEQUALS expresion {$$=new Logica($1,'!=',$3, this._$.first_line, this._$.first_column);}
    |expresion MAYOR expresion {$$=new Logica($1,'>',$3, this._$.first_line, this._$.first_column);}
    |expresion MENOR expresion {$$=new Logica($1,'<',$3, this._$.first_line, this._$.first_column);}
    |expresion MAYORIGUAL expresion {$$=new Logica($1,'>=',$3, this._$.first_line, this._$.first_column);}
    |expresion MENORIGUAL expresion {$$=new Logica($1,'<=',$3, this._$.first_line, this._$.first_column);}
;


unario: MENOS expresion %prec UMINUS {$$=new Aritmetica($2,'-',null, this._$.first_line, this._$.first_column);}
       | NOT expresion {$$=new Logica($2,'NOT',null, this._$.first_line, this._$.first_column);}
       | ID operadores expresion %prec IG {let c=new Condicion($1,$2,$3);condicion.push(c);$$=c;}
;

operadores: IGUAL      {$$=$1;}
          | NOTEQUALS  {$$=$1;}
          | MAYOR      {$$=$1;}
          | MENOR      {$$=$1;}
          | MAYORIGUAL {$$=$1;}
          | MENORIGUAL {$$=$1;}
;
