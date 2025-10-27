// ============================================================================
// GAMES NOTIFICATION CLASS
// ============================================================================
class GameNotification {
    static show(message, type = 'info', duration = 4000, customTitle = null) {
        // Remove existing notifications
        const existing = document.querySelectorAll('.game-notification');
        existing.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `game-notification ${type}`;

        const icons = {
            success: '🎉',
            error: '😢',
            info: 'ℹ️'
        };

        // Use custom title if provided, otherwise use default
        const title = customTitle || this.getTitle(type);

        notification.innerHTML = `
            <div class="game-notification__content">
                <div class="game-notification__icon">${icons[type] || icons.info}</div>
                <div class="game-notification__text">
                    <h4>${title}</h4>
                    <p>${message}</p>
                </div>
                <button class="game-notification__close" onclick="this.parentElement.parentElement.remove()">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }
    }

    static getTitle(type) {
        const titles = {
            success: 'Təbriklər!',
            error: 'Oyun Bitdi',
            info: 'Məlumat'
        };
        return titles[type] || titles.info;
    }
}

// ============================================================================
// SNAKE GAME CLASS
// ============================================================================
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('snakeGame');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 25;
        this.tileCount = 20;
        this.snake = [{ x: 10, y: 10 }];
        this.food = { x: 15, y: 15 };
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.gameLoop = null;
        this.isRunning = false;

        this.setupCanvas();
        this.setupControls();
        this.setupResizeHandler();
    }

    setupCanvas() {
        // Set canvas size to fill the container
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Calculate optimal size (square, fitting in container)
        const size = Math.min(containerWidth, containerHeight, 400);

        // Set canvas internal resolution
        this.canvas.width = size;
        this.canvas.height = size;

        // Set canvas display size
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';

        // Update tile count based on canvas size
        this.tileCount = Math.floor(size / this.gridSize);

        // Redraw
        this.draw();
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.setupCanvas();
            }, 100);
        });
    }

    setupControls() {
        const toggleBtn = document.getElementById('snakeStartBtn');
        const promptStart = document.getElementById('snakePromptStart');
        const handleStart = () => {
            if (!this.isRunning) {
                this.reset();
                this.start();
                if (toggleBtn) toggleBtn.textContent = 'Yenidən';
            }
        };
        if (toggleBtn) toggleBtn.addEventListener('click', handleStart);
        if (promptStart) promptStart.addEventListener('click', handleStart);

        document.addEventListener('keydown', (e) => {
            if (!this.isRunning) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (this.dy === 0) { this.dx = 0; this.dy = -1; }
                    break;
                case 'ArrowDown':
                    if (this.dy === 0) { this.dx = 0; this.dy = 1; }
                    break;
                case 'ArrowLeft':
                    if (this.dx === 0) { this.dx = -1; this.dy = 0; }
                    break;
                case 'ArrowRight':
                    if (this.dx === 0) { this.dx = 1; this.dy = 0; }
                    break;
            }
        });
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.dx = 1;
        this.dy = 0;
        this.gameLoop = setInterval(() => this.update(), 100);
        const overlay = document.getElementById('snakeOverlay');
        if (overlay) overlay.classList.add('is-hidden');
    }

    reset() {
        this.isRunning = false;
        clearInterval(this.gameLoop);
        this.snake = [{ x: 10, y: 10 }];
        this.food = { x: 15, y: 15 };
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        document.getElementById('snakeScore').textContent = '0';
        this.setupCanvas(); // Reset canvas size
        const toggleBtn = document.getElementById('snakeStartBtn');
        if (toggleBtn) toggleBtn.textContent = 'Yenidən';
        const overlay = document.getElementById('snakeOverlay');
        if (overlay) overlay.classList.remove('is-hidden');
    }

    update() {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }

        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            document.getElementById('snakeScore').textContent = this.score;
            this.generateFood();
        } else {
            this.snake.pop();
        }

        this.draw();
    }

    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.snake.forEach((segment, index) => {
            this.ctx.fillStyle = index === 0 ? '#dc2626' : '#ef4444';
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });

        // Draw food
        this.ctx.fillStyle = '#10b981';
        this.ctx.fillRect(
            this.food.x * this.gridSize + 1,
            this.food.y * this.gridSize + 1,
            this.gridSize - 2,
            this.gridSize - 2
        );
    }

    gameOver() {
        this.isRunning = false;
        clearInterval(this.gameLoop);

        // Show score notification
        GameNotification.show(`Oyun bitdi! Xalınız: ${this.score}`, 'error');

        const toggleBtn = document.getElementById('snakeStartBtn');
        if (toggleBtn) toggleBtn.textContent = 'Yenidən';
        const overlay = document.getElementById('snakeOverlay');
        if (overlay) overlay.classList.remove('is-hidden');
    }
}

// ============================================================================
// MEMORY GAME CLASS
// ============================================================================
class MemoryGame {
    constructor() {
        this.grid = document.getElementById('memoryGame');
        this.moves = 0;
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.cards = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎹'];
        this.gameCards = [];

        document.getElementById('memoryStartBtn').addEventListener('click', () => this.start());

        // Initialize cards immediately so they're visible behind overlay
        this.createCards();
    }

    start() {
        // Clear any existing timeout
        if (this.checkTimeout) {
            clearTimeout(this.checkTimeout);
        }

        this.moves = 0;
        this.matchedPairs = 0;
        this.flippedCards = [];
        document.getElementById('memoryMoves').textContent = '0';

        // Reset cards to initial state
        this.gameCards.forEach(card => {
            card.flipped = false;
            card.matched = false;
        });
        this.render();

        // Hide the overlay and change button text
        const overlay = document.getElementById('memoryOverlay');
        const startBtn = document.getElementById('memoryStartBtn');
        if (overlay) overlay.classList.add('is-hidden');
        if (startBtn) startBtn.textContent = 'Yenidən';
    }

    createCards() {
        this.gameCards = [...this.cards, ...this.cards]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({
                id: index,
                emoji: emoji,
                flipped: false,
                matched: false
            }));

        this.render();
    }

    render() {
        this.grid.innerHTML = '';
        this.gameCards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'memory-game__card';
            cardEl.textContent = card.flipped || card.matched ? card.emoji : '';

            if (card.flipped) cardEl.classList.add('flipped');
            if (card.matched) cardEl.classList.add('matched');

            cardEl.addEventListener('click', () => this.flipCard(card));
            this.grid.appendChild(cardEl);
        });
    }

    flipCard(card) {
        if (card.flipped || card.matched || this.flippedCards.length === 2) return;

        card.flipped = true;
        this.flippedCards.push(card);
        this.render();

        if (this.flippedCards.length === 2) {
            this.moves++;
            document.getElementById('memoryMoves').textContent = this.moves;
            this.checkTimeout = setTimeout(() => this.checkMatch(), 500);
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;

        if (card1.emoji === card2.emoji) {
            card1.matched = true;
            card2.matched = true;
            this.matchedPairs++;

            if (this.matchedPairs === this.cards.length) {
                setTimeout(() => {
                    GameNotification.show(`${this.moves} gedişdə tamamladınız!`, 'success');
                    this.start(); // Auto start new game on win
                }, 300);
            }
        } else {
            card1.flipped = false;
            card2.flipped = false;
        }

        this.flippedCards = [];
        this.render();
    }

    reset() {
        this.moves = 0;
        this.matchedPairs = 0;
        this.flippedCards = [];
        document.getElementById('memoryMoves').textContent = '0';

        // Shuffle cards for new game
        this.createCards();

        // Show overlay and change button text
        const overlay = document.getElementById('memoryOverlay');
        const startBtn = document.getElementById('memoryStartBtn');
        if (overlay) overlay.classList.remove('is-hidden');
        if (startBtn) startBtn.textContent = 'Yenidən';
    }

    gameOver() {
        // Show overlay for restart and change button text
        const overlay = document.getElementById('memoryOverlay');
        const startBtn = document.getElementById('memoryStartBtn');
        if (overlay) overlay.classList.remove('is-hidden');
        if (startBtn) startBtn.textContent = 'Yenidən';
    }
}

// ============================================================================
// GUESS NUMBER GAME CLASS
// ============================================================================
class GuessNumberGame {
    constructor() {
        this.secretNumber = 0;
        this.attempts = 0;

        document.getElementById('guessSubmit').addEventListener('click', () => this.guess());
        document.getElementById('guessStartBtn').addEventListener('click', () => this.start());
        document.getElementById('guessInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.guess();
        });
    }

    start() {
        // Reset game state
        this.secretNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        document.getElementById('guessAttempts').textContent = '0';
        document.getElementById('guessInput').value = '';
        document.getElementById('guessMessage').textContent = '1-100 arası bir rəqəm seçdim. Təxmin et!';
        document.getElementById('guessMessage').style.color = 'var(--base-9)';

        // Hide the overlay
        const overlay = document.getElementById('guessOverlay');
        if (overlay) overlay.classList.add('is-hidden');
    }

    reset() {
        // Reset game state
        this.secretNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        document.getElementById('guessAttempts').textContent = '0';
        document.getElementById('guessInput').value = '';
        document.getElementById('guessMessage').textContent = '1-100 arası bir rəqəm seçdim. Təxmin et!';
        document.getElementById('guessMessage').style.color = 'var(--base-9)';

        // Show overlay and change button text
        const overlay = document.getElementById('guessOverlay');
        const startBtn = document.getElementById('guessStartBtn');
        if (overlay) overlay.classList.remove('is-hidden');
        if (startBtn) startBtn.textContent = 'Başla';
    }

    guess() {
        const input = document.getElementById('guessInput');
        const message = document.getElementById('guessMessage');
        const guess = parseInt(input.value);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            message.textContent = 'Lütfen 1-100 arası bir sayı girin!';
            message.style.color = '#ef4444';
            return;
        }

        this.attempts++;
        document.getElementById('guessAttempts').textContent = this.attempts;

        if (guess === this.secretNumber) {
            message.textContent = `🎉 Düzgün! ${this.attempts} cəhdə tapdınız!`;
            message.style.color = '#10b981';
            setTimeout(() => this.start(), 2000); // Auto start new game on win
        } else if (guess < this.secretNumber) {
            message.textContent = '⬆️ Daha yüksək bir rəqəm sınayın!';
            message.style.color = '#f59e0b';
        } else {
            message.textContent = '⬇️ Daha aşağı bir rəqəm sınayın!';
            message.style.color = '#3b82f6';
        }

        input.value = '';
    }

    gameOver() {
        // Show overlay for restart and change button text
        const overlay = document.getElementById('guessOverlay');
        const startBtn = document.getElementById('guessStartBtn');
        if (overlay) overlay.classList.remove('is-hidden');
        if (startBtn) startBtn.textContent = 'Başla';
    }
}

// ============================================================================
// WORD GUESS GAME CLASS
// ============================================================================
class WordGuessGame {
    constructor() {
        // Base Azerbaijani word list (fallback)
        this.baseWords = [
            'JAVASCRIPT', 'KOMPÜTER', 'TELEFON', 'İNTERNET',
            'PROQRAMLAŞDIRMA', 'TEXNOLOGİYA', 'KLAVİATURA', 'SİÇAN',
            'BRAUZER', 'SİSTEM', 'PLANŞET',
            'OYUN', 'KİTAB', 'MASA', 'STUL', 'PƏNCƏRƏ', 'QAPI',
            'EV', 'BAĞ', 'AĞAC', 'GÜL', 'DƏNİZ', 'DAĞ', 'ÇAY',
            'ŞƏHƏR', 'KƏND', 'MƏKTƏB', 'UNİVERSİTET',
            'ƏL', 'AYAQ', 'BAŞ', 'GÖZ', 'QULAQ',
            'ATA', 'ANA', 'QARDAŞ', 'BACI', 'DOST',
            'BALACA', 'KİCİK', 'BÖYÜK', 'YAXŞI', 'TƏZƏ'
        ];

        this.words = [...this.baseWords];
        this.word = '';
        this.guessedLetters = [];
        this.lives = 6;
        this.isLoadingWords = false;

        this.createKeyboard();
        this.loadWordsFromAPI();
        document.getElementById('wordStartBtn').addEventListener('click', () => this.start());
        this.reset();
    }

    async loadWordsFromAPI() {
        try {
            // Fetch Azerbaijani words from GitHub repository
            const response = await fetch('https://cdn.jsdelivr.net/gh/eymenefealtun/all-words-in-all-languages@latest/Azerbaijani/Azerbaijani.txt');

            if (!response.ok) throw new Error('Failed to fetch word list');

            const text = await response.text();

            // Split by newlines and filter words
            const allWords = text
                .split(',')
                .map(word => word.trim())
                .filter(word => word.length > 0)
                .map(word => word.toLocaleUpperCase('az'));

            // Filter for game-suitable words (4-12 chars, single words)
            const filteredWords = allWords
                .filter(word => word.length >= 4 && word.length <= 12)
                .filter(word => !word.includes(' ') && !word.includes('_') && !word.includes('-'));

            // Shuffle and take random words
            const shuffled = this.shuffleArray([...filteredWords]);
            const randomWords = shuffled.slice(0, 200); // Take first 200 random words
            console.log(randomWords);

            // Add to word list
            this.words = [...this.baseWords, ...randomWords];

        } catch (error) {
            console.log('✗ Failed to load word list, using base words only:', error.message);
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    createKeyboard() {
        const keyboard = document.getElementById('gameKeyboard');
        const letters = "A,B,C,Ç,D,E,Ə,F,G,Ğ,H,X,I,İ,J,K,Q,L,M,N,O,Ö,P,R,S,Ş,T,U,Ü,V,Y,Z";

        letters.split(',').forEach(letter => {
            const key = document.createElement('div');
            key.className = 'game__keyboard__key';
            key.textContent = letter;
            key.addEventListener('click', () => this.guessLetter(letter, key));
            keyboard.appendChild(key);
        });
    }

    start() {
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        this.guessedLetters = [];
        this.lives = 10;
        document.getElementById('wordLives').textContent = this.lives;

        // Reset keyboard
        document.querySelectorAll('.game__keyboard__key').forEach(key => {
            key.className = 'game__keyboard__key';
        });

        this.updateDisplay();

        // Hide the overlay
        const overlay = document.getElementById('wordOverlay');
        if (overlay) overlay.classList.add('is-hidden');
    }

    guessLetter(letter, keyElement) {
        if (this.guessedLetters.includes(letter) || this.lives === 0) return;

        this.guessedLetters.push(letter);

        if (this.word.includes(letter)) {
            keyElement.classList.add('correct');
        } else {
            keyElement.classList.add('wrong');
            this.lives--;
            document.getElementById('wordLives').textContent = this.lives;
        }

        keyElement.classList.add('used');
        this.updateDisplay();
        this.checkWin();
    }

    updateDisplay() {
        const display = document.getElementById('wordGameDisplay');
        display.textContent = this.word
            .split('')
            .map(letter => this.guessedLetters.includes(letter) ? letter : '_')
            .join(' ');
    }

    checkWin() {
        const won = this.word.split('').every(letter => this.guessedLetters.includes(letter));

        if (won) {
            setTimeout(() => {
                GameNotification.show('Sözü tapdınız!', 'success');
                this.start(); // Auto start new game on win
            }, 300);
        } else if (this.lives === 0) {
            setTimeout(() => {
                GameNotification.show(`Oyun bitdi! Söz: ${this.word}`, 'error');
                this.gameOver(); // Show overlay only on lose
            }, 300);
        }
    }

    reset() {
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        this.guessedLetters = [];
        this.lives = 6;
        document.getElementById('wordLives').textContent = this.lives;

        // Reset keyboard
        document.querySelectorAll('.game__keyboard__key').forEach(key => {
            key.className = 'game__keyboard__key';
        });

        this.updateDisplay();

        // Show overlay
        const overlay = document.getElementById('wordOverlay');
        if (overlay) overlay.classList.remove('is-hidden');
    }

    gameOver() {
        // Show overlay for restart
        const overlay = document.getElementById('wordOverlay');
        if (overlay) overlay.classList.remove('is-hidden');
    }
}

// ============================================================================
// REACTION GAME CLASS
// ============================================================================
class ReactionGame {
    constructor() {
        this.box = document.getElementById('reactionGame');
        this.startTime = 0;
        this.timeout = null;
        this.bestTime = Infinity;
        this.isWaiting = false;

        document.getElementById('reactionStartBtn').addEventListener('click', () => this.start());
        this.box.addEventListener('click', () => this.handleClick());
    }

    start() {
        if (this.isWaiting) return;

        // Hide overlay
        const overlay = document.getElementById('reactionOverlay');
        if (overlay) overlay.classList.add('is-hidden');

        this.box.textContent = 'Gözləyin!';
        this.box.className = 'reaction-game waiting';
        this.isWaiting = true;

        const delay = Math.random() * 3000 + 2000;

        this.timeout = setTimeout(() => {
            this.box.textContent = 'İndi klikləyin!';
            this.box.className = 'reaction-game ready';
            this.startTime = Date.now();
        }, delay);
    }

    handleClick() {
        if (!this.isWaiting) return;

        if (this.startTime === 0) {
            // Clicked too early
            clearTimeout(this.timeout);
            this.box.textContent = '';
            this.box.className = 'reaction-game';
            this.isWaiting = false;

            // Show notification
            GameNotification.show('Çox erkən! Yenidən sınayın.', 'error');

            // Show overlay for restart
            const overlay = document.getElementById('reactionOverlay');
            if (overlay) overlay.classList.remove('is-hidden');
            return;
        }

        const reactionTime = Date.now() - this.startTime;

        if (reactionTime < this.bestTime) {
            this.bestTime = reactionTime;
            document.getElementById('reactionBest').textContent = reactionTime;
            GameNotification.show(`Yeni rekord! ${reactionTime}ms`, 'success');
        } else {
            GameNotification.show(`Reaksiya müddəti: ${reactionTime}ms`, 'info');
        }

        this.box.textContent = '';
        this.box.className = 'reaction-game';
        this.isWaiting = false;
        this.startTime = 0;

        // Show overlay for restart
        const overlay = document.getElementById('reactionOverlay');
        if (overlay) overlay.classList.remove('is-hidden');
    }

    reset() {
        this.box.textContent = '';
        this.box.className = 'reaction-game';
        this.isWaiting = false;
        this.startTime = 0;

        // Show overlay
        const overlay = document.getElementById('reactionOverlay');
        if (overlay) overlay.classList.remove('is-hidden');
    }

    gameOver() {
        // Show overlay for restart
        const overlay = document.getElementById('reactionOverlay');
        if (overlay) overlay.classList.remove('is-hidden');
    }
}

// ============================================================================
// COLOR MATCH GAME CLASS
// ============================================================================
class ColorMatchGame {
    constructor() {
        this.colors = [
            { name: 'QIRMIZI', color: '#ef4444', text: 'QIRMIZI' },
            { name: 'MAVİ', color: '#3b82f6', text: 'MAVİ' },
            { name: 'YAŞIL', color: '#10b981', text: 'YAŞIL' },
            { name: 'SARI', color: '#f59e0b', text: 'SARI' },
            { name: 'BƏNÖVŞƏYİ', color: '#a855f7', text: 'BƏNÖVŞƏYİ' },
            { name: 'NARINCI', color: '#fb923c', text: 'NARINCI' }
        ];
        this.score = 0;
        this.timeLeft = 30;
        this.gameInterval = null;
        this.currentQuestion = null;

        document.getElementById('colorStartBtn').addEventListener('click', () => this.start());

        // Initialize the UI without starting the game
        this.initializeUI();
    }

    initializeUI() {
        // Show the first question without starting the timer
        this.nextQuestion();
    }

    start() {
        // Hide overlay
        const overlay = document.getElementById('colorOverlay');
        if (overlay) overlay.classList.add('is-hidden');

        // Clear any existing interval
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }

        this.score = 0;
        this.timeLeft = 30;
        document.getElementById('colorScore').textContent = '0';
        document.getElementById('colorTime').textContent = '30';

        this.nextQuestion();

        this.gameInterval = setInterval(() => {
            this.timeLeft--;
            document.getElementById('colorTime').textContent = this.timeLeft;

            if (this.timeLeft === 0) {
                this.gameOver();
            }
        }, 1000);
    }

    nextQuestion() {
        const displayColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        const textColor = this.colors[Math.floor(Math.random() * this.colors.length)];

        this.currentQuestion = displayColor.name;

        const display = document.getElementById('colorGameDisplay');
        display.textContent = textColor.text;
        display.style.color = displayColor.color;

        // Ensure the correct answer is always included
        const otherColors = this.colors.filter(c => c.name !== displayColor.name);
        const randomOthers = otherColors.sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [displayColor, ...randomOthers].sort(() => Math.random() - 0.5);

        const buttonsContainer = document.getElementById('colorGameButtons');
        buttonsContainer.innerHTML = '';

        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'color-game__button';
            button.innerHTML = `<span>${option.name}</span>`;
            button.addEventListener('click', () => {
                // Only allow clicks if game is running
                if (this.gameInterval !== null) {
                    this.checkAnswer(option.name);
                }
            });
            buttonsContainer.appendChild(button);
        });
    }

    checkAnswer(answer) {
        if (answer === this.currentQuestion) {
            this.score++;
            document.getElementById('colorScore').textContent = this.score;
            this.nextQuestion();
        } else {
            GameNotification.show('Yanlış rəng seçdiniz', 'error', 4000, 'Yanlış cavab!');
            this.shakeDisplay();
            this.nextQuestion();
        }
    }

    shakeDisplay() {
        const display = document.getElementById('colorGameDisplay');
        display.classList.add('shake');
        setTimeout(() => {
            display.classList.remove('shake');
        }, 500);
    }

    gameOver() {
        clearInterval(this.gameInterval);
        this.gameInterval = null;
        GameNotification.show(`Oyun Bitdi! Xalınız: ${this.score}`, 'info');

        // Show overlay for restart
        const overlay = document.getElementById('colorOverlay');
        if (overlay) overlay.classList.remove('is-hidden');
    }

    reset() {
        this.score = 0;
        this.timeLeft = 30;
        document.getElementById('colorScore').textContent = '0';
        document.getElementById('colorTime').textContent = '30';

        // Show overlay
        const overlay = document.getElementById('colorOverlay');
        if (overlay) overlay.classList.remove('is-hidden');
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize games only if their DOM exists (safe on any page)
    const gameSelectors = ['#snakeGame', '#memoryGame', '#guessInput', '#keyboard', '#reactionGame', '#colorGameButtons'];
    const gamePresent = gameSelectors.some(sel => document.querySelector(sel));

    if (gamePresent) {
        document.body.classList.add('no-scroll');
        window.addEventListener('beforeunload', () => {
            document.body.classList.remove('no-scroll');
        });
        window.addEventListener('keydown', (e) => {
            const blocked = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
            if (blocked.includes(e.key)) e.preventDefault();
        }, { passive: false });
    }

    if (document.getElementById('snakeGame')) {
        new SnakeGame();
    }
    if (document.getElementById('memoryGame')) {
        new MemoryGame();
    }
    if (document.getElementById('guessGame')) {
        new GuessNumberGame();
    }
    if (document.getElementById('wordGame')) {
        new WordGuessGame();
    }
    if (document.getElementById('reactionGame')) {
        new ReactionGame();
    }
    if (document.getElementById('colorGame')) {
        new ColorMatchGame();
    }
});

