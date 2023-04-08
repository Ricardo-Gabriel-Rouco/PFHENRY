import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  ArrayField,
  SingleFieldList,
  ChipField,
  EditButton,
  ImageField,
  ShowButton,
  useRecordContext,
  FunctionField,
} from "react-admin";
import { Input } from "@mui/material";
import BookListFilter from "./BooklistFilter";
import { modifyBook } from "../../../firebase/firestore/books";


const DisplayCheckbox = () => {

  const record = useRecordContext();

  return (
    <Input 
      type="checkbox" 
      checked={record.display}
      onChange={()=>modifyBook(record.id, !record.display)}/>
  )
}


export const BookList = (props) => (
  <List {...props} filters={<BookListFilter />} pagination={false}>
    <Datagrid bulkActionButtons={false}>
      <DisplayCheckbox/>
      <BooleanField source="display" />
      <TextField source="id" />
      <ImageField source="image" />
      <TextField source="title" />
      <FunctionField label="Description" render={record => record.description ? `${record.description.substring(0, 100)}...` : ''} />
      <ArrayField source="authors">
        <SingleFieldList sx={{ display: "flex", flexDirection: "column" }}>
          <ChipField source="author" />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="genres">
        <SingleFieldList sx={{ display: "flex", flexDirection: "column" }}>
          <ChipField source="genre" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="year" />
      <TextField source="editorial" />
      <NumberField source="rating" />
      <NumberField source="reviews.length" label="reviews" textAlign="center" />
      <NumberField
        source="price"
        options={{ style: "currency", currency: "USD" }}
      />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

BookList.filterDefaultValues = {
  title: "",
  genre: "",
  author: "",
};
