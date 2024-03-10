import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Stack, Typography, Backdrop, Paper, CircularProgress, IconButton, Tooltip, Modal } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListIcon from '@mui/icons-material/List';
import { Link, useParams } from 'react-router-dom'
import YouTube from 'react-youtube'; 
const MovieInfo = () => {
  const { id } = useParams()
  const [detail, setDetail] = useState({
    data: [],
    date: '',
    genre: []
  })
  const [actors, setActors] = useState([])
  const [change, setChange] = useState(false)
  const [key, setKey] = useState('')
  const percent = Math.floor((detail.data.vote_average) * 10)
  const color = percent < 30 ? '#f50000' : percent < 70 && percent > 30 ? '#def500' : '#05f500'
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=34f1602544e08a6b89a4d9cd90d2be24&append_to_response=videos`).then(data => data.json()).then(data => {
      setDetail({
        data: data,
        date: data.release_date,
        genre: data.genres,
      })
      const lenth = data.videos.results.length
      const trailer = data.videos.results[0] ? data.videos.results[lenth - 1].key  : '' 
      setKey(trailer)
    }) 
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=34f1602544e08a6b89a4d9cd90d2be24`).then(data => data.json()).then(data => {
      const actors = data.cast.filter(item => item.profile_path)
      setActors(actors)
    })
  }, [id])
  console.log(detail.data);
  console.log(key);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box >
      <Box   sx={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${detail.data.backdrop_path})`, backgroundSize: 'cover ', backgroundPosition: '30%' }} >
        <Box  sx={{ backgroundColor: 'rgba(50, 50, 94, 0.541)', padding:'1rem' }}>
          <Container sx={{ padding: { xs: 0, sm: 0, md: 0 } }}>
            <Stack sx={{ zIndex: '1000' }}>
              <Grid container spacing={1}>
                <Grid  xs={4} md={4}>
                  <Typography p={1} height={'100%'} >
                    <img src={`https://image.tmdb.org/t/p/w500${detail.data.poster_path}`} alt="" style={{ width: '100%', borderRadius: 5 }} />
                  </Typography >
                </Grid>
                <Grid  xs={12} md={8} >
                  <Typography p={1} height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'}  >
                    <Typography>
                      <Typography component={'h1'} sx={{ fontSize: { xs: 22, sm: 32, md: 40 }, fontWeight: 600, color: 'white', textAlign: { xs: 'center', md: 'start' } }}>{detail.data.title} <span style={{ opacity: '.8' }}>({(detail.date).slice(0, 4)})</span></Typography>
                      <Typography sx={{ color: 'white', display: { md: 'flex' }, flexDirection: { md: 'row' }, textAlign: { xs: 'center', md: '' } }} alignItems={'center'} >
                        <span style={{ fontSize: 14, border: '1px solid white', padding: '2px 4px', marginRight: '.312rem' }}>R</span>
                        <span sx={{ fontSize: 18, color: 'white' }}>{(detail.date).slice(8, 10)}/{(detail.date).slice(5, 7)}/{(detail.date).slice(0, 4)}</span>
                        <Typography display={'flex'} sx={{ justifyContent: { xs: 'center', md: '' } }}>
                          {detail.genre.map(item => (
                            <Typography sx={{ color: 'white', padding: '0px 5px', cursor: 'pointer', fontSize: 18 }} href="#" underline="hover" >{item.name}</Typography >
                          ))}
                        </Typography>
                      </Typography>
                      <Typography>
                        <Grid my={2} container spacing={1} display={'flex'} alignItems={'center'} >
                          <Grid xs={6} md={4} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <Typography >
                              <Typography className='progress'>
                                <CircularProgress sx={{ color: { color }, }} variant="determinate" size={40} value={percent} />
                                <span className="progress-amount" style={{ position: 'absolute', fontSize: 14, }}>{percent}</span>
                              </Typography>
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 15, md: 20 }, color: 'white', textAlign: 'center' }} p={1}>User  Score</Typography>
                          </Grid>
                          <Grid xs={6} md={8}>
                            <Stack direction={'row'} alignItems={'center'} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }} >
                              <IconButton sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                                <ListIcon aria-label="list" sx={{ color: 'white', backgroundColor: '#032541', marginLeft: '.312rem', fontSize: 40, borderRadius: '50%', padding: '.75rem' }} />
                              </IconButton>
                              <IconButton sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                                <FavoriteIcon aria-label="like" sx={{ color: (change ? 'red' : 'white'), backgroundColor: '#032541', marginLeft: '.312rem', fontSize: 40, borderRadius: '50%', padding: '.75rem' }} />
                              </IconButton>
                              <IconButton sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                                <BookmarkIcon aria-label="bookmark" sx={{ color: 'white', backgroundColor: '#032541', marginLeft: '.312rem', fontSize: 40, borderRadius: '50%', padding: '.75rem' }} />
                              </IconButton>
                              <IconButton sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                                <StarIcon aria-label="star" sx={{ color: 'white', backgroundColor: '#032541', marginLeft: '.312rem', fontSize: 40, borderRadius: '50%', padding: '.75rem' }} />
                              </IconButton>
                              <Typography component={'div'}>
                                <Tooltip title='play'>
                                  <IconButton onClick={handleOpen}  >
                                    <PlayArrowIcon sx={{ color: 'white' }} aria-label="play" style={{ marginRight: 10 }} />
                                    <span style={{ fontSize: 18, color: '#eee' }}>Play Trailer</span>
                                  </IconButton>
                                </Tooltip>
                                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                                  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, }}>
                                    <YouTube videoId={key} />
                                  </Box>
                                </Modal>
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Typography>
                      <Typography sx={{ color: 'white', fontSize: 22, fontStyle: 'italic', opacity: '.5' }}>
                        {detail.data.tagline}
                      </Typography>
                      <Typography sx={{ color: 'white', fontSize: { xs: 12, sm: 14, md: 16 } }}>
                        <Typography sx={{ color: 'white', fontSize: { xs: 14, sm: 18, md: 22 }, opacity: '.8' }}>Overview</Typography>
                        {detail.data.overview}
                      </Typography>
                    </Typography>
                    <Typography display={'flex'} width={'100%'} overflow={'hidden'} sx={{ overflowX: 'scroll' }} >
                      <Stack direction={'row'} justifyContent={'space-between'} my={2} >
                        {actors.map(item => (
                          <div style={{ backgroundColor: '#fff', borderRadius: '5px', margin: '10px', boxShadow: '0 2px 8px rgba(0,0,0,.1)' }}>
                            <img src={`https://media.themoviedb.org/t/p/w138_and_h175_face${item.profile_path}`} alt="actor" style={{ borderRadius: '5px 5px 0px 0px', height: '140px' }} />
                            <p style={{ padding: '0rem .312rem', fontSize: '10px', height: '25px' }}>{item.name}</p>
                          </div>
                        ))}
                      </Stack>
                    </Typography>
                  </Typography >
                </Grid>
              </Grid>
            </Stack>
          </Container>
        </Box>
      </Box>
      <Box>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={9}>

            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default MovieInfo