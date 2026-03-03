import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import AdbIcon from "@mui/icons-material/Adb";

import { useAuth } from "../context/AuthContext";

const pages = [
  { name: "Home", path: "/" },
  { name: "Cart", path: "/cart" },
  { name: "Order Following", path: "/orderfollowing" },
];

const adminPage = [
  { name: "Admin Dashboard", path: "/admindashboard" },
];

const settings = [
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/signup" },
];

function Navbar() {

  const location = useLocation();
  const { user, logout } = useAuth();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogout = React.useCallback(() => {
    logout();
  }, [logout]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ height: 80 }}>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AdbIcon sx={{ mr: 1, color: "#3b82f6" }} />
            <Typography
              component={Link}
              to="/"
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: "20px",
                letterSpacing: 1
              }}
            >
              TechStore
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: 6
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{
                  position: "relative",
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 500,
                  mx: 2,
                  px: 1,
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    width:
                      location.pathname === page.path ? "100%" : "0%",
                    height: "2px",
                    background: "#3b82f6",
                    transition: "0.3s"
                  },
                  "&:hover": {
                    color: "white",
                    "&:after": {
                      width: "100%"
                    }
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>

            <Tooltip title="Account Settings">
              <IconButton
                onClick={(e) => setAnchorElUser(e.currentTarget)}
                sx={{
                  ml: 2,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.1)" }
                }}
              >
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(135deg,#3b82f6,#06b6d4)",
                    fontWeight: 700
                  }}
                >
                  {user
                    ? user.role?.charAt(0).toUpperCase()
                    : "U"}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: "14px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
                }
              }}
            >
              {!user &&
                settings.map((item) => (
                  <MenuItem
                    key={item.name}
                    component={Link}
                    to={item.path}
                    onClick={() => setAnchorElUser(null)}
                  >
                    {item.name}
                  </MenuItem>
                ))}

              {user && user.role === "admin" &&
                adminPage.map((item) => (
                  <MenuItem
                    key={item.name}
                    component={Link}
                    to={item.path}
                    onClick={() => setAnchorElUser(null)}
                  >
                    {item.name}
                  </MenuItem>
                ))}

              {user && (
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    color: "#ef4444",
                    fontWeight: 600
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default React.memo(Navbar);