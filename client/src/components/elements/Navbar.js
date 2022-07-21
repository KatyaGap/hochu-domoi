import * as React from 'react';
import { useContext } from 'react';
import { AppBar, Toolbar, Box, Menu, Avatar, Container, Button, Tooltip, MenuItem, IconButton, Typography, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { AddCircle } from '@mui/icons-material';

import { UserContext } from '../../context/user';

const pages = ['Потеряшки', 'Найдёныши', 'Каталог', "Избранное"];
const pagesLinks = ['lost', 'found', 'catalog', 'profile/favor'];
const settings = ['Профиль', 'Выйти'];
const settingsLinks = ['profile', 'logout'];

function Navbar() {
  const { user, handleLogout } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const navLink = (pagesLinksArrNumber) => {
    setAnchorElNav(null);
    // navigate(`/${pagesLinks[pagesLinksArrNumber]}`);
    window.location.replace(`/${pagesLinks[pagesLinksArrNumber]}`);
  };

  const navSettings = (settingsLinksArrNumber) => {
    setAnchorElUser(null);
    if (settingsLinks[settingsLinksArrNumber] === "logout") {
      handleLogout();
    }
    navigate(`/${settingsLinks[settingsLinksArrNumber]}`);
  };

  const newPostLink = () => {
    if (user?.id) {
      navigate('/newpost');
    } else {
      navigate('/authnewpost');
    }
  };

  const authLink = () => {
    navigate('/auth');
  };

  const chatLink = () => {
    navigate('/chat');
  };

  const mainLink = () => {
    navigate('/');
  };

  const logoutLink = () => {
    navigate('/logout');
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className="navbar" position="static">
      <Container maxWidth="xl">
        <Toolbar className="navbar-content" disableGutters>

          <Stack className="logo" sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }} direction="row" spacing={1}>
            <Box>
              <img src="/iconW24.png" alt="logo" width="24" height="24" />
            </Box>
            <Typography variant="h6" noWrap component="a" onClick={mainLink} sx={{ cursor: 'pointer', mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
              ХОТИМ ДОМОЙ
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1, alignItems: 'center', display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={(e) => navLink(index)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Box>
              <img src="/iconW24.png" alt="logo" width="24" height="24" style={{ marginRight: ".5rem" }} />
            </Box>
            <Typography onClick={mainLink} variant="h5" noWrap component="a" href="" sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
              ХОТИМ ДОМОЙ
            </Typography>
          </Box>

          <Box className="nav-menu" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button key={page} onClick={(e) => navLink(index)} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          <Stack className="nav-buttons" sx={{ flexGrow: 0 }} direction="row" spacing={2}>
            {window.location.pathname.includes('auth')
              ? null
              : (
                <>

                  <Button onClick={newPostLink} sx={{ display: { xs: 'none', sm: 'none', lg: 'inline-flex' } }} variant="contained" color="secondary" startIcon={<AddCircle />}>Подать объявление</Button>
                  <IconButton onClick={newPostLink} sx={{ display: { sm: 'inline-flex', lg: 'none' } }} aria-label="Add new post"><AddCircle sx={{ color: "#fff" }} /></IconButton>
                  {user?.id
                    ? (
                      <Box className="navbar-avatar" sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={user?.user_photo} width="40" height="40" />
                          </IconButton>
                        </Tooltip>
                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                          {settings.map((setting, index) => (
                            <MenuItem key={setting} onClick={(e) => navSettings(index)}>
                              <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                          ))}
                        </Menu>
                      </Box>
                    )
                    : <Button onClick={(e) => authLink(false)} variant="text" className="auth-button" sx={{ color: 'white' }}>Войти</Button>}
                </>
              )}
          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
