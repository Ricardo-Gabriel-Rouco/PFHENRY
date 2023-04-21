import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import { CardMedia, Grid, Typography, styled, Button, Paper, Box } from "@mui/material";
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
import SupportEngine from '../../chatBot/SupportEngine/index'
import { DiscountLabel } from "../DiscountLabel/DiscountLabel";




SwiperCore.use([Autoplay, Navigation, Pagination]);

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

  const getOrders = [
    ...new Set(
      orders.flatMap((authors) => authors.items.flatMap((a) => a.id))
    ),
  ];


  const favoriteInfo = displayableBooks.filter((book) => { return getOrders.includes(book.id) })
  console.log(favoriteInfo)
  /* const userData = favoriteInfo.map((book) => {
    return {
      id: book.id,
      price: book.price,
      discount: book.discount,
      image: book.image,
      authors: book.authors,
      genres: book.genres
    }
  }) */
  // PARA CONSEGUIR AUTORES PREFERIDOS Y SUS LIBROS QUE NO COMPRO.

  const purchasedAuthors = [...new Set(favoriteInfo.map((book) => book.authors.join(',')))]
  //obtengo array de autores preferidos que compró.

  const booksNotPurchased = []
  purchasedAuthors.forEach((author) => {
    const authorBooks = displayableBooks.filter((book) => book.authors.includes(author));
    const purchasedBooks = favoriteInfo.filter((book) => book.authors.includes(author));
    const unpurchasedBooks = authorBooks.filter((book) => !purchasedBooks.some((purchasedBook) => purchasedBook.title === book.title));
    booksNotPurchased.push(...unpurchasedBooks);
  });
  //obtengo array de libros de los autores que aún, no compró.

  // PARA CONSEGUIR GENEROS PREFERIDOS Y LOS LIBROS QUE NO COMPRO SOBRE ESOS GENEROS.

  const purchasedGenres = [...new Set(favoriteInfo.map((book) => book.genres.join(',')))]
  //obtengo array de genres preferidos que compró.
  console.log(purchasedGenres)

  const genresNotPurchased = [];
  purchasedGenres.forEach((genres) => {
    const genresBooks = displayableBooks.filter((book) => book.genres.includes(genres));
    const purchasedGenres = favoriteInfo.filter((book) => book.authors.includes(genres));
    const unpurchasedGenres = genresBooks.filter((book) => !purchasedGenres.some((purchasedGenres) => purchasedGenres.title === book.title))
    genresNotPurchased.push(...unpurchasedGenres)
  })
  //obtengo array de libros de los genres que aún, no compró.




  const CarouselContainer = styled("div")({
    margin: "auto",

  });
  const BookCardMedia = styled(CardMedia)({
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    border: "1px",
    borderRadius: "5px",
    width: "12rem",
    height: "18rem",
    objectFit: "cover",

  });


  return (
    <>
      {!displayableBooks.length && <img src={loading} alt="loading" />}

      {/*             CARROUSEL RATING CHIQUITO */}

      <CarouselContainer>
        <Swiper
          slidesPerView={10}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            50: {
              slidesPerView: 3
            },
            450: {
              slidesPerView: 5
            },
            600: {
              slidesPerView: 8,
            },
            950: {
              slidesPerView: 10,

            },
            1300: {
              slidesPerView: 15,

            },
            1600: {
              slidesPerView: 20,
            },
          }}
        >
          {displayableBooks.filter(book => book.rating > 1.0).map((book) => (
            <SwiperSlide key={book.id}>
              <Grid container sx={{ display: 'flex', justifyContent: 'center', borderRadius: '10px', width: "100%", backgroundColor: 'primary' }}>
                <Grid item>
                  <BookCardMedia
                    component="img"
                    image={book.image}
                    alt={book.title}
                    sx={{ cursor: "pointer", width: '5rem', height: '5rem' }}
                    onClick={() => dispatch(openModal(book.id))}
                  />
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>


      {/*             CARROUSEL BILLBOARD GRANDE */}
      <CarouselContainer sx={{ width: '90%', marginTop: '3rem' }}>
        <Swiper
          slidesPerView={5}
          pagination={
            true
          }
          modules={[Pagination]}
          breakpoints={{
            250: {

              slidesPerView: 1,
              spaceBetween: 0
            },

            750: {
              slidesPerView: 1,
              spaceBetween: 0
            },
            800: {
              slidesPerView: 1,

            },
            1100: {
              slidesPerView: 1,

            },

            1600: {
              slidesPerView: 1,

            },
          }}
          className="mySwiper12345"
        >

          <SwiperSlide>
            <Box style={{ display: 'flex', justifyContent: 'center', borderRadius: '10px', width: "100%", backgroundColor: 'primary', }}>
              <BookCardMedia
                component="img"
                image={"https://firebasestorage.googleapis.com/v0/b/pf-henry-2d98b.appspot.com/o/Imagenes%20carousel%20billboard%2Fpicsart_10-25-11.55.37.webp?alt=media&token=e8045534-04bd-434a-a1df-6d307f0ba270"}
                alt={'Foto'}
                sx={{ width: '90%', height: '20rem' }}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box style={{ display: 'flex', justifyContent: 'center', borderRadius: '10px', width: "100%", backgroundColor: 'primary', }}>
              <BookCardMedia
                component="img"
                image={"https://firebasestorage.googleapis.com/v0/b/pf-henry-2d98b.appspot.com/o/Imagenes%20carousel%20billboard%2Fgame-of-thrones-books-1-1658259294.png?alt=media&token=a4b9e345-a0aa-4459-b430-22b8411c92d5"}
                alt={'Foto'}
                sx={{ width: '90%', height: '20rem' }}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box style={{ display: 'flex', justifyContent: 'center', borderRadius: '10px', width: "100%", backgroundColor: 'primary', }}>
              <BookCardMedia
                component="img"
                image={"https://firebasestorage.googleapis.com/v0/b/pf-henry-2d98b.appspot.com/o/Imagenes%20carousel%20billboard%2FLOTR_The_Rings_of_Power_logo.jpg?alt=media&token=9ab3cd87-10bc-4255-95a2-6735c705394e"}
                alt={'Foto'}
                sx={{ width: '90%', height: '20rem' }}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box style={{ display: 'flex', justifyContent: 'center', borderRadius: '10px', width: "100%", backgroundColor: 'primary', }}>
              <BookCardMedia
                component="img"
                image={"https://firebasestorage.googleapis.com/v0/b/pf-henry-2d98b.appspot.com/o/Imagenes%20carousel%20billboard%2FCecilia%20Ahern.jpeg?alt=media&token=3374070e-0577-40a0-b1cb-68fc98b22b9a"}
                alt={'Foto'}
                sx={{ width: '90%', height: '20rem' }}
              />
            </Box>
          </SwiperSlide>
        </Swiper>
      </CarouselContainer>

      <Box>
        {/*         CARROUSEL OFERTAS */}
        <CarouselContainer sx={{ width: '70%', minWidth: '15rem' }}>
          <Typography align="left" fontWeight={'bold'} variant="h6" marginTop={"1rem"} marginLeft={'2.5rem'}>
            {"SALES"}
          </Typography>
          <Swiper
            loop={true}
            slidesPerView={5}
            navigation
            breakpoints={{
              250: {

                slidesPerView: 1,
                spaceBetween: 0
              },

              750: {
                slidesPerView: 2,
                spaceBetween: 0
              },
              800: {
                slidesPerView: 2,

              },
              1050: {
                slidesPerView: 3,

              },

              1370: {

                slidesPerView: 4,
              },

              1700: {
                slidesPerView: 5,

              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {displayableBooks.map((book) =>
              book.display && book.discount ? (
                <SwiperSlide key={book.id} >
                  <Grid
                    display='flex'
                    justifyContent="center"
                    sm={true}
                    md={true}
                    lg={true}

                  >
                    <Paper elevation={5} sx={{
                      boxShadow: "0px 0px 10px black",
                      transition: "bgcolor 1s, color 0.5s",
                      "&:hover": {
                        bgcolor: "primary.light",

                      },
                    }} style={{ margin: '1rem', display: 'flex', justifyContent: 'center', borderRadius: '10px', minWidth: '15rem', backgroundColor: 'primary' }}>
                      <Grid item >
                        <BookCardMedia
                          component="img"
                          height="300"
                          image={book.image}
                          alt={book.title}
                          sx={{ cursor: "pointer", marginTop: '20px' }}
                          onClick={() => dispatch(openModal(book.id))}
                        />

                        <Typography
                          align="center"
                          variant="subtitle"
                          sx={{
                            fontSize: 18,
                            backgroundColor: 'inherit',
                            textAlign: "right",
                            fontWeight: "bold",
                            color: "black",
                            position: 'fixed',
                            right: "8rem",
                            top: "0.1rem"

                          }}
                        >
                          <DiscountLabel discount={`%${book.discount} OFF`} />
                        </Typography>

                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ marginBottom: '1rem' }}
                        >
                          <Typography
                            align="left"
                            variant="h7"
                            sx={{ textAlign: "left" }}
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
                    </Paper>
                  </Grid>
                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        </CarouselContainer>

        {/* Carrousel PREFERENCIAS AUTHORS */}
        {
          userStatus.logged && getOrders.length ? (
            <CarouselContainer sx={{ width: '70%', minWidth: '15rem' }}>
              
                {booksNotPurchased.length > 1 ? <Typography align="left" variant="h6" marginLeft={"2.5rem"}>You may be interested in these authors</Typography> : <Typography align="center" variant="h6">You may be interested in this author</Typography>}

              <Swiper
                slidesPerView={5}
                navigation
                breakpoints={{
                  250: {
                    slidesPerView: 1,
                    spaceBetween: 0
                  },

                  750: {
                    slidesPerView: 2,
                    spaceBetween: 0
                  },
                  800: {
                    slidesPerView: 2,

                  },
                  1100: {
                    slidesPerView: booksNotPurchased.length < 4 && booksNotPurchased.length < 3 && booksNotPurchased.length < 2 ? 1 :
                      booksNotPurchased.length < 4 && booksNotPurchased.length < 3 ? 2 :
                        booksNotPurchased.length < 4 ? 3 : 3


                  },
                  1600: {
                    slidesPerView: booksNotPurchased.length < 4 && booksNotPurchased.length < 3 && booksNotPurchased.length < 2 ? 1 :
                      booksNotPurchased.length < 4 && booksNotPurchased.length < 3 ? 2 :
                        booksNotPurchased.length < 4 ? 3 : 4

                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {booksNotPurchased
                  .map((book, index) => (
                    <SwiperSlide key={index}>
                      <Grid
                        display='flex'
                        justifyContent="center"
                        sm={true}
                        md={true}
                        lg={true}

                      >
                        <Paper elevation={5} sx={{
                          boxShadow: "0px 0px 10px black",
                          transition: "bgcolor 1s, color 0.5s",
                          "&:hover": {
                            bgcolor: "primary.light",

                          },
                        }} style={{ margin: '1rem', display: 'flex', justifyContent: 'center', borderRadius: '10px', minWidth: '15rem', backgroundColor: 'primary' }}>
                          <Grid item>
                            <BookCardMedia
                              component="img"
                              image={book.image}
                              alt={book.title}
                              sx={{ cursor: "pointer", marginTop: '20px' }}
                              onClick={() => dispatch(openModal(book.id))}
                            />
                            {book.discount ? (
                              <Typography
                                align="center"
                                variant="subtitle"
                                sx={{
                                  fontSize: 18,
                                  backgroundColor: 'inherit',
                                  textAlign: "right",
                                  fontWeight: "bold",
                                  color: "black",
                                  position: 'fixed',
                                  right: "10rem",
                                  top: "0.1rem"
                                }}
                              >
                                <DiscountLabel discount={`%${book.discount} OFF`} />
                              </Typography>) : null}
                            {book.discount ? (
                              <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ marginBottom: '1rem' }}
                              >
                                <Typography
                                  align="left"
                                  variant="h7"
                                  sx={{ textAlign: "left" }}
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
                            ) : <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                              sx={{ marginBottom: '1rem' }}
                            >

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

                            }
                          </Grid>
                        </Paper>
                      </Grid>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </CarouselContainer>
          ) : null
        }

        {/* CARROUSEL GENERO */}
        {
          userStatus.logged && getOrders.length ? (
            <CarouselContainer sx={{ width: '70%', minWidth: '15rem' }}>
              {purchasedGenres.length >= 1 ? <Typography align="left" variant="h6" marginLeft={"2.5rem"}>You may be interested in these genres</Typography> : <Typography align="center" variant="h6" marginLeft={"2.5rem"}>You may be interested in this genre</Typography>}
              <Swiper
                slidesPerView={5}
                navigation
                breakpoints={{
                  250: {

                    slidesPerView: 1,
                    spaceBetween: 0
                  },

                  750: {
                    slidesPerView: 2,
                    spaceBetween: 0
                  },
                  800: {
                    slidesPerView: 2,

                  },
                  1100: {
                    slidesPerView: genresNotPurchased.length < 4 && genresNotPurchased.length < 3 && genresNotPurchased.length < 2 ? 1 :
                      genresNotPurchased.length < 4 && genresNotPurchased.length < 3 ? 2 :
                        genresNotPurchased.length < 4 ? 3 : 3

                  },

                  1600: {
                    slidesPerView: genresNotPurchased.length < 4 && genresNotPurchased.length < 3 && genresNotPurchased.length < 2 ? 1 :
                      genresNotPurchased.length < 4 && genresNotPurchased.length < 3 ? 2 :
                        genresNotPurchased.length < 4 ? 3 : 4

                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {genresNotPurchased
                  .map((book, index) => (
                    <SwiperSlide key={index}>
                      <Grid
                        display='flex'
                        justifyContent="center"
                        sm={true}
                        md={true}
                        lg={true}

                      >
                        <Paper elevation={5} sx={{
                          boxShadow: "0px 0px 10px black",
                          transition: "bgcolor 1s, color 0.5s",
                          "&:hover": {
                            bgcolor: "primary.light",

                          },
                        }} style={{ margin: '1rem', display: 'flex', justifyContent: 'center', borderRadius: '10px', minWidth: '15rem', backgroundColor: 'primary' }}>
                          <Grid item>
                            <BookCardMedia
                              component="img"
                              image={book.image}
                              alt={book.title}
                              sx={{ cursor: "pointer", marginTop: '20px' }}
                              onClick={() => dispatch(openModal(book.id))}
                            />
                            {book.discount ? (
                              <Typography
                                align="center"
                                variant="subtitle"
                                sx={{
                                  fontSize: 18,
                                  backgroundColor: 'inherit',
                                  textAlign: "right",
                                  fontWeight: "bold",
                                  color: "black",
                                  position: 'fixed',
                                  right: "10rem",
                                  top: "0.1rem"
                                }}
                              >
                                <DiscountLabel discount={`%${book.discount} OFF`} />
                              </Typography>) : null}
                            {book.discount ? (
                              <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ marginBottom: '1rem' }}
                              >
                                <Typography
                                  align="left"
                                  variant="h7"
                                  sx={{ textAlign: "left" }}
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
                            ) : <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                              sx={{ marginBottom: '1rem' }}
                            >

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

                            }
                          </Grid>
                        </Paper>
                      </Grid>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </CarouselContainer>
          ) : null
        }
      </Box >

      {/*             CARROUSEL LIBROS */}

      {/*  <CarouselContainer> */}
      <Grid container justifyContent="center" alignItems="center">
        {/*  <Grid item xs={6} textAlign="left">
            <Typography variant="h6" marginLeft={2}>
              All Books
            </Typography>
          </Grid> */}
        <Grid item xs={6} textAlign="center">
          <Link to="/books">
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ m: 1 }}
              onClick={{ handleShowAllBooks }}
            >
              Show All Books
            </Button>
          </Link>
        </Grid>
      </Grid>
      {/* <Swiper
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
          {displayableBooks.slice(0, 30).map((book) => (
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
      </CarouselContainer> */}
      <SupportEngine />
    </>
  );
};

export default Carrousel;