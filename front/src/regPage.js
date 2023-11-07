import React, { useState, useEffect } from 'react';
import { useLayoutEffect, useRef } from "react";


function RegPage(props){
	const arrayAc =  props.arrayAc;
	const setArrayAc =  props.setArrayAc;
	const user =  props.user;
	const setUser =  props.setUser;
	const myRef = useRef(null);
	const lists = arrayAc.map((item)=>
			<li onClick={handlerUser} key={item._id}>
				{item.name}
			</li>

	  )

	function newUser(){
		myRef.current.value =''
		if(user.user !== '' && user.user !== ' '){
				async function sendFecth(){
			     const res = await fetch('http://localhost:5000/ac', {
				        method: 'POST',
				        body: JSON.stringify({
						    name: user.user
						}),
				      	headers: {
				          'content-type': 'application/json'
				      		}
				    })
			     const body = await res.json();
			     return body
			  	}
			  sendFecth().then(function(value){
			      setArrayAc(value);
			    })
			  setUser({user: '', reg:true})
		}
	}  


	function handlerUser(e){
	    setUser({user:e.target.textContent, reg:false})
	    
	 }


	 function targetAc(e){
	 	if(e.target.value !== '' && e.target.value !== '  '){
	 		let name = e.target.value ;
			arrayAc.forEach((item,i)=>{
				if(item.name !== name ){
				}else{
					name = name + i
				}

			})
			setUser({user: name, reg:true})
		}


	}

	return(
		<div className='user-change'>
	        <h2>Кто ты?</h2>
	        <ul>
	        	{lists}
	        </ul>
	        <div className='user-change__new-user'>
	        	<input ref={myRef} onChange={targetAc} type="text"/>
	        	<label>Новый пользователь</label>
	        	<button onClick={newUser}>Добавить</button>
	        </div>
	    </div>
		)

}

export default RegPage;

