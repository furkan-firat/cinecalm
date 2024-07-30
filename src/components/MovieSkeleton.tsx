import React from 'react';
import { Grid, Card, CardContent, Skeleton } from '@mui/material';

const MovieSkeleton: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(8)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Skeleton variant='rectangular' height={350} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Skeleton variant='text' sx={{ fontSize: '1.5rem', mb: 1 }} />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieSkeleton;
