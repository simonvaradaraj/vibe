import React from 'react';

import {Link} from "react-router-dom";

export function OptionPanel() {
    return (
        <div className="panel">
            <form className="panel-inputs">
                <input type="text" placeholder='Just give us a general idea, and we will take are of the rest.'/>
                <Link to='/options'><input type="submit" value="Enter"/></Link>
            </form>
        </div>
    )
}