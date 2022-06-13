import React from 'react';
import ReactDOM from 'react-dom/client';

import TextSubtextInputForm from './TextSubtextInputForm';
import Result from './Result';
import GetIndexesOfMatchedSubtext from './SubtextFinderApi';

class App extends React.Component {
  state = { enableInputs: true, text: '', subtext: '', result: null, validationError: null, displayResultSegment: false };

  validationErrorMessage = 'subtext cannot be blank or whitespaces only.';

  renderResultSegment = () => {
    if (this.state.displayResultSegment) {
      return <Result text={ this.state.text } subtext={ this.state.subtext } indexes={ this.state.result } />
    }
  }

  onProcessButtonClicked = async (e) => {
    // Disable inputs
    this.setState( { enableInputs: false, displayResultSegment: false });
    // TODO: Show progress spinner
    try { 
      // Call API using axios
      const text = e.text;
      const subtext = e.subtext;

      // Validate subtext - should not be blank
      if (!subtext || ( subtext.trim() === '')) {
        this.setState({ validationError: this.validationErrorMessage });
      }
      else {
        this.setState({ validationError: null });
        let result = await GetIndexesOfMatchedSubtext(text, subtext);

        //  Upon successfull call, pass in the text, subtext, result into <Result />
        this.setState({
          text: e.text,
          subtext: e.subtext,
          result: result.data,
          displayResultSegment: true       
        });
      }
    } catch(err) {
      // TODO: Upon failed call, display error band
      console.log(err);
    }
    // re-enable inputs
    this.setState( { enableInputs: true });
  };

  render() {
    return (
      <div className="ui container">
        <h1>Find subtext on a Text </h1>
        <hr />
        
        <TextSubtextInputForm onProcessClicked={ this.onProcessButtonClicked } isEnabled= { this.state.enableInputs } errorMessage = { this.state.validationError }/>

        { this.renderResultSegment() }        

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
