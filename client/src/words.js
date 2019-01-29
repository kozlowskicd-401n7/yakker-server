import React from 'react';
const { useTroll } = require('./troll-hook.js');

const Words = props => {
  const [words, troll] = useTroll();

  return <h2>{words}</h2>;
};

export default Words;
