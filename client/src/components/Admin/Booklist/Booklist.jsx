import React from 'react';
import { List, Datagrid, TextField, NumberField, BooleanField, ArrayField, SingleFieldList, ChipField, EditButton } from 'react-admin';
import BookListFilter from './BooklistFilter';
import { Link } from 'react-router-dom';

export const BookList = (props) => (
    <List {...props} filters={<BookListFilter />} pagination={false}>
    <Datagrid rowClick="edit">
        <NumberField source="price" />
        <TextField source="image" />
        <BooleanField source="display" />
        <NumberField source="year" />
        <TextField source="description"/> 
        
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
        <Link to={({ record }) => `/books/${record.id}`}><EditButton/></Link>
    </Datagrid>
    </List>
);

  BookList.filterDefaultValues = {
    title: "",
    genre: "",
    author:"",
  };
  

