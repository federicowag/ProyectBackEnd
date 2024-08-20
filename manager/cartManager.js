import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export const readCartsFile = async (path) => {
    const response = await fs.readFile(path, "utf8");
    return JSON.parse(response);
};

export const writeCartsFile = async (path, data) => {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
};

export class CartManager {
    constructor() {
        this.path = "./data/cart.json";
        this.carts = [];
    }

    getCarts = async () => {
        return await readCartsFile(this.path);
    };

    getCartProducts = async (id) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === id);
        if (cart) {
            return cart.products;
        } else {
            console.log("Carrito no encontrado");
            return [];
        }
    };

    newCart = async () => {
        const id = uuidv4();
        const newCart = { id, products: [] };

        this.carts = await this.getCarts();
        this.carts.push(newCart);

        await writeCartsFile(this.path, this.carts);
        return newCart;
    };

    addProductToCart = async (cart_id, product_id) => {
        const carts = await this.getCarts();
        const index = carts.findIndex(cart => cart.id === cart_id);

        if (index !== -1) {
            const cartProducts = await this.getCartProducts(cart_id);
            const existingProductIndex = cartProducts.findIndex(product => product.product_id === product_id);

            if (existingProductIndex !== -1) {
                cartProducts[existingProductIndex].quantity += 1;
            } else {
                cartProducts.push({ product_id, quantity: 1 });
            }

            carts[index].products = cartProducts;
            await writeCartsFile(this.path, carts);
            console.log("Producto agregado con éxito");
        } else {
            console.log("Carrito no encontrado");
        }
    };
}