
import CardContainer from "../components/CardContainer/CardContainer";
import {db} from "../firebase/firebase-config";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/rootReducer/bookSlice";
import { useEffect} from "react";
import NavBar from "../components/NavBar/NavBar";

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
  }, [bookCollectionRef,dispatch]);

  return (
    <>
      <NavBar />
      <CardContainer  />
    </>
  );
};
export default Home;
