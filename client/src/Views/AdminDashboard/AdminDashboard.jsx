import { Admin, Resource, CustomRoutes, EditGuesser, ShowGuesser } from "react-admin";
import { MyLayout } from "../../components/Admin/Layout/Layout";
import { Dashboard } from "../../components/Admin/Dashboard/Dashboard";
import { BookList } from "../../components/Admin/Booklist/Booklist";
import { Userlist } from "../../components/Admin/Userlist/Userlist";
import dataProvider from "../../components/Admin/dataProvider/dataProvider";
import CardDetail from "../../components/CardDetail/CardDetail";
import { Route } from "react-router-dom";
import BookForm from "../../components/BookForm/BookForm";

export const AdminDashboard = () => {
  return (
    <Admin dataProvider={dataProvider} layout={MyLayout} dashboard={Dashboard} basename="/admin">
      <CustomRoutes>
        <Route path="/admin" />
      </CustomRoutes>
      <Resource
        name="books"
        list={BookList}
        edit={EditGuesser}
        basePath="/admin/books"
        show={ShowGuesser}
        create={BookForm}
        options={{ label: "Books" }}
      >
        <Route path="/:id" element={<EditGuesser/>}/>
        <Route path="/:id/show" element={ <CardDetail/> }/>
      </Resource>
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