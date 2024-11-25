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
        const score = parseInt(urlParams.get('score')); 
        const scoreDisplay = document.getElementById('scoreDisplay');
        const tipsContainer = document.getElementById('tips');

        
        if (!isNaN(score)) {
            scoreDisplay.innerHTML = `<h2>Your Score: ${score}</h2>`;
            showTips(score);
        } else {
            scoreDisplay.innerHTML = `<h2>Score not available</h2>`;
        }

        function showTips(score) {
            let tips = '';

            if (score >= 0 && score <= 5) {
                tips = `
                    <h2>Minimal Symptoms (Score: 0-5)</h2>
                    <p>Your score suggests minimal depressive symptoms. Here are some general mental health maintenance tips:</p>
                    <ul>
                        <li>Practice daily gratitude by jotting down three things you’re thankful for.</li>
                        <li>Engage in regular physical activity to boost mood and energy levels.</li>
                        <li>Maintain social connections by spending quality time with friends and family.</li>
                        <li>Ensure good sleep hygiene by keeping a consistent sleep schedule.</li>
                    </ul>
                `;
            } else if (score >= 6 && score <= 10) {
                tips = `
                    <h2>Mild Symptoms (Score: 6-10)</h2>
                    <p>Your score suggests mild depressive symptoms. Here are some self-care strategies to consider:</p>
                    <ul>
                        <li>Incorporate mindfulness practices, such as meditation or deep breathing exercises, into your routine.</li>
                        <li>Limit screen time, especially before bed, to improve sleep quality.</li>
                        <li>Engage in a hobby or activity you enjoy, such as cooking, reading, or gardening.</li>
                        <li>Consider journaling to help process emotions and thoughts.</li>
                    </ul>
                `;
            } else if (score >= 11 && score <= 15) {
                tips = `
                    <h2>Moderate Symptoms (Score: 11-15)</h2>
                    <p>Your score suggests moderate depressive symptoms. These strategies may be beneficial:</p>
                    <ul>
                        <li>Try setting small, achievable goals to help build momentum and a sense of accomplishment.</li>
                        <li>Seek support from a friend, family member, or mental health support group.</li>
                        <li>Explore creative outlets such as drawing, writing, or playing music to express your feelings.</li>
                        <li>Consider reducing caffeine and alcohol intake, which can impact mood and sleep.</li>
                        <li>If symptoms persist, consider reaching out to a mental health professional for additional guidance.</li>
                    </ul>
                `;
            } else if (score >= 16) {
                tips = `
                    <h2>Severe Symptoms (Score: 16+)</h2>
                    <p>Your score suggests severe depressive symptoms. Here are some recommended steps:</p>
                    <ul>
                        <li>Reach out to a mental health professional, such as a therapist or counselor, for support and guidance.</li>
                        <li>Consider talking to a trusted friend or family member about how you're feeling.</li>
                        <li>Establish a self-care routine with healthy habits like balanced eating and consistent sleep.</li>
                        <li>Avoid isolating yourself; try to maintain some social interactions if possible.</li>
                        <li>Remember that you're not alone, and reaching out for help is a positive step forward.</li>
                    </ul>
                `;
            } else {
                tips = `<p>Score not in range. Please retake the assessment.</p>`;
            }

            tipsContainer.innerHTML = tips;
        }