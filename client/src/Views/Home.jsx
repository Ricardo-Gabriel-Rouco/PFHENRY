import CardContainer from "../components/CardContainer/CardContainer";
import Carrousel from '../components/Carrousel/Carrousel';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { importBooks } from "../redux/actions/booksActions";

const Home = ({ cartOpen }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importBooks())
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Carrousel />
    {/*   <CardContainer cartOpen={cartOpen} /> */}
    </>
  );
};
export default Home;

