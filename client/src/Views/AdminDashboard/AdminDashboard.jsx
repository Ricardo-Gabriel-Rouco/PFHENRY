import { Admin, Resource, CustomRoutes } from "react-admin";
import { MyLayout } from "../../components/Admin/Layout/Layout";
import { Dashboard } from "../../components/Admin/Dashboard/Dashboard";
import { BookList } from "../../components/Admin/Booklist/Booklist";
import { Userlist } from "../../components/Admin/Userlist/Userlist";
import dataProvider from "../../components/Admin/dataProvider/dataProvider";
import { Route } from "react-router-dom";
import { BookCreate } from "../../components/Admin/BookCreate/BookCreate";


export const AdminDashboard = () => {
  return (
    <Admin dataProvider={dataProvider} layout={MyLayout} dashboard={Dashboard}>
      <CustomRoutes>
        <Route path="/admin" />
      </CustomRoutes>
      <Resource
        name="books"
        list={BookList}
        create={BookCreate}
        options={{ label: "Books" }}
      />
      <Resource
        name="users"
        list={Userlist}
        basePath="/admin/users"
        options={{ label: "Users" }}
      />
    </Admin>
  );
};

export default AdminDashboard;