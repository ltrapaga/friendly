async function randomUserId() {

    const liveUserId = parseInt(
        document.querySelector('#random-btn').getAttribute('user-data')
    );

    fetch('/api/users')
        .then((res)=> {
            return res.json();
        })
        .then((allUsers) => {
        const allUsersArray = [];
        
        allUsers.forEach((user) => {
            if (user.id !== liveUserId) {
                allUsersArray.push(user.id);
            }
        });

        recentMessages(allUsersArray);
    })
}

async function recentMessages(allUsersArray) {
    fetch('/api/messages/recent', {
        method: 'Get'
    })
    .then((userResponse) => userResponse.json())
    .then((data) => {
        if (data.length > 0) {
            data.forEach((user) => {
            if (allUsersArray.includes(user.id)) {
                allUsersArray.splice(allUsersArray.indexOf(user.id), 1);
            }
        });
    }
    const otherUserId = Math.floor(Math.random() * allUsersArray.length);

    document.location.replace(`/chat/${allUsersArray[otherUserId]}`);
    });
}

document.getElementById('random-btn').addEventListener('click', randomUserId)