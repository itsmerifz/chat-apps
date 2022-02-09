import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import moment from 'moment'

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);
  const TypeMessage = user === userLoggedIn.email? SenderElement : RecieverElement;
  return (
    <Container>
      <TypeMessage>
        {message.message}
        <Timestamp>{message.timestamp ? moment(message.timestamp).format('LT') : '...'}</Timestamp>
      </TypeMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const SenderElement = styled(MessageElement)`
  margin-left: auto;
  background-color: #3180db;
`;

const RecieverElement = styled(MessageElement)`
  background-color: #aeaeae;
  text-align: left;
`;

const Timestamp = styled.span`
  color: #d3d3d3;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;