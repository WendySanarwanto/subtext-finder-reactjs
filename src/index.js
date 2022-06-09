import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const App = () => {
  return (
    <div className="ui container">
      <h1>Find subtext on a Text </h1>
      <hr />
      
      <div className="ui segment">
        <div className="ui form">
            <div className="two fields">            
              <div className="field">
                <label>Enter text</label>
                <input type="text" placeholder="Text"/> 
              </div>
              <div className="field">
                <label>Enter Subtext</label>
                <input type="text" placeholder="Subtext to search"/> 
              </div>
            </div>
            <div class="ui submit primary button">Process</div>
        </div>
      </div>

      <div className="ui segment">
        <div className="ui vertical segment">          
          <h2>Hello Wendy Sanarwanto. How are you today, Wendy ?</h2>
        </div>
        <div className="ui vertical segment">
          <p>Found matched subtext on index 6 and 43.</p>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
