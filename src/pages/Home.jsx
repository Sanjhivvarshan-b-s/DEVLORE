import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/Home.css';
import '../styles/common.css';


function Home() {
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem('devlore_user_data');
    return storedData ? JSON.parse(storedData) : null;
  });

  const handleClearHistory = () => {
    const shouldClear = window.confirm('Clear all saved quiz history and progress?');
    if (!shouldClear) return;
    localStorage.removeItem('devlore_user_data');
    setUserData(null);
  };

  
if (!userData || userData.sessions.length === 0) {
    return (
      <div className="home-welcome-container">        
        <div className="welcome-header">
          <h1>Welcome to <span className="highlight">DevLore</span></h1>         
          <p className="main-subtitle">
            Test your knowledge and track your progress over time.
          </p>

          <Link to="/setup">
            <button className="btn btn-primary start-btn">
              Start Your First Quiz
            </button>
          </Link>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">🎲</div>
            <h3>Take Quizzes</h3>
            <p>Jump into multiple-choice quizzes and test your general knowledge.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>See Your Stats</h3>
            <p>Keep track of your past scores and see how you improve over time.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Learn New Facts</h3>
            <p>Discover interesting things while you play and try to beat your high score.</p>
          </div>
        </div>

      </div>
    );
  }

  let bestCategory = "N/A";
  let highestPercentage = -1;
  Object.keys(userData.categoryStats).forEach(cat => {
    const stats = userData.categoryStats[cat];
    const percentage = (stats.totalCorrect / stats.totalQuestions) * 100;
    if (percentage > highestPercentage) {
      highestPercentage = percentage;
      bestCategory = cat;
    }
  });

  return (
    <div className="home-dashboard">
      <h2>DevLore Dashboard</h2>
      
      <div className="stats-grid">
        <div className="card card-stat">
          <h3>Total Quizzes</h3>
          <p>{userData.totalQuizzes}</p>
        </div>
        <div className="card card-stat">
          <h3>Average Score</h3>
          <p>{userData.averageScore}%</p>
        </div>
        <div className="card card-stat">
          <h3>Best Category</h3>
          <p style={{ color: '#28a745' }}>{bestCategory}</p>
        </div>
      </div>

      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {userData.sessions.slice(0, 3).map(session => (
            <li key={session.sessionId} style={{ padding: '10px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>{session.category}</strong> ({session.difficulty})</span>
              <span style={{ fontWeight: 'bold', color: '#007bff' }}>Score: {session.score}/{session.totalQuestions}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="home-actions">
        <Link to="/setup">
          <button className="btn btn-success">
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

export default Home;