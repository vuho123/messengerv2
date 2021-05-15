import React from 'react';
import mainLogo from '../pages/logo.png'
import {Circle} from 'better-react-spinkit'

// import { Container } from './styles';

export default function Loading() {
  return (

    <center style={{display: 'grid',placeItems:"center",height:"100vh"}}>
        <div>
            <img src={mainLogo} alt="" height ={200} style= {{marginBottom: 10}} />
            <Circle size={50} />
        </div>
    </center>
      );
}
