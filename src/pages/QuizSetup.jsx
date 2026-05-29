import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizSetup.css';
import '../styles/common.css';

import '../styles/common.css';

function QuizSetup() {
  
  const [category, setCategory] = useState('9'); 
  const [difficulty, setDifficulty] = useState('easy');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleStartQuiz = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      
      const apiUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch questions from the server.');
      }

      const data = await response.json();

      
      if (data.response_code !== 0) {
        throw new Error('Not enough questions available for this category/difficulty. Try another combination.');
      }

      
      navigate('/quiz', { 
        state: { 
          questions: data.results,
          setupDetails: { category, difficulty } 
        } 
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="quiz-setup">
      <h2>Quiz Setup</h2>
      <p>Select your preferences before starting the quiz.</p>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <form onSubmit={handleStartQuiz}>
        
        <div className="setup-field">
          <label>Category: </label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="9">General Knowledge</option>
            <option value="18">Science: Computers</option>
            <option value="19">Mathematics</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
          </select>
        </div>

        <div className="setup-field">
          <label>Difficulty: </label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`btn btn-primary ${isLoading ? 'setup-loading' : ''}`}
        >
          {isLoading ? 'Loading Questions...' : 'Start Quiz'}
        </button>
      </form>
    </div>
  );
}

export default QuizSetup;