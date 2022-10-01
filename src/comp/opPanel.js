import React from 'react';

import {Link} from "react-router-dom";

export function OptionPanel() {
    return (
        <div className="panel">
            <form className="panel-inputs">

                <label for="currentloc">What is your current location? </label>
                <input type="text" id='currentloc' placeholder=''/>

                <label for="desloc" className='desloc'>What is your desired location? <span>(optional)</span></label>
                <input type="text" id='desloc' placeholder=''/>

                <label>How far are you going?</label>
                <div className='buttons'>

                    
                    <input type="radio" id="in" name="fav_language" value="In-State" />
                    <label for="in" className='radbutton'>In-State</label>

                    
                    <input type="radio" id="dome" name="fav_language" value="Domestic" />
                    <label for="dome" className='radbutton'>Domestic</label>

                    <input type="radio" id="int" name="fav_language" value="International" />
                    <label for="int" className='radbutton'>International</label>
                        
                </div >

                <label for="myRange">How much do you need to match that vibe? </label>
                <input type="range" min="1" max="100" className="slider" id="myRange"></input>

                <Link to='/portal'><input type="submit" value="Apply Current Settings"/></Link>
                
            </form>
        </div>
    );
}