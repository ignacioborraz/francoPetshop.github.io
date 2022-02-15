//en el LOCALSTORAGE vamos a almacer:
//los productos: para trabajar facilmente adentro de las funciones
//los propductos que el usuario va a comprar (carrito)
//localStorage.removeItem("carrito") //para limpiar el carrito del almacenamiento local mientras "programamos"
//localStorage.clear() //para limpiar todo

if (localStorage.getItem("carrito")) { //verificamos si existe el carrito
    var carrito = [] //defino un array que contendra los productos del carrito
    imprimirCarrito (); //imprimimos dinamicamente los elementos del carrito
    carrito.forEach(cadaProducto => { //por cada producto
        if (cadaProducto.stock <= 5) { //que tenga menos de 5 unidades
            document.querySelector(`.opcion${cadaProducto.id} #stock`).innerHTML = `<p class="m-0">quedan ${cadaProducto.stock} unidades!<p>`
        } //agrego la etiqueta de alerta!
    });
} else { //si no existe: lo creamos
    var carrito = [];
}
//console.log(carrito); //verificamos que cargó correctamente //verificamos la correcta carga

function imprimirCarrito () { //defino la función que va a imprimir los elementos del carrito
    var impresionHtml = document.getElementById("impresionProductos"); //selecciono el elemento HTML donde se imprimirán los productos filtrados
    var imprimir = ""; //reseteo el string de etiquetascon cada cambio/impresion
    carrito = []; //reseteo el carrito con cada cambio/impresion
    var compras = JSON.parse(localStorage.getItem("carrito")) //parseamos los elementos del JSON alojado en carrito
    compras.forEach(cadaProducto => { //por cada producto del carrito
        carrito.push(cadaProducto); //lo agrego al array carrito y a la impresion
        imprimir += `
        <article class="container containerCarrito d-flex justify-content-center align-items-center p-3 mt-3 opcion${cadaProducto.id}">
        <div class="card">
          <figure class="d-flex justify-content-center">
            <img class="img-card" src="${cadaProducto.imagen}" alt="${cadaProducto.nombre}">
          </figure>
          <div class="contenidoCard d-flex flex-column justify-content-center align-items-center">
            <h3>${cadaProducto.nombre}</h3>
            <p>$${cadaProducto.precio}</p>
            <pre class="m-0" id="stock"></pre>
            <form><input class="botonCantidad" type="number" onchange="cambiarCantidad(value,'${cadaProducto.id}')" value="${cadaProducto.cantidad}" min="0" max="${cadaProducto.stock}"></form>
          </div>
        </div>
        </article>`;
    });
    //console.log(imprimir); //verificamos la impresion
    impresionHtml.innerHTML = imprimir + `<button class="boton" onClick="confirmar()">CONFIRMAR LA COMPRA</button>`
    //console.log(compras); //verificamos la correcta carga
}

function cambiarCantidad(nuevaCantidad,idProducto) { //defino la funcion que va a cambiar la cantidad
    //console.log(nuevaCantidad); //verificamos la entrada de la funcion
    //console.log(idProducto); //verificamos la entrada de la funcion
    carrito.filter(cadaProducto => //filtro por id
        cadaProducto.id == idProducto).map(cadaProducto => //mapeo para cambiar la cantidad
        cadaProducto.cantidad = nuevaCantidad)
    let carritoModificado = carrito.filter(cadaProducto => cadaProducto.cantidad>0); //con este paso elimino los productos que el usuario no comprará
    //console.log(carritoModificado); //verificamos la modificacion
    localStorage.setItem("carrito",JSON.stringify(carritoModificado)); //guardo la modidificacion en el localStorage
    imprimirCarrito (); //imprimo el cambio
    carrito.forEach(cadaProducto => { //por cada producto
        if (cadaProducto.stock <= 5) { //que tenga menos de 5 unidades
            document.querySelector(`.opcion${cadaProducto.id} #stock`).innerHTML = `<p class="m-0">quedan ${cadaProducto.stock} unidades!<p>`
        } //agrego la etiqueta de alerta!
    });
}

function confirmar () { //defino la funcion que va confirmar la compra
    let confirmacion = confirm('desea confirmar la compra?') //se genera una confirmación (buscar algo más lindo)
    //console.log(confirmacion); // verificamos en consola
    if (confirmacion) {
        localStorage.removeItem("carrito") //limpiamos el carrito y configuramos la nueva impresión
        nuevaImpresion = `
        <div class="d-flex flex-column justify-content-center align-items-center m-5">
            <img class="w-100" src="./img/Images/perritoCorriendo.jpg" alt="">
            <h2 class="h4">FRANCO te da las gracias y te informa que está en contra del trabajo animal</h2> 
            <h3 class="h5">por lo cual te solicita que vengas a buscar tus productos porque no los puede llevar</h3> 
        </div>`;
        document.getElementById("impresionProductos").innerHTML = nuevaImpresion
    } 
}

//EL CARRITO QUEDA "TILDADO" CUANDO EL CLIENTE DEJA EN CERO TODOS LOS PRODUCTOS
//HABRIA QUE GENERAR UNA FUNCION PARA IMPPRIMIR OTRAS ETIQUETAS CUANDO SUCEDE ESTO