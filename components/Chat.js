import { Avatar } from '@material-ui/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import { auth,db } from '../firebase';
import getRecipientEmail from '../getRecipientEmail';
// import { Container } from './styles';

export default function Chat({id,users}) {
  // console.log(id,users);
  const [user] = useAuthState(auth);
  const  router = useRouter()
  // console.log(user);
  const enterChat = () => {
    router.push(/chatFolder/+id)
  }

  const recipientEmail = getRecipientEmail(user, users)
  const [recipientSnapshot] = useCollection(db.collection('users').where("email","==",recipientEmail))

  let recipient = recipientSnapshot?.docs[0]
  // console.log(recipient)
  // console.log(recipientEmail);
  return (
      <Container onClick={enterChat}>
        
            {recipient ? ( <UserAvatar src ={recipient.data().photoURL}/>


            ) : (
              <UserAvatar> {recipientEmail[0]}</UserAvatar>
            )
          
          }
        
          
          
        
        
      
          <p>{recipientEmail}</p>

      </Container>
  );
}


const UserAvatar = styled(Avatar)`

margin:5px;
margin-right:15px;
`
const Container = styled.div`
display:flex;
align-items: center;
cursor:pointer;
padding:15px;
word-break:break-word;

:hover{
  background-color: #e9eaeb;
}
`;



