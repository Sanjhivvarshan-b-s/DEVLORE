#  DevLore - Technical Documentation

## Table of Contents
- [1. System Overview](#1-system-overview)
- [2. Architecture & Tech Stack](#2-architecture--tech-stack)
- [3. Component Specifications](#3-component-specifications)
  - [3.1 Home Dashboard](#31-home-dashboard-homejsx)
  - [3.2 Quiz Setup](#32-quiz-setup-quizsetupjsx)
  - [3.3 Quiz Interface](#33-quiz-interface-quizpagejsx---core-engine)
  - [3.4 Results & Review](#34-results--review-resultsjsx)
  - [3.5 Progress Analytics](#35-progress-analytics-progressjsx)
- [4. Data Models & Storage Schema](#4-data-models--storage-schema)
- [5. External API Integration](#5-external-api-integration)
- [6. Styling Architecture](#6-styling-architecture)

---

## 1. System Overview
DevLore is a client-side web application built with React that provides users with a technical quiz experience and tracks their learning progress over time. The system relies entirely on the browser's `localStorage` for data persistence, ensuring a lightweight, account-free experience while maintaining historical performance metrics.

---

## 2. Architecture & Tech Stack
* **Frontend Library:** React.js (Functional Components, Hooks)
* **Routing:** React Router DOM (Client-side routing)
* **State Management:** React local state (`useState`, `useEffect`)
* **Data Persistence:** Browser `localStorage` API
* **External Data Source:** [Open Trivia DB API](https://opentdb.com/)
* **Styling:** Pure CSS3 (Custom properties, Flexbox, CSS Grid, Keyframe animations). **No external UI libraries or charting libraries are used.**

---

## 3. Component Specifications

### 3.1 Home Dashboard (`Home.jsx`)
Acts as the landing page and primary overview dashboard.
* **State:** Monitors `devlore_user_data` from localStorage.
* **Conditional Rendering:**
  * *Empty State:* Renders a "Welcome Screen" with onboarding steps and a Call-to-Action to start the first quiz if no history exists.
  * *Dashboard State:* Computes and renders aggregate statistics (Total Quizzes, Average Score, Best Category) and a list of the 3 most recent sessions.

### 3.2 Quiz Setup (`QuizSetup.jsx`)
Handles user configuration for generating a custom quiz session.
* **State:** `category` (string/ID), `difficulty` (string), `isLoading` (boolean), `error` (string).
* **Behavior:** On form submission, triggers a fetch call to the Open Trivia API. Validates the response (checks `response_code`).
* **Routing:** On successful fetch, navigates to `/quiz`, passing the fetched questions and setup details via React Router state.

### 3.3 Quiz Interface (`QuizPage.jsx` - Core Engine)
Manages the active quiz session.
* **State:** Current question index, timer count, selected answers, score.
* **Behavior:**
  * Displays one question at a time.
  * Manages an interval-based countdown timer per question.
  * Auto-advances to the next question when the timer hits zero or an answer is submitted.

### 3.4 Results & Review (`Results.jsx`)
Handles post-quiz analysis and data persistence.
* **Behavior:**
  * Calculates final score and pass/fail metrics.
  * Displays a detailed breakdown of correct vs. incorrect answers.
  * Exposes the action to save the session to `localStorage`.

### 3.5 Progress Analytics (`Progress.jsx`)
Provides detailed historical insights.
* **Data Processing:** Iterates over the sessions array to calculate the strongest and weakest categories based on percentage accuracy.
* **Visualizations:** Uses dynamic inline CSS (`style={{ width: \`${scorePercentage}%\` }}`) to render animated, gradient-filled progress bars purely with DOM elements, strictly adhering to the "no chart libraries" requirement.

---

## 4. Data Models & Storage Schema

The application uses a single key in `localStorage` named `devlore_user_data` to store a serialized JSON object.

### Schema Definition
```json
{
  "totalQuizzes": "number",
  "averageScore": "number",
  "categoryStats": {
    "[Category Name]": {
      "totalQuestions": "number",
      "totalCorrect": "number"
    }
  },
  "sessions": [
    {
      "sessionId": "string (UUID or Timestamp)",
      "date": "ISO 8601 Date String",
      "category": "string",
      "categoryId": "string",
      "difficulty": "string",
      "score": "number",
      "totalQuestions": "number",
      "correctAnswers": "number",
      "wrongAnswers": "number"
    }
  ]
}
```


### Data Aggregation Logic
When a new quiz is completed and saved:
1. `totalQuizzes` is incremented by 1.
2. The new score is factored into `averageScore`.
3. The specific category in `categoryStats` is updated, appending the new `totalQuestions` and `totalCorrect` to calculate category-specific accuracy for the Progress Dashboard.
4. The session object is unshifted (added to the beginning) of the `sessions` array.

---

## 5. External API Integration

**Provider:** Open Trivia Database (OpenTDB)  
**Endpoint:** `GET https://opentdb.com/api.php`

**Query Parameters:**
* `amount`: Fixed at `10`
* `category`: Dynamically passed from user selection (e.g., `9` = General Knowledge, `18` = Science: Computers)
* `difficulty`: `easy` | `medium` | `hard`
* `type`: Fixed at `multiple` (Multiple choice)

**Error Handling:**
The application strictly monitors the `response_code` returned by OpenTDB. A `response_code` other than `0` (Success) triggers a localized error state alerting the user that not enough questions exist for that specific combination.

---

## 6. Styling Architecture

* **Methodology:** Component-scoped CSS files (`Home.css`, `QuizSetup.css`, `Progress.css`) paired with a global reset and variable file (`common.css`).
* **Design System:** Utilizes a modern, clean UI focusing on readability. Features Glassmorphism elements (`backdrop-filter: blur()`), soft box-shadows, and scalable `rem` typography.
* **Visualizations:** The project strictly implements data visualization (score progress bars) using pure HTML/CSS without any external chart rendering libraries.
* **Responsiveness:** Mobile-first media queries (`@media (max-width: 768px)`) ensure grid layouts collapse gracefully into stack layouts on smaller devices.
