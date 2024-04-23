import { useState } from 'react';

import {
  MenuButton,
  Dropdown,
  ListItem,
  List,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from '@mui/joy';

import { ArrowDropDown } from '@mui/icons-material';

export default function SearchResultsHeader() {
  const sorts = [
    'Popularity',
    'Price: low to high',
    'Price: high to low',
    'Discount',
  ];
  const [sort, setSort] = useState('Popularity');

  return (
    <>
      <Stack direction='row'>
        <Typography mt='0.4rem' mr='1rem'>
          Sort by:
        </Typography>
        <Dropdown>
          <MenuButton
            sx={{ minWidth: 180, justifyContent: 'space-between' }}
            endDecorator={<ArrowDropDown />}
          >
            {sort}
          </MenuButton>
          <Menu sx={{ minWidth: 180 }}>
            <ListItem nested>
              <List>
                {sorts.map((item) => (
                  <MenuItem
                    key={item}
                    role='menuitemradio'
                    aria-checked={item === sort ? 'true' : 'false'}
                    onClick={() => {
                      setSort(item);
                    }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </List>
            </ListItem>
          </Menu>
        </Dropdown>
      </Stack>
    </>
  );
}
