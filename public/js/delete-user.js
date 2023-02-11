async function deleteTheUser() {
    const logoutButton = document.getElementById('logout-btn');

    const liveUserId = parseInt(
        document.querySelector('#random-btn').getAttribute('user-data')
    );

    const userResponse = await fetch('/api/users/' + liveUserId, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    });

    if (userResponse.ok) {
        logoutButton.click();
    } else {
        alert(userResponse.statusText)
    }

}

document.querySelector('#delete-btn').addEventListener('click', deleteTheUser)