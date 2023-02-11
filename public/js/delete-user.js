async function deleteTheUser() {
    // creating a logout button for the User
    const logoutButton = document.getElementById('logout-btn');

    // creating a button to generate randomization of a new friend
    const liveUserId = parseInt(
        document.querySelector('#random-btn').getAttribute('user-data')
    );

    // fetching api to delete user
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
// creating a delete button for the User
document.querySelector('#delete-btn').addEventListener('click', deleteTheUser)