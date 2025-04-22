const agregarProducto = (id) => {
  if (!localStorage.getItem("compras")) {
    localStorage.setItem("compras", JSON.stringify([]))
  }
  const productos = JSON.parse(localStorage.getItem('productos'))
  const compras = JSON.parse(localStorage.getItem('compras'))
  const index = productos.findIndex((objeto => objeto.id === id))
  if (index !== -1) {
    const indexCompras = compras.findIndex((objeto => objeto.id === id))
    if (indexCompras !== -1) {
      compras[indexCompras].cantidad += 1
    } else {
      compras.push({ ...productos[index], "cantidad": 1 })
    }
    localStorage.setItem("compras", JSON.stringify(compras))
  }
  mostrarAlerta("Producto agregado exitosamente")
}

const eliminarProducto = (id) => {
  const compras = JSON.parse(localStorage.getItem('compras'))
  const indexCompras = compras.findIndex((objeto => objeto.id === id))
  if (indexCompras !== -1) {
    compras[indexCompras].cantidad !== 1 ? compras[indexCompras].cantidad -= 1 : compras.splice(indexCompras, 1)
  }
  localStorage.setItem("compras", JSON.stringify(compras))
  mostrarAlerta("Carrtio de compras modificado")
  mostrarCarrito()
}

const mostrarCarrito = () => {
  const contenedor = document.getElementById('carroCompras')
  contenedor.innerHTML = ''

  const compras = JSON.parse(localStorage.getItem('compras')) || []

  if (compras.length === 0) {
    contenedor.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>'
    return
  }

  compras.forEach(producto => {
    const item = document.createElement('div')
    item.classList.add('mb-3', 'd-flex', 'justify-content-between', 'align-items-start')

    item.innerHTML = `
    <div class="d-flex w-100 align-items-center">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="me-3 rounded" style="width: 60px; height: 60px; object-fit: cover;">
      <div class="flex-grow-1">
        <h6 class="mb-1">${producto.nombre}</h6>
        <p class="mb-1">Cantidad: ${producto.cantidad}</p>
        <p class="mb-1">Precio: ${producto.precio}</p>
      </div>
      <button class="btn btn-sm btn-danger ms-2" onclick="eliminarProducto(${producto.id})">Quitar</button>
    </div>
    `

    contenedor.appendChild(item)
  })
}
