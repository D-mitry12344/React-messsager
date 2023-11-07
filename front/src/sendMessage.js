import React, { useState, useEffect } from 'react';
import sendBtn from './sendBtn.svg';

function SendMessage(props){
	const setArrayDb= props.setArrayDb;
	const array = props.arrayDb;
	const User = props.user;
	const [message,setMessage]= useState('');
	
	function targetMessage(e){
		if(e.target.value !== '' && e.target.value !== ' '){
			setMessage(e.target.value);
		}

	}

 	

	function hSend(){
		let time
		 if(new Date().getMinutes() > 9){
		 	time = new Date().getHours() +':'+ new Date().getMinutes()
		 }else{
			time = new Date().getHours() +':0'+ new Date().getMinutes()
		 }
		async function sendFecth(){
	     const res = await fetch('http://localhost:5000', {
		        method: 'POST',
		        body: JSON.stringify({
				    name: User,
				    text: message,
				    time: time,
				}),
		      	headers: {
		          'content-type': 'application/json'
		      		}
		    })

	     const body = await res.json();
	     return body
	  	}
	  sendFecth().then(function(value){
	      setArrayDb(value)
	    })

	  

	}

	return(
		<div className="inputDiv">
			<textarea onChange={targetMessage}></textarea>
			<button className='inputDiv-btn' onClick={hSend}><img src={sendBtn} /></button>
		</div>)
}

export default SendMessage;