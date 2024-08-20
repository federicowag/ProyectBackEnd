import express from "express";
import { Router } from "express";
const router = express.Router();
import { ProductManager } from "../managers/productManager.js";
const manager = new ProductManager("./src/data/products.json");

const viewsRouter = Router();


router.get("/products", async (req, res) => {
    const productos = await manager.getProducts();

    res.render("home", {productos});
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
})

router.get('/products/add', (req, res) => {
    res.render('addProduct');
});


export { router as viewsRouter };