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
  useRecordContext,
  ImageField,
} from "react-admin";
import BookListFilter from "./BooklistFilter";
import { Link } from "react-router-dom";

const MyEditButton = () => {
  const record = useRecordContext();
  return <EditButton to={`${record.id}/edit`} />;
};

export const BookList = (props) => (
  <List {...props} filters={<BookListFilter />} pagination={false}>
    <Datagrid rowClick="edit">
      <NumberField source="price" />
      <ImageField source="image" />
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
      <EditButton/>
      <MyEditButton />
    </Datagrid>
  </List>
);

BookList.filterDefaultValues = {
  title: "",
  genre: "",
  author: "",
};
