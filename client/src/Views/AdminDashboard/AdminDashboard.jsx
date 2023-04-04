import { Admin, Resource, ListGuesser, CustomRoutes } from "react-admin";
import { FirebaseDataProvider } from "react-admin-firebase";
import { firebaseConfig } from "../../firebase/firebase-config";
import { MyLayout } from "../../components/Admin/Layout/Layout";
import { Route } from "react-router-dom";
import { Dashboard } from "../../components/Admin/Dashboard/Dashboard";

export const dataProvider = FirebaseDataProvider(firebaseConfig);

export const AdminDashboard = () => {
  return (
    <Admin dataProvider={dataProvider} layout={MyLayout} dashboard={Dashboard}>
      <CustomRoutes>
        <Route path="/admin" element={<>Home</>} />
      </CustomRoutes>
      <Resource
        name="books"
        list={ListGuesser}
        basePath="/admin/books"
        options={{ label: "Books" }}
      />
      <Resource
        name="users"
        list={ListGuesser}
        basePath="/admin/users"
        options={{ label: "Users" }}
      />
    </Admin>
  );
};
