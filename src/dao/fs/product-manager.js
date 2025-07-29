import { promises as fs } from "fs";

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.lastId = 0;
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, "utf8");
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.lastId = Math.max(...this.products.map(p => p.id));
            }
        } catch {
            this.products = [];
            await this.saveProducts();
        }
    }

    async saveProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }

    async getAll() {
        return this.products;
    }

    async getById(id) {
        return this.products.find(p => p.id === id);
    }

    async addProduct(product) {
        const newProduct = {
            id: ++this.lastId,
            ...product
        };
        this.products.push(newProduct);
        await this.saveProducts();
        return newProduct;
    }

    async updateProduct(id, updateFields) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;
        this.products[index] = { ...this.products[index], ...updateFields, id };
        await this.saveProducts();
        return this.products[index];
    }

    async deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        await this.saveProducts();
    }
}

export default ProductManager;