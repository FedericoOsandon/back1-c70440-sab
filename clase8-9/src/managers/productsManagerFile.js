const fs = require('fs');
const path = require('path');

class ProductManagerFile {
    constructor(filePath) {
        this.filePath = path.resolve(filePath);

        // Verificar si el archivo existe, si no, crearlo
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]), 'utf8');
        }
    }

    // Leer archivo y parsear los datos
    async readFile() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Error leyendo el archivo: ${error.message}`);
        }
    }

    // Escribir datos en el archivo
    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            throw new Error(`Error escribiendo el archivo: ${error.message}`);
        }
    }

    // Crear un nuevo producto
    async create(product) {
        const products = await this.readFile();

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            ...product
        };

        products.push(newProduct);
        await this.writeFile(products);

        return newProduct;
    }

    // Obtener todos los productos
    async getProducts() {
        return await this.readFile();
    }

    // Obtener un producto por ID
    async getProduct(id) {
        const products = await this.readFile();
        return products.find(product => product.id === id) || null;
    }

    // Actualizar un producto por ID
    async updateProduct(id, updatedProduct) {
        const products = await this.readFile();
        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new Error(`Producto con ID ${id} no encontrado.`);
        }

        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        await this._writeFile(products);

        return products[productIndex];
    }

    // Eliminar un producto por ID
    async deleteProduct(id) {
        const products = await this.readFile();
        const filteredProducts = products.filter(product => product.id !== id);

        if (products.length === filteredProducts.length) {
            throw new Error(`Producto con ID ${id} no encontrado.`);
        }

        await this._writeFile(filteredProducts);
        return { message: `Producto con ID ${id} eliminado.` };
    }
}

module.exports = ProductManagerFile;
