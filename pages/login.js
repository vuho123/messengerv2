import React from 'react';
import styled from 'styled-components'
import Head from 'next/head';
import mainLogo from './logo.png'
import {Button} from "@material-ui/core"
// import mainLogo from './logo.png'
import {provider,db,auth} from '../firebase'
// import { Container } from './styles';

export default function Login() {

  
  const signIn = () =>{
    auth.signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorMessage);
      // ...
    });
  
    
  }
   return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src={mainLogo} />
        <Button onClick={signIn} variant="outlined">Sign In With Google</Button>
      </LoginContainer>

    </Container>
  );
}

const Container = styled.div`

display:grid;
place-items: center;
height:100vh;
background-color:whitesmoke;


`  

const Logo = styled.img`
margin-bottom:40px;
height:200px;
width:200px;

`

const LoginContainer  = styled.div`
display:flex;
flex-direction: column;
padding:100px;
align-items:center;
background-color:white;
border-radius:5px;
box-shadow: 0px 4px 14px -3px rgba( 0 , 0 , 0 , 0.7)
`