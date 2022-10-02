import './App.css';
import {InputHome} from './comp/inputS';
import {InputPortal} from './comp/inputP';
import {OptionPanel} from './comp/opPanel';

import { Itineraries, Attractions } from './comp/iten';

import {useState} from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



export function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Launch />}/>
          <Route path="/options" element={<Options />} /> 
          <Route path="/portal" element={<Portal />} />
      </Routes>
  </Router>
  ); 
}

export function Launch() {
  return (
      <div className="Launch">
        <div className="logo">
          <h1>VIBE.</h1>
          <h3>Trip Planning Made Easy</h3>
        </div>

        <div className="search-home">
          <p>What's the trip vibe you're going for?</p>
          <div className="bar">
            <InputHome />
          </div>
        </div>
      </div>
  );
}

export function Options() {
  return (
      <div className="options">
        <p>Please answer the questions below</p>
        <div className="optionpanel">
          <OptionPanel />
        </div>
      </div>
  );
}

export function Portal() {

  const [act, setact] = useState('p-inactive');

  let isActive = (e) => {
    if(e === 'p-inactive') {
      e = 'p-active';
    }
    else {
      e = 'p-inactive';
    }
  }

  return (
      <>
        <div className="layer" id=''>
        </div>

        <div className="portal">
          <header>
            <h1>VIBE.</h1><span> portal</span>
            <div className="bar-port">
              <InputPortal/>
            </div>
            <button className="settings">⚙️</button>
          </header>
          
          <div className="recs">
            <div className="iten">
              <Itineraries />
            </div>
            <div className="atr">
              <Attractions />
            </div>
          </div>

          <div className='optionpanel'>
            <OptionPanel />
          </div>
        
        </div>
      </>
    

  )
}

