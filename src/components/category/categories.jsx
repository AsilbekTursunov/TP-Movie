import React, { useEffect, useState } from 'react' 
import { Box, Stack } from '@mui/material'; 
import { colors } from '../constants/color';

const Category = ({ selectedCategoryHandler, selectedCategory,}) => { 
  const [genre, setGenre] = useState([])
  
  const getGenre = async () =>{
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=34f1602544e08a6b89a4d9cd90d2be24').then(data => data.json()).then(data => setGenre(data.genres))
  } 
  useEffect(() =>{ 
    getGenre()
  },[]) 
  return (
    <Stack direction={'row'} sx={{overflowX:'scroll'}} justifyContent={'space-between'}>
        {genre.map(item =>(
            <button key={item.id} type="button" className='filter-btn'  style={{cursor:'pointer' }} onClick={() => selectedCategoryHandler(item.name, item.id)}>
                <span className='btn-info' style={{color: selectedCategory == item.name && colors.primary, backgroundColor: selectedCategory == item.name && '#bcc399'}}>
                    <span className='btn-name' style={{fontSize:18}}>{item.name}</span>
                </span>
            </button>
        ))}
    </Stack>
  )
}

export default Category