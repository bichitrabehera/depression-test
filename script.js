function calculateScore() {
    let totalScore = 0;
    const numQuestions = 15;

    for (let i = 1; i <= numQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption) {
            totalScore += parseInt(selectedOption.value);
        } else {
            alert(`Please answer question ${i}.`);
            return;
        }
    }

    // Redirect to tips page based on score, passing the score as a query parameter
    if (totalScore <= 5) {
        location.href = `tips.html?score=${totalScore}#minimal-tips`;
    } else if (totalScore <= 10) {
        location.href = `tips.html?score=${totalScore}#mild-tips`;
    } else if (totalScore <= 15) {
        location.href = `tips.html?score=${totalScore}#moderate-tips`;
    } else {
        location.href = `tips.html?score=${totalScore}#severe-tips`;
    }
}


const urlParams = new URLSearchParams(window.location.search);
        const score = urlParams.get('score'); // Get the score parameter from the URL
        const scoreDisplay = document.getElementById('scoreDisplay');

        // Display the score on the page
        if (score !== null) {
            scoreDisplay.innerHTML = `<h2>Your Score: ${score}</h2>`;
        } else {
            scoreDisplay.innerHTML = `<h2>Score not available</h2>`;
        }