import { ArrayField, ChipField, Datagrid, DateField,  List, ReferenceField, SingleFieldList, TextField } from 'react-admin';

export const OrderList = (props) => (
    <List {...props}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="id" />
            <DateField showTime showDate={false} reference="date" />
            <ReferenceField source="userId" reference="users" />
            <ArrayField source="items"><SingleFieldList><ChipField source="id" /></SingleFieldList></ArrayField>
        </Datagrid>
    </List>
);