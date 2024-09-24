document.addEventListener('DOMContentLoaded', function() {
    // Registreringsformulär
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindra att sidan laddas om

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulera skapande av konto (du kan senare lägga till riktig användarhantering)
        document.getElementById('message').innerText = `Konto skapat för ${email}!`;

        // Omdirigera till dashboard
        window.location.href = 'dashboard.html';
    });
});
