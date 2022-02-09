import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import Chats from '../../components/Chats';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRepEmail from '../../utils/getRepEmail';

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat Yuk! | Chat {getRepEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <Chats chat={chat} message={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(ctx){
  const ref = db.collection('chats').doc(ctx.query.id);

  const messageRes = await ref
  .collection('messages')
  .orderBy('timestamp','asc')
  .get(); 

  const message = messageRes.docs.map(res => ({
    id: res.id,
    ...res.data(),
  })).map(chats => ({
    ...chats,
    timestamp: chats.timestamp.toDate().getTime()
  }));

  const chatRes = await ref.get();

  const chat = {
    id: chatRes.id,
    ...chatRes.data()
  }

  console.log(chat, message);

  return {
    props: {
      messages: JSON.stringify(message),
      chat: chat
    }
  }
} 

const Container = styled.div`
  display: flex;

`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
