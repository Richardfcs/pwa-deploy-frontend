const API_URL = 'https://pwa-deploy-backend.onrender.com/api/complaints';

document.getElementById('complaintForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titleVac = document.getElementById('titleVac').value;
    const dateVac = document.getElementById('dateVac').value;
    const localVac = document.getElementById('localVac').value;
    const hourVac = document.getElementById('hourVac').value;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titleVac, dateVac, localVac, hourVac })
    });

    const complaint = await response.json();
    appendComplaint(complaint);

    document.getElementById('titleVac').value = '';
    document.getElementById('dateVac').value = '';
    document.getElementById('localVac').value = '';
    document.getElementById('hourVac').value = '';

});

async function loadComplaints() {
    const response = await fetch(API_URL);
    const complaints = await response.json();
    complaints.forEach(appendComplaint);
}

function appendComplaint(complaint) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${complaint.titleVac}</strong>
        <p>${complaint.dateVac}</p>
        <p>${complaint.localVac}</p>
        <p>${complaint.hourVac}</p>
        <button onclick="deleteComplaint('${complaint._id}')">Deletar</button>
    `;
    document.getElementById('complaintsList').appendChild(li);
}

async function deleteComplaint(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    document.location.reload();
}

loadComplaints();
