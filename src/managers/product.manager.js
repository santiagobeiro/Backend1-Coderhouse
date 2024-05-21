import fs from 'fs';

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(productsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    }

    async #getMaxId() {
        let maxId = 0;
        const products = await this.getProducts();
        products.map((prod) => {
            if (prod.id > maxId) maxId = prod.id;
        });
        return maxId;
    }

    async createProduct(obj) {
        try {
            const product = {
                id: (await this.#getMaxId()) + 1,
                status: true,
                ...obj,
            };
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const prod = products.find(p => p.id === id);
            if (!prod) return false;
            return prod;
        } catch (error) {
            console.log(error);
        }
    }
    
    async getProductsByLimit(limit) {
        try {
            const products = await this.getProducts();
            if (!limit || limit >= products.length) return products;
            else return products.slice(0, limit);
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(obj, id) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(prod => prod.id === id);
            if (index === -1) return false;
            else {
                const prodUpdt = { ...obj, id };
                products[index] = prodUpdt;
            }
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }

    async #readProducts() {  //Obtengo la informacion del JSON, de no existir devuelvo un array vacio - De esta manera puedo reutilizar esta parte de codigo en otros metodos
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(data);
            }
            return []
        } catch (error) {
            return [];
        }
    }

    async deleteProducts(ids) { // Obtengo los productos del JSON, utilizo un filter y como callback un includes para descargar los productos cuyo ID esten en el array "ids" que se recibe como parametro
        try {
            const products = await this.#readProducts();
            const newProducts = products.filter(product => !ids.includes(product.id)); // De esta manera genero un nuevo array con los productos que no quiero eliminar

            if (newProducts.length < products.length) { //Si los tamaños entre el original y el nuevo array son distintos entonces guardo la nueva informacion en el JSON
                await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2), 'utf-8');
                return newProducts
            } else {
                console.log('Productos no encontrados');
            }
        } catch (error) {
            console.log(error);
        }
    }

}

