import React from 'react';

const Result = props => {
  const subtext = props.subtext;
  const result = props.result;
  let text = `<p>${props.text}</p>`;

  return (
    <div className="ui segment">
      <div className="ui vertical segment">          
        <h2>{ props.text }</h2>
      </div>
      <div className="ui vertical segment">
        <p>Found matched subtext on index 6 and 43.</p>
      </div>
  </div>
  );
};

export default Result;