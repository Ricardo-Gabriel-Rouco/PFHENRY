import { Menu } from "react-admin";
import BookIcon from "@mui/icons-material/Book";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export const MyMenu = () => (
  <Menu>
    <Menu.Item to="/admin/books" primaryText="Books" leftIcon={<BookIcon />} />
    <Menu.Item
      to="/admin/users"
      primaryText="Users"
      leftIcon={<PersonOutlineIcon />}
    />
  </Menu>
);
