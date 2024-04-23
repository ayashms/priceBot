import { Typography, Box } from '@mui/joy';
import heroImage from '../../assets/hero_bg.png';

export const Hero = () => {
  document.title = 'PriceBot: Home';
  return (
    <>
      <Box display='flex' pt='4rem' pl='6rem'>
        <Box>
          <Typography level='h1' gutterBottom>
            Welcome to PriceBot!
          </Typography>
          <Box maxWidth='700px' pt='1rem'>
            <Typography level='h5' paragraph textAlign='justify'>
              Say goodbye to shopping stress! Designed for convenience and
              reliability, PriceBot aggregates prices from 15+ top retailers,
              allowing you to compare effortlessly, seize exclusive deals, and
              shop with confidence. <br /> <br />
              With user-friendly features and informed decision-making at your
              fingertips, PriceBot ensures you get the best deals every time.
              <br />
              <br />
              Experience the ease, reliability, and savings with PriceBot as
              your loyal shopping companion.
            </Typography>
          </Box>
        </Box>
        <Box pl='8.2rem'>
          <img src={heroImage} width='500px' className='heroimage' />
        </Box>
      </Box>
    </>
  );
};
