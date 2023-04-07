import CardContainer from "../components/CardContainer/CardContainer";
import {db} from "../firebase/firebase-config";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/rootReducer/bookSlice";
import { useEffect} from "react";
import { useParams } from "react-router-dom";



const Home = ({cartOpen}) => {
  const dispatch = useDispatch();

  const bookCollectionRef = collection(db, "books");
  // const query = new URLSearchParams(window.location.search);
  // const data = JSON.parse(query.get('data'));
  const params = useParams()

  useEffect(() => {
    const getBooksList = async () => {
      try {
        const data = await getDocs(bookCollectionRef);
        const filterData = data.docs.map((books) => ({ ...books.data(), id: books.id }));
        
        dispatch(addBook(filterData));
      } catch (error) {}
    };

    getBooksList();
    // eslint-disable-next-line
  }, []);



  return (
    <>
    {console.log(params)}
      <CardContainer cartOpen={cartOpen}/>
    </>
  );
};
export default Home;

