import { ArrayField, BooleanField, ChipField, Datagrid, List, NumberField, SingleFieldList, TextField } from 'react-admin';

export const BookList = () => (
    <List pagination={false}>
        <Datagrid rowClick="edit">
            <NumberField source="price" />
            <TextField source="image" />
            <BooleanField source="display" />
            <NumberField source="year" />
            <TextField source="description" />
            <ArrayField source="reviews"><SingleFieldList><ChipField source="rating" /></SingleFieldList></ArrayField>
            <TextField source="title" />
            <TextField source="genres" />
            <TextField source="editorial" />
            <NumberField source="rating" />
            <TextField source="authors" />
            <TextField source="id" />
        </Datagrid>
    </List>
);