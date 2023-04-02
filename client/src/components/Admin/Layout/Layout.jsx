import { Layout } from "react-admin";
import { MyMenu } from "../Menu/Menu";

export const MyLayout = (props) => <Layout {...props} menu={MyMenu} />;
