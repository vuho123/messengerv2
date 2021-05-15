import  styled  from 'styled-components'
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

import moment from 'moment'
// import { Container } from './styles';

export default function Message({user,message}) {
    console.log(message);

    const [userLoggedIn] = useAuthState(auth)

    const TypeOfMessage = user ===  userLoggedIn.email ? Sender : Receiver
  return (
            <Container>
                <TypeOfMessage>{message.message}
                    <Timestamp> {message.timestamp ? moment(message.timestamp).format('LT'): '...'}</Timestamp>
                </TypeOfMessage>
            </Container>
  );
}

const Timestamp = styled.div`
    color:grey;
    text-align:right;
    font-size:10px;
`;
const Container = styled.div``;

const MessageElement = styled.p`
width: fit-content;
padding:15px;
border-radius: 8px;
margin:10px;
min-width: 60px;
padding-bottom: 26px;
position:relative;
text-align:center;

`

const Sender = styled(MessageElement)`
    margin-left:auto;   
    background-color: #dcf8c6;

`;

const Receiver = styled(MessageElement)`
        text-align:left;
        background-color: whitesmoke;
`;



