import express from 'express';
import { promises as fs } from 'fs'; // Importar fs para usarlo en el POST
import { CartManager } from './manager/cartManager.js';

const app = express();
const port = 8080;

const cartManager = new CartManager();

app.use(express.json());

// Ruta GET para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API del carrito de compras');
});

app.post('/update-cart', async (req, res) => {
    try {
        const cartData = req.body;
        const currentData = await cartManager.getCarts();
        const updatedData = { ...currentData, ...cartData };
        await fs.writeFile(cartManager.path, JSON.stringify(updatedData));
        res.status(200).json({ message: 'Carrito actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
