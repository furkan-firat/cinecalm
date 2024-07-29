import React from 'react';
import MovieGrid from '../components/MovieGrid';
import { Container, Paper, Typography } from '@mui/material';

const HomePage: React.FC = () => (
  <div>
    <Paper
      elevation={0}
      sx={{
        minHeight: '100vh',
      }}
      square
    >
      <Container>
        <Typography variant='h3' pt={2}>
          Movie List
        </Typography>
      </Container>

      <MovieGrid />
    </Paper>
  </div>
);

export default HomePage;
