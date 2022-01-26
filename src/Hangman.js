import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import { randomWord } from "./words";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;

    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }

  reset(){
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() })
  }

  render() {
    let wrongGuess = this.state.nWrong;
    let isWinner = this.guessedWord().join("") === this.state.answer;
    let gamestate = this.generateButtons();
    if (isWinner) gamestate = "You win";
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        {wrongGuess!==this.props.maxWrong && <img src={this.props.images[this.state.nWrong]} alt={"You have made "+wrongGuess+" wrong guess."}/>}
        {wrongGuess === this.props.maxWrong && <h3>You Lose</h3>}
        <p>You have made {wrongGuess?wrongGuess:'_'} wrong guess(s).</p>
        <p className='Hangman-word'>{wrongGuess === this.props.maxWrong ? this.state.answer : this.guessedWord()}</p>
        <p className='Hangman-btns'>{gamestate}</p>
        {<button id="reset" onClick={this.reset}>Restart</button>}
      </div>
    );
  }
}

export default Hangman;
