import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  }

  return (
    <Body>
      <Container>
        <Head>
          <title>Chat Yuk! | Login</title>
        </Head>

        <LoginContainer>
          <Logo src='https://goto.itsmerifz.my.id/img/logo%20porto%20pth.png' />
          <Button variant='outlined' onClick={signIn}>
            Login dengan Google
          </Button>
        </LoginContainer>
      </Container>
    </Body>
  );
}

export default Login;

const Body = styled.body`background-color: rgb(42,41,41);`;
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 100px;
`;
const Logo = styled.img`
  height: 200px;
  width: 300px;
`;
