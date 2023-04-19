import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { CardMedia, Grid, Typography, styled, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./Carrousel.css";
import { useState, useEffect } from "react";
import { getOrdersByUser } from "../../firebase/firestore/orders";
import loading from "../../Assets/Loading.gif";
/* import SupportEngine from '../../chatBot/SupportEngine/index' TENEMOS QUE DEFINIR DONDE CARANCHO PONEMOS EL CHAT*/
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/rootReducer/bookSlice";
import { DiscountLabel } from "../DiscountLabel/DiscountLabel";

SwiperCore.use([Navigation, Pagination]);

const Carrousel = () => {
    const displayableBooks = useSelector((state) => state.books.displayableBooks);
    const { userStatus } = useAuth();
    const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);


    useEffect(() => {
        async function fetchOrders() {
        const data = await getOrdersByUser(userStatus.userId);
        setOrders(data);
    }
    fetchOrders();
    }, [userStatus.userId]);

  function handleShowAllBooks() {
    window.scrollTo(0, 0);
  }

    const favoriteAuthors = [
        ...new Set(
        orders.flatMap((authors) => authors.items.flatMap((a) => a.authors))
        ),
    ];


    const purchasedBooks = [
        ...new Set(orders.flatMap((authors) => authors.items.flatMap((a) => a.id))),
    ];

    const CarouselContainer = styled("div")({
        margin: "auto",
        maxWidth: "100vw",

    });
    const BookCardMedia = styled(CardMedia)({
        border: "1px",
        borderRadius: "10px",
        width: "10rem",
        height: "14rem",
        objectFit: "cover",

    });

    return (
        <>
        {!displayableBooks.length && <img src={loading} alt="loading" />}
        {/*         CARROUSEL OFERTAS */}
        <CarouselContainer>

            <Typography align="left" variant="h6" marginLeft={"15px"}>
            {"Sales"}
            </Typography>
            <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={200}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
                400: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 0,
                },
                640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20,
                },
                768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 30,
                },
                1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 10,
                },
            }}
            >
            {displayableBooks.map((book) =>
                book.display && book.discount ? (
                <SwiperSlide key={book.id}>
                    <Grid
                    container
                    justifyContent="center"
                    style={{ height: "100%" }}
                    >
                    <Grid item>
                        <BookCardMedia
                        component="img"
                        height="300"
                        image={book.image}
                        alt={book.title}
                        sx={{ cursor: "pointer", zIndex: "0" }}
                        onClick={() => dispatch(openModal(book.id))}
                        />

                  <Typography
                      align="center"
                      variant="subtitle"
                      sx={{
                        fontSize: 18,
                        textAlign: "right",
                        fontWeight: "bold",
                        color: "black",
                        position:"fixed",
                        top:"-0.5rem",
                        right:"11rem"
                      }}
                    >
                      <DiscountLabel discount={`-${book.discount}%OFF`}/>
                      {/* %{book.discount} {" OFF"} */}
                    </Typography>

                        <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        >
                        <Typography
                            align="left"
                            variant="h7"
                            sx={{ textAlign: "left"}}
                        >
                            $<s>{book.price}</s>{" "}
                        </Typography>
                        <Typography
                            align="left"
                            variant="h7"
                            fontWeight={"bold"}
                            sx={{ textAlign: "left" }}
                        >
                            <span>
                            $
                            {((book.price * (100 - book.discount)) / 100).toFixed(
                                2
                            )}
                            </span>
                        </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                </SwiperSlide>
                ) : null
            )}
            </Swiper>
        </CarouselContainer>

      {/* Carrousel PREFERENCIAS AUTHORS */}
        {userStatus.logged  && favoriteAuthors.length? (
            <CarouselContainer>
            <Typography align="left" variant="h6" marginLeft={"15px"}>
            {displayableBooks
                .filter((books) => {
                    const authors = books.authors;
                    return authors.some((author) =>
                    favoriteAuthors.includes(author)
                    );
                })
                .filter((book) => !purchasedBooks.includes(book.id)).length > 1 ? `You may be interested in these authors` : 'You may be interested in this author'}
            </Typography>
            <Swiper
                slidesPerView={4}
                slidesPerGroup={4}
                spaceBetween={200}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                400: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 0,
                },
                640: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 10,
                },
                }}
            >
                {displayableBooks
                .filter((books) => {
                    const authors = books.authors;
                    return authors.some((author) =>
                    favoriteAuthors.includes(author)
                    );
                })
                .filter((book) => !purchasedBooks.includes(book.id))
                .map((book) => (
                    <SwiperSlide key={book.id}>
                    <Grid
                        container
                        justifyContent="center"
                        style={{ height: "100%" }}
                    >
                        <Grid item>
                            <BookCardMedia
                            component="img"
                            height="300"
                            image={book.image}
                            alt={book.title}
                            sx={{ cursor: "pointer" }}
                            onClick={() => dispatch(openModal(book.id))}
                            />
                        
                        <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography
                            variant="h7"
                            fontWeight={"bold"}
                            sx={{ display: "flex", justifyContent: "center" }}
                            >
                            {book.discount
                                ? "$" +
                                (
                                    (book.price * (100 - book.discount)) /
                                    100
                                ).toFixed(2)
                                : "$" + book.price}
                            </Typography>
                        </Grid>
                        </Grid>
                    </Grid>
                    </SwiperSlide>
                ))}
            </Swiper>
            </CarouselContainer>
        ) : null }

        {/*             CARROUSEL LIBROS */}

      <CarouselContainer>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6} textAlign="left">
            <Typography variant="h6" marginLeft={2}>
              All Books
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Link to="/books">
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ m: 1 }}
                onClick={{ handleShowAllBooks }}
              >
                Show All Books
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Swiper
          slidesPerView={4}
          slidesPerGroup={4}
          spaceBetween={200}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            400: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 10,
            },
          }}
        >
          {displayableBooks.slice(0, 16).map((book) => (
            <SwiperSlide key={book.id}>
              <Grid
                container
                justifyContent="center"
                style={{ height: "100%" }}
              >
                <Grid item>
                    <BookCardMedia
                      component="img"
                      height="300"
                      image={book.image}
                      alt={book.title}
                      sx={{ cursor: "pointer" }}
                      onClick={() => dispatch(openModal(book.id))}
                    />
                  <Grid container justifyContent="center" alignItems="center">
                    <Typography
                      variant="h7"
                      fontWeight={"bold"}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      {book.discount
                        ? "$" +
                          ((book.price * (100 - book.discount)) / 100).toFixed(
                            2
                          )
                        : "$" + book.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>
    </>
  );
};

export default Carrousel;
