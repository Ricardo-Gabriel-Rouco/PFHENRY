import { BooleanField, Datagrid, List, TextField } from 'react-admin';

export const Userlist = () => (
    <List perPage={10}>
        <Datagrid rowClick="edit">
            <TextField source="uid" />
            <BooleanField source="display" />
            <TextField source="rol" />
            <TextField source="id" />
        </Datagrid>
    </List>
);