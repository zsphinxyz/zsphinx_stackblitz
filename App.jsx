import * as React from 'react';
import { useState } from 'react';
import './style.css';

const Score = ({ mark, total }) => {
  return (
    <div className="score">
      <h1>
        {mark} out of {total} questions correct!
      </h1>
    </div>
  );
};

export default function App() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [userChoice, setUserChoice] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [mark, setMark] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmit(true);
    setIsDisable(true);

    if (userChoice == quiz[quizIndex].ans[quiz[quizIndex].correct_ans]) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = (e) => {
    setQuizIndex(quizIndex + 1);

    if (isSubmit) {
      isCorrect ? setMark(mark + 1) : null;
      // reset all the States
      setIsCorrect(false);
      setIsSubmit(false);
      setUserChoice('');
      setIsDisable(false);
    } else {
    }
  };

  const quiz = [
    {
      id: 1,
      question: 'Http stands for: ',
      ans: [
        'Hyper Text Transmit Protocol',
        'Hyper Text Transfer Protocol',
        'Hyper Text Tansit Protocol',
      ],
      correct_ans: 1,
    },
    {
      id: 2,
      question: 'CSS stands for: ',
      ans: [
        'Cascading Style Sheet',
        'Cascading Style Sheets',
        'Cascating Style Sheet',
      ],
      correct_ans: 0,
    },
    {
      id: 3,
      question: 'HTML stands for: ',
      ans: [
        'Hyper Text Markup Language',
        'Home Text Markup Language',
        'Hyper Text Mail Language',
      ],
      correct_ans: 0,
    },
  ];

  if (quizIndex + 1 > quiz.length) {
    return <Score mark={mark} total={quiz.length} />;
  } else {
    return (
      <div
        className="container"
        style={
          isSubmit
            ? isCorrect
              ? { backgroundColor: '#00ff0055', borderColor: 'green' }
              : { backgroundColor: '#ff000055', borderColor: 'red' }
            : { backgroundColor: '#ffffff55', borderColor: 'gray' }
        }
      >
        <h1 className="question">
          {quiz[quizIndex].id}. {quiz[quizIndex].question}
        </h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {quiz[quizIndex].ans.map((i) => {
              return (
                <li
                  key={quiz[quizIndex].ans.indexOf()}
                  style={
                    isSubmit
                      ? i == quiz[quizIndex].ans[quiz[quizIndex].correct_ans]
                        ? { backgroundColor: '#00ff0077', fontWeight: 'bold' }
                        : { backgroundColor: '#ff000077', opacity: 0.5 }
                      : { backgroundColor: null }
                  }
                >
                  <label>
                    <input
                      type="radio"
                      name="choice"
                      value={i}
                      // checked={isSubmit ? true : false}
                      disabled={isDisable}
                      onChange={(e) => {
                        setUserChoice(e.target.value);
                      }}
                    />
                    {' ' + i}
                  </label>
                </li>
              );
            })}
          </ul>
          <button
            type="submit"
            className="submit"
            style={isSubmit ? { cursor: 'not-allowed' } : {}}
          >
            Submit
          </button>
        </form>
        <h3 className="info">
          {isSubmit ? (isCorrect ? 'Correct' : 'Wrong') : ''}
        </h3>
        <button
          onClick={handleNext}
          className="next"
          disabled={!isSubmit ? true : false}
          style={!isSubmit ? { cursor: 'not-allowed' } : {}}
        >
          {quizIndex + 1 == quiz.length ? 'See the Result' : 'Next'}
        </button>
      </div>
    );
  }
}
