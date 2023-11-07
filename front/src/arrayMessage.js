import React, { useState, useEffect } from 'react';
import { useLayoutEffect, useRef } from "react";

function ArrayMessage(props){
	const arrayDb =  props.arrayDb
	const User = props.user;
	const h2ref = useRef(null);
	let scrollMes = false;
	const lists = arrayDb.map((item)=>
			<li className={item.name === User ? 'user' : 'user active'} key={item._id}>
				<div>
					<p className='nameMes'>{item.name}</p>
					<p className='textMes'>{item.text}</p>
					<p className='timeMes'>{item.time}</p>
				</div>
			</li>

	  )

	/*setTimeout(()=>{if(!scrollMes){
		h2ref.current.scrollTo(0, h2ref.current.scrollHeight);
		scrollMes= true;
		return 
		}
	}, 5000)*/

	return <ul ref={h2ref} className='block-messager'>{lists}</ul>
}

export default ArrayMessage;