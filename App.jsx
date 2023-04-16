import * as React from 'react';
import { useState } from 'react';
import './style.css';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYqsmxJKZTzcideiQgm20LAer5-Re6nzg",
  authDomain: "multiple-choice-quiz01.firebaseapp.com",
  projectId: "multiple-choice-quiz01",
  storageBucket: "multiple-choice-quiz01.appspot.com",
  messagingSenderId: "47771108392",
  appId: "1:47771108392:web:c09695682e3205d9bba11d",
  measurementId: "G-KC9PMF3DK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const Score = ({ mark, total }) => {
  return (
    <div className="score">
      <h1>
        {mark} out of {total} questions correct!
      </h1>
      <p>
        Go to <a href="https://zsphinx.stackblitz.io"> Home </a>
      </p>
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
      question: 'What is a domain name?',
      ans: [
        'The address of a website on the internet',
        'A tool used to measure website traffic',
        'A program used to design webpages',
      ],
      correct_ans: 0,
    },
    {
      id: 2,
      question: 'What is a web application?',
      ans: [
        'A tool used to measure website traffic',
        'A program that runs in a web browser',
        'A program used to design webpages',
      ],
      correct_ans: 1,
    },
    {
      id: 3,
      question: 'What is a SSL certificate?',
      ans: [
        'A type of programming language',
        'A type of file format',
        'A digital certificate that encrypts information transmitted over the internet',
      ],
      correct_ans: 2,
    },
    {
      id: 4,
      question: 'What is a web server?',
      ans: [
        'A program that designs webpages',
        'A computer that stores and delivers webpages',
        'A tool used to measure website traffic',
      ],
      correct_ans: 1,
    },
    {
      id: 5,
      question: 'What is a web browser?',
      ans: [
        'A program used to access websites',
        'A tool used to measure website traffic',
        'A program used to design webpages',
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
                      checked={!isSubmit ? null : false}
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
            disabled={userChoice == '' ? true : false}
            style={
              isSubmit || userChoice == '' ? { cursor: 'not-allowed' } : {}
            }
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
