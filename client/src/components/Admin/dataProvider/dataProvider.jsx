
import { getBooks, modifyBook } from "../../../firebase/firestore/books";
import { getAllTheUsers } from "../../../firebase/firestore/users";





const dataProvider = {
  getList: async (resource, params) => {
    let data = [];
    if (resource === "books") {
      const { title, genre,author } = params.filter || {}; // extrae los valores del filtro si se proporcionan
      const books = await getBooks();
      data = books.filter((book) => {
        // filtra los libros según los valores del filtro
        if (title && !book.title.toLowerCase().includes(title.toLowerCase())) {
          return false;
        }
        if (genre && !book.genres.map(g => g.toLowerCase()).includes(genre.toLowerCase())) {
          return false
        }
        if(author && !book.authors.map(a=>a.toLowerCase()).includes(author.toLowerCase())){
          return false
        }
        return true;
      });
    } else if (resource === "users") {
      data = await getAllTheUsers();
    }
    return {
      data: data,
      total: data.length,
    
    };
  },
  update: async (resource,params) =>{
    if(resource === "books"){
      const {id,data} = params;
      await modifyBook(id,
        data.authors,
        data.editorial,
        data.genres,
        data.image,
        data.price,
        data.rating,
        data.title,
        data.year)
      console.log(`Book with ID ${id} has been modified with the following data: `, data);
      return {data:{id:id,...data}}
    }
  }
};
export default dataProvider;