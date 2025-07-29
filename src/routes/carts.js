import express from "express";
import CartManager from "../dao/fs/cart-manager.js";

const router = express.Router();
const cartManager = new CartManager("./src/data/carts.json");

router.post("/", async (req, res) => {
    const nuevo = await cartManager.crearCarrito();
    res.json(nuevo);
});

router.get("/:cid", async (req, res) => {
    const carrito = await cartManager.getCarritoById(parseInt(req.params.cid));
    res.json(carrito.products);
});

router.post("/:cid/product/:pid", async (req, res) => {
    const actualizado = await cartManager.agregarProductoAlCarrito(parseInt(req.params.cid), req.params.pid);
    res.json(actualizado.products);
});

export default router;