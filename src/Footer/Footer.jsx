import { Typography, Link, IconButton, Box } from "@mui/material";
import React from "react";
import { FaDiscord } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Footer = (props) => {
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
      <Typography
        variant="body1"
        fontWeight="bold"
        color="text.secondary"
        align="center"
        {...props}
        style={{ color: "#1976d2" }}
      >
        You can follow us in : <br />
        <Link
          href="https://www.discord.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <FaDiscord />
          </IconButton>
        </Link>
        <Link
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <FaLinkedin />
          </IconButton>
        </Link>
        <Link
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <FaGoogle />
          </IconButton>
        </Link>
        <Link href="mailto:halahisham044@gmail.com">
          <IconButton>
            <FaEnvelope />
          </IconButton>
        </Link>
        <br />
        {new Date().getFullYear()} © Developed By Kebo Team{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
