import './App.css';
import {InputHome} from './comp/inputS';

function Launch() {
  return (
    <div className="App">
      <div className="logo">
        <h1>VIBE.</h1>
        <h3>Trip Planning Made Easy</h3>
      </div>

      <div className="search-home">
        <p>Give me a one-sentence description of your ideal trip.</p>
        <div className="bar">
          <InputHome />
        </div>
      </div>
      
    </div>
  );
}

export default Launch;
