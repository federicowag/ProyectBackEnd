const express = require('express');
const { readCartsFile, writeCartsFile } = require('./manager/cart-manager'); // Ajusta la ruta

const app = express();
const port = 3000;

app.use(express.json()); 

app.post('/update-cart', async (req, res) => {
    try {
        const cartData = req.body;

        const currentData = await readCartsFile();


        const updatedData = { ...currentData, ...cartData };


        await writeCartsFile(updatedData);

        res.status(200).json({ message: 'Carrito actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
