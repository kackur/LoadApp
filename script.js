// Skapa konto
document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindra att sidan laddas om

    const email = document.getElementById('email').value;

    // Spara e-post i localStorage
    localStorage.setItem('loggedInUser', email);

    // Omdirigera till dashboard
    window.location.href = 'dashboard.html'; // Omdirigera till dashboard
});

// Skapa träningsgrupp
document.getElementById('groupForm')?.addEventListener('submit', function(event) {
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

    console.log('Skapar grupp:', newGroup);
    console.log('Alla grupper:', existingGroups);

    // Omdirigera till grupplistan
    window.location.href = 'group-list.html'; // Omdirigera till grupplista
});

// Visa grupper
document.addEventListener('DOMContentLoaded', function() {
    const groupListElement = document.getElementById('groupList');
    const existingGroups = JSON.parse(localStorage.getItem('groups')) || [];

    console.log('Hämtade grupper:', existingGroups);

    existingGroups.forEach(group => {
        const listItem = document.createElement('li');
        listItem.textContent = `Grupp: ${group.name}, Skapad av: ${group.createdBy}`;
        groupListElement.appendChild(listItem);
    });
});
