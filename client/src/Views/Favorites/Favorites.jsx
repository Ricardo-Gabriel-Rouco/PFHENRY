import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Drawer,
  Box,
} from "@mui/material";

import { deleteFavorite } from '../../redux/rootReducer/favoriteSlice'
import { addProduct } from '../../redux/rootReducer/cartSlice';
import { closeFav } from '../../redux/rootReducer/toogleFavSlice';


const Favorites = () => {
    const favorites = useSelector(state => state.favorite.favorites);
    const dispatch = useDispatch();
    const toogleFav = useSelector(state => state.toogleFav.isOpen);
    const displayableBooks = useSelector((state) => state.books.displayableBooks);

  const handleDelete = (id) => {
    dispatch(deleteFavorite(id));
  };

  const addToCart = (book) => {
    dispatch(addProduct(book));
    dispatch(deleteFavorite(book.id));
  };

  const styles = {
    tableCell: {
      fontWeight: "bold",
    },
    // tableRow: {
    //      backgroundColor: '#f7f5f5',
    //     '&:hover': {
    //         backgroundColor: "secondary",
    //     },
    // },
  };

  return (
    <>
      <Drawer
        anchor={"bottom"}
        open={toogleFav}
        onClose={() => {
          dispatch(closeFav());
        }}
      >
        <Box sx={{ maxHeight: "80%", p: 2 }}>
          <TableContainer
            component={Paper}
            style={{ margin: "0 auto", width: "100%" }}
          >
            <Table aria-label="simple table" style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
              </colgroup>
              <TableHead>
                <TableRow sx={{color:"InfoBackground"}} hover={true}>
                  <TableCell>Title</TableCell>
                  <TableCell>Authors</TableCell>
                  <TableCell>Editorial</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody> 
                {favorites
                  ? displayableBooks.filter(book => favorites.favorites.includes(book.id)).map((favorite, index) => (
                                    favorite.display?
                      <TableRow  key={index}>
                        <TableCell sx={styles.tableCell}>
                          {favorite.title}
                        </TableCell>
                        <TableCell sx={styles.tableCell}>
                          {favorite.authors.join(", ")}
                        </TableCell>
                        <TableCell sx={styles.tableCell}>
                          {favorite.editorial}
                        </TableCell>
                        <TableCell
                          sx={{ ...styles.tableCell, maxWidth: "100px" }}
                        >
                          <img
                            src={favorite.image}
                            alt="asdf"
                            style={{ width: "30%", height: "auto" }}
                          />
                        </TableCell>
                        <TableCell sx={styles.tableCell}>
                          {favorite.price}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDelete(favorite.id)}
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Delete
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => addToCart({id:favorite.id})}
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Add to Cart
                          </Button>
                        </TableCell>
                      </TableRow>
                                    :null
                    ))
                  : "There is no Favorites added"}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Drawer>
    </>
  );
};

export default Favorites;
