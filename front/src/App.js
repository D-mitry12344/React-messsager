import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import ArrayMessage from './arrayMessage.js';
import SendMessage from './sendMessage.js';
import RegPage from './regPage.js';
import manIcon from './manIcon.svg';
import network from './netwrok.svg';


function App() {
  const[arrayDb,setArrayDb]= useState([]);
  const[arrayAc,setArrayAc]= useState([]);
  const[timePre,setTimePre]= useState(false);
  const[user,setUser]= useState({user:'', reg:true});

  async function fetchGet(){
    const response = await fetch('http://localhost:5000');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }
  

  async function fetchGetAc(){
    const response = await fetch('http://localhost:5000/ac');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }


  useEffect(() => {
    const timeInteval= 1*2000;
    const intervalId = setInterval(()=>{
       

      fetchGetAc().then(function(value){
        setArrayAc(value)
      });

      fetchGet().then(function(value){
        setArrayDb(value)
      });
    }, timeInteval)
    return ()=>{clearInterval(intervalId)}
  },[]);

   setTimeout(()=>{setTimePre(true)},2000)

  if(user.reg){
    return( 
      <div className='App'>
      <RegPage user={user} setUser={setUser} arrayAc={arrayAc} setArrayAc={setArrayAc} />
      <div className={timePre ? 'Preload-none' : 'Preload'}>
          <h1>Загрузка</h1>
          <img src={network} />
    </div>
    </div>)
  }else{
    return (
      <div className='App'>
        <div className="App__header">
          <p className='App__header-title'>Общий чат</p>
          <div className='App-header-name'>
            <p>Привет, {user.user}</p>
            <img src={manIcon} />
          </div>
          
        </div>
        <ArrayMessage user={user.user} arrayDb={arrayDb} setArrayDb={setArrayDb} />
        <SendMessage  user={user.user} arrayDb={arrayDb} setArrayDb={setArrayDb} />
      </div>
    );
  }
}

export default App;
