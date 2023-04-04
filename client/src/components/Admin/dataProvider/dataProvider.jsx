import { getBooks } from "../../../firebase/firestore/books";
import { getAllTheUsers } from "../../../firebase/firestore/users";

const dataProvider = {
  getList: async (resource, params) => {
    let data = [];
    if(resource === 'books'){
      data = await getBooks();
    } else if(resource === 'users'){
      data = await getAllTheUsers();
    }
    return {
      data: data,
      total: data.length,
    };
  },
  getOne: async (resource, params) => {
    // implementar si es necesario
  },
  create: async (resource, params) => {
    // implementar si es necesario
  },
  update: async (resource, params) => {
    // implementar si es necesario
  },
  delete: async (resource, params) => {
    // implementar si es necesario
  },
};

export default dataProvider;