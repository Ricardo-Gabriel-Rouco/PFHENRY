
import { Modal, Box } from "@mui/material";
import Iframe from "react-iframe";



const CartModal = ({ url, onClose }) => {
    return (
        <Modal open={Boolean(url)} onClose={onClose}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Iframe
                    url={url}
                    allowFullScreen={true}
                    width="100%"
                    height="100%"
                    id="myId"
                    className="myClassname"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                />
            </Box>
        </Modal>
    );
};

export default CartModal;