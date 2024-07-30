import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Grid,
  Rating,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MovieDetails } from '../types.ts';
import MovieDetailsSkeleton from './MovieDetailSkeleton.tsx';

type MovieDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  movie: MovieDetails | null;
};

const Transition = React.forwardRef(function Transition(
  props: React.ComponentPropsWithoutRef<typeof Slide>,
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  open,
  onClose,
  movie,
}) => {
  const renderValue = (value: string | null) => {
    return value && value !== 'N/A' ? value : 'No info';
  };

  const parseRating = (rating: string | null) => {
    const parsed = parseFloat(rating ?? '');
    return isNaN(parsed) ? 0 : parsed / 2;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth='md'
      fullWidth
    >
      <DialogTitle
        sx={{ mb: 2, p: 2, position: 'relative', bgcolor: 'background.paper' }}
      >
        Movie Details
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {movie ? (
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <CardMedia
                component='img'
                alt={movie.Title}
                image={
                  movie.Poster === 'N/A' ? '/defaultPoster.jpg' : movie.Poster
                }
                title={movie.Title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ boxShadow: 0 }}>
                <CardContent>
                  <Typography
                    variant='h4'
                    component='div'
                    gutterBottom
                    textAlign='center'
                  >
                    {movie.Title}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant='h6' color='text.secondary'>
                        <b>Year</b>
                      </Typography>
                      <Typography variant='body1'>
                        {renderValue(movie.Year)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6' color='text.secondary'>
                        <b>Duration</b>
                      </Typography>
                      <Typography variant='body1'>
                        {renderValue(movie.Runtime)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6' color='text.secondary'>
                        <b>Genre</b>
                      </Typography>
                      <Typography variant='body1'>
                        {renderValue(movie.Genre)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6' color='text.secondary'>
                        <b>Director</b>
                      </Typography>
                      <Typography variant='body1'>
                        {renderValue(movie.Director)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6' color='text.secondary'>
                        <b>Language</b>
                      </Typography>
                      <Typography variant='body1'>
                        {renderValue(movie.Language)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6' color='text.secondary'>
                        <b>Country</b>
                      </Typography>
                      <Typography variant='body1'>
                        {renderValue(movie.Country)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6' color='text.secondary'>
                        <b>IMDB Rating</b>
                      </Typography>
                      <Box display='flex' alignItems='center'>
                        <Rating
                          value={parseRating(movie.imdbRating)}
                          precision={0.1}
                          readOnly
                          size='large'
                        />
                        <Typography
                          variant='body1'
                          color='text.secondary'
                          ml={2}
                        >
                          {renderValue(movie.imdbRating)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6' color='text.secondary'>
                        <b>Cast</b>
                      </Typography>
                      <Typography variant='body1'>
                        {renderValue(movie.Actors)}
                      </Typography>
                    </Grid>
                  </Grid>
                  {movie.Plot !== 'N/A' && (
                    <Box mt={2}>
                      <Typography variant='body1'>{movie.Plot}</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <MovieDetailsSkeleton />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsModal;
