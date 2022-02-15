//defino la funcion para importar los datos de la API
async function obtenerProductos() { //defino una función asincrona (lee LINEA por LINEA)
  
  let respuesta = await fetch("https://apipetshop.herokuapp.com/api/articulos"); //ESPERO la carga de la API (base de datos)
  let datosJson = await respuesta.json(); //luego espero la transformacion de la respuesta json
  //console.log(datosJson); //en consola veo los datos y me fijo lo que quiero "sacar"
  
  var productos = datosJson.response; //defino un array que contiene los productos
  productos.map(cadaProducto => { //realizo un mapeo del array
    cadaProducto.id = cadaProducto._id; //corrijo el id
    cadaProducto.cantidad = 1; //agrego propiedad cantidad: 1
    delete cadaProducto._id //elimino la propiedad "mal" escrita
  })
  //console.log(productos); //verificamos la correcta carga
  
  localStorage.setItem("productos",JSON.stringify(productos)) //almaceno los productos en el localStorage
  
  var medicamentos = productos.filter(producto => producto.tipo == "Medicamento"); //aplico un filtro para obtener el tipo de producto deseado
  //console.log(medicamentos); //verificamos la correcta carga
  filtrar(medicamentos); //ejecuto la función que va a filtrar e imprimir los productos
  imprimirHTML(medicamentos); //ejecuto la funcion para que se imprima "la primera vez"
  medicamentos.forEach(cadaProducto => { //por cada producto
    if (cadaProducto.stock <= 5) { //que tenga menos de 5 unidades
        document.querySelector(`.opcion${cadaProducto.id} #stock`).innerHTML = `<p class="m-0">quedan ${cadaProducto.stock} unidades!<p>`
    } //agrego la etiqueta de alerta!
  })

}

obtenerProductos(); //ejecuto la función