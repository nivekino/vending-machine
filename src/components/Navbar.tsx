import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import StoreIcon from "@mui/icons-material/Store";
import SendIcon from "@mui/icons-material/Send";
import ReceiptIcon from "@mui/icons-material/ReceiptLong";

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#9E00FF" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vending Mystery Machine
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{
                color: isActive("/") ? "#fff" : "#eee",
                bgcolor: isActive("/")
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
                borderRadius: 2,
                px: 3,
                py: 1,
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  bgcolor: isActive("/")
                    ? "#981eb7"
                    : "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Products
            </Button>
            <Button
              component={RouterLink}
              to="/preparing"
              sx={{
                color: isActive("/preparing") ? "#fff" : "#eee",
                bgcolor: isActive("/preparing")
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
                borderRadius: 2,
                px: 3,
                py: 1,
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  bgcolor: isActive("/preparing")
                    ? "#981eb7"
                    : "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Preparing Orders
            </Button>
            <Button
              component={RouterLink}
              to="/dispatched"
              sx={{
                color: isActive("/dispatched") ? "#fff" : "#eee",
                bgcolor: isActive("/dispatched")
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
                borderRadius: 2,
                px: 3,
                py: 1,
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  bgcolor: isActive("/dispatched")
                    ? "#981eb7"
                    : "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Dispatched Products
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        transitionDuration={{ enter: 500, exit: 500 }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleDrawer(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            <ListItem
              button
              component={RouterLink}
              to="/"
              selected={isActive("/")}
            >
              <ListItemIcon>
                <StoreIcon color={isActive("/") ? "secondary" : "inherit"} />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/preparing"
              selected={isActive("/preparing")}
            >
              <ListItemIcon>
                <ReceiptIcon
                  color={isActive("/preparing") ? "secondary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText primary="Preparing Orders" />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/dispatched"
              selected={isActive("/dispatched")}
            >
              <ListItemIcon>
                <SendIcon
                  color={isActive("/dispatched") ? "secondary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText primary="Dispatched Products" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
