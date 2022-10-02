import React from 'react';

import {useState} from 'react';

import {Link} from "react-router-dom";

export function InputPortal() {

    const [pInput, setpInput] = useState("");
    
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("https://httpbin.org/post", {
            method: "POST",
            body: JSON.stringify({
              pInput: pInput,
            }),
          });
        //   let resJson = await res.json();
          if (res.status === 200) {
            setpInput("");
          } 
        } catch (err) {
          console.log(err);
        }

        console.log(pInput);
    };
    

    return (
        <form className="input-portal" onSubmit={handleSubmit}>
            <input type="text" value={pInput} placeholder='Put in a new destination...' onChange={(e) => setpInput(e.target.value)}/>
            <Link to='/options'><input type="submit" value="Enter"/></Link>
        </form>
    )
}