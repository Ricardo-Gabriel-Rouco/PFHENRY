import { Menu } from "react-admin";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";
import { useAuth } from "../../../../context/authContext";

export const MyMenu = () => {
  const { userStatus } = useAuth();


  return (
    <Menu>
      <Menu.Item
        to="/admin/books"
        primaryText="Books"
        leftIcon={<MenuBookTwoToneIcon />}
      />
      {userStatus.role === "SUPERADMIN" ?<><Menu.Item
        to="/admin/users"
        primaryText="Users"
        leftIcon={<AccountCircleTwoToneIcon />}
      />
      <Menu.Item
        to="/admin/orders"
        primaryText="Orders"
        leftIcon={<PaidTwoToneIcon />}
      />
      </>
      :null
      }
    </Menu>
  );
};
