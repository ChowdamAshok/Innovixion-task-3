alert("Quiz Instructions:\n\n1. Total Questions: The quiz includes 10 questions.\n2. Options: Each question has 4 options (A, B, C, and D), with only one correct answer.\n3. Scoring: Each correct answer awards 1 mark, making the total score out of 10 marks.\n4. Answering: Choose the option you believe is correct for each question. Only one answer is allowed per question.\n5. No Negative Marking: There is no penalty for incorrect answers; attempt all questions.\n6. Time Limit: Complete the quiz within the given time limit of time.\n7. Submission: Submit your quiz once you've answered all questions.\n8. Results:After the submtion,Results will be announced.\n9. Honesty Policy: Maintain integrity by not seeking external help or communicating with others during the quiz.\n\nGood luck, and enjoy the quiz!");

const questions = [
    {
      question: "What is the capital of France?",
      options: ["A.Paris", "B.London", "C.Berlin", "D.Rome"],
      answer: "A.Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["A.Earth", "B.Mars", "C.Jupiter", "D.Saturn"],
      answer: "B.Mars"
    },
    {
      question:"FFC stands for",
      options:["A.Foreign Finance Corporation", "B.Film Finance Corporation","C.Federation of Football Council","D.None of the above"],
      answer: "B.Film Finance Corporation"
    },
    {
      question:"Golf player Vijay Singh belongs to which country?",
      options:["A.USA","B.Fiji","C.India","D.UK"],
      answer: "B.Fiji"
    },
    {
      question:"First China War was fought between",
      options:["A.China and Britain","B.China and France","C.China and Egypt","D.China and Greek"],
      answer: "A.China and Britain"
    },
    {
      question:"During World War II, when did Germany attack France?",
      options:["A.1940","B.1941","C.1942","D.1943"],
      answer: "A.1940"
    },
    {
      question:"The ozone layer restricts",
      options:["A.Visible light","B.Infrared radiation","C.X-rays and gamma rays","D.Ultraviolet radiation"],
      answer:"D.Ultraviolet radiation"
    },
    {
      question:"Coral reefs in India can be found in",
      options:["A.The coast of Orissa","B.Waltair","C.Rameshwaram","D.Trivandrum"],
      answer:"C.Rameshwaram"
    },
    {
      question:"'Natya - Shastra' the main source of India's classical dances was written by",
      options:["A.Nara Muni","B.Bharat Muni","C.Abhinav Gupt","D.Tandu Muni"],
      answer:"B.Bharat Muni"
    },
    {
      question:"Dandia' is a popular dance of",
      options:["A.Punjab,","B.Gujarat","C.Tamil Nadu","D.Maharashtra"],
      answer:"B.Gujarat"

    }

   
  ];
  
  let userAnswers = [];
  let timer;
  
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const resultText = document.getElementById("result-text");
  const buttonsContainer = document.getElementById("buttons-container");
  
  function displayQuestion(questionIndex) {
    const currentQuizQuestion = questions[questionIndex];
    questionText.textContent = currentQuizQuestion.question;
    optionsContainer.innerHTML = "";
    clearTimeout(timer); 
    startTimer(questionIndex);
    currentQuizQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => {
        if (!userAnswers[questionIndex]) {
          userAnswers[questionIndex] = option;
          optionElement.classList.add(
            option === currentQuizQuestion.answer ? "correct" : "incorrect"
          );
          optionElement.classList.add("selected"); 
          clearTimeout(timer);
          setTimeout(() => {
            nextQuestion(questionIndex);
          }, 1000); 
        }
      });
      optionsContainer.appendChild(optionElement);
    });
  }
  
  function startTimer(questionIndex) {
    let timeLeft = 10; 
    const timerElement = document.createElement("div");
    timerElement.classList.add("timer");
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;
    optionsContainer.appendChild(timerElement);
  
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft} seconds`;
      if (timeLeft === 0) {
        clearTimeout(timer);
        nextQuestion(questionIndex);
      }
    }, 1000); 
  }
  
  function nextQuestion(questionIndex) {
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      displayQuestion(nextQuestionIndex);
    } else {
      showResult();
      document.getElementById("submit-btn").style.display = "block"; 
      document.getElementById("skip-btn").style.display = "none";
      document.getElementById("restart-btn").style.display = "block";
    }
  }
  
  function showResult() {
    questionText.textContent = "";
    optionsContainer.innerHTML = "";
    resultText.innerHTML = "";
  
    let totalMarks = 0;
    userAnswers.forEach((userAnswer, index) => {
      const question = questions[index];
      const resultElement = document.createElement("div");
      resultElement.classList.add("result-item");
  
      const questionText = document.createElement("p");
      questionText.textContent = `${index + 1}. ${question.question}`;
      resultElement.appendChild(questionText);
  
      const userAnswerText = document.createElement("p");
      userAnswerText.textContent = `Your answer: ${userAnswer || "Not answered"}`;
      resultElement.appendChild(userAnswerText);
  
      const correctAnswerText = document.createElement("p");
      correctAnswerText.textContent = `Correct answer: ${question.answer}`;
      resultElement.appendChild(correctAnswerText);
  
      const marksText = document.createElement("p");
      if (userAnswer && userAnswer === question.answer) {
        marksText.textContent = `Marks: +1`;
        marksText.classList.add("correct-answer");
        totalMarks++;
      } else {
        marksText.textContent = `Marks: 0`;
        marksText.classList.add("incorrect-answer");
      }
      resultElement.appendChild(marksText);
  
      resultText.appendChild(resultElement);
    });
  
    const totalMarksText = document.createElement("p");
    totalMarksText.textContent = `Total Marks: ${totalMarks} out of ${questions.length}`;
    resultText.appendChild(totalMarksText);
  
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.classList.add("btn");
    restartButton.addEventListener("click", () => {
      userAnswers = [];
      resultText.style.display = "none";
      buttonsContainer.style.display = "block";
      document.getElementById("submit-btn").style.display = "block"; 
      displayQuestion(0);
    });
    resultText.appendChild(restartButton);
  
    resultText.style.display = "block";
    buttonsContainer.style.display = "none";
  }
  
  // Event listeners for buttons
  document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "block";
    document.getElementById("skip-btn").style.display = "block";
    document.getElementById("quit-btn").style.display = "block";
    document.getElementById("question-container").style.display = "block";
    displayQuestion(0);
  });
  
  document.getElementById("submit-btn").addEventListener("click", () => {
    const nextQuestionIndex = userAnswers.length;
    if (nextQuestionIndex < questions.length) {
      displayQuestion(nextQuestionIndex);
    } else {
      showResult();
      document.getElementById("submit-btn").style.display = "none";
      document.getElementById("skip-btn").style.display = "none";
      document.getElementById("restart-btn").style.display = "block";
      document.getElementById("quit-btn").style.display="block";
    }
  });
  
  document.getElementById("skip-btn").addEventListener("click", () => {
    const nextQuestionIndex = userAnswers.length;
    userAnswers[nextQuestionIndex] = null;
    if (nextQuestionIndex < questions.length) {
      displayQuestion(nextQuestionIndex);
    }
  });
  
  document.getElementById("restart-btn").addEventListener("click", () => {
    userAnswers = [];
    resultText.style.display = "none";
    buttonsContainer.style.display = "block";
    document.getElementById("submit-btn").style.display = "block"; // Show submit button after restarting the quiz
    displayQuestion(0);
  });
  document.getElementById('quit-btn').addEventListener('click', function() {
    alert('Thank you for participating in the quiz.');
    window.close(); 
});
