import express from "express";
import { ProductManager } from "./dao/db/product-manager-db.js";
import { productsRouter } from "./routes/products.router.js";
import { CartManager } from "./dao/db/cart-manager-db.js";
import { cartsRouter } from "./routes/carts.router.js";
import exphbs from 'express-handlebars';
import { viewsRouter } from "./routes/views.router.js";
import { Server } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./DB.js";

const PORT = 8080;
const app = express();

// Conexion con mongoDB
connectDB();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express handlebars
app.engine("handlebars", exphbs.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
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
    console.log("Un cliente se conectó");
    
    // Emitir productos actuales al nuevo cliente
    try {
        const products = await productManager.getProducts();
        socket.emit("productos", products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }

    // Manejar la eliminación de productos
    socket.on("eliminarProducto", async (id) => {
        console.log("ID recibido para eliminar desde socket:", id);
        try {
            await productManager.deleteProduct(id);
            // Emitir la lista actualizada de productos a todos los clientes conectados
            const updatedProducts = await productManager.getProducts();
            io.emit("productos", updatedProducts); // Emitir a todos los clientes conectados
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    });
});