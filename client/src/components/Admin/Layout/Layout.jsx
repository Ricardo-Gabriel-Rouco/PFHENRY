import { Layout } from "react-admin";
import { MyMenu } from "./Menu/Menu";
import { MyAppBar } from "./MyAppBar/MyAppBar";

export const MyLayout = (props) => <Layout {...props} menu={MyMenu} appBar={MyAppBar} />;
