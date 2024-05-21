import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Obtiene la ruta del directorio que contiene "public"
export const __dirname = dirname(fileURLToPath(import.meta.url));

