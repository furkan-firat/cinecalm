import React from 'react';
import { Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: '100vh',
      }}
      square
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          color: 'text.primary',
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 100,
            color: 'warning.main',
            mb: 3,
          }}
        />
        <Typography variant='h3' gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant='h6' color='textSecondary' paragraph>
          Sorry, the page you are looking for does not exist. Please return to
          the homepage.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Return to Homepage
        </Button>
      </Container>
    </Paper>
  );
};

export default NotFound;
