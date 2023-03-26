import React, {useState} from 'react'

function BookForm() {
  
  return (
    <div>
      <form action="">
        <label htmlFor="">Titulo: </label>
        <input type="text" placeholder='Ej: La llamada de Cthulhu' />
        <label htmlFor="">Autor: </label>
        <input type="text" placeholder='Ej: H. P. Lovecraft'/>
        <label htmlFor="">Editorial: </label>
        <input type="text" placeholder='Ej: Gargola'/>
        <label htmlFor="">Generos: </label>
        <input type="text" placeholder='Selecciona uno o varios de la lista'/>
        <label htmlFor="">Imagen: </label>
        <input type="text" placeholder='Sube un archivo o pega un link'/>
        <label htmlFor="" >Precio</label>
        <input type="text" placeholder='Ingresa el precio'/>
        <label htmlFor="">Año de publiacion</label>
        <input type="text" placeholder='Ej: 1926'/>
        <button type='submit'>Guardar</button>
      </form>
    </div>
  )
}

export default BookForm