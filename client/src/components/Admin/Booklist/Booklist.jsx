import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ArrayField,
  SingleFieldList,
  ChipField,
  EditButton,
  ImageField,
  ShowButton,
  useRecordContext,
  FunctionField,
} from "react-admin";
import BookListFilter from "./BooklistFilter";
import { modifyBook } from "../../../firebase/firestore/books";
import Checkbox from '@mui/material/Checkbox';


const DisplayCheckbox = () => {
  const [checked, setChecked] = useState(true)
  const record = useRecordContext();

  useEffect(()=>{
    setChecked(record.display)// eslint-disable-next-line
  },[])

  const handleChange = (event) => {
    setChecked(event.target.checked);
    modifyBook(record.id, {display: !checked})
  }
  

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  )
}


export const BookList = (props) => {
  
  
  return (
  <List {...props} filters={<BookListFilter />} pagination={false}>
    <Datagrid bulkActionButtons={false}>
      <FunctionField 
        label="Display"
        render={()=><DisplayCheckbox/>}
      />
      {/* <DisplayCheckbox /> */}
      {/* <BooleanField source="display" /> */}
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
)};

BookList.filterDefaultValues = {
  title: "",
  genre: "",
  author: "",
};
