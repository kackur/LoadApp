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

    // Visa grupper på dashboard och group-list
    const groupListElement = document.getElementById('groupList');
    if (groupListElement) {
        const existingGroups = JSON.parse(localStorage.getItem('groups')) || [];
        
        existingGroups.forEach((group, index) => {
            const row = document.createElement('tr');
            const groupNameCell = document.createElement('td');
            const createdByCell = document.createElement('td');
            const actionCell = document.createElement('td'); // Ny cell för åtgärd

            groupNameCell.textContent = group.name;
            createdByCell.textContent = group.createdBy;

            // Skapa "Visa"-knappen
            const viewButton = document.createElement('button');
            viewButton.textContent = 'Visa';
            viewButton.onclick = function() {
                localStorage.setItem('currentGroupIndex', index); // Spara gruppindexet
                window.location.href = 'group-detail.html'; // Navigera till gruppdetaljsidan
            };

            actionCell.appendChild(viewButton); // Lägg till knappen i åtgärdscellen
            row.appendChild(groupNameCell);
            row.appendChild(createdByCell);
            row.appendChild(actionCell); // Lägg till åtgärdscellen i raden
            groupListElement.appendChild(row);
        });
    }
});
