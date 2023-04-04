
import CardContainer from "../components/CardContainer/CardContainer";
import {db} from "../firebase/firebase-config";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/rootReducer/bookSlice";
import { useEffect} from "react";


const Home = ({cartOpen}) => {
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
  }, []);

  return (
    <>
      <CardContainer cartOpen={cartOpen}/>
    </>
  );
};
export default Home;
