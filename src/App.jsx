
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuizSetup from './pages/QuizSetup';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Progress from './pages/Progress';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<QuizSetup />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;