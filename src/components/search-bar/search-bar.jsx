import { Search } from '@mui/icons-material'
import { IconButton, Paper } from '@mui/material'
import React, { useState } from 'react'
import { colors } from '../constants/color'

const SearchBar = ({getFilter}) => {
  const [movieName, setMovieName] = useState('')

  const getName = (name) =>{ 
    getFilter(name)
  }
  return (
    <Paper component={'form'} sx={{pl:1,  boxShadow:'none', width:{xs:'250px', sm:'350px', md:'600px'}, border:'1px solid #dbe1e4', display:'flex', marginLeft:'.625rem'}}  >
        <input type="text" placeholder='Search everything yo want' style={{border:'none', outline:'none', width:'100%',  color:colors.textColor}} onChange={(e)=>getName(e.target.value)}/>
        <IconButton onClick={getName}>
            <Search sx={{color:colors.textColor}}/>
        </IconButton>
    </Paper>
  )
}

export default SearchBar