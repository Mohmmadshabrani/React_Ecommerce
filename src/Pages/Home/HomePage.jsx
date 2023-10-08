import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { ContextFunction } from "../../Context/Context";
import CategoryCard from "../../Components/Category_Card/CategoryCard";
import ProductCard from "../../Components/Card/Product Card/ProductCard";

import Carousel from "../../Components/Carousel/Carousel";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Loading from "../../Components/loading/Loading";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { setCart } = useContext(ContextFunction);
  const [categories, setcategries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let authToken = localStorage.getItem("Authorization");

  useEffect(() => {
    getCart();
    getCategories();
    window.scroll(0, 0);
  }, []);

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/src/apis/users/getCategories.php`
      );
      setIsLoading(false);
      setcategries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    if (authToken !== null) {
      const { data } = await axios.post(
        "http://localhost:8000/src/apis/users/GetCartData.php",
        authToken
      );
      setCart(data);
    }
  };

  const loading = isLoading ? (
    <Container
      maxWidth="xl"
      style={{
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingBottom: 20,
      }}
    >
      <Loading />
      <Loading />
      <Loading />
      <Loading />
    </Container>
  ) : (
    ""
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 900  },
      items: 2,
    },
    tablet_mobile: {
      breakpoint: { max: 1024, min: 700  },
      items: 1.5,
    },
    mobile: {
      breakpoint: { max: 700  , min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Container
        maxWidth="xl"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 0,
          flexDirection: "column",
          marginBottom: 70,
        }}
      >
        <Box padding={1}>
          <Carousel />
        </Box>
        <Container
          style={{ marginTop: 90, display: "flex", justifyContent: "center" }}
        >
          <SearchBar />
        </Container>
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            marginTop: 10,
            marginBottom: 5,
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          PRODUCTS ON DISCOUNT
        </Typography>
        <Container maxWidth="l"
          style={{
            marginTop: 90,
          }}
        >
          <MultiCarousel
            animationType="fadeout"
            animationDuration={800}
            infinite
            touchTracking
            mouseTracking
            disableDotsControls
            autoPlay
            autoPlayInterval={2500}
            responsive={responsive}
          >
            {categories.map((item) => (
              <Link to={`/Detail/type/${item.id}`} key={item.name}>
                <Box style={{ marginTop: 10, height: 300, width: 400 }}>
                  <img
                    src={item.image}
                    loading="lazy"
                    alt={item.name}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Link>
            ))}
          </MultiCarousel>
        </Container>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginTop: 10,
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          Categories
        </Typography>
        <Container
          maxWidth="xl"
          style={{
            marginTop: 90,
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {categories.map((data) => (
            <CategoryCard data={data} key={data.img} />
          ))}
        </Container>
        {loading}
      </Container>
    </>
  );
};

export default HomePage;
