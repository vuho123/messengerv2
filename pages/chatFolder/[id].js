import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/SideBar";
import ChatScreen from "../../components/ChatScreen";
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from '../../getRecipientEmail'
// import { Container } from './styles';
import {auth} from '../../firebase'

export default function Chat({chat,messages}) {

  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat With {getRecipientEmail(user, JSON.parse(chat).users)} </title>
      </Head>

      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages = {messages} />
      </ChatContainer>
    </Container>
  );
}

export async function getServerSideProps(context) { //Works before the Chat() function happens
  //needs to prep the chat when user logs in
  const ref = db.collection("chats").doc(context.params.id);

  // Prep the messages on the server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));
  console.log(messages);
  //Prep the chats

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  console.log(JSON.parse(JSON.stringify(chat) ));

  console.log(messages);
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: JSON.stringify(chat)
    },
  };
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
`;
