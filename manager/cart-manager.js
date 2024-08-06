const fs = require('fs').promises;
const path = require('path');

const cartsFilePath = path.join(__dirname, '../data/carrito.json');

const readCartsFile = async () => {
    try {
        const data = await fs.readFile(cartsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        throw error; 
    }
};

const writeCartsFile = async (data) => {
    try {
        await fs.writeFile(cartsFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing file:', error);
        throw error; 
    }
};

module.exports = { readCartsFile, writeCartsFile };