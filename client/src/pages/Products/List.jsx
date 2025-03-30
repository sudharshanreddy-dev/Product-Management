import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useProductStore from '../../store/productStore';
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';

const ProductsList = () => {
  const {
    products = [],
    loading,
    error,
    pagination = { page: 1, limit: 10, total: 0 },
    filters = {
      category: '',
      minPrice: null,
      maxPrice: null,
      minRating: null,
    },
    searchTerm = '',
    getProducts,
    removeProduct,
    searchProducts,
    filterProducts,
    resetFilters,
  } = useProductStore();

  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(pagination.page, pagination.limit, sortBy, order);
  }, [pagination.page, pagination.limit, sortBy, order, getProducts]);

  const handlePageChange = (event, value) => {
    getProducts(value, pagination.limit, sortBy, order);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await removeProduct(id);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchProducts(searchInput);
    } else {
      getProducts(1, pagination.limit, sortBy, order);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    filterProducts({ ...filters, [name]: value });
  };

  const handleResetFilters = () => {
    resetFilters();
    getProducts(1, pagination.limit, sortBy, order);
  };

  // Safely get unique categories
  const categories = [
    ...new Set(
      products
        .map((product) => product?.category)
        .filter((category) => category !== undefined)
    ),
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            component={Link}
            to="/products/create"
          >
            Add Product
          </Button>
        </Box>

        {/* Search and Filter Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <form onSubmit={handleSearch}>
                  <TextField
                    fullWidth
                    label="Search products"
                    variant="outlined"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <IconButton type="submit">
                          <Search />
                        </IconButton>
                      ),
                    }}
                  />
                </form>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={filters.category || ''}
                      onChange={handleFilterChange}
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>All</em>
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Min Price"
                    type="number"
                    name="minPrice"
                    value={filters.minPrice || ''}
                    onChange={handleFilterChange}
                    size="small"
                    sx={{ width: 120 }}
                  />

                  <TextField
                    label="Max Price"
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice || ''}
                    onChange={handleFilterChange}
                    size="small"
                    sx={{ width: 120 }}
                  />

                  <TextField
                    label="Min Rating"
                    type="number"
                    name="minRating"
                    value={filters.minRating || ''}
                    onChange={handleFilterChange}
                    size="small"
                    sx={{ width: 120 }}
                    inputProps={{ min: 0, max: 5, step: 0.1 }}
                  />

                  <Button variant="outlined" onClick={handleResetFilters}>
                    Reset
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Sorting Controls */}
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="createdAt">Date</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Order</InputLabel>
            <Select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              label="Order"
              disabled={!sortBy}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No products found
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price?.toFixed(2)}</TableCell>
                      <TableCell>{product.rating}</TableCell>
                      <TableCell>
                        <IconButton
                          component={Link}
                          to={`/products/edit/${product.id}`}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(product.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {pagination.total > pagination.limit && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default ProductsList;