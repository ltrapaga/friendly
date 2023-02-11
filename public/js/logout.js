async function logoutUser() {
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

document.querySelector('logout-btn').addEventListener('click', logoutUser)