import { Box, Container, Grid, Stack, Typography, } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../search-bar/search-bar'
import { colors } from '../constants/color'

const Navbar = ({ getFilter }) => {

  return (
    <Stack sx={{ backgroundColor: colors.primary }}>
      <Container>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} py={2}>
          <Link href="#" to={'/'} underline={'none'} style={{ textDecoration: 'none' }} >
            <Typography className="logo-name" style={{ display: 'flex', alignItems: 'center ' }}>
              <img src="http://www.clipartbest.com/cliparts/xig/K4p/xigK4pojT.png" alt="logo" style={{ width: 50, marginRight: '1rem' }} />
              <Typography fontSize={{ xs: '25px',  md: '35px' }} fontFamily={'Cambria'} fontWeight={600} color={colors.textColor}>
                TP-Movies
              </Typography>
            </Typography>
          </Link>
          <Typography sx={{display:{xs:'none', md:'inline-block'},}}>
            <SearchBar getFilter={getFilter} />
          </Typography>
        </Stack>
      </Container>
    </Stack>
  )
}

export default Navbar