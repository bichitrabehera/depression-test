function toggleMenu() {
    const sidebar = document.getElementById("mobile-sidebar");
    sidebar.classList.toggle("active");
}

function closeMenu() {
    const sidebar = document.getElementById("mobile-sidebar");
    sidebar.classList.remove("active");
}
let answers = [];

function selectAnswer(value, nextQuestionId) {
    answers.push(value);
    const currentQuestion = document.getElementById('q' + answers.length);
    currentQuestion.style.display = 'none';
    setTimeout(() => {
        if (nextQuestionId === 'submit') {
            calculateScore();
        } else {
            const nextQuestion = document.getElementById('q' + nextQuestionId);
            nextQuestion.style.display = 'block';
        }
    }, 400);
}

function calculateScore() {
    // Calculate the total score
    const totalScore = answers.reduce((total, value) => total + value, 0);

    // Hide the questions container
    const questionsContainer = document.querySelector('#depressionTestForm');
    questionsContainer.style.display = 'none';

    // Show the result container
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.style.display = 'block';

    // Insert the total score into the result section
    const resultCont = document.getElementById('result');
    resultCont.innerHTML = `<strong>Result:</strong> ${totalScore}`;

    // Determine the content based on the score
    let resultContent = '';
    if (totalScore <= 5) {
        resultContent = `
            <h4>Minimal Symptoms (Score: 0-5)</h4>
            <p>You’re doing great! Here are some gentle ways to keep your spirit lifted:</p>
            <ul>
                <li>Start your day with a moment of gratitude—it helps set a positive tone.</li>
                <li>Even a short walk can give you a boost—little steps make a big difference.</li>
                <li>Catch up with someone you trust, even if it’s just for a quick chat.</li>
                <li>Prioritize rest—good sleep helps your mind and body feel refreshed.</li>
            </ul>
        `;
    } else if (totalScore <= 10) {
        resultContent = `
            <h4>Mild Symptoms (Score: 6-10)</h4>
            <p>You’re taking the right steps by reaching out. Here are a few ways to nurture yourself:</p>
            <ul>
                <li>Try a few minutes of meditation or deep breathing to help ease your mind.</li>
                <li>Unwind by putting your phone away before bed—good rest is essential.</li>
                <li>Do something you love, whether it’s reading, cooking, or even a creative project.</li>
                <li>Journaling can be a peaceful way to express what you're feeling inside.</li>
            </ul>
        `;
    } else if (totalScore <= 15) {
        resultContent = `
            <h4>Moderate Symptoms (Score: 11-15)</h4>
            <p>Your score suggests you're going through a tough time. Here are a few things that may help:</p>
            <ul>
                <li>Set small, manageable goals—each step counts.</li>
                <li>Reach out to friends, family, or a support group—they can help.</li>
                <li>Try creative outlets like writing or music to express your feelings.</li>
                <li>If you’re struggling, don’t hesitate to speak to a professional for extra support.</li>
            </ul>
        `;
    } else {
        resultContent = `
            <h4>Severe Symptoms (Score: 16+)</h4>
            <p>Your score indicates severe depressive symptoms. Here are some immediate steps to consider:</p>
            <ul>
                <li>Talk to a mental health professional—they can guide you through this.</li>
                <li>Reach out to someone you trust, like a friend or family member.</li>
                <li>Focus on building a self-care routine with healthy habits.</li>
                <li>Stay connected with others, even if it's just small interactions.</li>
            </ul>
        `;
    }

    // Append the results content without overwriting the disclaimer
    const resultContentContainer = document.createElement('div');
    resultContentContainer.innerHTML = resultContent;
    resultContainer.appendChild(resultContentContainer);

    // Display motivational content (if required)
    const motivationParas = document.getElementsByClassName('motivation');
    Array.from(motivationParas).forEach((para) => {
        para.style.display = 'block';
    });
}
