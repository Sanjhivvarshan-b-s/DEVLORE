import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Results.css';
import '../styles/common.css';

const categoryMap = {
  "9": "General Knowledge",
  "18": "Science: Computers",
  "19": "Mathematics",
  "21": "Sports",
  "22": "Geography",
  "23": "History"
};

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, totalQuestions, wrongAnswersList, setupDetails } = location.state || {};

  
  if (score === undefined) {
    return (
      <div className="results-no-data">
        <h2>No quiz data found!</h2>
        <Link to="/setup"><button className="btn btn-primary" style={{ marginTop: '20px' }}>Start a Quiz</button></Link>
      </div>
    );
  }

  const wrongAnswersCount = totalQuestions - score;
  const scorePercentage = (score / totalQuestions) * 100;
  const categoryName = categoryMap[setupDetails.category] || "Mixed Category";

  const handleSaveProgress = () => {
  
    const existingData = JSON.parse(localStorage.getItem('devlore_user_data')) || {
      totalQuizzes: 0,
      averageScore: 0,
      sessions: [],
      categoryStats: {}
    };

    
    const newSession = {
      sessionId: Date.now().toString(),
      date: new Date().toISOString(),
      category: categoryName,
      difficulty: setupDetails.difficulty,
      score: score,
      totalQuestions: totalQuestions,
      correctAnswers: score,
      wrongAnswers: wrongAnswersCount,
      incorrectReview: wrongAnswersList
    };
    
    const newTotalQuizzes = existingData.totalQuizzes + 1;
    const newAverageScore = ((existingData.averageScore * existingData.totalQuizzes) + scorePercentage) / newTotalQuizzes;
    
    const currentCatStats = existingData.categoryStats[categoryName] || { attempted: 0, totalCorrect: 0, totalQuestions: 0 };
    
    const updatedCategoryStats = {
      ...existingData.categoryStats,
      [categoryName]: {
        attempted: currentCatStats.attempted + 1,
        totalCorrect: currentCatStats.totalCorrect + score,
        totalQuestions: currentCatStats.totalQuestions + totalQuestions
      }
    };

    
    const updatedData = {
      totalQuizzes: newTotalQuizzes,
      averageScore: parseFloat(newAverageScore.toFixed(1)), 
      sessions: [newSession, ...existingData.sessions], 
      categoryStats: updatedCategoryStats
    };

    localStorage.setItem('devlore_user_data', JSON.stringify(updatedData));
    
    navigate('/progress');
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Quiz Complete!</h2>
        
        <div className={`results-score-circle ${scorePercentage >= 70 ? 
          'excellent' : scorePercentage >= 50 ? 
          'good' : scorePercentage >= 30 ? 
          'average' : 'poor'}`}>
          <div className="results-score-value">{score}/{totalQuestions}</div>
          <div className="results-score-label">{scorePercentage.toFixed(1)}%</div>
        </div>
        
        <p style={{ fontSize: '18px', color: '#555', marginBottom: '20px' }}>{categoryName} ({setupDetails.difficulty})</p>
        
        <div className="results-details">
          <div className="results-detail-item">
            <h4>Correct Answers</h4>
            <p style={{ color: '#28a745' }}>{score}</p>
          </div>
          <div className="results-detail-item" style={{ borderLeftColor: '#dc3545' }}>
            <h4>Wrong Answers</h4>
            <p style={{ color: '#dc3545' }}>{wrongAnswersCount}</p>
          </div>
        </div>
      </div>

      {wrongAnswersList.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h3 className="results-section-title">Review Incorrect Answers:</h3>
          <div style={{ marginTop: '15px' }}>
            {wrongAnswersList.map((item, index) => (
              <div key={index} className="results-wrong-item">
                <h5>Q: {item.question}</h5>
                <p><span className="label">Your Answer:</span> {item.userAnswer}</p>
                <p><span className="label">Correct Answer:</span> {item.correctAnswer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="results-actions">
        <button 
          onClick={handleSaveProgress}
          className="btn btn-success"
        >
          Save Progress to Dashboard
        </button>
        
        <Link to="/">
          <button className="btn" style={{ backgroundColor: '#6c757d', color: 'white' }}>
            Discard & Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Results;