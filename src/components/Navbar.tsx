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
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button color="inherit" component={RouterLink} to="/">
              Products
            </Button>
            <Button color="inherit" component={RouterLink} to="/dispatched">
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
            <ListItem component={RouterLink} to="/">
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem component={RouterLink} to="/dispatched">
              <ListItemText primary="Dispatched Products" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
