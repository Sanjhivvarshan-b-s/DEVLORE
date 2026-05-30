import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Progress.css';
import '../styles/common.css';

function Progress() {
  
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem('devlore_user_data');
    return storedData ? JSON.parse(storedData) : null;
  });

  const handleClearHistory = () => {
    const shouldClear = window.confirm('Clear all saved quiz history and progress?');

    if (!shouldClear) {
      return;
    }

    localStorage.removeItem('devlore_user_data');
    setUserData(null);
  };
  
  if (!userData || userData.sessions.length === 0) {
    return (
      <div className="progress-no-data">
        <h2>No progress data yet!</h2>
        <p>Take a few quizzes to see your analytics.</p>
        <Link to="/setup">
          <button className="btn btn-primary" style={{ marginTop: '20px' }}>Start a Quiz</button>
        </Link>
      </div>
    );
  }

  let strongestCategory = "N/A";
  let weakestCategory = "N/A";
  
  const categories = Object.keys(userData.categoryStats);
  
  if (categories.length > 0) {
    let highestPercentage = -1;
    let lowestPercentage = 101;

    categories.forEach(cat => {
      const stats = userData.categoryStats[cat];
      const percentage = (stats.totalCorrect / stats.totalQuestions) * 100;

      if (percentage > highestPercentage) {
        highestPercentage = percentage;
        strongestCategory = cat;
      }
      if (percentage < lowestPercentage) {
  
        lowestPercentage = percentage;
        weakestCategory = cat;
      }
    });
  }

  return (
    <div className="progress-container">
      <h2 className="progress-title">Detailed Progress Dashboard</h2>

      <div className="insights-grid">
        <div className="insights-success">
          <h4>Strongest Category</h4>
          <p>{strongestCategory}</p>
        </div>
        <div className="insights-warning">
          <h4>Weakest Category</h4>
          <p>{weakestCategory}</p>
        </div>
      </div>

      <div className="trend-section">
        <h3>Recent Score Trend</h3>
        
        <div className="trend-list">
          {userData.sessions.slice(0, 5).map((session) => {
            const scorePercentage = (session.score / session.totalQuestions) * 100;
                        
            let barClass = 'poor';
            if (scorePercentage >= 70) barClass = 'excellent';
            else if (scorePercentage >= 50) barClass = 'warning';
            else if (scorePercentage >= 30) barClass = 'good';

            return (
              <div key={session.sessionId} className="trend-item">
                <div className="trend-item-header">
                  <span className="trend-item-title">
                    {session.category} <span className="trend-item-difficulty">({session.difficulty})</span>
                  </span>
                  <span className="trend-item-score">{scorePercentage.toFixed(1)}%</span>
                </div>
                
                <div className="progress-bar-container">
                  <div className={`progress-bar-fill ${barClass}`} style={{ width: `${scorePercentage}%` }}></div>
                </div>
                
                <div className="trend-item-date">
                  {new Date(session.date).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="progress-actions">
         <Link to="/setup">
          <button className="btn btn-primary">
            Take Another Quiz
          </button>
        </Link>
        <button
          className="btn btn-danger"
          onClick={handleClearHistory}
          style={{ marginLeft: '12px' }}
        >
          Clear Session History
        </button>
      </div>
    </div>
  );
}

export default Progress;