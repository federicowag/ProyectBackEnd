console.log("funciona");

const socket = io();

socket.on("productos", (data) => {
    renderProductos(data);
})

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.forEach(item => {
        const card = document.createElement("div");
        card.innerHTML = `<div class="card">
                          <p> ${item.id} </p>
                          <p> ${item.title} </p>
                          <p>$ ${item.price} </p>
                          <button class="button"> Eliminar </button>
                          </div>`

        contenedorProductos.appendChild(card);

        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id);

        })
    })
}

const eliminarProducto = (id) => {
socket.emit("eliminarProducto", id);
}