document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindra att sidan laddas om

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Här kan vi senare lägga till logik för att spara användarinformation, t.ex. i en databas.
        // För nu simulerar vi en lyckad registrering.
        document.getElementById('message').innerText = `Konto skapat för ${email}!`;
    });
});
