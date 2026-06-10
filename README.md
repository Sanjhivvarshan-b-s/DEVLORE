# 🚀 DevLore – Tech Quiz & Learning Tracker

DevLore is a quiz platform built for users who want to test their technical knowledge while tracking their learning progress over time. The application focuses on a smooth quiz experience, detailed performance tracking, and a clean user interface.

---

# 📖 About the Project

This project was developed using React.js and the Open Trivia DB API. Users can customize quiz sessions, answer timed questions, review mistakes, and monitor overall improvement through a progress dashboard.

All quiz history and statistics are stored locally in the browser using localStorage, making it easy to continue tracking progress without creating an account.

---

# ✨ Features

## 🏠 Home Dashboard

The home page gives users a quick overview of their activity and performance.

### Includes:
- Total quizzes attempted
- Average score tracking
- Best-performing categories
- Recent quiz activity
- First-time user onboarding section

---

## ⚙️ Quiz Setup

Users can customize each quiz session by selecting:

- Quiz category
- Difficulty level

The application fetches dynamic questions directly from the Open Trivia DB API.

---

## 🧠 Quiz Experience

The quiz interface is designed to keep users focused and engaged.

### Features:
- One question displayed at a time
- Countdown timer for every question
- Automatic question switching when time expires
- Real-time score tracking

---

## 📊 Results & Review

After completing a quiz, users can:

- View final score
- See correct and incorrect answer counts
- Review wrongly answered questions
- Save quiz session history

---

## 📈 Progress Dashboard

The dashboard helps users understand their performance over time.

### Dashboard Highlights:
- Quiz session history
- Strongest category analysis
- Weakest category analysis
- Score tracking visuals built using pure CSS

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend Development |
| React Router DOM | Routing |
| Context API / Hooks | State Management |
| localStorage | Data Persistence |
| Fetch API | API Requests |
| Open Trivia DB API | Quiz Questions |
| Pure CSS | Styling |

---

# 🗄️ localStorage Structure

Quiz data is stored locally using the following key:

```json
devlore_user_data
```

## Example Structure

```json
{
  "totalQuizzes": 12,
  "averageScore": 75.5,
  "sessions": [
    {
      "sessionId": "1698501234567",
      "date": "2023-10-28T14:30:00Z",
      "category": "Science: Computers",
      "difficulty": "medium",
      "score": 8,
      "totalQuestions": 10,
      "correctAnswers": 8,
      "wrongAnswers": 2
    }
  ]
}
```

---


# 📚 What This Project Covers

This project includes practical implementation of:

- Component-based architecture
- State management
- API integration
- Timer functionality
- Conditional rendering
- Persistent storage handling
- React Router navigation

---

# 🌍 Deployment

This project is deployed using [Vercel](https://vercel.com). Any pushes to the `main` branch will automatically trigger a new build and deployment.

# 🔗 Live Demo

🚀 **[Play DevLore Quiz Here](https://devlore-quiz.vercel.app/)**

# 👨‍💻 Developed By

Made with dedication by **Sanjhivvarshan B S**

---

# 🤝 Contribution

Contributions, suggestions, and improvements are always welcome.

If you would like to contribute:
- Fork the repository
- Create a new branch
- Submit a pull request

---

# 📜 License

This project is licensed under the MIT License.
