import { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Box, CircularProgress } from '@mui/joy';

export const ImageCarousel = ({ productId }) => {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_GET_PRODUCT_DETAILS = `https://price-api.datayuge.com/api/v1/compare/detail?api_key=${
    import.meta.env.VITE_APIKEY
  }&id=${productId}`;

  const getProductImages = async (url) => {
    try {
      const res = await fetch(url);
      const productData = await res.json();
      if (productData.data.product_images) {
        setImages(productData.data.product_images);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductImages(API_GET_PRODUCT_DETAILS);
  }, [API_GET_PRODUCT_DETAILS]);

  if (loading) {
    return (
      <>
        <Box
          display='flex'
          height='400px'
          width='400px'
          justifyContent='center'
          alignItems='center'
        >
          <CircularProgress size='md' />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box height='400px' width='400px' display='flex'>
        <Swiper
          navigation={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Navigation, Pagination]}
          loop='true'
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                style={{
                  objectFit: 'scale-down',
                  width: '100%',
                  height: '100%',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};
