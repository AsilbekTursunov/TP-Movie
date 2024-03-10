import React, { useState } from 'react'
import { Button, Card, CardActions, CardMedia, Typography, CardContent, CircularProgress, Box, Badge, Grid } from '@mui/material'; 
import Link from '@mui/material/Link'; 
import { useNavigate } from 'react-router-dom'; 

const VideoDetail = ({ video, getId }) => { 
  const percent = Math.floor((video.vote_average)*10)
  const color = percent < 30 ? 'red' : percent < 70 && percent > 30 ? 'yellow' : 'lightgreen' 
  const navigate = useNavigate() 

  const sendVideo = (id) =>{
    getId(id)
    navigate(`/tp-movie/channel/${id}`)
  }
  return (
    <>
      <Grid item xs={6} sm={4} md={3} >
        <Card sx={{width:'100%', marginTop:5, textDecoration:'none' }}>
          <Link onClick={()=>sendVideo(video.id)}>
            <CardMedia
              sx={{ height: 300 }}
              image={`https://image.tmdb.org/t/p/w500/${video?.poster_path}`}
              title={video.title }   
            />
          </Link>
          <CardContent sx={{padding:'.625rem', backgroundColor:'#f2f3ed'}} > 
            <Box sx={{display:'flex',justifyContent:'space-between', position:'relative', top:-20 }} > 
                <Typography  variant="h5" component="div" className='progress'>
                  <CircularProgress sx={{color:color}} variant="determinate" size={30} value={percent}/>
                  <span className="progress-amount" style={{position:'absolute', fontSize:14,}}>{percent}</span> 
                </Typography> 
            </Box> 
            <Typography  variant="h5" component="div" fontSize={14} height={25} overflow={'hidden'}  >
              <Link  href="#" underline={'none'}  className='MuiTableRow-hover' sx={{color:'black',  fontWeight:600, fontSize:18}} >{video?.title} </Link>
            </Typography> 
          </CardContent>  
        </Card>
      </Grid>
    </>
  )
}

export default VideoDetail