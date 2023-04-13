import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardMedia, styled } from "@mui/material";

// Estilos para el Carousel
const CarouselContainer = styled('div')({
    backgroundColor: "#f9b52ea8",
    margin: 'auto',
    maxWidth: '100vw',
});

const BookCardMedia = styled(CardMedia)({
    width: "10rem",
    height: "14rem",
    objectFit: "cover",
    marginLeft: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "50%"
});

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 3,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,

    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        }
    }


const Carrousel = ({ currentBook }) => {
    return (
        <CarouselContainer>
            <Carousel responsive={responsive} showDots={true}>
                {currentBook.map((book) => (
                    <BookCardMedia
                        component="img"
                        height="300"
                        image={book.image}
                        alt={book.title}
                    />
                ))}
            </Carousel>
        </CarouselContainer>
    );
};
export default Carrousel
