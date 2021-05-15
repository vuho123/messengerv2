import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import firestore from "firebase/firestore";
import { useRouter } from "next/router";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Message from "./Message";
import TimeAgo from "timeago-react"

// import { Container } from './styles';

export default function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(user, JSON.parse(chat).users);
  const router = useRouter();

  const [input, setInput] = useState('')
  const endOfMessagesRef = useRef(null)
  const [value] = useCollection(
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", recipientEmail)
  );

  let recipient = value?.docs[0];
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );


  const showMessages = () => {

    if(messagesSnapshot){
        // <console className="l"></console>og(messagesSnapshot.docs[0].data());
        return messagesSnapshot.docs.map((message)=>(
            <Message 
            key={message.id}
            user = {message.data().user}
            message = {{
                ...message.data(),
                timestamp: message.data().timestamp?.toDate().getTime()
                
            }}
            />
        ))
    }
    else{
        return JSON.parse(messages).map(message =>(
            <Message  key={message.id} user={message.user} message={message}/>
        ))
    }
  };
    const ScrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
    }

    const sendMessage = (e) => {
        e.preventDefault();
            // Update the last seen
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()

        },{merge:true})


        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        })
        setInput('')
        ScrollToBottom()
    }
  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar
            src={recipient.data().photoURL}
            key={recipient.id}
            id={recipient.id}
          />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipient ?(
                <p>Last active: { ' '}
                {recipient?.data()?.lastSeen?.toDate()? (
                    <TimeAgo datetime={recipient?.data()?.lastSeen?.toDate()} />
                ): "Unavailable"}
            
                </p>
          )
        :(
            <p>Loading last active...</p>
        )}
          
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {/* Show messages */}
        {showMessages()}
        <EndOfMessages ref={endOfMessagesRef} />
      </MessageContainer>

      <InputContainer>
            <InsertEmoticonIcon/>
            <Input value= {input} onChange={e => setInput(e.target.value)}/>
            <Button hidden disabled={!input} type="submit" onClick= {sendMessage}>Send Messages</Button>
      </InputContainer>
    </Container>
  );
}
const Button = styled.button``;

const Container = styled.div``;
const InputContainer = styled.form`
display:flex;
align-items: center;
padding:10px;
position:sticky;
bottom:0;
background-color: white;
z-index:100;
`;
const Input = styled.input`
flex:1;
align-items: center;
padding:10px;
position:sticky;
bottom:0;
background-color: whitesmoke;
`;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1px;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const EndOfMessages = styled.div`
margin-bottom:60px;
`;

const MessageContainer = styled.div`

padding: 30px;
background-color: #e5ded8;
min-height: 90vh;

`;
