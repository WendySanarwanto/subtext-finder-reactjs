import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import TextSubtextInputForm from './TextSubtextInputForm';
import Result from './Result';
import GetIndexesOfMatchedSubtext from './SubtextFinderApi';

class App extends React.Component {
  state = { enableInputs: true, text: '', subtext: '', result: [] };

  onProcessButtonClicked = async (e) => {
    console.log('Process button is clicked.');
    console.log(e);
    // Disable inputs
    this.setState( { enableInputs: false });
    // TODO: Show progress spinner
    try { 
      // Call API using axios
      const text = e.text;
      const subtext = e.subtext;
      let result = await GetIndexesOfMatchedSubtext(text, subtext);
      //  Upon successfull call, pass in the text, subtext, result into <Result />
      this.setState({
        text: e.text,
        subtext: e.subtext,
        result: result
      });
    } catch(err) {
      // TODO: Upon failed call, display error band
      console.log(err);
    }
    // re-enable inputs
    // setTimeout(() => this.setState( { enableInputs: true }), 3000);
    this.setState( { enableInputs: true });
  };

  render() {
    return (
      <div className="ui container">
        <h1>Find subtext on a Text </h1>
        <hr />
        
        <TextSubtextInputForm onProcessClicked={ this.onProcessButtonClicked } isEnabled= { this.state.enableInputs }/>

        <Result text={ this.state.text } subtext={ this.state.subtext } indexes={ this.state.result } />

      </div>
    );
  }
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
