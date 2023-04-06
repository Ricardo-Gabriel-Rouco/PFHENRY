import { Admin, Resource, CustomRoutes } from "react-admin";
import { MyLayout } from "../../components/Admin/Layout/Layout";
import { Route } from "react-router-dom";
import { Dashboard } from "../../components/Admin/Dashboard/Dashboard";

import { BookList } from "../../components/Admin/Booklist/Booklist";
import { Userlist } from "../../components/Admin/Userlist/Userlist";
import { BookEdit } from "../../components/Admin/Booklist/Bookedit";
import dataProvider from "../../components/Admin/dataProvider/dataProvider";




export const AdminDashboard = () => {
  return (
    <Admin dataProvider={dataProvider} layout={MyLayout} dashboard={Dashboard}>
      <CustomRoutes>
        <Route path="/admin" element={<>Home</>} />
      </CustomRoutes>
      <Resource
        name="books"
        list={BookList}
        edit={BookEdit}
        basePath="/admin/books"
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
