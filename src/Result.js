import React from 'react';

class Result extends React.Component {
  // getIndexesString() {

  // }

  // componentDidUpdate() {
  //   const result = this.props.indexes;    
  //   console.log(this.props);
  //   console.log(result);
  // }

  render() {
    const subtext = this.props.subtext;
    const subtextLength = subtext.length;
    let text = `${this.props.text}`;  
    // for (const index of this.props.indexes) {

    // }

    const result = this.props.indexes;
    let indexes = '';
    if (result ) {
      if (result.length === 1) {
        indexes = result[0];
      } else if (result.length > 0){
        for(let i=0; i < result.length; i++) {
          if (i+2 === result.length) { 
            indexes = indexes + result[i] + ' ';
          } else if (i+1 === result.length) {
            indexes = indexes + 'and ' + result[i];
          } else {
            indexes = indexes + result[i] + ', ';
          }
        }

        return (
          <div className="ui segment">
            <div className="ui vertical segment">          
              <h2>{ this.props.text }</h2>
            </div>
            <div className="ui vertical segment">
              <p>Found matched subtext on these index(es): { indexes }.</p>
            </div>
          </div>
        );
      } else {
        return ( 
          <div className="ui segment">
            <div className="ui vertical segment">
              <p>No matched subtext found on the text.</p>
            </div>
          </div> 
        );
      }

    } 
  }
};

export default Result;