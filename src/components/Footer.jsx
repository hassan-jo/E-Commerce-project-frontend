import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton
} from "@mui/material";

import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import LinkedIn from "@mui/icons-material/LinkedIn";

function Footer() {

  const links = useMemo(() => [
    { label: "Home", path: "/" },
    { label: "Cart", path: "/cart" },
    { label: "Order Tracking", path: "/orderfollowing" },
  ], []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Box
      sx={{
        mt: 20,
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top,#0f172a,#020617 70%)",
        color: "white",
        py: 10
      }}
    >
      <Container maxWidth="xl">

        <Grid container spacing={8} mb={8}>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              fontWeight="800"
              mb={2}
              sx={{
                background:
                  "linear-gradient(90deg,#3b82f6,#06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              TechStore
            </Typography>

            <Typography sx={{ opacity: 0.7, lineHeight: 1.7 }}>
              Build your digital business with next-generation commerce infrastructure.
              Performance, scalability and security combined.
            </Typography>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography fontWeight="700" mb={3}>
              Platform
            </Typography>

            {links.map(item => (
              <Typography
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  display: "block",
                  color: "white",
                  textDecoration: "none",
                  opacity: 0.7,
                  mb: 1.5,
                  transition: "0.3s",
                  "&:hover": {
                    opacity: 1,
                    transform: "translateX(6px)"
                  }
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography fontWeight="700" mb={3}>
              Subscribe to Updates
            </Typography>

            <Box display="flex" gap={1} flexWrap="wrap">
              <TextField
                placeholder="Enter your email"
                size="small"
                sx={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "10px",
                  flex: 1,
                  input: { color: "white" }
                }}
              />

              <Button
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  px: 3,
                  background:
                    "linear-gradient(90deg,#3b82f6,#06b6d4)"
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>

        </Grid>

        <Box
          sx={{
            height: 1,
            background: "rgba(255,255,255,0.06)",
            mb: 5
          }}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={3}
          alignItems="center"
        >
          <Typography sx={{ opacity: 0.6 }}>
            © {currentYear} TechStore — All Rights Reserved
          </Typography>

          <Box display="flex" gap={1}>
            {[Facebook, Instagram, Twitter, LinkedIn].map(
              (Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: "white",
                    background: "rgba(255,255,255,0.04)",
                    transition: "0.3s",
                    "&:hover": {
                      background: "rgba(59,130,246,0.2)",
                      transform: "translateY(-3px)"
                    }
                  }}
                >
                  <Icon />
                </IconButton>
              )
            )}
          </Box>
        </Box>

      </Container>
    </Box>
  );
}

export default React.memo(Footer);