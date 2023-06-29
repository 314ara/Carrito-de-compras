// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito =[];

cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);


 //VACIAR CARRITO
 vaciarCarritoBtn.addEventListener('click', ()=>{
    articulosCarrito = []; //reseteamos el arreglo
 
    limpiarHTML(); //eliminamos todo el HTML
})
}


//funciones agregar curso
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito') ){
       const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
 
}


//ELLIMINA UN CURSO DEL CARRITO
function eliminarCurso(e){
    console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id') ;
   //eliminar del arreglo articulosCarrito por el data-id
   articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }

}

//Leer el contenido del HTML al que le dimos click y extra la informacion del cursoo
function leerDatosCurso(curso){
    // console.log(curso);

    //crear un objeto con el contenido del curso actual
    const infoCurso ={
        imagen: curso.querySelector('img').src, 
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya EXISTE en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id  );
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


// agrega elementos al arreglo del carrito 
// articulosCarrito = [...articulosCarrito, infoCurso];
console.log(articulosCarrito);
carritoHTML();
}



//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso =>{
        const { imagen, titulo, precio, cantidad, id }= curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
           <img src="${imagen}" width="100">
        </td>
        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td>
          <a href="#" class="borrar-curso" data-id="${id}"> X </a>
         </td>
        `;

        // Agrega el HTML del carrito en el de tbody
        contenedorCarrito.appendChild(row);
    });
    
}
 
//ELimina los cursos del tbody
function limpiarHTML(){
    //formalenta para limpiar HTML
    // contenedorCarrito.innerHTML = '';


    while(contenedorCarrito.firstChild){
         contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

