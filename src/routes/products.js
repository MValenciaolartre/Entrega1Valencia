import express from "express";
import ProductManager from "../dao/fs/product-manager.js";

const router = express.Router();
const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
    res.json(await productManager.getAll());
});

router.get("/:pid", async (req, res) => {
    const producto = await productManager.getById(parseInt(req.params.pid));
    producto ? res.json(producto) : res.status(404).json({ error: "Producto no encontrado" });
});

router.post("/", async (req, res) => {
    const nuevo = await productManager.addProduct(req.body);
    res.status(201).json(nuevo);
});

router.put("/:pid", async (req, res) => {
    const actualizado = await productManager.updateProduct(parseInt(req.params.pid), req.body);
    actualizado ? res.json(actualizado) : res.status(404).json({ error: "Producto no encontrado" });
});

router.delete("/:pid", async (req, res) => {
    await productManager.deleteProduct(parseInt(req.params.pid));
    res.json({ mensaje: "Producto eliminado" });
});

export default router;