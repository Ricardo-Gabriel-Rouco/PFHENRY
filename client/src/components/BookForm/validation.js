function isImgUrl(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}

export default function validate(bookData) {
  const regexName = /^[a-zA-Z0-9\s]+$/
  let errors = {
    isbn: "",
    title: "",
    author: "",
    editorial: "",
    genres: "",
    image:"",
    price: "",
    year: "",
  }

  if(bookData.isbn !== undefined)
  {
    if (!bookData.isbn) errors.isbn = 'Debe ingresar un ISBN';
    if (!(bookData.isbn.toString().length !== 10 ^ bookData.isbn.toString().length !== 13)) errors.isbn = 'El ISBN debe contener 10 o 13 digitos';
  }

  if(bookData.title !== undefined)
  {
    if (!bookData.title) errors.title = 'Debe ingresar un titulo';
    if (bookData.title.length > 50) errors.title = 'No debe tenes mas de 50 caracteres'
    if (!regexName.test(bookData.title)) errors.title = 'Solo Números, letras o espacios'
  }

  if(bookData.author !== undefined)
  {
    if (!bookData.author) errors.author = 'Debe ingresar el autor';
    if (!bookData.author.length > 50) errors.author = 'No puede superar los 50 caracteres';
  }

  if(bookData.editorial !== undefined)
  {
    if (!bookData.editorial) errors.editorial = 'Debe ingresar la editorial';
    if (!bookData.editorial.length > 50) errors.editorial = 'No puede superar los 50 caracteres';
  }

  if(bookData.genres !== undefined)
  {
    if (!bookData.genres.length) errors.genres = 'Debe seleccionar al menos un valor';
  }
  
    if( bookData.image !== undefined)
    {
      if (bookData.image==="") errors.image = 'Debe cargar un archivo o un link'
      else if (bookData.image===null) errors.image = 'Invalid link/file'
      {
        // if((async ()=>await isImgUrl(bookData.image))()) errors.image = 'Invalid link/file'
      }
    }

  if(bookData.price !== undefined)
  {
    if (!bookData.price) errors.price = 'Debe ingrear el precio';
    if (isNaN(bookData.price)) errors.price = 'El precio debe ser un valor numerico'
    if (bookData.price < 0) errors.price = 'No puede existir un valor menor a 0'
  }

  if(bookData.year !== undefined)
  {
    if (isNaN(bookData.year)) errors.year = 'Debe ser un numero'
  }

  if(bookData.year)
  {
    if (isNaN(bookData.year)) throw new Error('Year must be a number')
    if (bookData.year && bookData.year > new Date().getFullYear()) throw new Error('Year must be at most this year')
  }

  return errors
}
