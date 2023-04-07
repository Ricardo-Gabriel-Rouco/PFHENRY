
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
  BooleanField,
  ArrayField,
  SingleFieldList,
  ChipField,
  CreateButton,

} from "react-admin";

import BookListFilter from "./BooklistFilter";
import { Link } from "react-router-dom";

export const BookList = (props) => {

  return (
    <>
    <CreateButton component={Link} to='create' label='Create' />
      <List {...props} filters={<BookListFilter />} pagination={false}>
        <Datagrid rowClick="edit">
          <NumberField source="price" />
          <TextField source="image" />
          <BooleanField source="display" />
          <NumberField source="year" />
          <TextField source="description" />

          <ArrayField source="reviews">
            <SingleFieldList>
              <ChipField source="rating" />
            </SingleFieldList>
          </ArrayField>
          <TextField source="title" />
          <TextField source="genres" />
          <TextField source="editorial" />
          <NumberField source="rating" />
          <TextField source="authors" />
          <TextField source="id" />
          <EditButton />
        </Datagrid>
      </List>

    </>
  );
};
