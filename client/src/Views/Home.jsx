import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CardContainer from "../components/CardContainer/CardContainer";
import db from "../firebase-config";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/rootReducer/bookSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  const bookCollectionRef = collection(db, "books");

  useEffect(() => {
    const getBooksList = async () => {
      try {
        const data = await getDocs(bookCollectionRef);
        const filterData = data.docs.map((books) => ({ ...books.data(), id: books.id }));
        dispatch(addBook(filterData));
      } catch (error) {}
    };

    getBooksList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <NavBar />
      <CardContainer />
      <Footer />
    </>
  );
};
export default Home;
