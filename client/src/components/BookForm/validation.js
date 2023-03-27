export default function validate(bookData) {
  const regexName = /^[a-zA-Z0-9\s]+$/

  let errors = {}
  if(!bookData.isbn) errors.isbn = 'Debe ingresar un ISBN';
  if(bookData.isbn.toString().length < 10 || bookData.isbn.toString().length > 13) errors.isbn = 'El ISBN debe contener entre 10 y 13 digitos';
  if(!bookData.title) errors.title = 'Debe ingresar un titulo';
  if(bookData.title.length > 50) errors.title = 'No debe tenes mas de 50 caracteres'
  if(!regexName.test(bookData.title)) errors.title = 'Solo Números, letras o espacios'
  if(!bookData.author) errors.author = 'Debe ingresar el autor';
  if(!bookData.author.length > 50) errors.author = 'No puede superar los 50 caracteres';
  if(!bookData.editorial) errors.editorial = 'Debe ingresar la editorial';
  if(!bookData.editorial.length > 50) errors.editorial = 'No puede superar los 50 caracteres';
  if(!bookData.genres) errors.genres = 'Debe seleccionar al menos un valor';
  if(!bookData.price) errors.price = 'Debe ingrear el precio';
  if(isNaN(bookData.price)) errors.price = 'El precio debe ser un valor numerico'
  if(bookData.price < 0) errors.price = 'No puede existir un valor menor a 0'
  if(!bookData.image.file || !bookData.image.link) errors.image = 'Debe cargar un archivo o un link'

  return errors
}
