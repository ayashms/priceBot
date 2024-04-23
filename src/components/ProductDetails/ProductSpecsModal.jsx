import { useState, useEffect } from 'react';
import {
  Modal,
  ModalDialog,
  ModalOverflow,
  ModalClose,
  Typography,
  List,
  ListItem,
  Box,
  CircularProgress,
} from '@mui/joy';

export const ProductSpecsModal = ({ productId, onClose }) => {
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_GET_PRODUCT_SPECS = `https://price-api.datayuge.com/api/v1/compare/specs?api_key=${
    import.meta.env.VITE_APIKEY
  }&id=${productId}`;

  useEffect(() => {
    const getProductSpecs = async () => {
      try {
        const res = await fetch(API_GET_PRODUCT_SPECS);
        const productData = await res.json();
        if (productData.data) {
          setSpecs(productData.data.sub_specs.Summary);
          setLoading(false);
          document.title = 'Product Specs';
        }
      } catch (error) {
        console.error('Error fetching product specs:', error);
        setLoading(false);
      }
    };

    getProductSpecs();
  }, [API_GET_PRODUCT_SPECS]);

  return (
    <>
      <Modal open={true} onClose={onClose}>
        <ModalOverflow>
          <ModalDialog aria-labelledby='modal-dialog-overflow'>
            <ModalClose
              onClick={onClose}
              sx={{ marginTop: '0.8rem', marginRight: '1rem' }}
            />
            <Typography level='h3' ml='0.6rem'>
              <b>Product Specifications</b>
            </Typography>
            {loading ? (
              <Box
                display='flex'
                height='200px'
                justifyContent='center'
                alignItems='center'
                width='300px'
              >
                <CircularProgress size='lg' />
              </Box>
            ) : (
              <>
                {specs.length > 0 && (
                  <List>
                    {specs.map((spec, index) => (
                      <ListItem key={index}>
                        <b>{spec.spec_key}:</b> {spec.spec_value}
                      </ListItem>
                    ))}
                  </List>
                )}
              </>
            )}
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </>
  );
};
