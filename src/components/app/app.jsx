import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import { Main, MovieInfo, Navbar} from '../index' 

const App = () => {
  const [movie, setMovie] = useState(0)
  const [filter, setFilter] = useState('')
  const getId = (id) =>{
    setMovie(id);
  }
  const getFilter = (movie) =>{
    setFilter(movie) 
  }
  
  return (
    <Box width={'100%'}>
        <Navbar getFilter={getFilter}/>
        <Routes>
            <Route path='/tp-movie' element={<Main getId = {getId} filter={filter}/>}/>
            <Route path='/tp-movie/channel/:id' element={<MovieInfo/>}/> 
        </Routes> 
    </Box>
  )
}

export default App