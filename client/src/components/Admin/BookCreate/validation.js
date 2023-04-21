export default function validate(bookData, imageType) {
  const regexTitle = /^[a-zA-Z0-9\s]+$/;
  const regexAuthor = /^[a-zA-Z\s]+(\.[a-zA-Z\s]+)*$/;
  const regexNumber = /^[0-9]+$/;
  const regexPublisher = /^[a-zA-Z\s]+$/;
  let errors = {
    isbn: "",
    title: "",
    authors: "",
    editorial: "",
    genres: "",
    image: "",
    price: "",
    year: "",
  };

  if (bookData.isbn !== undefined) {
    if (!bookData.isbn) errors.isbn = "ISBN must be specified";
    else if (!regexNumber.test(bookData.isbn.toString()))
      errors.isbn = "ISBN must be a number";
    else if (
      !(
        (bookData.isbn.toString().length !== 10) ^
        (bookData.isbn.toString().length !== 13)
      )
    )
      errors.isbn = "ISBN must be 10 or 13 digits long";
  }

  if (bookData.title !== undefined) {
    if (!bookData.title) errors.title = "Title must be specified";
    else if (bookData.title.length > 100)
      errors.title = "Title must be at most 100 characters";
    else if (!regexTitle.test(bookData.title))
      errors.title = "Only numbers, letters or spaces are allowed";
  }

  if (bookData.image !== undefined) {
    if (bookData.image === "")
      errors.image = "Must insert an image through a file or a link";
    else if (imageType === "file" && bookData.image === null)
      errors.image = "Invalid file";
    else if (imageType === "url" && bookData.image === null)
      errors.image = "Invalid Link";
  }

  if (bookData.authors !== undefined) {
    if (!bookData.authors.length) errors.authors = "At least one author must be specified";
    else {
      try {
        bookData.authors.forEach((el) => {
          if (el.name.length > 50) {
            throw 50
          }
        });
        bookData.authors.forEach((el) => {
          if (!regexAuthor.test(el.name)){
            throw "RegExp failed"
          }
        });
      } catch (err) {
        if (err === 50)
          errors.authors = "Authors must be at most 50 characters each";
        else
          errors.authors = "Only letters or points are allowed";
      }
    }
  }
  
  if (bookData.price !== undefined) {
    if (!bookData.price) errors.price = "Price must be specified";
    else if (isNaN(bookData.price)) errors.price = "Price must be a number";
    else if (bookData.price <= 0)
      errors.price = "Price must be a positive number";
  }
  
    if (bookData.year !== undefined) {
      if (!bookData.year) errors.year = "Must insert the published year"
      else if (!regexNumber.test(bookData.year.toString()))
        errors.year = "Year must be a number";
      else if (bookData.year && bookData.year > new Date().getFullYear())
        errors.year = "Year must be at most the current year";
    }

  if (bookData.editorial !== undefined) {
    if (!bookData.editorial) errors.editorial = "Must insert publisher";
    else if (!bookData.editorial.length > 50)
      errors.editorial = "Publisher must be at most 50 characters";
    else if (!regexPublisher.test(bookData.editorial))
      errors.editorial = "Only letters are allowed";
  }

  if (bookData.genres !== undefined) {
    if (!bookData.genres.length) errors.genres = "At least one genre must be specified";
    else {
      try {
        bookData.genres.forEach((el) => {
          if (el.name.length > 50) {
            throw 50
          }
        });
        bookData.genres.forEach((el) => {
          if (!regexPublisher.test(el.name)){
            throw "RegExp failed"
          }
        });
      } catch (err) {
        if (err === 50)
          errors.genres = "Genres must be at most 50 characters each";
        else
          errors.genres = "Only letters are allowed";
      }
    }
  } 

  return errors;
}
