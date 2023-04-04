import { getBooks } from "../../../firebase/firestore/books";

const dataProvider = {
  getList: async (resource, params) => {
    const data = await getBooks();
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