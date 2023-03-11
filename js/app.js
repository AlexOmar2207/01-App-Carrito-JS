// Variables 

const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let carritoCompras = [];

const registrar = () => {
    // Cuando agregas un curso presionando agregar al carrito 
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito 
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito 
    btnVaciarCarrito.addEventListener('click', () => {
        carritoCompras = [];
        limpiarHTML();
    })
}
registrar();


// Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
    
        leerContenido(cursoSeleccionado);
    }
}

 function eliminarCurso(e){
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Eliminando con filter
        carritoCompras = carritoCompras.filter( curso => {
            return curso.id !== cursoId;
        });

        carritoHTML(); //iterar sobre el carrtito y mostrar su HTML
    }
}

// lee el contenido del HTML y extrae la info del curso 
function leerContenido(curso){

    // Crear un objeto con el contenido del curso actual 
    const infoCurso ={
         imgSrc: curso.querySelector('img').src,
         titulo: curso.querySelector('h4').textContent,
         precio: curso.querySelector('.precio span').textContent, 
         id: curso.querySelector('a').getAttribute('data-id'), 
         cantidad: 1
    }

    // Rrevisa si un elemento ya existe en el carrito 
    const existe = carritoCompras.some((curso) => {
        return curso.id === infoCurso.id})
    if(existe){
        const cursos = carritoCompras.map( curso => {
            if(curso.id === infoCurso.id ){
                curso.cantidad += 1;
                return curso;
            }else{
                return curso;
            }
        });
        carritoCompras = [...cursos];
    }else{
        // agrega elemenos al arreglo de carrito 
        carritoCompras = [...carritoCompras, infoCurso];
    }

   

    carritoHTML();
}

// Muestra el carrito en el HTML 
function carritoHTML(){

    // Limpiar el html 
    limpiarHTML();

    carritoCompras.forEach(articulo => {

        const { imgSrc, titulo, precio, cantidad, id } = articulo

        const row = document.createElement('tr');
        row.innerHTML =`
        <td>
            <img src="${imgSrc}" width="100">
        </td>
        <td>
            <p> ${titulo} </p>
        </td>
        <td>
            <p> ${precio} </p>
        </td>
        <td>
            <p> ${cantidad} </p>
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" /> X </a>
        </td>

        `;

        listaCarrito.appendChild(row);
    });

}


function limpiarHTML(){

    // forma Lenta
    // listaCarrito.innerHTML = '';
    while( listaCarrito.firstChild ){
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}





