import styled from "styled-components";
import { Avatar, IconButton, Button } from '@mui/material';
import { Chat as ChatIcon, MoreVert as MoreVertIcon, Search } from "@mui/icons-material";
import * as EmailVaildator from 'email-validator';
import { auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import ChatData from './ChatData';

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatReference = db.collection('chats').where('users', 'array-contains', user.email);
  const [chatSnapshot] = useCollection(userChatReference);

  const createChat = () => {
    const input = prompt("Masukkan email user untuk memulai chat");

    if (!input) {
      return null;
    }

    if (EmailVaildator.validate(input) && !chatExists(input) && input !== user.email) {
      // tambahkan daftar chat ke database
      db.collection('chats').add({
        users: [user.email, input],
      })
    }
  }

  const chatExists = (refEmail) => {
    return chatSnapshot?.docs.find((chat) => 
      chat.data().users.find((user) => 
        user === refEmail)?.length > 0
    );
  }

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => { auth.signOut() }} />
        <Icon>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Icon>
      </Header>

      <SearchContainer>
        <Search />
        <SearchInput placeholder="Cari chat" />
      </SearchContainer>

      <SidebarButton onClick={createChat}>
        Mulai Chat
      </SidebarButton>

      {/* Chat Terakhir */}
      {chatSnapshot?.docs.map(chat => (
        <ChatData key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  height: 100vh
  overflow-y: scroll;
  min-width: 300px;
  max-width: 350px;

  ::-webkit-scrollbar{
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none; 
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover{
    opacity: 0.8;
  }
`;

const Icon = styled.div`
  color: whitesmoke
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  background-color: rgb(42,41,41);
  color: whitesmoke;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&&{
    color: white;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Chat = styled(ChatIcon)`
  color: whitesmoke;
`;
const MoreVert = styled(MoreVertIcon)`
  color: whitesmoke
`;

