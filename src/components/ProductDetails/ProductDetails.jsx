import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductSpecsModal } from './ProductSpecsModal';
import { ImageCarousel } from './ImageCarousel';

import {
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  Sheet,
  Chip,
  CircularProgress,
} from '@mui/joy';

import { Rating } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';

export const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const API_GET_PRODUCT_DETAILS = `https://price-api.datayuge.com/api/v1/compare/detail?api_key=${
    import.meta.env.VITE_APIKEY
  }&id=${productId}`;

  const getProductDetails = async (url) => {
    try {
      const res = await fetch(url);
      const productData = await res.json();
      if (productData.data) {
        setProduct(productData.data);
        setLoading(false);
        document.title = 'PriceBot: ' + productData.data.product_name;
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  function formatPrice(price) {
    return new Intl.NumberFormat('en-IN').format(price);
  }

  useEffect(() => {
    getProductDetails(API_GET_PRODUCT_DETAILS);
  }, [API_GET_PRODUCT_DETAILS]);

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
      {product && (
        <Stack
          direction='column'
          spacing={2}
          ml='6rem'
          mr='6rem'
          mt='4rem'
          mb='4rem'
        >
          <Stack direction='row' spacing={6} m='3rem'>
            {product.product_images.length > 0 && (
              <ImageCarousel productId={productId} />
            )}
            <Stack direction='column'>
              <Typography level='h2'>{product.product_name}</Typography>
              <Typography mb='1rem' gutterBottom>
                Brand: {product.product_brand}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography level='h4' mr='6px' mt='0px'>
                  {product.product_ratings}
                </Typography>
                <Rating
                  value={parseFloat(product.product_ratings)}
                  precision={0.2}
                  readOnly
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.3 }} fontSize='inherit' />
                  }
                />
              </Box>
              <Box mt='1rem'>
                <Chip size='md' variant='soft' color='success'>
                  Lowest price
                </Chip>
                <Typography level='h1' gutterBottom>
                  ₹{formatPrice(product.product_mrp)}
                </Typography>
              </Box>
              <Typography level='body1'></Typography>
              <Sheet
                variant='soft'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  padding: '5px',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                }}
                mt='2rem'
              >
                <Typography>
                  <b>Available colors:</b>{' '}
                  {product.available_colors.slice(1).join(', ')}
                </Typography>
              </Sheet>
              <Button
                size='lg'
                variant='soft'
                sx={{ marginTop: '2rem', maxWidth: '200px' }}
                onClick={handleOpenModal}
              >
                View Product Specs
              </Button>
              {showModal && (
                <ProductSpecsModal
                  productId={productId}
                  onClose={handleCloseModal}
                />
              )}
              <Typography
                level='body1'
                gutterBottom
                sx={{ textTransform: 'capitalize' }}
                mt='1rem'
              >
                Category: {product.product_category}
              </Typography>
            </Stack>
          </Stack>
          <Box m='0.6rem'></Box>
          <Divider />
          <Typography level='h3' gutterBottom>
            Available Stores:
          </Typography>
          <Box>
            {product.stores.map(
              (store, index) =>
                Object.keys(store).length > 0 &&
                Object.keys(store[Object.keys(store)[0]]).length > 0 && (
                  <Stack key={index} direction='column'>
                    {Object.keys(store).map((storeName) => (
                      <Sheet
                        key={storeName}
                        variant='soft'
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: '8px',
                          padding: '1rem',
                          marginBottom: '1rem',
                        }}
                      >
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              src={store[storeName].product_store_logo}
                              alt={store[storeName].product_store}
                              style={{ marginRight: '1.4rem' }}
                            />
                            <Chip color='neutral' size='lg' variant='outlined'>
                              <Typography level='h4'>
                                <b>
                                  ₹{formatPrice(store[storeName].product_price)}
                                </b>
                              </Typography>
                            </Chip>
                            <Typography level='h5' pl='1rem'>
                              Return period:
                              <b> {store[storeName].return_time}</b>
                            </Typography>
                          </Box>
                          <Box sx={{ flexGrow: 1 }} />
                          <Button
                            size='lg'
                            component='a'
                            href={store[storeName].product_store_url}
                            startDecorator={<OpenInNew />}
                            sx={{ minWidth: '220px' }}
                          >
                            Go to {store[storeName].product_store}
                          </Button>
                        </>
                      </Sheet>
                    ))}
                  </Stack>
                )
            )}
          </Box>
        </Stack>
      )}
    </>
  );
};
