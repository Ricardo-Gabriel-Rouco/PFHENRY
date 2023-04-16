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

const ShowModal = (props) => {
  const record = useRecordContext();
  const { record: loadedRecord, defaultTitle } = useShowController(props);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>View Details</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{defaultTitle}</DialogTitle>
        <DialogContent>
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
                <ReferenceField source="userId" reference="users">
                  <TextField source="nickname" />
                </ReferenceField>
              </span>
              <ArrayField source="items">
                <Datagrid bulkActionButtons={false}>
                  <TextField source="bookId" label="ISBN" />
                  <TextField source="title" />
                  <NumberField source="quantity" />
                  <NumberField source="price" />
                </Datagrid>
              </ArrayField>
              <TextField/>
              <span>
                <Typography>Total Price: $</Typography>
              <FunctionField
                label={false}
                render={(record) =>
                  record.items.reduce(
                    (total, current) =>
                      total + current.price * current.quantity,
                    0
                  )
                }
              />
              </span>
            </SimpleShowLayout>
          </ShowBase>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShowModal;
