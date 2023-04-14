import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { CardMedia, Grid, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import CardDetail from '../CardDetail/CardDetail'
import './Carrousel.css'


SwiperCore.use([Navigation, Pagination]);

const Carrousel = () => {
    const displayableBooks = useSelector((state) => state.books.displayableBooks);
    const [selectedBookId, setSelectedBookId] = useState(null);

    const handleBookClick = (bookId) => {
        setSelectedBookId(bookId);
    }
    const CarouselContainer = styled('div')({
        backgroundColor: "#f9b52ea8",
        margin: 'auto',
        maxWidth: '100vw',
        zIndex: 0
    });
    const BookCardMedia = styled(CardMedia)({
        border: "1px",
        borderRadius: "10px",
        width: "10rem",
        height: "14rem",
        objectFit: "cover",
        zIndex: 0
    });

    



    return (
        <CarouselContainer>
            <Typography align="left" variant="h6" marginLeft={'15px'}>
                {'Ofertas'}
            </Typography>
            <Swiper
                slidesPerView={4}
                slidesPerGroup={4}
                spaceBetween={100}
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
                {displayableBooks.map((book) => (
                    book.display && book.discount ?
                        <SwiperSlide key={book.id}>
                            {console.log(book.id)}
                            <Grid container justifyContent="center" style={{ height: '100%' }}>
                                <Grid item>
                                    <BookCardMedia
                                        component="img"
                                        height="300"
                                        image={book.image}
                                        alt={book.title}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => handleBookClick(book.id)} />
                                    {selectedBookId === book.id && <CardDetail id={book.id} />}
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Typography align="left" variant="h7" sx={{ textAlign: 'left' }}>
                                            $<s>{book.price}</s>{" "}
                                        </Typography>
                                        <Typography align="left" variant="h7" fontWeight={'bold'} sx={{ textAlign: 'left' }}>
                                            <span>
                                                ${(book.price * (100 - book.discount) / 100).toFixed(2)}
                                            </span>
                                        </Typography>
                                    </Grid>
                                    <Typography align="right" variant="h7" sx={{ textAlign: 'right', color: 'brown', }}>
                                        %{book.discount} {' off'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </SwiperSlide>
                        : null))}
            </Swiper>
        </CarouselContainer >
    );
};

export default Carrousel;



