import {
  Typography,
  Divider,
  ListItemText,
  Avatar,
  Rating,
  Grid,
  List,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CardsReview = ({ user, comment, rating }) => {
  return (
    <List>
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid
          item
          xs={12}
          sm={2}
          md={2}
          lg={2}
          xl={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Avatar alt="User" color="primary">
            <AccountCircleIcon fontSize="large" color="secondary" />
          </Avatar>
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
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
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Rating
            name="read-only"
            value={rating}
            size="small"
            precision={0.5}
            readOnly
          />
        </Grid>
      </Grid>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default CardsReview;
