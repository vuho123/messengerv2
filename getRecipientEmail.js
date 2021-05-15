import { EmojiPeopleTwoTone } from "@material-ui/icons"
import firebase from 'firebase'
import firestore from 'firebase/firestore'
export default function getRecipientEmail(currentUser,users){
    // users?.filter((user)=>{
    //   if(user != currentUser.toString()){
    //       return(user)
    //   }
    // })

    let username = []
   users?.map((user)=>{
        
        if(user !== currentUser.email){
                username.push(user)
        }
        // else{
        //     return ;
        // }
   })
   return username[0]

}
