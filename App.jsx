import * as React from 'react';
import { useState } from 'react';
import './style.css';

export default function App() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [userChoice, setUserChoice] = useState('');
  const [checkRadio, setCheckRadio] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmit(true);

    if (userChoice == quiz[quizIndex].ans[quiz[quizIndex].correct_ans]) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    setQuizIndex(quizIndex + 1);

    // reset all the States
    setCheckRadio(false);
    setIsCorrect(false);
    setIsSubmit(false);
    setUserChoice('');
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

  return (
    <div className="container">
      <h1 className="question">
        {quiz[quizIndex].id}. {quiz[quizIndex].question}
      </h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {quiz[quizIndex].ans.map((i) => {
            return (
              <li key={quiz.id}>
                <label>
                  <input
                    type="radio"
                    name="choice"
                    value={i}
                    checked={checkRadio}
                    onChange={(e) => {
                      setUserChoice(e.target.value);
                      setCheckRadio(e.target.value.checked);
                    }}
                  />
                  {' ' + i}
                </label>
              </li>
            );
          })}
        </ul>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
      <h3 className="info">
        {isSubmit
          ? isCorrect
            ? 'Correct'
            : 'Wrong. The correct answer is: ' +
              quiz[quizIndex].ans[quiz[quizIndex].correct_ans]
          : ''}
      </h3>
      <button onClick={handleNext} className="next">
        Next
      </button>
    </div>
  );
}
