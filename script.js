// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // 1. Matriz o Arreglo para almacenar los productos agregados
    let carrito = [];

    // 2. Elementos del DOM seleccionados
    const botonesComprar = document.querySelectorAll('.btn');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total');

    // 3. Escuchar clics en los botones de "Comprar"
    botonesComprar.forEach((boton) => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    // 4. Función para agregar producto al carrito
    function agregarAlCarrito(e) {
        const boton = e.target;
        // Obtenemos el contenedor padre del botón (la tarjeta)
        const card = boton.closest('.card');
        
        // Extraemos los datos del producto
        const nombre = card.querySelector('h3').textContent;
        const precioTexto = card.querySelector('p').textContent;
        
        // Limpiamos el precio convirtiendo "$5.990" en un número entero válido (5990)
        const precio = parseInt(precioTexto.replace('$', '').replace('.', '').trim());

        // Creamos el objeto del producto
        const producto = {
            id: Date.now(), // ID único basado en tiempo para poder borrar con precisión
            nombre: nombre,
            precio: precio
        };

        // Empujamos el producto al array del carro
        carrito.push(producto);

        // Actualizamos la interfaz gráfica
        actualizarInterfazCarrito();
    }

    // 5. Función para renderizar el carrito en pantalla y sumar el total
    function actualizarInterfazCarrito() {
        // Limpiamos la lista visual antes de redibujar
        listaCarrito.innerHTML = '';

        let sumaTotal = 0;

        // Si el carrito está vacío, mostramos un mensaje sutil
        if (carrito.length === 0) {
            listaCarrito.innerHTML = '<li>El carrito está vacío</li>';
        } else {
            // Recorremos los elementos actuales del carrito
            carrito.forEach((item) => {
                const li = document.createElement('li');
                
                // Formateamos el precio de vuelta a un string bonito de moneda
                const precioFormateado = '$' + item.precio.toLocaleString('es-CL');
                
                li.innerHTML = `
                    <span>🧼 ${item.nombre} - <strong>${precioFormateado}</strong></span>
                    <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
                `;
                
                listaCarrito.appendChild(li);
                sumaTotal += item.precio;
            });
        }

        // Actualizamos el elemento de texto del costo Total
        totalElemento.textContent = '$' + sumaTotal.toLocaleString('es-CL');

        // Volver a activar los escuchadores para los nuevos botones de eliminar generados
        asignarEventosEliminar();
    }

    // 6. Asignar los clics a los botones de eliminar individuales
    function asignarEventosEliminar() {
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach((boton) => {
            boton.addEventListener('click', (e) => {
                const idParaEliminar = parseInt(e.target.getAttribute('data-id'));
                // Filtramos el array para quitar el elemento seleccionado
                carrito = carrito.filter(item => item.id !== idParaEliminar);
                // Volvemos a actualizar los cambios en pantalla
                actualizarInterfazCarrito();
            });
        });
    }
});