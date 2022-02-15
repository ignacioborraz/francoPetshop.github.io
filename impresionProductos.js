//defino la función que va a realizar el filtro cruzado
function filtrar(tipoDeProducto) { //tiene como parámetro el array filtrado por tipo de producto
  //console.log(tipoDeProducto); //verificamos la correcta carga
  
  //defino las variables que necesito para la funcion que va a realizar el filtro cruzado (input y select)
  var datosImpresion = []; //defino un array que va a contener el resultado de los filtros
  var filtroInput = document.querySelector("#filtroInput"); //selecciono el input
  var valorInput = ""; //variable que va a tener el valor del input
  var filtroSelect = document.getElementById("filtroSelect"); //selecciono el select
  var valorSelect = ""; //variable que va a tener el valor del select
  
  function filtrarInput(event) { //funcion que depende del evento asociado al input
    valorInput = event.target.value; //valorizamos la variable
    if (valorInput == "" || valorInput == undefined) { //si el input está vacío o no está definido
      switch (valorSelect) { //condicionamos en base a la opcion del select
        case "1": datosImpresion = tipoDeProducto.filter(producto => producto.precio<400)
        break;
        case "2": datosImpresion = tipoDeProducto.filter(producto => producto.precio>=400 && producto.precio<700)
        break;
        case "3": datosImpresion = tipoDeProducto.filter(producto => producto.precio>=700) 
        break;
        default: datosImpresion = tipoDeProducto 
        break;
      }
    } else { //en caso de que el usuario haya tecleado en el input
      switch (valorSelect) { //condicionamos en base a la opcion del select
        case "1": datosImpresion = tipoDeProducto.filter(producto => producto.nombre.toLowerCase().includes(valorInput.toLowerCase())
          ).filter(producto => producto.precio<400);
        break;
        case "2": datosImpresion = tipoDeProducto.filter(producto => producto.nombre.toLowerCase().includes(valorInput.toLowerCase())
          ).filter(producto => producto.precio>=400 && producto.precio<700);
        break;
        case "3": datosImpresion = tipoDeProducto.filter(producto => producto.nombre.toLowerCase().includes(valorInput.toLowerCase())
          ).filter(producto => producto.precio>=700);
        break;    
        default: datosImpresion = tipoDeProducto.filter(producto => producto.nombre.toLowerCase().includes(valorInput.toLowerCase())
          );
        break;
      }
    }
    //console.log(datosImpresion); //verificamos en consola
    imprimirHTML(datosImpresion) //ejecutamos la función que va a imprimir los datos filtrados
    return valorInput //retornamos el valor para poder usarlo en el otro filtro
  }

  function filtrarSelect(event) { //funcion que depende del evento asociado al select
    valorSelect= event.target.value; //valorizamos la variable
    switch (valorSelect) { //condicionamos las diferentes opciones
      case "1": //primer rango de precios (0;400)
        if (valorInput == "" || valorInput == undefined ) { //condicionamos en base a la opcion del input
          datosImpresion = tipoDeProducto.filter(producto => producto.precio<400)
        } else {
          datosImpresion = tipoDeProducto.filter(producto => producto.nombre.toLowerCase().includes(valorInput.toLowerCase())
            ).filter(producto => producto.precio<400);
        }
        break;
      case "2": //rango de precios [400;700)
        if (valorInput == "" || valorInput == undefined ) {
          datosImpresion = tipoDeProducto.filter(producto => producto.precio>=400 && producto.precio<700)  
        } else {
          datosImpresion =  tipoDeProducto.filter(producto => producto.nombre.toLowerCase().includes(valorInput.toLowerCase())
            ).filter(producto => producto.precio>=400 && producto.precio<700);
        }    
        break;
      case "3": //rango de precios [700;...)
        if (valorInput == "" || valorInput == undefined ) {
          datosImpresion = tipoDeProducto.filter(producto => producto.precio>=700) 
        } else {
          datosImpresion =  tipoDeProducto.filter(producto => producto.nombre.toLowerCase().includes(valorInput.toLowerCase())
            ).filter(producto => producto.precio>=700);
        }   
        break;
      default:
        if (valorInput == "" || valorInput == undefined ) {
          datosImpresion = tipoDeProducto 
        } else {
          datosImpresion = tipoDeProducto.filter(producto => producto.nombre.toLowerCase().includes(valorInput.toLowerCase())
          );
        } 
        break;
    }
    //console.log(datosImpresion); //verificamos la correcta carga
    imprimirHTML(datosImpresion) //ejecutamos la función que va a imprimir los datos filtrados
    return valorSelect //retornamos el valor para poder usarlo en el otro filtro
  }
  //console.log(valorInput); //verificamos que toma bien el valor de entrada del filtro
  //console.log(valorSelect); //verificamos que toma bien el valor de entrada del filtro
  filtroSelect.addEventListener("click",filtrarSelect); //afecto la función al evento correspondiente
  filtroInput.addEventListener("keyup",filtrarInput); //afecto la función al evento correspondiente
}


//defino la función que va a imprimir las cards
function imprimirHTML(productosFiltrados) {
  var impresionHtml = document.getElementById("muestraProductos"); //selecciono el elemento HTML donde se imprimirán los productos filtrados
  var imprimir = ""; //defino la variable con los elementos a imprimir
  productosFiltrados.forEach(cadaProducto => { //mapeo el array para acumular cada impresión
    imprimir += `
    <article class="container d-flex justify-content-center align-items-center p-3 mt-3 opcion${cadaProducto.id}">
      <div class="card">
        <figure class="d-flex justify-content-center">
          <img class="img-card" src="${cadaProducto.imagen}" alt="${cadaProducto.nombre}">
        </figure>
        <div class="contenidoCard d-flex flex-column justify-content-center align-items-center">
          <h3>${cadaProducto.nombre}</h3>
          <p>${cadaProducto.descripcion}</p>
          <p>$${cadaProducto.precio}</p>
          <pre class="m-2" id="stock"></pre>
          <button onClick="agregarProducto('${cadaProducto.id}')">agregar al carrito</button>
        </div>
      </div>
    </article>`;
  });
  console.log(productosFiltrados);
  impresionHtml.innerHTML = imprimir
}

function agregarProducto(valor) {
  var productos = JSON.parse(localStorage.getItem("productos"))
  if (localStorage.getItem("carrito")) { //verificamos si existe el carrito
    var carrito = [];
    var compras = JSON.parse(localStorage.getItem("carrito")) //parseamos los elementos del JSON alojado en carrito
    compras.forEach(cadaProducto => carrito.push(cadaProducto))
    var filtroCarrito = carrito.filter(cadaProducto => cadaProducto.id == valor)
    if (filtroCarrito.length == 0) {
      var agregarProducto = productos.filter(cadaProducto => cadaProducto.id == valor)
      carrito.push(...agregarProducto)
    }
    localStorage.setItem("carrito",JSON.stringify(carrito));
  } else { //si no existe: lo creamos
    var carrito = [];
    var agregarProducto = productos.filter(cadaProducto => cadaProducto.id == valor)
    carrito.push(...agregarProducto)
    localStorage.setItem("carrito",JSON.stringify(carrito));
    //console.log(carrito); //verificamos que cargó correctamente //verificamos la correcta carga
  }
  console.log(carrito);
}