import {
  getAllTheBooks,
  modifyBook,
  getBookById,
  postBook,
} from "../../../firebase/firestore/books";
import { getAllTheUsers, modifyUser, modifyUserRole, getUserById } from "../../../firebase/firestore/users";
import { getOrders, getOrdersById } from "../../../firebase/firestore/orders";


const dataProvider = {
  getList: async (resource, params) => {
    let data = [];

    switch (resource) {
      case "books":
        const { title, genre, author } = params.filter || {}; // extrae los valores del filtro si se proporcionan
        const books = await getAllTheBooks();
        data = books.map((el) => {
          return {
            ...el,
            authors: el.authors?.map((a) => {
              return { author: a };
            }),
            genres: el.genres?.map((g) => {
              return { genre: g };
            }),
          };
        });
        // Filtra los libros según los valores del filtro
        if (title)
          // eslint-disable-next-line
          data = data.filter((book) => {
            if (book.title.toLowerCase().includes(title.toLowerCase()))
              return true;
          });
        if (author)
          // eslint-disable-next-line
          data = data.filter((book) => {
            if (
              book.authors
                .map((a) => a.author.toLowerCase())
                .some((item) => item.includes(author.toLowerCase()))
            )
              return true;
          });
        if (genre)
          // eslint-disable-next-line
          data = data.filter((book) => {
            if (
              book.genres
                .map((g) => g.genre.toLowerCase())
                .some((item) => item.includes(genre.toLowerCase()))
            )
              return true;
          });
        break;

      case "users":
        data = await getAllTheUsers();
        break;

      case "orders":
        const orders = await getOrders();

        data = orders.map((order) => {
          return {
            id:order.id,
            date: new Date(order.date),
            userId: order.userId,
            status: order.status,
            items: order.items.map((book) => {
              return {
                bookId: book.id,
                title: book.title,
                quantity: book.quantity,
                price: book.price,
              };
            }),
          };
        });
        break;
      default:
        break;
    }

    return {
      data,
      total: data.length,
    };
  },
  getOne: async (resource, params) => {
    let data = {};
    const { id } = params;

    try {
      switch (resource) {
        case "books":
          data = await getBookById(id);
          break;

        case "users":
          data = await getBookById(id)
          break

        case "orders":
          data = await getOrdersById(id);
          data = {...data, items: data.items.map((book) => {
            return {
              bookId: book.id,
              title: book.title,
              quantity: book.quantity,
              price: book.price,
            };
          })};

          break;
        default:
          break;
      }

      return { data };
    } catch (error) {
      console.log("Error en el servidor");
    }
  },
  getMany: async (resource, params) => {
    const { ids } = params;
    let data = [];
    let promises;

    try{

    switch (resource) {
      case "books":
        promises = ids.map(async (id) => await getBookById(id));
        data = await Promise.all(promises);
        
        break;

      case "users":
        promises = ids.map(async (id) => await getUserById(id));
        data = await Promise.all(promises);
        break
    
      default:
        break;
    }

  }catch(error){
    console.log(error)
  }


    return { data };
  },
  update: async (resource, params) => {
    if (resource === "books") {
      const { id, data } = params;
      await modifyBook(
        id,
        data.authors,
        data.editorial,
        data.genres,
        data.image,
        data.price,
        data.rating,
        data.title,
        data.year
      );
      console.log(
        `Book with ID ${id} has been modified with the following data: `,
        data
      );
      return { data: { id: id, ...data } }
    } 
    else if (resource === 'users'){
      const {id,data} = params;
      if(data.display !== undefined && data.rol !== undefined){
        await modifyUser(id,data.display);
        await modifyUserRole(id,data.rol)
        console.log(`User with ID ${id} has been modified`)
        return {data:{id:id, ...data}}
      }
      else if(data.display !== undefined){
        await modifyUser(id,data.display)
        console.log(`User display with ID ${id} has been modified`)
        return {data:{id:id,...data}}
      }else if(data.rol !== undefined){
        await modifyUserRole(id,data.rol);
        console.log(`User role with ID ${id} has been modified`)
        return{data:{id:id,...data}}
      }
      // await modifyUser(id,data.display,data.rol)
      // console.log(`User with ID ${id} has been modified`)
      // return{data:{id:id,...data}}
    }},
  create: async (resource,params) =>{
    if(resource === 'books'){
      try{
        const response = await postBook(params.data)
        return{
          data:response,
        }
      
      }catch(error){
        return{
          error:error.message || "Something went wrong"
        }
      }
    }
  },
};
export default dataProvider;
