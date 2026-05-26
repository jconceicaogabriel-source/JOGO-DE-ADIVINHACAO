const MAX_ATTEMPTS = 10;
let secretNumber, attemptsLeft, gameOver, guessHistory;

function initGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = MAX_ATTEMPTS;
  gameOver = false;
  guessHistory = [];

  document.getElementById('attempts-count').textContent = attemptsLeft;
  document.getElementById('bar-fill').style.width = '100%';
  document.getElementById('bar-fill').style.background = 'linear-gradient(90deg, var(--accent2), var(--accent))';
  document.getElementById('guess-input').value = '';
  document.getElementById('guess-input').disabled = false;
  document.getElementById('guess-btn').disabled = false;
  document.getElementById('history-list').innerHTML = '';
  document.getElementById('restart-btn').style.display = 'none';

  const msgBox = document.getElementById('message-box');
  msgBox.className = 'message-box';
  msgBox.classList.remove('win-pulse');
  document.getElementById('message').textContent = 'Digite um número e clique em Chutar para começar.';

  document.getElementById('guess-input').focus();
}

function setMessage(text, type) {
  const box = document.getElementById('message-box');
  box.className = 'message-box ' + type;
  document.getElementById('message').textContent = text;
}

function addHistory(num, direction) {
  guessHistory.push({ num, direction });
  const list = document.getElementById('history-list');
  const chip = document.createElement('div');
  chip.className = 'history-chip ' + direction;
  chip.textContent = num + (direction === 'high' ? ' ↑' : direction === 'low' ? ' ↓' : ' ✓');
  list.appendChild(chip);
}

function updateBar() {
  const pct = (attemptsLeft / MAX_ATTEMPTS) * 100;
  const fill = document.getElementById('bar-fill');
  fill.style.width = pct + '%';
  if (pct <= 30) {
    fill.style.background = 'var(--danger)';
  } else if (pct <= 60) {
    fill.style.background = 'linear-gradient(90deg, var(--warning), var(--accent))';
  }
}

function makeGuess() {
  if (gameOver) return;

  const input = document.getElementById('guess-input');
  const guess = parseInt(input.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    setMessage('⚠ Por favor, insira um número válido entre 1 e 100.', 'error');
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    input.focus();
    return;
  }

  attemptsLeft--;
  updateBar();

  const countEl = document.getElementById('attempts-count');
  countEl.style.transform = 'scale(1.4)';
  setTimeout(() => countEl.style.transform = 'scale(1)', 200);
  countEl.textContent = attemptsLeft;

  if (guess === secretNumber) {
    addHistory(guess, 'exact');
    setMessage(`🎉 Você acertou! O número era ${secretNumber}. Tentativas usadas: ${MAX_ATTEMPTS - attemptsLeft}.`, 'win');
    document.getElementById('message-box').classList.add('win-pulse');
    endGame();
    return;
  }

  if (attemptsLeft === 0) {
    addHistory(guess, guess > secretNumber ? 'high' : 'low');
    setMessage(`💀 Você perdeu! O número secreto era ${secretNumber}.`, 'lose');
    endGame();
    return;
  }

  if (guess > secretNumber) {
    addHistory(guess, 'high');
    setMessage(`O número secreto é MENOR. ${attemptsLeft} tentativa${attemptsLeft !== 1 ? 's' : ''} restante${attemptsLeft !== 1 ? 's' : ''}.`, 'hint-high');
  } else {
    addHistory(guess, 'low');
    setMessage(`O número secreto é MAIOR. ${attemptsLeft} tentativa${attemptsLeft !== 1 ? 's' : ''} restante${attemptsLeft !== 1 ? 's' : ''}.`, 'hint-low');
  }

  input.value = '';
  input.focus();
}

function endGame() {
  gameOver = true;
  document.getElementById('guess-input').disabled = true;
  document.getElementById('guess-btn').disabled = true;
  document.getElementById('restart-btn').style.display = 'block';
}

function restartGame() {
  initGame();
}

document.getElementById('guess-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') makeGuess();
});

initGame();