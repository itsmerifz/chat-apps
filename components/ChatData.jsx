import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import getRepEmail from '../utils/getRepEmail';

function ChatData({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [repUserChatSnapshot] = useCollection(db.collection('users').where('email','==',getRepEmail(users,user)))
  const repEmail = getRepEmail(users, user);
  const repChat = repUserChatSnapshot?.docs?.[0]?.data();

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  return(
    <Container onClick={enterChat}>
      {repChat ? (
        <UserAvatar src={repChat?.photoURL} />
        ) : ( 
        <UserAvatar>{repEmail[0]} </UserAvatar>
        ) 
      }  
      <p>{repEmail}</p>
    </Container>
  );
}

export default ChatData;

const Container = styled.div`
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover{
    background-color: #414241;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;