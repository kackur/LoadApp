document.addEventListener('DOMContentLoaded', function() {
    // Registreringsformulär
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindra att sidan laddas om

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Debug: Logga e-post och lösenord
        console.log('E-post:', email);
        console.log('Lösenord:', password);

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

        // Debug: Logga inloggningsuppgifter
        console.log('Inloggning E-post:', loginEmail);
        console.log('Inloggning Lösenord:', loginPassword);

        // Kontrollera om användaren finns och lösenordet är korrekt
        if (localStorage.getItem(loginEmail) === loginPassword) {
            document.getElementById('message').innerText = 'Inloggning lyckades!';
            
            // Omdirigera till dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html'; // Omdirigera till dashboard
            }, 1000);
        } else {
            document.getElementById('message').innerText = 'Fel e-post eller lösenord.';
        }
    });

   // Skapa träningsgrupp
document.getElementById('groupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindra att sidan laddas om

    const groupName = document.getElementById('groupName').value;
    const loggedInUser = localStorage.getItem('loggedInUser'); // Hämta den inloggade användarens e-post

    // Skapa en ny grupp i localStorage
    const existingGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const newGroup = {
        name: groupName,
        createdBy: loggedInUser // Spara den inloggade användarens e-post
    };
    existingGroups.push(newGroup);
    localStorage.setItem('groups', JSON.stringify(existingGroups));

    // Omdirigera till grupplistan
    window.location.href = 'group-list.html'; // Omdirigera till grupplista
});

    // Visa bekräftelse
    document.getElementById('message').innerText = `Grupp "${groupName}" skapad av ${loggedInUser}!`;

    // Rensa formuläret
    document.getElementById('groupForm').reset();
});

    // Visa grupper
document.addEventListener('DOMContentLoaded', function() {
    const groupListElement = document.getElementById('groupList');
    const existingGroups = JSON.parse(localStorage.getItem('groups')) || [];

    existingGroups.forEach(group => {
        const listItem = document.createElement('li');
        listItem.textContent = `Grupp: ${group.name}, Skapad av: ${group.createdBy}`;
        groupListElement.appendChild(listItem);
    });
});
});
