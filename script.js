const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Ramayana'?",
    options: ["Valmiki", "Tulsidas", "Kalidas", "Kabir"],
    answer: "Valmiki"
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What is 7 + 5?",
    options: ["10", "11", "12", "13"],
    answer: "12"
  }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timer;
let timeLeft = 15;


function loadQuestion() {
  if (!document.getElementById("question")) return;

  const q = questions[currentQuestion];
  document.getElementById("question").textContent = `Q${currentQuestion + 1}: ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  selectedOption = null;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectOption(btn, option);
    optionsDiv.appendChild(btn);
  });
}function loadQuestion() {
  if (!document.getElementById("question")) return;

  const q = questions[currentQuestion];
  document.getElementById("question").textContent = `Q${currentQuestion + 1}: ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  selectedOption = null;

  // Shuffle the options
  const shuffledOptions = [...q.options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }

  // Render shuffled options
  shuffledOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectOption(btn, option);
    optionsDiv.appendChild(btn);
  });
  startTimer();

function startTimer() {
  timeLeft = 15;
  document.getElementById("time").textContent = timeLeft;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏰ Time's up!");
      nextQuestion();
    }
  }, 1000);
}

}


function selectOption(button, optionText) {
  const allButtons = document.querySelectorAll("#options button");
  allButtons.forEach(btn => {
    btn.classList.remove("selected");
    btn.disabled = false;
  });

  button.classList.add("selected");
  selectedOption = optionText;
}

function nextQuestion() {
    clearInterval(timer);

  if (!selectedOption) {
    alert("Please select an answer!");
    return;
  }

  const correctAnswer = questions[currentQuestion].answer;
  if (selectedOption === correctAnswer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion >= questions.length) {
    localStorage.setItem("quizScore", score);
    window.location.href = "result.html";
  } else {
    loadQuestion();
  }
}

window.onload = loadQuestion;
