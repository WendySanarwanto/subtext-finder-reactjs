import React from 'react';

class TextSubtextInputForm extends React.Component {
  state = { text: '', subtext: '' };

  onProcessButtonClicked = (e) => {
    // console.log('TextSubtextInputForm.process button is clicked.');
    this.props.onProcessClicked({
      text: this.state.text,
      subtext: this.state.subtext
    });
  }

  render() {
    return (
      <div className="ui segment">
        <div className="ui form">
            <div className="two fields">            
              <div className="field">
                <label>Enter text</label>
                <input type="text" placeholder="Text" disabled={ !this.props.isEnabled } onChange={ e => this.setState({ text: e.target.value }) }  value={ this.state.text } /> 
              </div>
              <div className="field">
                <label>Enter Subtext</label>
                <input type="text" placeholder="Subtext to search" disabled={ !this.props.isEnabled } onChange={ e => this.setState({ subtext: e.target.value }) } value={ this.state.subtext }/> 
              </div>
            </div>
            <button type="button" className="ui submit primary button" disabled={ !this.props.isEnabled } onClick={ e => this.onProcessButtonClicked(e) }>Process</button>
        </div>
      </div>
    );
  }
};

export default TextSubtextInputForm;