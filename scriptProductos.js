/* listado generico de productos */
const productos = [
  {
    id: 1,
    nombre: "Balón de Fútbol Adidas",
    precio: "$120.000",
    imagen: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f5016ee6447d42e9bee6393a1291c423_9366/Balon_Fussballliebe_League_Blanco_IN9367_01_standard.jpg",
    descripcion: "Balón de fútbol de alta calidad, ideal para partidos profesionales y entrenamiento.",
    categoria: "Fútbol"
  },
  {
    id: 2,
    nombre: "Raqueta de Tenis Wilson",
    precio: "$480.000",
    imagen: "https://wilsonstore.com.co/wp-content/uploads/2024/05/64f57651e7f6dd11f39f8c27_thumbnail.jpg",
    descripcion: "Raqueta de tenis Wilson, diseñada para jugadores profesionales. Ligera y balanceada.",
    categoria: "Tenis"
  },
  {
    id: 3,
    nombre: "Zapatillas Running Nike Air",
    precio: "$600.000",
    imagen: "https://nikeco.vtexassets.com/arquivos/ids/785825-500-500?v=638732620941070000",
    descripcion: "Zapatillas de running Nike, diseñadas para ofrecer comodidad y resistencia en largas distancias.",
    categoria: "Running"
  },
  {
    id: 4,
    nombre: "Bicicleta de Montaña Trek",
    precio: "$3.200.000",
    imagen: "https://bikehouse.co/cdn/shop/products/MARLIN8GEN3.jpg?v=1677017217",
    descripcion: "Bicicleta de montaña Trek, ideal para rutas de senderismo y aventuras al aire libre.",
    categoria: "Ciclismo"
  },
  {
    id: 5,
    nombre: "Pesas de Mano PowerFit",
    precio: "$100.000",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51bzQTilTOL._AC_UL600_SR600,600_.jpg",
    descripcion: "Pesas de mano ajustables PowerFit, perfectas para entrenamientos en casa o en el gimnasio.",
    categoria: "Entrenamiento"
  },
  {
    id: 6,
    nombre: "Guantes de Boxeo Everlast",
    precio: "$200.000",
    imagen: "https://http2.mlstatic.com/D_NQ_NP_727675-MCO53985858953_022023-O.webp",
    descripcion: "Guantes de boxeo Everlast, diseñados para ofrecer máximo confort y protección durante los entrenamientos.",
    categoria: "Boxeo"
  },
  {
    id: 7,
    nombre: "Raqueta de Ping Pong Butterfly",
    precio: "$140.000",
    imagen: "https://mundodeportivo.com.co/wp-content/uploads/TBCF1000.jpg",
    descripcion: "Raqueta de ping pong Butterfly, ideal para jugadores intermedios que buscan precisión y control.",
    categoria: "Ping Pong"
  },
  {
    id: 8,
    nombre: "Pelota de Baloncesto Spalding",
    precio: "$160.000",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQdvkJNpiwxDkz4Utrk0cvU0c1ZpYnJbGnw&s",
    descripcion: "Pelota de baloncesto Spalding, fabricada para ofrecer durabilidad y un excelente rebote.",
    categoria: "Baloncesto"
  }
]

/* mapeo de productos */
const generarCartas = () => {
  const container = document.getElementById('generador-producto')
  productos.forEach(producto => {
    const card = document.createElement('div')
    card.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4')

    card.innerHTML = `
      <article class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${producto.nombre}</h5>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <p class="card-text m-0">${producto.precio}</p>
              <input type="button" class="boton-ver btn-sm" value="Ver" data-id="${producto.id}">
            </div>
          </div>
          <input type="button" class="boton-agregar w-100" value="Agregar al carrito" data-id="${producto.id}">
        </div>
      </article>
    `

    container.appendChild(card)
  })

  const botonesAgregar = container.querySelectorAll('.boton-agregar')
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const id = parseInt(boton.getAttribute('data-id'))
      agregarProducto(id)
    })
  })

  const botonesVer = container.querySelectorAll('.boton-ver')
  botonesVer.forEach(boton => {
    boton.addEventListener('click', () => {
      const id = parseInt(boton.getAttribute('data-id'))
      mostrarModalProducto(id)
    })
  })

  if (!localStorage.getItem("productos")) {
    localStorage.setItem('productos', JSON.stringify(productos))
  }
}

/* funcion para modificar la informacion del modal a mostrar */
const mostrarModalProducto = (id) => {
  const productos = JSON.parse(localStorage.getItem('productos'))
  const index = productos.findIndex(objeto => objeto.id === id)
  if (index !== -1) {
    const producto = productos[index]
    document.getElementById("modalImagen").src = producto.imagen
    document.getElementById("modalNombre").textContent = producto.nombre
    document.getElementById("modalDescripcion").textContent = producto.descripcion
    document.getElementById("modalPrecio").textContent = producto.precio

    const modal = new bootstrap.Modal(document.getElementById("productoModal"))
    modal.show()
  }
}

/* codigo para generar una alerta */
const alertaPersonalizada = document.getElementById('alertaPersonalizada')

const mostrarAlerta = (mensaje, tipo = 'success') => {
  const alerta = document.createElement('div')
  alerta.className = `alert alert-${tipo} alert-dismissible fade show`
  alerta.role = 'alert'
  alerta.innerHTML = `
    <div>${mensaje}</div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  `

  alertaPersonalizada.appendChild(alerta)

  setTimeout(() => {
    alerta.classList.remove('show')
    alerta.classList.add('hide')
    setTimeout(() => alerta.remove(), 500)
  }, 5000)
}

window.onload = generarCartas
