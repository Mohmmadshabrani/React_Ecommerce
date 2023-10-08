// src/componetns/Footer.tsx

import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import CopyRight from "../Components/CopyRight/CopyRight";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        mb: 8,
        backgroundColor: "",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              React Starter App
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | React | Material UI | React Router`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <CopyRight />
    </Box>
  );
};

export default Footer;