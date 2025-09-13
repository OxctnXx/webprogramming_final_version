// Fetch questions from the database and render them
async function fetchAndRenderQuestions() {
    try {
        const response = await fetch('/getQuestions'); // Endpoint to fetch questions
        const questionBank = await response.json();

        // Group questions and apply the special options for the last two questions in each group
        const groupedQuestions = questionBank.reduce((groups, question) => {
            if (!groups[question.alias]) groups[question.alias] = [];
            groups[question.alias].push(question);
            return groups;
        }, {});

        const questions = [];
        for (const alias in groupedQuestions) {
            const group = groupedQuestions[alias];
            group.forEach((question, index) => {
                questions.push({
                    ...question,
                    options: index >= group.length - 2
                        ? [
                            { value: -1.5, text: "선택지 1" },
                            { value: -0.8, text: "선택지 2" },
                            { value: null, text: "선택지 3 (NULL)" },
                            { value: 0.9, text: "선택지 4" },
                            { value: 1.7, text: "선택지 5" }
                        ]
                        : [
                            { value: -2, text: "선택지 1" },
                            { value: -1, text: "선택지 2" },
                            { value: null, text: "선택지 3 (NULL)" },
                            { value: 1, text: "선택지 4" },
                            { value: 2, text: "선택지 5" }
                        ]
                });
            });
        }

        // Shuffle and render questions
        renderQuestions(questions.sort(() => Math.random() - 0.5));
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

// Modify the renderQuestions function to accept the question list as a parameter
function renderQuestions(questions) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // Clear existing questions

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${index + 1}. ${question.name}</p>
            ${question.options.map((opt) => `
                <label>
                    <input type="radio" name="${question.name}" value="${opt.value}" onchange="handleAnswerChange('${question.name}', ${opt.value})">
                    ${opt.text}
                </label><br>
            `).join('')}`;
        quizContainer.appendChild(questionDiv);
    });
}

// On page load
window.onload = fetchAndRenderQuestions;
