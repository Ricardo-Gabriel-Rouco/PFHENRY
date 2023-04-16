import {
  Show,
  SimpleShowLayout,
  DateField,
  ReferenceField,
  TextField,
  ArrayField,
  Datagrid,
  NumberField,
} from "react-admin";
import { Grid, Typography } from "@mui/material";

const OrderShow = () => (
  <Show>
    <SimpleShowLayout>
      <Grid container spacing={1} alignItems={'flex-start'}>
        <Grid item xs={1} md={6}>
          <DateField source="date" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReferenceField source="userId" reference="users">
            <TextField source="nickname" />
          </ReferenceField>
        </Grid>
        <Grid item xs={12}>
          <TextField source="status" />
        </Grid>
        <Grid item xs={12}>
          <ArrayField source="items">
            <Datagrid bulkActionButtons={false}>
              <TextField source="bookId" label="ISBN"/>
              <TextField source="title" />
              <NumberField source="quantity" />
              <NumberField source="price" />
            </Datagrid>
          </ArrayField>
        </Grid>
      </Grid>
    </SimpleShowLayout>
  </Show>
);

export default OrderShow;
