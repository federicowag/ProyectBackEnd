**Instrucciones para la visualización y gestión de productos en tiempo real:**

Para visualizar y eliminar productos en tiempo real, siga los siguientes pasos:

1. Asegúrese de haber instalado todas las dependencias del proyecto ejecutando en la consola:
   ```bash
   npm install
   ```
2. Inicie el servidor con el comando:
   ```bash
   npm run dev
   ```
3. Luego, diríjase a `http://localhost:8080/realtimeproducts` en su navegador. Aquí podrá ver la lista de productos y realizar eliminaciones en tiempo real.

Además, si desea agregar productos desde el front-end:

1. Vaya a `http://localhost:8080/products/add`.
2. Complete el formulario con la información del nuevo producto.
3. Una vez agregado el producto, regrese a la página de `realtimeproducts` y podrá ver el nuevo producto reflejado en la lista en tiempo real.

