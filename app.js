import { promises as fs } from "fs";
import { encoding_for_model } from "tiktoken";

// Ajusta este nombre al archivo que tengas en la carpeta actual.
const RUTA_LIBRO = "./cien_anos_de_soledad.txt.txt";
const COSTO_POR_1000_TOKENS = 0.03; // USD por 1000 tokens (gpt-4 input).

async function contarTokens() {
    const encoding = encoding_for_model("gpt-4");

    let texto;
    try {
        texto = await fs.readFile(RUTA_LIBRO, "utf8");
    } catch (err) {
        if (err.code === "ENOENT") {
            console.error(
                `No se encontro el archivo ${RUTA_LIBRO}. Coloca el archivo en esta carpeta o cambia la ruta en app.js.`
            );
            return;
        }
        throw err;
    }

    const tokens = encoding.encode(texto);
    console.log(tokens); // Muestra el arreglo de tokens.
    console.log("Cantidad de tokens generados: " + tokens.length);

    const costoFinal = (tokens.length * COSTO_POR_1000_TOKENS) / 1000;
    console.log(`Costo estimado: ${costoFinal} USD.`);
}

contarTokens();
