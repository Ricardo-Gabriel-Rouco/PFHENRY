import {
  Typography,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Rating,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CardsReview = ({ user, comment, rating }) => {
  return (
    <>
      <ListItem
        alignItems="flex-end"
        justifyContent="space-between"
        sx={{
          width: "100%",
        }}
      >
        <ListItemAvatar>
          <Avatar alt="User">
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={user}
          secondary={
            <>
              <Typography
                sx={{ display: "inline", width: "100%" }}
                component="span"
                variant="body2"
                color="text.primary"
              ></Typography>
              {comment}
            </>
          }
        />
        <Rating
          name="read-only"
          value={rating}
          size="small"
          precision={0.5}
          readOnly
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CardsReview;
