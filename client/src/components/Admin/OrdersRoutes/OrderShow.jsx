import {
  ShowBase,
  SimpleShowLayout,
  DateField,
  ReferenceField,
  TextField,
  ArrayField,
  Datagrid,
  NumberField,
  FunctionField,
  useShowController,
  useRecordContext,
  ImageField,
} from "react-admin";
import {
  FormLabel,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";
import { useState } from "react";

const OrderShow = (props) => {
  const record = useRecordContext();
  const { record: loadedRecord, defaultTitle } = useShowController(props);
  const [open, setOpen] = useState(false);

  return (
    <ShowBase sx={{ textAlign: "left" }}>
      <SimpleShowLayout record={record}>
        <span>
          <FormLabel>ORDER #</FormLabel>
          <TextField source="id" label={false} />{" "}
        </span>
        <span>
          <FormLabel>Date: </FormLabel>
          <DateField source="date" label={false} />{" "}
        </span>
        <span>
          <FormLabel>User: </FormLabel>
          <ReferenceField source="userId" reference="users" link={false}>
            <TextField source="nickname" />
          </ReferenceField>
        </span>
        <ArrayField source="items">
          <Datagrid bulkActionButtons={false}>
            <TextField source="bookId" label="ISBN" />
            <ReferenceField source="bookId" reference="books" link={false} sx={{alignContent:"center"}}>
              <ImageField source="image" />
            </ReferenceField>
            <TextField source="title" />
            <NumberField source="quantity" />
            <NumberField source="unit_price" />
          </Datagrid>
        </ArrayField>
        <TextField />
        <span>
          <FormLabel>Total Price: $</FormLabel>
          <FunctionField
            label={false}
            render={(record) =>
              record.items.reduce(
                (total, current) => total + current.price * current.quantity,
                0
              )
            }
          />
        </span>
      </SimpleShowLayout>
    </ShowBase>
  );
};

export default OrderShow;
