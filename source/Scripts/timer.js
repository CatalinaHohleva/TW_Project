document.addEventListener('DOMContentLoaded', function() {
    let timeLeft = 300; // 5 minutes
    const timerElement = document.getElementById('timer');
    const timerDescription = document.getElementById('timer-description');
    const errorBox = document.getElementById('error-box');

    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            //errorBox.textContent = 'OTP has expired. Please go back in the process and try again.'; //Please request a new one.
            //errorBox.style.display = 'block';
            //timerElement.textContent = '';
            //timerElement.textContent = 'OTP has expired. Please go back in the process and try again.';
            timerDescription.textContent = 'OTP has expired. Please go back in the process and try again.';
        } else {
            timeLeft -= 1;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
});