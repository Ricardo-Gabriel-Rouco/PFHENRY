import { Admin, Resource, CustomRoutes } from "react-admin";
import { MyLayout } from "../../components/Admin/Layout/Layout";
import { Route } from "react-router-dom";
import { Dashboard } from "../../components/Admin/Dashboard/Dashboard";
import dataProvider from "../../components/Admin/dataProvider/dataProvider";
import { BookList } from "../../components/Admin/Booklist/Booklist";
import { Userlist } from "../../components/Admin/Userlist/Userlist";




export const AdminDashboard = () => {
  return (
    <Admin dataProvider={dataProvider} layout={MyLayout} dashboard={Dashboard}>
      <CustomRoutes>
        <Route path="/admin" element={<>Home</>} />
      </CustomRoutes>
      <Resource
        name="books"
        list={BookList}
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
