async function deleteTheUser() {
    // acquiring logout button element 
    const logoutButton = document.getElementById('logout-btn');

    // acquiring random button element
    const liveUserId = parseInt(
        document.querySelector('#random-btn').getAttribute('user-data')
    );

    // fetching api to delete user
    const userResponse = await fetch('/api/users/' + liveUserId, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    });

    // function to log out the user once the User account is deleted
    if (userResponse.ok) {
        logoutButton.click();
    } else {
        alert(userResponse.statusText)
    }

}
// acquiring delete button element 
document.querySelector('#delete-btn').addEventListener('click', deleteTheUser)