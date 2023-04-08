import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator } from 'react-admin';
import { postBook } from '../../../firebase/firestore/books';

export const BookCreate = (props) => {
  const createBook = async (bookData) => {

    try{
      const response = await postBook(bookData)
      console.log(response)

    }catch(error){
      console.log(error)
    }

  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={createBook}>
        <TextInput source="isbn" />
        <TextInput source="title" />
        <ArrayInput source="authors">
          <SimpleFormIterator>
            <TextInput />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="editorial" />
        <TextInput source="image" />
        <TextInput source="price" />
        <TextInput source="year" />
      </SimpleForm>
    </Create>
  );
}








