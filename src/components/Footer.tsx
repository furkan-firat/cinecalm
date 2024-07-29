import React from 'react';
import { Box, Typography, Link, IconButton, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
  return (
    <Paper
      elevation={0}
      square
      sx={{
        position: 'relative',
        bottom: 0,
      }}
    >
      <Box
        component='footer'
        sx={{
          py: 2,
          px: 3,
          textAlign: 'center',
          backgroundColor: 'inherit',
        }}
      >
        <Typography variant='body2' color='text.secondary'>
          Connect with me:
        </Typography>
        <Box sx={{ mt: 1 }}>
          <IconButton
            component={Link}
            href='mailto:furkanfirat@live.com'
            color='inherit'
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            component={Link}
            href='https://www.linkedin.com/in/firatfurkan/'
            target='_blank'
            color='inherit'
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component={Link}
            href='https://github.com/furkan-firat'
            target='_blank'
            color='inherit'
          >
            <GitHubIcon />
          </IconButton>
        </Box>
        <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
          &copy; {new Date().getFullYear()} Furkan FIRAT
        </Typography>
      </Box>
    </Paper>
  );
};

export default Footer;
