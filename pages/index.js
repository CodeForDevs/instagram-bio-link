import React, { useState } from 'react';
import { Button, CircularProgress, Grid, Icon, Paper, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Link from 'next/link'
import axios from 'axios';

export default function Home() {

  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [emailSuccessMessage, setEmailSuccessMessage] = useState(null);
  const [isLoading, SetIsLoading] = useState(false);
  console.log(isLoading)
  const submitHandler = (e) => {
    e.preventDefault();

    if(emailValue.length > 0){
      SetIsLoading(true)
      return mailChimp(emailValue);
    }else{
      setEmailError(true);
      return setEmailErrorMessage('Please insert a valid email.');
    }

  }

  const links = [
    {
      title: 'Github',
      altText: 'Github',
      url: 'https://github.com/CodeForDevs',
      image: '/img/github.png'
    },
    {
      title: 'Ebook (coming soon)',
      altText: 'ebook',
      url: '/',
      image: '/img/ebook.png'
    },
    {
      title: 'Youtube',
      altText: 'youtube',
      url: 'https://www.youtube.com/channel/UC1CWJ4GZuo5yfnd0271Oieg',
      image: '/img/youtube.png'
    },
    {
      title: 'TikTok',
      altText: 'tiktok',
      url: 'https://www.tiktok.com/@codefordevs?lang=en',
      image: '/img/tiktok.png'
    },
    {
      title: 'Twitter',
      altText: 'twitter',
      url: 'https://twitter.com/CodeForDevs',
      image: '/img/twitter.png'
    }
  ]

  const mailChimp = async (email) => {

    let validLowerCase = email.toLowerCase();

    try{
    const subscribeEmail = await axios.post('/api/mailchimp', { validLowerCase });

    if (subscribeEmail.status === 200) {
      setEmailError(false);
      SetIsLoading(false);
      setEmailValue('')
      return setEmailSuccessMessage('Email subscribed !!!');
    } else {
      setEmailError(true);
      SetIsLoading(false);
      return setEmailErrorMessage('Something went wrong :(');
    }
    }catch (error){
      setEmailError(true);
      SetIsLoading(false);
      return setEmailErrorMessage('Something went wrong :(');
    }

  }

  return (
    <>
      <Grid item container style={{ backgroundColor: '#1E4FA8', minHeight: '100vh' }}>
        <Grid item xs={12} style={{ color: 'white', marginTop: '30px', textAlign: 'center' }}>
          <Typography variant="h4">
            {"{ "}code<span style={{ color: '#5bf254' }}>for</span>devs{" }"}
          </Typography>
        </Grid>
        <Grid item item xs={10} sm={10} md={6} lg={5} xl={5} style={{ margin: '0 auto' }}>
          <Paper elevation={5} style={{ paddingBottom: '30px' }}>
            <Typography variant="h5" component="h5" style={{ color: '#333', paddingTop: '30px', textAlign: 'center' }}>Join our community</Typography>
            <Typography variant="subtitle1" style={{ color: '#333', paddingTop: '15px', paddingBottom: '15px', textAlign: 'center' }}>Receive our tutorials for <span style={{ color: 'red', fontWeight: '500' }}>FREE</span> :)</Typography>
            {emailSuccessMessage &&
              <Alert severity="success" style={{ marginBottom: '15px', width: '90%', marginLeft: '5%' }}>{emailSuccessMessage}</Alert>
            }
            <form noValidate autoComplete="off" onSubmit={(e) => submitHandler(e)}>
              <TextField
                error={emailError}
                id="email"
                fullWidth
                helperText={emailErrorMessage}
                name="email"
                onChange={e => setEmailValue(e.target.value)}
                style={{ width: '90%', marginLeft: '5%' }}
                type="email"
                value={emailValue}
                variant="outlined"
                style={{
                  marginBottom: '15px',
                  marginLeft: '5%',
                  width: '90%',
                }}
              />
              <Button type="submit" style={{ background: '#1E4FA8', color: 'white', marginLeft: '5%' }} variant="contained">Submit {isLoading ? <CircularProgress size={20} style={{color: '#FFF', marginLeft: '10px'}}/> : <Icon style={{marginLeft: '10px'}}>send</Icon>}</Button>
            </form>
          </Paper>
          {links.map((link, index) =>
            <Link key={index} href={link.url}>
              <a style={{ textDecoration: "none" }}>
                <Paper elevation={5} style={{ minHeight: '40px', marginTop: '30px', display: 'flex', direction: 'row', paddingLeft: '10px' }}>
                  <img src={link.image} alt={link.altText} style={{ maxHeight: '30px', maxWidth: '30px', marginRightLeft: '10px', marginTop: '5px' }} />
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#333',
                      textAlign: 'left',
                      marginLeft: '10px',
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}>
                    {link.title}
                  </Typography>
                </Paper>
              </a>
            </Link>
          )}
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: '#1E4FA8',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxHeight: '30px',
          }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" style={{ color: 'white', textAlign: 'center' }}>
              codefordevs.contact@gmail.com
          </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
