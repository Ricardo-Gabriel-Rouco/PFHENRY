export default function validate(bookData) {
  const regexTitle = /^[a-zA-Z0-9\s]+$/
  const regexAuthor = /^[a-zA-Z\s]+(\.[a-zA-Z\s]+)*$/;
  const regexNumber = /^[0-9]+$/
  const regexPublisher = /^[a-zA-Z\s]+$/
  let errors = {
    isbn: "",
    title: "",
    authors: "",
    editorial: "",
    genres: "",
    image:"",
    price: "",
    year: "",
  }

  if(bookData.isbn !== undefined)
  {
    if (!bookData.isbn) errors.isbn = 'ISBN must be specified';
    else if (!regexNumber.test(bookData.isbn.toString())) errors.isbn = 'ISBN must be a number'
    else if (!(bookData.isbn.toString().length !== 10 ^ bookData.isbn.toString().length !== 13)) errors.isbn = 'ISBN must be 10 or 13 digits long';
  }

  if(bookData.title !== undefined)
  {
    if (!bookData.title) errors.title = 'Title must be specified';
    else if (bookData.title.length > 50) errors.title = 'Title must be at most 50 characters'
    else if (!regexTitle.test(bookData.title)) errors.title = 'Only numbers, letters or spaces are allowed'
  }

  if(bookData.authors !== undefined)
  {
    if (!bookData.authors.length) errors.authors = 'Authors must be specified';
    else if (bookData.authors[0].length > 50) errors.authors = 'Authors must be at most 50 characters each';
    else if (!regexAuthor.test(bookData.authors[0])) errors.authors = 'Only letters or points are allowed'

     
  }

  if(bookData.editorial !== undefined)
  {
    if (!bookData.editorial) errors.editorial = 'Must insert publisher';
    else if (!bookData.editorial.length > 50) errors.editorial = 'Publisher must be at most 50 characters';
    else if (!regexPublisher.test(bookData.editorial)) errors.editorial = 'Only letters or points are allowed'
  }

  if(bookData.genres !== undefined)
  {
    if (!bookData.genres.length) errors.genres = 'At least one genre must be selected';
  }
  
  if( bookData.image !== undefined)
  {
    if (bookData.image==="") errors.image = 'Must insert an image through a file or a link'
    else if (bookData.image===null) errors.image = 'Invalid link/file'
  }

  if(bookData.price !== undefined)
  {
    if (!bookData.price) errors.price = 'Price must be specified';
    else if (isNaN(bookData.price)) errors.price = 'Price must be a number'
    else if (bookData.price <= 0) errors.price = 'Price must be a positive number'
  }

  if(bookData.year !== undefined)
  {
    if (!regexNumber.test(bookData.year.toString())) errors.year = 'Year must be a number'
    else if (bookData.year && bookData.year > new Date().getFullYear()) errors.year = 'Year must be at most the current year'
  }

  

  return errors
}
