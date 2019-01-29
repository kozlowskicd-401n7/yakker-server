import React from 'react';
const io = require('socket.io-client');

const url = 'http://localhost:8080';
// const url = 'https://js-401-socket-io-server.herokuapp.com';
const socket = io.connect(url);

class TrollJohn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedInput: '',
      words: [],
    };

    socket.on('incoming', payload => {
      this.updateWords(payload);
    });

  }


  updateWords = words => {
    console.log(words);
    this.setState({ words: [...this.state.words, words] });
    this.checkWordList();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.updateWords(this.state.typedInput);
    socket.emit('troll', this.state.typedInput);
    document.getElementById("text-form").reset();
  };

  handleNewWords = event => {
    this.setState({ typedInput: event.target.value });
  };

  checkWordList = () => {
    if(this.state.words.length >= 15) {
      let newData = [];
      console.log(this.state.words.length)
      for (let i = this.state.words.length; i > this.state.words.length - 14 || i === 0; i--) {
        newData.unshift(this.state.words[i-1]);
        console.log(newData);
      }
      this.setState({words: [...newData]});
    }
  }

  render() {
    return (
      <>
        <form id="text-form" onSubmit={this.handleSubmit}>
          <input
            name="typedInput"
            placeholder="New Words"
            onChange={this.handleNewWords}
            />
        </form>
        <ul>
        {
          this.state.words.map((word, idx) => {
            return <li key={idx}>{word}</li>
          })
          }
        </ul>
      </>
    );
  }
}

export default TrollJohn;
