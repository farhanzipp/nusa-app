import { Menu } from '@mui/icons-material';
import { AppBar, Box, Button, Container, Drawer, MenuItem, Toolbar, Typography } from '@mui/material';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import NUSA from '../assets/nusa_green.png'

export default function AppBarComponent() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menus = [
    { title: 'Home', link: '/' },
    { title: 'Proposal', link: '/proposal' },
    { title: 'Siswa', link: '/siswa' },
  ]

  const logoStyle = {
    width: '40px',
    height: 'auto',
    cursor: 'pointer',
  };

  return (
    <div>
      <AppBar
        position='fixed'
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth='lg'>
          <Toolbar
            variant="regular"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
            }}
          >
            {/* dekstop menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                px: 0,
              }}
            >
              <Link to='/'>
                <img
                  src={NUSA}
                  style={logoStyle}
                  alt="logo of nusa"
                />
              </Link>

              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {menus.map((menu, index) =>
                  <MenuItem key={index}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Link to={menu.link} style={{textDecoration: 'none'}}>
                      <Typography variant='body1' color='text.primary'>
                            {menu.title}
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
              </Box>
            </Box>
            {/* mobile menu */}
            <Box sx={{ display: { sm: 'none' } }}>
              <Button
                variant="text"
                color="success"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <Menu />
              </Button>
              <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '50dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  {menus.map((menu, index) => 
                    <MenuItem key={index} >
                      <Link to={menu.link} style={{textDecoration: 'none'}}>
                        <Typography variant='body2' color='text.primary'>{menu.title}</Typography>
                      </Link>
                    </MenuItem>
                  )}

                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
