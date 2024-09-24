document.addEventListener('DOMContentLoaded', function() {
    // Hämta gruppnamn från URL eller Local Storage och visa det
    const groupName = localStorage.getItem('selectedGroupName') || "Ingen grupp vald";
    document.getElementById('groupNameHeader').textContent = groupName;
    document.getElementById('groupName').value = groupName; // Dölja gruppnamn i formuläret

    // Skapa träningspass
    const trainingSessionForm = document.getElementById('trainingSessionForm');
    if (trainingSessionForm) {
        trainingSessionForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Förhindra att sidan laddas om

            const sessionName = document.getElementById('sessionName').value; // Hämta träningspass namn
            const sessionDate = document.getElementById('sessionDate').value; // Hämta datum
            const groupName = document.getElementById('groupName').value; // Hämta gruppnamn

            if (sessionName && sessionDate && groupName) {
                const existingSessions = JSON.parse(localStorage.getItem('trainingSessions')) || [];
                const newSession = {
                    name: sessionName,
                    date: sessionDate,
                    group: groupName,
                    createdBy: localStorage.getItem('loggedInUser') // Hämta inloggad användare
                };
                existingSessions.push(newSession);
                localStorage.setItem('trainingSessions', JSON.stringify(existingSessions));

                // Visa träningspass
                loadTrainingSessions();
                trainingSessionForm.reset(); // Återställ formuläret
            } else {
                console.error('Något värde saknas!');
            }
        });
    }

    // Visa träningspass
    loadTrainingSessions();

    function loadTrainingSessions() {
        const sessionsList = document.getElementById('sessionsList');
        sessionsList.innerHTML = ''; // Rensa befintliga poster

        const existingSessions = JSON.parse(localStorage.getItem('trainingSessions')) || [];
        existingSessions.forEach(session => {
            if (session.group === groupName) {
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
