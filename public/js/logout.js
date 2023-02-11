async function logoutUser() {
    // fetch api to post a user logout
    const userResponse = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'}
    });

    if(userResponse.ok) {
        document.location.replace('/');
    } else {
        alert(userResponse.statusText);
    }
}

// acquiring logout button element then once clicked, the function above will initiate
document.querySelector('logout-btn').addEventListener('click', logoutUser)