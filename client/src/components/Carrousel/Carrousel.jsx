import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { CardMedia, Grid, Typography,styled } from "@mui/material";

SwiperCore.use([Navigation, Pagination]);

const Carrousel = ({ currentBook }) => {
    const CarouselContainer = styled('div')({
        backgroundColor: "#f9b52ea8",
        margin: 'auto',
        maxWidth: '100vw',
    });
    const BookCardMedia = styled(CardMedia)({
        border: "1px",
        borderRadius: "10px",
        width: "10rem",
        height: "14rem",
        objectFit: "cover",
    });

    return (
        <CarouselContainer>
            <Swiper
                slidesPerView={1}
                spaceBetween={100}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                }}
            >
                {currentBook.map((book) => (
                    <SwiperSlide key={book.id}>
                        <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                            <Grid item>
                                <BookCardMedia
                                    component="img"
                                    height="300"
                                    image={book.image}
                                    alt={book.title} />
                               <Typography align="center" variant="subtitle2">{book.title}</Typography>
                            </Grid>
                        </Grid>
                    </SwiperSlide>
                ))}
            </Swiper>
        </CarouselContainer>
    );
};

export default Carrousel;