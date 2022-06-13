import React from 'react';

class Result extends React.Component {

  // isNonAlphanumeric(input) {
  //   return input.match(/[\W_]+/g);
  // }

  handleSpecialChar(input, specialChar) {
    let result = input;
    if (result.includes(specialChar)) {
      result = result.replaceAll(specialChar, `[${specialChar}]+`);
    } 

    return result;
  }

  handleDotChar(input) {
    return this.handleSpecialChar(input, '.');
  }

  handleQuestionChar(input) {
    return this.handleSpecialChar(input, '?');
  }

  handleBackslashChar(input) {
    return input.replaceAll('\\', '\\\\');
  } 

  renderResultsSegment() {
    const subtext = this.props.subtext;
    const subtextLength = subtext.length;
    const indexes = this.props.indexes;
    let renderedText = "<p id='highlightedText'>";
    if (this.props.text && indexes && indexes.length > 0) {
      const text = this.props.text;
      const textLength = text.length;

      for (let i = 0, j=0; i < textLength; ){
        const currentTextChar = text.charAt(i);
        if (i === indexes[j]) {
          renderedText += `<u>${subtext}</u>`
          j++;
          i += subtextLength;
        } else if ((i > indexes[j]) && (i < indexes[j]+subtextLength)){
          renderedText += `<u>${currentTextChar}</u>`;
          i++;
        }     
        else if (i === indexes[j]+subtextLength) {
          j++;
        }
        else {
          renderedText += currentTextChar;
          i++;
        }
      }

      // let regexInput = subtext;
      // if (this.isNonAlphanumeric(subtext)) {
      //   regexInput = "\\"+subtext;
      // }

      // regexInput = this.handleDotChar(subtext);
      // regexInput = this.handleQuestionChar(regexInput);
      // regexInput = this.handleBackslashChar(regexInput);
      // let splittedWords = this.props.text.split( new RegExp(regexInput, 'i')  );

      // for(let i =0, j=0, k=0; i < splittedWords.length; i++) {
      //   const chunk = splittedWords[i];
      //   const index = indexes[j];
      //   k += chunk.length;
      //   renderedText += chunk;
      //   if (index === k) {
      //     renderedText += `<u>${subtext}</u>`;
      //     // move to next index 
      //     j++;
      //     // update k by adding it with subtext's length
      //     k+= subtextLength;
      //   }
      // }
    }
    renderedText += "</p>";

    if (indexes ) {
      // Displayed as 1 based index
      let stringifiedIndexes = '';
      if (indexes.length === 1) {
        stringifiedIndexes = indexes[0]+1;
      } else if (indexes.length > 1){
        for(let i=0; i < indexes.length; i++) {
          if (i+2 === indexes.length) { 
            stringifiedIndexes = stringifiedIndexes + (indexes[i]+1) + ' ';
          } else if (i+1 === indexes.length) {
            stringifiedIndexes = stringifiedIndexes + 'and ' + (indexes[i]+1);
          } else {
            stringifiedIndexes = stringifiedIndexes + (indexes[i]+1) + ', ';
          }
        }
      }

      if (indexes.length > 0) {
        return (
          <div className="ui segment">
            <div className="ui vertical segment">          
              <h2 dangerouslySetInnerHTML={ { __html: renderedText } }/>
            </div>
            <div className="ui vertical segment">
              <p>Found matched subtext on these index(es): <span id="indexes">{ stringifiedIndexes }</span>.</p>
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