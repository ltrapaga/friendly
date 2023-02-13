let atmId = 0;
let webId = 0;

const socket = io(); 

// after clicking the submit button, the user will obtain information of the other user
document.querySelector('.send-message').addEventListener('submit', (event) => {
    event.preventDefault();

    // obtaining id of the recipient
    webId = document.location.href.split('/');
    webId = webId[webId.length - 1].split('#')[0];
    if (webId.includes('?')) {
        webId = webId.split('?')[0];
    }

    // obtaining id of the current user
    atmId = document
        .querySelector('#send-message-btn')
        .getAttribute('user-Data');

    if (document.querySelector('#message').value.trim() === '') {
        return;
    }
    // Emitting informtation
    socket.emit('new message', {
        message: document.querySelector('#message').value,
        from: atmId,
        to: webId
    });
});

socket.on('new message', (data) => {
    // content of messages
    const message = data.message;
    const fromUserId = data.from;
    const toUserId = data.to;
    const sendUserId = document
        .querySelector('#send-message-btn')
        .getAttribute('user-Data');

    let webUrlPage = document.location.href.split('/');
    webUrlPage = webUrlPage[webUrlPage.length - 1].split('#')[0];

    if (webUrlPage.includes('?')) {
        webUrlPage = webUrlPage.split('?')[0];
    }

    // live interaction of messages between users
    const currentMsgList = document.querySelector('#recentUserList');

    if (fromUserId == sendUserId) {
        let toChatUser = document.querySelector(`#user-${toUserId}`);
        // remove div before added to the webpage
        if (toChatUser) {
            toChatUser.parentElement.removeChild(toChatUser);
        }

        let newToChatUser = document.createElement('li');
        newToChatUser.setAttribute('id', `user-${toUserId}`);

        newToChatUser.innerHTML = `<a href="/chat/${toUserId}"><div><h3 class="name">
        ${document.querySelector('.chatter-name').textContent}
        </h3><span class="latest-message">${message}</span></div></a>`;

        currentMsgList.insertBefore(newToChatUser, currentMsgList.children[0]);

        // Put at topmost list 
    } else if (toUserId == sendUserId) {
        let fromChatUser = document.querySelector(`#user-${fromUserId}`);
        // remove div before added to the webpage
        if (fromChatUser) {
            fromChatUser.parentElement.removeChild(fromChatUser);
        }
  
        let newFromChatUser = document.createElement('li');
        newFromChatUser.setAttribute('id', `user-${fromUserId}`);

        newFromChatUser.innerHTML = `<a href="/chat/${fromUserId}"><div><h3 class="name">
        ${document.querySelector('.chatter-name').textContent}
        </h3><span class="latest-message">${message}</span></div></a>`;

        currentMsgList.insertBefore(newFromChatUser, currentMsgList.children[0]);
    }



    if (
        (fromUserId == sendUserId && toUserId == webUrlPage) || (fromUserId == webUrlPage && toUserId == sendUserId)
    ) {
        // received vs sent display
        const classMsg = (sendUserId, fromUserId) => {
            if (sendUserId != fromUserId) {
                return 'received';
            }
            return 'sent';
        };
        // time message was sent
        function msgTime() {
            return new Date().toLocaleString('en-US', {
                hour12: true,
                hourCycle: 'h12',
                hour: 'numeric',
                minute: '2-digit'
            });
        }

        // listing message and sent time
        let liMsg = document.createElement('li');
        liMsg.className = classMsg(sendUserId, fromUserId);
        liMsg.innerHTML = `<div class="message">${message}</div>
      <p class="timeSent">${msgTime()}</p>`;

        document.querySelector('#chatMsg').appendChild(liMsg);

        // Clear messages
        document.querySelector('#message').value = '';
    }
    // Resettting atmId and webId once the message is sent and the page shows the message
    atmId = 0;
    webId = 0;
});