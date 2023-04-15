import React from 'react';
import { Filter, TextInput } from 'react-admin';

const BookListFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Title" source="title" resettable alwaysOn />
        <TextInput label="Genre" source="genre" resettable alwaysOn />
        <TextInput label="Author" source="author" resettable alwaysOn />
    </Filter>
);

export default BookListFilter;