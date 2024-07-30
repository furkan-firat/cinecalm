import React from 'react';
import { Grid, Card, CardContent, Skeleton } from '@mui/material';

const MovieDetailsSkeleton: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Skeleton variant='rectangular' width='100%' height={400} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ boxShadow: 0 }}>
          <CardContent>
            <Skeleton variant='text' width='60%' height={40} />
            <Skeleton variant='text' width='80%' height={30} sx={{ mt: 2 }} />
            <Skeleton variant='text' width='80%' height={30} sx={{ mt: 2 }} />
            <Skeleton variant='text' width='80%' height={30} sx={{ mt: 2 }} />
            <Skeleton variant='text' width='80%' height={30} sx={{ mt: 2 }} />
            <Skeleton variant='text' width='80%' height={30} sx={{ mt: 2 }} />
            <Skeleton variant='text' width='80%' height={30} sx={{ mt: 2 }} />
            <Skeleton variant='text' width='80%' height={30} sx={{ mt: 2 }} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MovieDetailsSkeleton;
