import './App.css';
import {InputHome} from './comp/inputS';
import {OptionPanel} from './comp/opPanel';
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
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
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

