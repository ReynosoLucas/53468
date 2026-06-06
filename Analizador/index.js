import fs from 'fs';
import antlr4 from 'antlr4';
import AnalizadorLexer from './generated/AnalizadorLexer.js';
import AnalizadorParser from './generated/AnalizadorParser.js';
import CustomVisitor from './CustomVisitor.js';

function main() {
    // Tomamos el archivo que el usuario pase como argumento, o usamos uno por defecto
    const filePath = process.argv[2] || 'input_correcto_1.txt';
    
    try {
        const input = fs.readFileSync(filePath, 'utf8');
        console.log(`\n--- PROCESANDO: ${filePath} ---`);
        
        const chars = antlr4.CharStreams.fromString(input);
        const lexer = new AnalizadorLexer(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        
        // Cargar tokens para la tabla
        tokens.fill();
        
        // 2. Tabla de lexemas-tokens
        console.log("\n[2] TABLA DE LEXEMAS-TOKENS");
        console.log("Lexema\t\t|\tToken");
        console.log("-----------------------------------");
        for (let token of tokens.tokens) {
            if (token.type !== antlr4.Token.EOF) {
                // CORRECCIÓN ACÁ: Buscamos en AnalizadorLexer en vez de lexer
                const tokenName = AnalizadorLexer.symbolicNames[token.type] || AnalizadorLexer.literalNames[token.type] || "TOKEN";
                // Formatear espacios y saltos de línea para que la tabla sea legible
                const lexemaText = token.text.replace(/\r?\n|\r/g, '\\n').replace(/\t/g, '\\t');
                console.log(`${lexemaText}\t\t|\t${tokenName}`);
            }
        }

        const parser = new AnalizadorParser(tokens);
        parser.buildParseTrees = true;
        
        // 1. Análisis léxico y sintáctico
        const tree = parser.programa();

        if (parser._syntaxErrors > 0) {
            console.error("\n[!] Error: Se encontraron errores de sintaxis en la entrada.");
        } else {
            console.log("\n[OK] Entrada válida. Análisis léxico y sintáctico exitoso.");

            // 3. Árbol de análisis sintáctico
            console.log("\n[3] ÁRBOL DE DERIVACIÓN (Formato Texto)");
            console.log(tree.toStringTree(parser.ruleNames || AnalizadorParser.ruleNames));

            // 4. Traducción e Interpretación
            console.log("\n[4] TRADUCCIÓN A JAVASCRIPT");
            const visitor = new CustomVisitor();
            const jsCode = visitor.visit(tree);
            console.log(jsCode);

            console.log("\n--- EJECUCIÓN DEL CÓDIGO ---");
            eval(jsCode);
        }
    } catch (error) {
        console.error("No se pudo procesar el archivo:", error.message);
    }
}

main();