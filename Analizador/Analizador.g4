grammar Analizador;

// --- REGLAS SINTÁCTICAS ---
programa: instruccion+ EOF;
instruccion: seleccion;
seleccion: SEGUN expresion HACER LBRACE caso* caso_defecto? RBRACE FINSEGUN;
caso: CASO constante COLON sentencia+;
caso_defecto: DEFECTO COLON sentencia+;
sentencia: salida+ | terminar;
salida: IMPRIMIR LPAREN CADENA RPAREN SEMI;
terminar: SALIR SEMI;
expresion: constante;
constante: CADENA | NUMERO;

// --- REGLAS LÉXICAS (TOKENS) ---
SEGUN: 'según';
HACER: 'hacer';
FINSEGUN: 'finsegún';
CASO: 'caso';
DEFECTO: 'defecto';
IMPRIMIR: 'imprimir';
SALIR: 'salir';

LBRACE: '{';
RBRACE: '}';
COLON: ':';
LPAREN: '(';
RPAREN: ')';
SEMI: ';';

NUMERO: [0-9]+;
CADENA: '"' ~["]* '"';

// Ignorar espacios en blanco y saltos de línea
WS: [ \t\r\n]+ -> skip;