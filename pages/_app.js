import '../styles/globals.css'
import Login from './login'
import {db,auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../components/Loading'
import { useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore';   // for cloud firestore



function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth) // say: is there someone login? if yes => whatever ,  if no => login page



  useEffect(()=>{
    if(user){
      db.collection('users').doc(user.uid).set(
        {
        email: user.email,
        lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
      },
      {merge:true}
      );
      
      
      
      }
  },[user]) //only run the useEffect when user changes!

  if(loading){
    return (<Loading/>)
  }
  
  if(!user){
    return (<Login/>)
  }

  
  return <Component {...pageProps} />

  
}

export default MyApp
