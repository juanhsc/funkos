

let carrito
if (JSON.parse(localStorage.getItem('carrito'))) {
  carrito = JSON.parse(localStorage.getItem('carrito'))
} else {
  localStorage.setItem('carrito', JSON.stringify([]))
  carrito = JSON.parse(localStorage.getItem('carrito'))
}

//ACA SE DECLARA LA VARIABLE PRODUCTOS

let productos; 
async function desplegarProductos() {
  // ACA SE CARGA LA VARIABLE PRODUCTOS
  let productosResponse = await fetch("./local.json");
  productos = await productosResponse.json();
  console.log(productos);

  for (let i = 0; i < productos.length; i++) {
    const element = productos[i]
    const { id, nombre, precio, img } = element
    const card = `
        <div class="card">
            <p class="nombre">${nombre}</p>
            <div>
                <img class='imgProducto' src=${img} alt=""/>
            </div>
            <div>
                <p class="precio">$${precio.toLocaleString()}</p>
            </div>
            <div class="btn-container">
                <button id=${id} class='btnAgregar'>AGRGEGAR</button>
            </div>
        </div>`
    const container = document.getElementById('container')
    container.innerHTML += card
  }

  const btnAgregar = document.getElementsByClassName('btnAgregar')

  for (let i = 0; i < btnAgregar.length; i++) {
    const element = btnAgregar[i]
    element.addEventListener('click', agregarAlCarrito)//even listener que agrega al carrito cuando se hace click
  }
}

desplegarProductos() //llama a la funcion

function agregarAlCarrito(e) { //la e es de evento 
  const btn = e.target;
  const id = btn.getAttribute('id');
  const prodEncontrado = productos.find((item) => item.id == id)
  const enCarrito = carrito.find((prod) => prod.id == prodEncontrado.id)
  console.log(enCarrito);//muestra en el log

  if (!enCarrito) {
    carrito.push({ ...prodEncontrado, cantidad: 1 })
  } else {
    let carritoFiltrado = carrito.filter((prod) => prod.id != enCarrito.id)
    carrito = [
      ...carritoFiltrado,
      { ...enCarrito, cantidad: enCarrito.cantidad + 1 },
    ]
  }
  console.log(carrito)//muestra en el log

  localStorage.setItem('carrito', JSON.stringify(carrito))
  // contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
  
}
// const contador = document.getElementById('cartCounter')
// contador.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)


