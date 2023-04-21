import { useState, useEffect } from "react";
import {
  Datagrid,
  FunctionField,
  List,
  TextField,
  useRecordContext,
} from "react-admin";
import { modifyUser, modifyUserRole } from "../../../firebase/firestore/users";

import { Checkbox, MenuItem, Select } from "@mui/material";

const DisplayCheckbox = () => {
    const [checked, setChecked] = useState(true);
    const record = useRecordContext();

    useEffect(() => {
        setChecked(record.display); // eslint-disable-next-line
    }, []);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        modifyUser(record.id, { display: !checked });
    };

    return <Checkbox checked={checked} onChange={handleChange} />;
};

const DisplaySelect = () => {
  const record = useRecordContext();
  const [selectedValue, setSelectedValue] = useState(record.rol);

  const selectHandleChange = (e) => {
    setSelectedValue(e.target.value);
    modifyUserRole(record.id, e.target.value);
  };
  return (
    <Select label="Rol" onChange={selectHandleChange} value={selectedValue}>
      <MenuItem value="USER">User</MenuItem>
      <MenuItem value="ADMIN">Employee</MenuItem>
      <MenuItem value="SUPERADMIN">Admin</MenuItem>
    </Select>
  );
};

export const Userlist = (props) => (
  <List {...props} pagination={false} actions={false}>
    <Datagrid bulkActionButtons={false}>
      <FunctionField label="Enabled" render={() => <DisplayCheckbox />} />

      <TextField source="uid" />
      <TextField source="fullname" />
      <TextField source="email" />
      <FunctionField label="Rol" render={() => <DisplaySelect />} />
      <TextField source="id" />
    </Datagrid>
  </List>
);
