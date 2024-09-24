document.addEventListener('DOMContentLoaded', function() {
    // Skapa konto
    const createAccountForm = document.getElementById('createAccountForm');
    if (createAccountForm) {
        createAccountForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Förhindra att sidan laddas om

            const email = document.getElementById('email').value;
            localStorage.setItem('loggedInUser', email); // Spara användarens e-post

            // Omdirigera till skapa grupp-sidan
            window.location.href = 'create-group.html'; 
        });
    }

    // Skapa träningsgrupp
    const groupForm = document.getElementById('groupForm');
    if (groupForm) {
        groupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Förhindra att sidan laddas om

            const groupName = document.getElementById('groupName').value;
            const loggedInUser = localStorage.getItem('loggedInUser'); // Hämta den inloggade användarens e-post

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
    }

    // Visa grupper
    const groupListElement = document.getElementById('groupList');
    if (groupListElement) {
        const existingGroups = JSON.parse(localStorage.getItem('groups')) || [];
        
        existingGroups.forEach(group => {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
                <td>${group.name}</td>
                <td>${group.createdBy}</td>
                <td><button onclick="selectGroup('${group.name}')">Visa</button></td>
            `;
            groupListElement.appendChild(listItem);
        });
    }

    // Hantera gruppdetaljer
    const groupNameHeader = document.getElementById('groupNameHeader');
    const groupNameInput = document.getElementById('groupName');
    if (groupNameHeader && groupNameInput) {
        const selectedGroupName = localStorage.getItem('selectedGroupName');
        groupNameHeader.textContent = selectedGroupName;
        groupNameInput.value = selectedGroupName; // Sätta dolda input
    }

    // Skapa träningspass
    const trainingSessionForm = document.getElementById('trainingSessionForm');
    if (trainingSessionForm) {
        trainingSessionForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Förhindra att sidan laddas om

            const sessionName = document.getElementById('sessionName').value; // Hämta träningspass namn
            const sessionDate = document.getElementById('sessionDate').value; // Hämta datum
            
            const existingSessions = JSON.parse(localStorage.getItem('trainingSessions')) || [];
            const newSession = {
                name: sessionName,
                date: sessionDate,
                group: groupNameInput.value,
                createdBy: localStorage.getItem('loggedInUser') // Hämta inloggad användare
            };
            existingSessions.push(newSession);
            localStorage.setItem('trainingSessions', JSON.stringify(existingSessions));

            // Visa träningspass
            loadTrainingSessions();
            trainingSessionForm.reset(); // Återställ formuläret
        });
    }

    // Visa träningspass
    function loadTrainingSessions() {
        const sessionsList = document.getElementById('sessionsList');
        sessionsList.innerHTML = ''; // Rensa befintliga poster

        const existingSessions = JSON.parse(localStorage.getItem('trainingSessions')) || [];
        existingSessions.forEach(session => {
            if (session.group === groupNameInput.value) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${session.name}</td>
                    <td>${session.date}</td>
                    <td>${session.group}</td>
                    <td>${session.createdBy}</td>
                `;
                sessionsList.appendChild(row);
            }
        });
    }

});

// Funktion för att välja grupp
function selectGroup(groupName) {
    localStorage.setItem
