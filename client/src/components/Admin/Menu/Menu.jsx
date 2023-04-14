import { Menu } from "react-admin";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PaidIcon from '@mui/icons-material/Paid';

export const MyMenu = () => (
  <Menu>
    <Menu.Item to="/admin/books" primaryText="Books" leftIcon={<ImportContactsIcon />} />
    <Menu.Item
      to="/admin/users"
      primaryText="Users"
      leftIcon={<PersonOutlineIcon />}
    />
    <Menu.Item to="/admin/orders" primaryText="Orders" leftIcon={<PaidIcon />} />
  </Menu>
);
