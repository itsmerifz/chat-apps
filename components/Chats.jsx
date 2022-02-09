import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { Avatar, IconButton } from '@mui/material'
import { MoreVert as MoreVertIcon, AttachFile as AttachFileIcon, InsertEmoticon as InsertEmoticonIcon, Mic as MicIcon } from '@mui/icons-material'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message';
import firebase from 'firebase/compat/app';
import getRepEmail from '../utils/getRepEmail';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js'
import id_ID from 'timeago.js/lib/lang/id_ID'

function Chats({ chat, message }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [messageSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'));
  const [input, setInput] = useState("");
  const [repSnapshot] = useCollection(db.collection('users').where('email', '==', getRepEmail(chat.users, user)))
  const rep = repSnapshot?.docs?.[0]?.data();
  const endMessageRef = useRef(null) 
  timeago.register('id', id_ID)

  const showMessage = () => {
    if(messageSnapshot){
      return messageSnapshot.docs.map(e => (
        <Message key={e.id} user={e.data().user} message={{
          ...e.data(),
          timestamp: e.data().timestamp?.toDate().getTime(),
        }} />
      )) 
    }else{
      return JSON.parse(message).map(e => (
        <Message key={e.id} user={e.user} message={e} />
      ) )
    }
  }

  const sendMessage = (e) => {
    e.preventDefault();

    // Update terakhir dilihat
    db.collection('users').doc(user.uid).set({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL, 
    });

    setInput("");
    scrollBottom();
  }

  const repEmail = getRepEmail(chat.users, user);

  const scrollBottom = () => {
    endMessageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  return (
    <Container>
      <Header>
        {
          rep ? (<Avatar src={rep?.photoURL} />) : (<Avatar src={repEmail[0]} />)
        }
        <HeaderInfo>
          <h3>{repEmail}</h3>
          {
            repSnapshot ? (<p>Terakhir dilihat : {rep?.lastSeen.toDate() ? (
              <TimeAgo datetime={rep?.lastSeen.toDate()} locale="id" />
            ) : "Tidak tersedia"}</p>) : (
              <p>Loading...</p>
            )
          }
          
        </HeaderInfo>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
      </Header>

      <MessageContainer>
        {showMessage()}
        <MessageList ref={endMessageRef} />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={e => setInput(e.target.value)}/>
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>Kirim Pesan</button>
        <Mic />
      </InputContainer>
    </Container>
  );
}

export default Chats;

const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  background-color: #3f3f3f;
  z-index: 100;
  top: 0;
  padding: 12px;
  display: flex;
  height: 80px;
  align-items: center;
`;
const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 13px;
    color: #afafaf
  }
`;
const AttachFile = styled(AttachFileIcon)`
  color: whitesmoke;
`;
const MoreVert = styled(MoreVertIcon)`
  color: whitesmoke;
`;
const InsertEmoticon = styled(InsertEmoticonIcon)`
  color: whitesmoke;
`;
const Mic = styled(MicIcon)`
  color: whitesmoke;
`;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #777777;
  min-height: 90vh;
`;
const MessageList = styled.div`
  margin-bottom: 50px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #3f3f3f;
`;
const Input = styled.input`
  flex: 1;
  padding: 20px;
  background-color: #292929;
  color: whitesmoke;
  outline: 0;
  border: none;
  border-radius: 10px;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 14px;
`;