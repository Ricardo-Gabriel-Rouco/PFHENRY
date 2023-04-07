import CardContainer from "../components/CardContainer/CardContainer";
import { db } from "../firebase/firebase-config";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/rootReducer/bookSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";



const Home = ({ cartOpen }) => {
  const dispatch = useDispatch();

  const bookCollectionRef = collection(db, "books");
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const data = params.get('data');
  const dataObj = JSON.parse(data);

  useEffect(() => {
    const getBooksList = async () => {
      try {
        const data = await getDocs(bookCollectionRef);
        const filterData = data.docs.map((books) => ({ ...books.data(), id: books.id }));

        dispatch(addBook(filterData));
      } catch (error) { }
    };

    getBooksList();
    // eslint-disable-next-line
  }, []);



  return (
    <>
      {console.log(dataObj)}
      <CardContainer cartOpen={cartOpen} />
    </>
  );
};
export default Home;

