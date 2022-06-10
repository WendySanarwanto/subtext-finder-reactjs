import React from 'react';

class Result extends React.Component {

  renderResultsSegment() {
    const subtext = this.props.subtext;
    const subtextLength = subtext.length;
    const indexes = this.props.indexes;
    let renderedText = "<p>";
    if (this.props.text && indexes && indexes.length > 0) {
      let splittedWords = this.props.text.split( new RegExp(subtext, 'i')  );

      for(let i =0, j=0, k=0; i < splittedWords.length; i++) {
        const chunk = splittedWords[i];
        const index = indexes[j];
        k += chunk.length;
        renderedText += chunk;
        if (index === k) {
          renderedText += `<u>${subtext}</u>`;
          // move to next index 
          j++;
          // update k by adding it with subtext's length
          k+= subtextLength;
        }
      }
    }
    renderedText += "</p>";

    if (indexes ) {
      let stringifiedIndexes = '';
      if (indexes.length === 1) {
        stringifiedIndexes = indexes[0];
      } else if (indexes.length > 0){
        for(let i=0; i < indexes.length; i++) {
          if (i+2 === indexes.length) { 
            stringifiedIndexes = stringifiedIndexes + indexes[i] + ' ';
          } else if (i+1 === indexes.length) {
            stringifiedIndexes = stringifiedIndexes + 'and ' + indexes[i];
          } else {
            stringifiedIndexes = stringifiedIndexes + indexes[i] + ', ';
          }
        }

        return (
          <div className="ui segment">
            <div className="ui vertical segment">          
              <h2 dangerouslySetInnerHTML={ { __html: renderedText } }/>
            </div>
            <div className="ui vertical segment">
              <p>Found matched subtext on these index(es): { stringifiedIndexes }.</p>
            </div>
          </div>
        );
      } 

      return ( 
        <div className="ui segment">
          <div className="ui vertical segment">
            <p>No matched subtext found on the text.</p>
          </div>
        </div>
      );
    } 
  }

  render() {
    return (
      <div>
        { this.renderResultsSegment() }
      </div>
    );
  }
};

export default Result;