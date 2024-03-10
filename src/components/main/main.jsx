import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { colors } from '../constants/color'
import { Category, VideoDetail } from '../index'

const Main = ({ getId, filter }) => {
  const [selectedCategory, setSelectedCategory] = useState('Action')
  const [video, setVideo] = useState([])
  const [genreId, setGenreId] = useState(0)
  const [newMovie, setNewMovie] = useState([])
  const selectedCategoryHandler = (name, id) => {
    setSelectedCategory(name)
    setGenreId(id)
  }
  try {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=34f1602544e08a6b89a4d9cd90d2be24&include_adult=false&include_video=true&language=en-US&with_genres=${genreId ? genreId : 28}`)
      .then(data => data.json())
      .then(data => {
        if (filter) {
          setVideo(data.results.filter(item => item.title.toLowerCase().includes(filter)))
        } else {
          setVideo(data.results)
        }
      })
  } catch (error) {
    console.log(error);
  }

  return (
    <Stack sx={{backgroundColor:'#11242a'}}>
      <Category selectedCategoryHandler={selectedCategoryHandler} selectedCategory={selectedCategory} />
      <Box>
        <Container>
          <Typography variant={'h4'} fontWeight={'600'} p={2} >
            <span  style={{ color:'#bcc399' }}>{selectedCategory}</span> <span style={{ color: colors.textColor, fontSize:28 }}>movies</span>
          </Typography>
          <Box></Box>
          <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'space-between'}>
            <Grid container spacing={2}>
              {video.map(item => {
                if (item.title.toLowerCase() == filter) {
                  console.log(item);
                  return <VideoDetail key={item.id} video={item} id={item.id} getId={getId} />
                }
                return <VideoDetail key={item.id} video={item} id={item.id} getId={getId} />
              })}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </Stack>
  )
}

export default Main