import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz.css';
import '../styles/common.css';

const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, setupDetails } = location.state || {};
  
  const [quizData] = useState(() => {
    if (!questions) return null;
    
    return questions.map(q => {
      const answers = [...q.incorrect_answers, q.correct_answer];
      return {
        ...q,
        
        shuffledAnswers: answers.sort(() => Math.random() - 0.5)
      };
    });
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); 
  const [score, setScore] = useState(0);
  const [wrongAnswersList, setWrongAnswersList] = useState([]);

  const processAnswer = (userAnswer) => {
    const currentQuestion = quizData[currentIndex];
    const isCorrect = userAnswer === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setWrongAnswersList(prev => [...prev, {
        question: decodeHTML(currentQuestion.question),
        userAnswer: decodeHTML(userAnswer),
        correctAnswer: decodeHTML(currentQuestion.correct_answer)
      }]);
    }

    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(15); 
    } else {
      navigate('/results', {
        state: {
          score: isCorrect ? score + 1 : score, 
          totalQuestions: quizData.length,
          wrongAnswersList,
          setupDetails 
        }
      });
    }
  };

  const handleTimeOut = () => {
    processAnswer("Time Ran Out");
  };

  useEffect(() => {
    if (!quizData) {
      navigate('/setup');
    }
  }, [quizData, navigate]);

  useEffect(() => {
    if (!quizData) return;

    if (timeLeft === 0) {
      const timeoutId = setTimeout(() => {
        handleTimeOut();
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const timerId = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timerId);

    
  }, [timeLeft, quizData]);

    
  if (!quizData) return <div className="quiz-no-data"><h2>Loading Quiz...</h2></div>;

  const currentQuestion = quizData[currentIndex];

  return (
    <div className="quiz-container">
      
      <div className="quiz-header">
        <span className="quiz-progress">Question {currentIndex + 1} of {quizData.length}</span>
        <span className={`quiz-timer ${timeLeft <= 5 ? 'danger' : timeLeft <= 10 ? 'warning' : ''}`}>
          ⏳ Time Left: {timeLeft}s
        </span>
      </div>

      <div className="quiz-question-card">
        <h3 className="quiz-question">
          {decodeHTML(currentQuestion.question)}
        </h3>

        <div className="quiz-options">
          {currentQuestion.shuffledAnswers.map((answer, index) => (
            <button 
              key={index}
              onClick={() => processAnswer(answer)}
              className="quiz-option-btn"
            >
              {decodeHTML(answer)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;