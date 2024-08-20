import express from "express";
import { ProductManager } from "./managers/productManager.js";
import { productsRouter } from "./routes/products.router.js";
import { CartManager } from "./managers/cartManager.js";
import { cartsRouter } from "./routes/carts.router.js";
import exphbs from 'express-handlebars';
import { viewsRouter } from "./routes/views.router.js";
import { Server } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 8080;
const app = express();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

export const productManager = new ProductManager();
export const cartManager = new CartManager();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})

const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se conecto");
    
    socket.emit("productos", await productManager.getProducts());

    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);

        io.socket.emit("productos", await productManager.getProducts);
    })
})