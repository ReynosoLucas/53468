import AnalizadorVisitor from './generated/AnalizadorVisitor.js';

export default class CustomVisitor extends AnalizadorVisitor {
    visitPrograma(ctx) {
        let code = "";
        for (let i = 0; i < ctx.instruccion().length; i++) {
            code += this.visit(ctx.instruccion(i)) + "\n";
        }
        return code;
    }

    visitInstruccion(ctx) {
        return this.visit(ctx.seleccion());
    }

    visitSeleccion(ctx) {
        const expresion = this.visit(ctx.expresion());
        let code = `switch (${expresion}) {\n`;
        
        for (let i = 0; i < ctx.caso().length; i++) {
            code += this.visit(ctx.caso(i));
        }

        if (ctx.caso_defecto()) {
            code += this.visit(ctx.caso_defecto());
        }

        code += "}\n";
        return code;
    }

    visitCaso(ctx) {
        const constante = this.visit(ctx.constante());
        let code = `  case ${constante}:\n`;
        
        for (let i = 0; i < ctx.sentencia().length; i++) {
            code += this.visit(ctx.sentencia(i));
        }
        
        code += "    break;\n";
        return code;
    }

    visitCaso_defecto(ctx) {
        let code = "  default:\n";
        for (let i = 0; i < ctx.sentencia().length; i++) {
            code += this.visit(ctx.sentencia(i));
        }
        code += "    break;\n";
        return code;
    }

    visitSentencia(ctx) {
        let code = "";
        if (ctx.salida().length > 0) {
            for (let i = 0; i < ctx.salida().length; i++) {
                code += this.visit(ctx.salida(i));
            }
        } else if (ctx.terminar()) {
            code += this.visit(ctx.terminar());
        }
        return code;
    }

    visitSalida(ctx) {
        const cadena = ctx.CADENA().getText();
        return `    console.log(${cadena});\n`;
    }

    visitTerminar(ctx) {
        return "    process.exit();\n";
    }

    visitExpresion(ctx) {
        return this.visit(ctx.constante());
    }

    visitConstante(ctx) {
        return ctx.getText();
    }
}