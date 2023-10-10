import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import styles from "./CartCard.module.css";
const CartCard = ({ product, removeFromCart }) => {
  console.log(product);
  return (
    <Card className={styles.main_cart}>
      <Link
        to={`/Detail/type/${product?.productId?.type}/${product?.productId?._id}`}
      >
        <CardActionArea className={styles.card_action}>
          <Box className={styles.img_box}>
            <img
              alt={product?.name}
              loading="lazy"
              src={product?.mainPicture}
              className={styles.img}
            />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
              {product?.name.length > 20
                ? product?.name.slice(0, 20) + "..."
                : product?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              {product.quantity && (
                <Button>
                  {" "}
                  <Typography variant="body2" color="black">
                    {" "}
                    Quantity {" " + product.quantity}{" "}
                  </Typography>
                </Button>
              )}
              <Typography
                gutterBottom
                variant="h6"
                sx={{ textAlign: "center" }}
              >
                JD{product?.price}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Tooltip title="Remove From Cart">
          <Button
            className="all-btn"
            sx={{ width: 10, borderRadius: "30px" }}
            variant="contained"
            color="error"
            onClick={() => removeFromCart(product)}
          >
            <AiFillDelete style={{ fontSize: 15 }} />
          </Button>
        </Tooltip>
        <Typography>
          {" "}
          <Rating
            name="read-only"
            value={Math.round(product?.rating)}
            readOnly
            precision={0.5}
          />
        </Typography>
      </CardActions>
    </Card>
  );
};

export default CartCard;
