import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { CardMedia, Grid, Typography, styled } from "@mui/material";
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../firebase/firebase-config';
import { useState } from "react";
import { useEffect } from "react";


SwiperCore.use([Navigation, Pagination]);

const Carrousel = () => {
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
    const [discounts, setDiscounts] = useState([]);


    useEffect(() => {
        const fetchDiscounts = async () => {
            const q = collection(db, 'discount');
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });
            setDiscounts(data);
        };
        fetchDiscounts()
        
    }, []);

    console.log(discounts)

    return (
        <CarouselContainer>
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
                {discounts.map((book) => (
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