import { Router } from "express";
import { productManager } from "../app.js";

const productsRouter = Router()

productsRouter.get("/", async (req, res) => {
    try {
        const {limit} = req.query;
        const products = await productManager.getProducts()

        if(limit){
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }else{
            return res.json(products)
        }
    } catch (error) {
        console.log(error);     
        res.send("Error al intentar recibir los productos")   
    }
})

productsRouter.get("/:pid", async (req, res) => {
    try {
        const {pid} = req.params;
        const products = await productManager.getProductsById(pid)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar recibir el producto con el id: ${pid}`)
        
    }
})

productsRouter.post("/", async (req, res) =>{
    try {
        const {title, description, price, code, stock, status, category} = req.body;

        const response = await productManager.addProduct({ title, description, price, code, stock, status, category })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar agregar producto`)
    }
})

productsRouter.put("/:pid", async (req, res) => {
    const {pid} = req.params;
    try {
        const {title, description, price, code, stock, status = true, category} = req.body; 
        const response = await productManager.updateProduct(pid, { title, description, price, code, stock, status, category })
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send(`Error al intentar editar producto con id ${pid}`)
        }
})

productsRouter.delete("/:pid", async (req, res) =>{
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(pid)
        res.send("Producto eliminado con exito")
    } catch (error) {
        console.log(error);
        res.send(`Error al eliminar el producto con id: ${pid}`)
    }
})


export {productsRouter}