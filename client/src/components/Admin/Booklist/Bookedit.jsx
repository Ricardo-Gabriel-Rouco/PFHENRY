import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, ArrayInput, SimpleFormIterator, BooleanInput } from 'react-admin';

export const BookEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" multiline />
      <ArrayInput source="authors">
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="editorial" />
      <NumberInput source="year" />
      <ArrayInput source="genres">
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>
      <NumberInput source="price" />
      <BooleanInput source="display" />
      <TextInput source="image" />
    </SimpleForm>
  </Edit>
);