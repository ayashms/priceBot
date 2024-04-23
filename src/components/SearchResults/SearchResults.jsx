import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Import useParams
import {
  Card,
  Typography,
  CardContent,
  Chip,
  Grid,
  AspectRatio,
  CardOverflow,
  Box,
  CircularProgress,
} from '@mui/joy';

import SearchResultsHeader from './SearchResultsHeader';

export const SearchResults = () => {
  const { searchQuery } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatPrice(price) {
    return new Intl.NumberFormat('en-IN').format(price);
  }

  useEffect(() => {
    const API_SEARCH_PRODUCT = `https://price-api.datayuge.com/api/v1/compare/search?api_key=${
      import.meta.env.VITE_APIKEY
    }&product=${searchQuery}`;

    const searchProducts = async () => {
      try {
        const res = await fetch(API_SEARCH_PRODUCT);
        const data = await res.json();
        if (data.data.length > 0) {
          setProducts(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };
    searchProducts();
    document.title = 'PriceBot: ' + "'" + searchQuery + "'";
  }, [searchQuery]);

  if (loading) {
    return (
      <>
        <Box
          display='flex'
          height='100vh'
          justifyContent='center'
          alignItems='center'
        >
          <CircularProgress size='lg' />
        </Box>
      </>
    );
  }

  return (
    <>
      <Grid
        container
        paddingLeft='6rem'
        paddingTop='2rem'
        paddingRight='6rem'
        sx={{ justifyContent: 'space-between' }}
      >
        <Typography fontSize='xl' mt='0.2rem'>
          Results for &apos;{searchQuery}&apos;
        </Typography>
        <Grid container sx={{ justifyContent: 'flex-end' }}>
          <SearchResultsHeader />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        paddingLeft='6rem'
        paddingRight='6rem'
        paddingBottom='6rem'
        paddingTop='2.2rem'
      >
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Grid item key={index}>
              <Card
                sx={{
                  maxWidth: 300,
                  height: '100%',
                  boxShadow: 'sm',
                }}
              >
                <CardOverflow>
                  <AspectRatio objectFit='contain' minHeight='250px'>
                    <img
                      src={product.product_image}
                      loading='lazy'
                      alt={product.product_title}
                    />
                  </AspectRatio>
                </CardOverflow>
                <Typography variant='h2'>
                  <Link
                    to={`/product/${product.product_id}`}
                    key={product.product_id}
                  >
                    {product.product_title}
                  </Link>
                </Typography>
                <CardContent orientation='horizontal'>
                  <div>
                    <Chip
                      component='span'
                      size='sm'
                      variant='soft'
                      color='success'
                      sx={{ mb: '0.2rem' }}
                    >
                      Lowest price
                    </Chip>
                    <Typography
                      fontSize='lg'
                      textColor='text.secondary'
                    ></Typography>
                    <Typography
                      level='h3'
                      sx={{ fontWeight: 'xl', ml: '0.1rem' }}
                    >
                      ₹{formatPrice(product.product_lowest_price)}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
