import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  MenuItem,
  Select,
  Paper,
  Box,
  Button,
  Collapse,
  TextField,
  Container,
  Divider,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSearch } from '../context/SearchContext.tsx';
import { Movie, MovieDetails } from '../types.ts';
import MovieDetailsModal from './MovieDetailsModal.tsx';
import MovieSkeleton from './MovieSkeleton.tsx';

const MovieGrid: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { searchQuery } = useSearch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filterYear, setFilterYear] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('movie');
  const [type, setType] = useState<string>('movie');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [inputYear, setInputYear] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const API_KEY = '44e8bed8';

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${searchQuery}&y=${filterYear}&type=${filterType}&page=${page}&apikey=${API_KEY}`
        );
        setMovies(response.data.Search || []);
        setTotalPages(Math.ceil(response.data.totalResults / 10));
      } catch (error) {
        setError('An error occurred while fetching data.');
      }
      setLoading(false);
    };

    fetchMovies();
  }, [searchQuery, filterYear, filterType, page]);

  useEffect(() => {
    setFilterYear('');
    setInputYear('');
    setPage(1);
  }, [searchQuery]);

  const handleCancel = () => {
    setFilterOpen(false);
    setInputYear('');
  };

  const handleApply = () => {
    setFilterYear(inputYear);
    setFilterType(type);
    setFilterOpen(false);
  };

  const handleOpenModal = async (id: string) => {
    setModalOpen(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );
      setSelectedMovie(response.data);
    } catch (error) {
      setError('An error occurred while fetching movie details.');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: '100vh',
        padding: 2,
      }}
      square
    >
      <Container>
        <Box mb={2}>
          <Button
            startIcon={<FilterAltIcon />}
            variant='outlined'
            onClick={() => setFilterOpen(!filterOpen)}
            sx={{ mb: 2, borderRadius: 5 }}
          >
            Filter
          </Button>
          <Collapse in={filterOpen}>
            <Box display='flex' alignItems='center'>
              {/* Year Filter */}
              <TextField
                size='small'
                label='Year'
                type='number'
                value={inputYear}
                onChange={(e) => setInputYear(e.target.value)}
                sx={{ marginRight: 2, maxWidth: 100 }}
              />

              {/* Type Filter */}
              <Select
                size='small'
                value={type}
                onChange={(e) => setType(e.target.value as string)} // Update local state
                sx={{ marginRight: 2 }}
              >
                <MenuItem value='movie'>Movies</MenuItem>
                <MenuItem value='series'>TV Series</MenuItem>
                <MenuItem value='episode'>TV Series Episodes</MenuItem>
              </Select>

              <Button
                onClick={handleCancel}
                variant='outlined'
                sx={{ marginRight: 1 }}
              >
                Cancel
              </Button>
              <Button onClick={handleApply} variant='contained'>
                Apply
              </Button>
            </Box>
          </Collapse>
        </Box>

        {error ? (
          <Typography color='error'>Error: {error}</Typography>
        ) : loading ? (
          <MovieSkeleton />
        ) : movies.length === 0 ? (
          <Typography variant='h5'>No movies found.</Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                  key={movie.imdbID}
                >
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      borderRadius: 2,
                      boxShadow: 3,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component='img'
                      alt={movie.Title}
                      image={
                        movie.Poster === 'N/A'
                          ? '/defaultPoster.jpg'
                          : movie.Poster
                      }
                      title={movie.Title}
                      sx={{ height: 350, objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant='h6'
                        component='div'
                        color='primary.main'
                        sx={{
                          fontWeight: 'bold',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        <Button
                          onClick={() => handleOpenModal(movie.imdbID)}
                          sx={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {movie.Title}
                        </Button>
                      </Typography>
                      <Divider />
                      <Typography variant='body2' color='text.secondary' mt={2}>
                        <b>Release Date:</b> {movie.Year}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <b>IMDb ID:</b> {movie.imdbID}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {movies.length > 0 && (
              <Box mt={4} display='flex' justifyContent='center'>
                <Pagination
                  variant='outlined'
                  shape='rounded'
                  size='large'
                  count={totalPages}
                  page={page}
                  onChange={(_e, value) => setPage(value)}
                  color='primary'
                />
              </Box>
            )}
          </>
        )}

        {/* Movie Details Modal */}
        <MovieDetailsModal
          open={modalOpen}
          onClose={handleCloseModal}
          movie={selectedMovie}
        />
      </Container>
    </Paper>
  );
};

export default MovieGrid;
