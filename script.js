document.addEventListener('DOMContentLoaded', function() {
    // Registreringsformulär
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindra att sidan laddas om

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Kontrollera om kontot redan finns
        if (localStorage.getItem(email)) {
            document.getElementById('message').innerText = 'Det finns redan ett konto med den e-postadressen.';
            return;
        }

        // Spara kontoinformation i localStorage
        localStorage.setItem(email, password);
        document.getElementById('message').innerText = `Konto skapat för ${email}!`;

        // Omdirigera till dashboard
        window.location.href = 'dashboard.html';
    });

    // Inloggningsformulär
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindra att sidan laddas om

        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        // Kontrollera om användaren finns och lösenordet är korrekt
        if (localStorage.getItem(loginEmail) === loginPassword) {
            document.getElementById('message').innerText = 'Inloggning lyckades!';
            
            // Omdirigera till dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html'; // Omdirigera till dashboard
            }, 1000); // Väntar 1 sekund innan omdirigeringen
        } else {
            document.getElementById('message').innerText = 'Fel e-post eller lösenord.';
        }
    });
});
