
const abrirCarrito = document.getElementById('abrir-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');

const carritoSidebar = document.getElementById('carrito-sidebar');
const carritoOverlay = document.getElementById('carrito-overlay');

const botonesAgregar = document.querySelectorAll('.btn-agregar');

const carritoLista = document.getElementById('carrito-lista-items');

const contadorNav = document.getElementById('contador-nav');

const totalPrecio = document.getElementById('total-precio');

const carritoVacio = document.getElementById('carrito-vacio-msg');

let carrito = [];

/* ABRIR CARRITO */

abrirCarrito.addEventListener('click', () => {
    carritoSidebar.classList.add('open');
    carritoOverlay.style.display = 'block';
});

/* CERRAR CARRITO */

cerrarCarrito.addEventListener('click', cerrarSidebar);

carritoOverlay.addEventListener('click', cerrarSidebar);

function cerrarSidebar(){
    carritoSidebar.classList.remove('open');
    carritoOverlay.style.display = 'none';
}

/* AGREGAR PRODUCTOS */

botonesAgregar.forEach(btn => {

    btn.addEventListener('click', () => {

        const nombre = btn.dataset.nombre;
        const precio = Number(btn.dataset.precio);

        carrito.push({
            nombre,
            precio
        });

        actualizarCarrito();
    });

});

/* ACTUALIZAR CARRITO */

function actualizarCarrito(){

    carritoLista.innerHTML = '';

    if(carrito.length === 0){

        carritoVacio.style.display = 'block';

    } else {

        carritoVacio.style.display = 'none';

    }

    let total = 0;

    carrito.forEach((producto, index) => {

        total += producto.precio;

        const li = document.createElement('li');

        li.classList.add('carrito-item');

        li.innerHTML = `
            <div class="carrito-item-info">
                <h4>${producto.nombre}</h4>
                <p>$${producto.precio.toLocaleString('es-CL')}</p>
            </div>

            <button class="btn-remove-item" onclick="eliminarProducto(${index})">
                ❌
            </button>
        `;

        carritoLista.appendChild(li);

    });

    contadorNav.textContent = carrito.length;

    totalPrecio.textContent = `$${total.toLocaleString('es-CL')}`;
}

/* ELIMINAR PRODUCTO */

function eliminarProducto(index){

    carrito.splice(index, 1);

    actualizarCarrito();
}

/* WHATSAPP */

document.getElementById('btn-whatsapp')
.addEventListener('click', () => {

    if(carrito.length === 0){

        alert('Tu carrito está vacío');

        return;
    }

    let mensaje = 'Hola, quiero comprar:%0A%0A';

    carrito.forEach(producto => {

        mensaje += `• ${producto.nombre} - $${producto.precio}%0A`;

    });

    const total = carrito.reduce((acc, item) => acc + item.precio, 0);

    mensaje += `%0ATotal: $${total.toLocaleString('es-CL')}`;

    window.open(`https://wa.me/56912345678?text=${mensaje}`, '_blank');
});

