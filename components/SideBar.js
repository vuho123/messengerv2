import { useEffect, useState } from 'react';
import styled from 'styled-components'
import {Avatar,IconButton,Button} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as EmailValidator from 'email-validator'
import {db, auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
// import { Container } from './styles';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import database from 'firebase/database'
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from './Chat'


export default function Sidebar() {

 const [user] = useAuthState(auth)

 
 
// console.log(chatsSnapshot?.docs)
// chatsSnapshot?.docs.map((doc) =>{
//     console.log(doc)

// })
const currentUser = db.collection('users').where('email','==',user.email)

const [currentUserSnapshot] = useCollection(currentUser)

// let changeData = db.collection('chats').orderBy('createdAt','desc')
// const [changing] = useCollection(changeData)
// console.log(changing);
// const order = db.collection('chats').orderBy('createdAt','desc').get()
   
 
const userChatRef = db.collection('chats').where('users','array-contains',user.email)


const [chatsSnapshot]  = useCollection(userChatRef)  
// chatsSnapshot?.docs.map((doc) =>{
//   console.log(doc.data().createdAt)
// })
let myArr = []
chatsSnapshot?.docs.map((doc)=>{
  myArr.push({"id":doc.id,"data":doc.data().users,"createdAt": doc.data().createdAt})

})
myArr.sort((b, a) => (a.createdAt < b.createdAt) ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0))






//  chatsSnapshot?.docs.map(doc =>{
//    console.log(doc);
//  });



  




  
      


  const signOut = ()=>{
      auth?.signOut().then(() => {
        alert('Sign Out Successfully!')
      }).catch((error) => {
        Alert('An error happened.'+ error) 
      });
  }


  const createChat =  ()=>{
    const input = prompt("Enter email receiver")

    if(!input){
      return;

    }
    if(EmailValidator.validate(input)&& !chatAlreadyExists(input) && input !== user.email ){
      const timestamp = firebase.firestore. FieldValue. serverTimestamp;

      db.collection('chats').add({
        users: [user.email, input],
        createdAt: timestamp()
      })
      


     
     
      


    }
    

  }
  // db.collection('chats').orderBy('createdAt','desc').limit(10)

  const chatAlreadyExists = (recipientEmail) => 
      !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail)?.length >0);
      
  

  return (
    <Container>
            <Header>
              {currentUserSnapshot?.docs.map((doc) =>
              // console.log(doc.data()
              
                <UserAvatar key={doc.id} src= {doc.data().photoURL}  onClick={signOut} />
                )}
                <IconsContainer>

                    <IconButton>
                        <ChatIcon/>
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon/>
                <SearchInput placeholder="Search In Chats" />
            </Search>

            <SidebarButton onClick={createChat}>Start A New Chat</SidebarButton>

            {/* Lists of chats */}

            {/* {chatsSnapshot?.docs.map((doc)=>(
              
              <Chat key={doc.id} id={doc.id}  users ={doc.data().users} />
            ))} */}

                  {myArr?.map((doc)=>(
                          <Chat key={doc.id} id={doc.id}  users ={doc.data} />

                  ))}

    </Container>
  );
}


const Container = styled.div`
::-webkit-scrollbar {
  display: none;
}
--ms-overflow-style:none;
scrollbar-width:none;
overflow:scroll;

`

const Search = styled.div`
  display: flex;
  align-items: center;
  padding:20px;
  border-radius:2px;
`;
const SidebarButton = styled(Button)`
  width:100%;
  &&&{
    border-top:1px solid whitesmoke;
    border-bottom:1px solid whitesmoke;
  }
`
const SearchInput = styled.input`
    outline-width:0;
    border:none;
    flex:1;
`;
const Header = styled.div`
  display:flex;
  position:sticky;  
  top: 0;
  background-color:white;
  z-index:1;
  justify-content:space-between;
  padding:15px;
  height:80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  
  :hover{
    opacity:0.8;
  }
`

const IconsContainer = styled.div``

