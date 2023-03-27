import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Cards from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Card = ({ currentBook }) => {
  return (
    <Cards sx={{ maxWidth: "100%" }}>
      <Grid container spacing={1}>
        {currentBook.map((book, j) => (
          <Grid item xs={12} sm={6} md={3} key={book.id}>
            <Box
              sx={{
                marginTop: "50px",
                flexDirection: "column",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "box-shadow 0.3s ease",
                height: "400px",
                width: "300px",
              }}
              className={style.card}
            >
              <CardMedia
                component="img"
                height="250"
                sx={{ width: "50%", heigth: "20vh", objectFit: "cover", marginTop: "25px" }}
                image={book.image}
                alt={book.name}
              />
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {book.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {book.stock ? <p>Stock: {book.stock}</p> : null}
                </Typography>
                <Typography variant="body2">
                  {book.price ? <p>Price: {book.price}</p> : null}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" href="#contained-buttons" size="small">
                  {" "}
                  <Link to={`/home/${book.id}`}>Details</Link>
                </Button>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <Link to={`/home/cart`}>
                    <ShoppingCartIcon />
                  </Link>
                </IconButton>
              </CardActions>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Cards>
  );
};

export default Card;
