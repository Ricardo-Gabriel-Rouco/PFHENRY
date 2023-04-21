import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CardDetail from "../CardDetail/CardDetail.jsx";
import { closeModal } from "../../redux/rootReducer/bookSlice.js";
import { addProduct } from "../../redux/rootReducer/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Grid,
} from "@mui/material";
import {
    deleteFavorite,
    addFavorite,
} from "../../redux/rootReducer/favoriteSlice.js";

const ModalDetail = () => {
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(false);

    const bookId = useSelector((state) => state.books.bookId);

    const handleFavorite = () => {
        if (isFav) {
        dispatch(deleteFavorite(bookId));
        setIsFav(false);
        } else {
        dispatch(addFavorite(bookId));

        setIsFav(true);
        }
    };

    const handleAdd = (id) => {
        dispatch(addProduct({ id }));
    };

    return (
        <Dialog
        open={bookId > 0}
        onClose={() => dispatch(closeModal())}
        PaperProps={{
            sx: {
            width: "100%",
            height: "100%",
            overflow: "hidden",
            bgcolor: "success.light",
            color: "primary",
            maxWidth:"55vw"
            },
        }}
        >
        <DialogContent>
            <CardDetail id={bookId} />
        </DialogContent>
        <DialogActions>
            <Grid
            container
            spacing={3}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: "auto",
            }}
            >
            <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                {isFav ? (
                <Button
                    variant="contained"
                    sx={{
                    color: "primary.contrastText",

                    transition: "color 0.5s",
                    "&:hover": {
                        color: "secondary.contrastText",
                    },
                    }}
                    endIcon={<BookmarkOutlinedIcon />}
                    onClick={() => handleFavorite()}
                >
                    Add
                </Button>
                ) : (
                <Button
                    variant="contained"
                    sx={{
                    color: "primary.contrastText",

                    transition: "color 0.5s",
                    "&:hover": {
                        color: "secondary.contrastText",
                    },
                    }}
                    endIcon={<BookmarkBorderOutlinedIcon />}
                    onClick={() => handleFavorite()}
                >
                    Add
                </Button>
                )}
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <Button
                variant="contained"
                sx={{
                    color: "primary.contrastText",

                    transition: "color 0.5s",
                    "&:hover": {
                    color: "secondary.contrastText",
                    },
                }}
                endIcon={<ShoppingCartIcon />}
                onClick={() => handleAdd(bookId)}
                >
                Add
                </Button>
            </Grid>
            </Grid>

            <Button
            variant="contained"
            endIcon={<ExitToAppIcon />}
            onClick={() => dispatch(closeModal())}
            sx={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                zIndex: 2,
                top: "20px",
                right: "20px",
                color: "primary.contrastText",

                transition: "color 0.5s",
                "&:hover": {
                color: "secondary.contrastText",
                },
            }}
            ></Button>
        </DialogActions>
        </Dialog>
    );
};

export default ModalDetail;
