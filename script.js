document.addEventListener('DOMContentLoaded', function() {
    // Skapa konto
    const createAccountForm = document.getElementById('createAccountForm');
    if (createAccountForm) {
        createAccountForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Förhindra att sidan laddas om

            const email = document.getElementById('email').value;
            localStorage.setItem('loggedInUser', email); // Spara användarens e-post i localStorage

            // Omdirigera till skapa grupp-sidan
            window.location.href = 'create-group.html'; // Ändrat till create-group.html
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
        
        existingGroups.forEach((group, index) => {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
                <td>${group.name}</td>
                <td>${group.createdBy}</td>
                <td><button onclick="viewGroup(${index})">Visa</button></td>
            `;
            groupListElement.appendChild(listItem);
        });
    }

    // Visa gruppnamn
    const selectedGroup = JSON.parse(localStorage.getItem('selectedGroup'));
    if (selectedGroup) {
        document.getElementById('groupName').textContent = `Grupp: ${selectedGroup.name}`;
        document.getElementById('groupNameDetail').textContent = selectedGroup.name;
    }

    // Lägg till träningspass
    const trainingForm = document.getElementById('trainingForm');
    if (trainingForm) {
        trainingForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Förhindra att sidan laddas om

            const trainingDate = document.getElementById('trainingDate').value;
            const loggedInUser = localStorage.getItem('loggedInUser');

            const existingTrainings = JSON.parse(localStorage.getItem('trainings')) || [];
            const newTraining = {
                date: trainingDate,
                groupName: selectedGroup.name,
                createdBy: loggedInUser
            };
            existingTrainings.push(newTraining);
            localStorage.setItem('trainings', JSON.stringify(existingTrainings));

            // Ladda träningspass
            loadTrainings();
        });
    }

    // Ladda träningspass
    loadTrainings();

    function loadTrainings() {
        const trainingListElement = document.getElementById('trainingList');
        trainingListElement.innerHTML = ''; // Töm tidigare listning

        const existingTrainings = JSON.parse(localStorage.getItem('trainings')) || [];
        
        existingTrainings.forEach(training => {
            if (training.groupName === selectedGroup.name) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${training.date}</td>
                    <td>${training.groupName}</td>
                    <td>${training.createdBy}</td>
                `;
                trainingListElement.appendChild(row);
            }
        });
    }
});

// Navigera tillbaka till dashboard
function goBack() {
    window.location.href = 'dashboard.html'; // Navigera tillbaka till dashboard
}

// Visa gruppsidan
function viewGroup(index) {
    const existingGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const selectedGroup = existingGroups[index];
    localStorage.setItem('selectedGroup', JSON.stringify(selectedGroup));
    window.location.href = 'group-detail.html'; // Navigera till gruppdetaljer
}
