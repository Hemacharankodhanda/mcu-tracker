/* =============================================================
   MCU Tracker — Quiz Page (quiz.js)
   Quiz engine: categories, player, scoring, daily quiz
   ============================================================= */

let quizState = {
  mode: 'categories', // 'categories' | 'playing' | 'result' | 'daily'
  currentCategory: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  selectedAnswer: null,
  answered: false,
  isDaily: false
};

function initQuizzes() {
  quizState.mode = 'categories';
  renderQuizPage();
}

function renderQuizPage() {
  const container = document.getElementById('quiz-content');
  if (!container) return;
  
  switch (quizState.mode) {
    case 'categories':
      renderQuizCategories(container);
      break;
    case 'playing':
    case 'daily':
      renderQuizPlayer(container);
      break;
    case 'result':
      renderQuizResult(container);
      break;
  }
  
  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderQuizCategories(container) {
  const dailyStatus = getDailyQuizStatus();
  const streak = getStreak();
  
  container.innerHTML = `
    <div class="section">
      <div class="daily-banner" onclick="startDailyQuiz()" id="daily-quiz-banner" 
           ${dailyStatus ? 'style="opacity: 0.6; pointer-events: none;"' : ''}>
        <div class="daily-banner__icon"><i data-lucide="zap"></i></div>
        <div class="daily-banner__content">
          <div class="daily-banner__title">Daily Challenge</div>
          <div class="daily-banner__subtitle">
            ${dailyStatus 
              ? `Completed! You scored ${dailyStatus.score}/${dailyStatus.total}` 
              : '5 questions from across the MCU. One attempt per day.'}
          </div>
        </div>
        ${!dailyStatus ? `
          <div class="daily-banner__action">
            <span class="btn btn-primary btn-sm">Play Now</span>
          </div>
        ` : ''}
      </div>
      ${streak.current > 0 ? `
        <div style="margin-top: var(--space-4); text-align: center;">
          <span class="streak">
            <span class="streak__icon"><i data-lucide="flame"></i></span>
            ${streak.current} day streak${streak.best > streak.current ? ` · Best: ${streak.best}` : ''}
          </span>
        </div>
      ` : ''}
    </div>
    
    <div class="section">
      <div class="section__header">
        <h2 class="section__title">Quiz Categories</h2>
      </div>
      <div class="grid grid--categories">
        ${QUIZ_CATEGORIES.map(cat => {
          const best = getBestScore(cat.id);
          return `
            <div class="category-card" onclick="startCategoryQuiz('${cat.id}')" id="quiz-cat-${cat.id}">
              <div class="category-card__icon"><i data-lucide="${cat.icon}"></i></div>
              <div class="category-card__title">${cat.title}</div>
              <div class="category-card__count">${cat.questions.length} questions · ${cat.difficulty}</div>
              ${best ? `
                <div style="margin-top: var(--space-3)">
                  <span class="micro" style="color: var(--color-infinity-gold)">Best: ${best.score}/${best.total}</span>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function startCategoryQuiz(categoryId) {
  const category = QUIZ_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return;
  
  quizState = {
    mode: 'playing',
    currentCategory: category,
    questions: shuffleArray([...category.questions]).slice(0, 10),
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    answered: false,
    isDaily: false
  };
  
  renderQuizPage();
}

function startDailyQuiz() {
  if (getDailyQuizStatus()) return;
  
  quizState = {
    mode: 'daily',
    currentCategory: { id: 'daily', title: 'Daily Challenge', icon: '⚡' },
    questions: getDailyQuizQuestions(),
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    answered: false,
    isDaily: true
  };
  
  renderQuizPage();
}

function renderQuizPlayer(container) {
  const q = quizState.questions[quizState.currentIndex];
  if (!q) return;
  
  const progress = `${quizState.currentIndex + 1}/${quizState.questions.length}`;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  container.innerHTML = `
    <div class="quiz-container">
      ${quizState.isDaily ? `
        <div class="daily-quiz-header">
          <div class="daily-quiz-header__date">${today}</div>
          <div class="daily-quiz-header__title">Daily Challenge</div>
        </div>
      ` : ''}
      
      <div class="quiz-header">
        <div>
          <button class="btn btn-secondary btn-sm" onclick="backToCategories()" id="quiz-back">
            ← Back
          </button>
        </div>
        <div class="quiz-progress">${progress}</div>
        <div class="quiz-score-display">Score: ${quizState.score}</div>
      </div>
      
      <div class="progress-bar" style="margin-bottom: var(--space-6)">
        <div class="progress-bar__fill" style="width: ${((quizState.currentIndex) / quizState.questions.length) * 100}%"></div>
      </div>
      
      ${q.category ? `<div class="micro" style="margin-bottom: var(--space-3); color: var(--color-text-muted)">${q.category}</div>` : ''}
      
      <div class="quiz-question">${q.q}</div>
      
      <div class="quiz-options">
        ${q.options.map((opt, i) => {
          let extraClass = '';
          if (quizState.answered) {
            if (i === q.correct) {
              extraClass = 'quiz-option--correct';
            } else if (i === quizState.selectedAnswer) {
              extraClass = 'quiz-option--incorrect';
            }
            extraClass += ' quiz-option--disabled';
          } else if (i === quizState.selectedAnswer) {
            extraClass = 'quiz-option--selected';
          }
          return `
            <button class="quiz-option ${extraClass}" 
                    onclick="selectAnswer(${i})"
                    id="quiz-opt-${i}">
              <span class="mono" style="color: var(--color-text-muted); margin-right: var(--space-3)">${String.fromCharCode(65 + i)}</span>
              ${opt}
            </button>
          `;
        }).join('')}
      </div>
      
      ${quizState.answered ? `
        <div class="quiz-explanation">
          <strong>${quizState.selectedAnswer === q.correct ? '✓ Correct!' : '✗ Incorrect.'}</strong>
          ${q.explanation}
        </div>
      ` : ''}
      
      <div class="quiz-actions">
        ${!quizState.answered && quizState.selectedAnswer !== null ? `
          <button class="btn btn-primary" onclick="submitAnswer()" id="quiz-submit">Submit Answer</button>
        ` : ''}
        ${quizState.answered ? `
          <button class="btn btn-primary" onclick="nextQuestion()" id="quiz-next">
            ${quizState.currentIndex < quizState.questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function selectAnswer(index) {
  if (quizState.answered) return;
  quizState.selectedAnswer = index;
  renderQuizPage();
}

function submitAnswer() {
  if (quizState.selectedAnswer === null || quizState.answered) return;
  
  const q = quizState.questions[quizState.currentIndex];
  quizState.answered = true;
  
  if (quizState.selectedAnswer === q.correct) {
    quizState.score++;
  }
  
  renderQuizPage();
}

function nextQuestion() {
  if (quizState.currentIndex < quizState.questions.length - 1) {
    quizState.currentIndex++;
    quizState.selectedAnswer = null;
    quizState.answered = false;
    renderQuizPage();
  } else {
    // Quiz complete
    if (quizState.isDaily) {
      markDailyQuizDone(quizState.score, quizState.questions.length);
    } else {
      saveQuizAttempt(quizState.currentCategory.id, quizState.score, quizState.questions.length);
    }
    quizState.mode = 'result';
    renderQuizPage();
  }
}

function renderQuizResult(container) {
  const percent = Math.round((quizState.score / quizState.questions.length) * 100);
  const streak = getStreak();
  
  let message = '';
  let color = '';
  let particlesHtml = '';
  if (percent === 100) {
    message = '<span style="font-size:1.2em; font-weight:bold;">Perfect Score!</span> <i data-lucide="trophy" style="display:inline; width:20px; height:20px;"></i>';
    color = 'var(--color-infinity-gold)';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      for (let i = 0; i < 16; i++) {
        const deg = (i / 16) * 360;
        const colorVar = i % 2 === 0 ? 'var(--color-infinity-gold)' : 'var(--color-hero-red)';
        particlesHtml += `<div class="quiz-particle" style="--angle: ${deg}deg; --delay: ${Math.random() * 0.2}s; --bg: ${colorVar}"></div>`;
      }
    }
  } else if (percent >= 80) {
    message = 'Excellent! You really know your MCU!';
    color = 'var(--color-success)';
  } else if (percent >= 60) {
    message = 'Good job! Keep watching and learning!';
    color = 'var(--color-text-primary)';
  } else if (percent >= 40) {
    message = 'Not bad! Time for a rewatch?';
    color = 'var(--color-text-secondary)';
  } else {
    message = 'Looks like you need to assemble more knowledge!';
    color = 'var(--color-hero-red)';
  }
  
  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-result">
        <div class="quiz-result__score" style="color: ${color}; position: relative; display: inline-block;">
          ${quizState.score}/${quizState.questions.length}
          ${particlesHtml}
        </div>
        <div class="quiz-result__label">${message}</div>
        
        <div class="grid grid--stats" style="max-width: 400px; margin: 0 auto var(--space-6);">
          <div class="stat-card">
            <div class="stat-card__value mono"><span id="anim-quiz-percent">0</span>%</div>
            <div class="stat-card__label">Accuracy</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value stat-card__value--gold mono">${streak.current}<i data-lucide="flame" style="width:24px; height:24px;"></i></div>
            <div class="stat-card__label">Day Streak</div>
          </div>
        </div>
        
        <div class="quiz-actions">
          <button class="btn btn-secondary" onclick="backToCategories()" id="quiz-back-result">All Quizzes</button>
          ${!quizState.isDaily ? `
            <button class="btn btn-primary" onclick="startCategoryQuiz('${quizState.currentCategory.id}')" id="quiz-retry">
              Try Again
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
  
  // Trigger animations
  setTimeout(() => {
    if (typeof animateCounter === 'function') {
      animateCounter('anim-quiz-percent', percent, 1000);
    }
  }, 50);
}

function backToCategories() {
  quizState.mode = 'categories';
  renderQuizPage();
}

// ── Utility ─────────────────────────────────────────────────

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
