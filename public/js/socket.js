let atmID = 0;
let webID = 0;

const socket = io(); // SOCKET.IO

// On submit button click, get information about the user who is sending a message
document.querySelector('.send-message').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get id of message recipient
    webID = document.location.href.split('/');
    webID = webID[webID.length - 1].split('#')[0];
    if (webID.includes('?')) {
        webID = webID.split('?')[0];
    }

    // Get id of current user
    atmID = document
        .querySelector('#send-message-btn')
        .getAttribute('user-data');

    // If there is no message, do not continue
    if (document.querySelector('#message').value.trim() === '') {
        return;
    }
    // Emit the following information
    socket.emit('new message', {
        message: document.querySelector('#message').value,
        from: atmID,
        to: webID
    });
});

// Socket on taking in the information from the emit
socket.on('new message', (data) => {
    // Message text content
    const message = data.message;
    // Ids of sender and recipient
    const fromUserId = data.from;
    const toUserId = data.to;
    // Get id of the user currently logged in (across all users on the page)
    const sendUserId = document
        .querySelector('#send-message-btn')
        .getAttribute('user-data');
    // Get id of the recipient (across all users on the page)
    let webUrlPage = document.location.href.split('/');
    webUrlPage = webUrlPage[webUrlPage.length - 1].split('#')[0];
    if (webUrlPage.includes('?')) {
        webUrlPage = webUrlPage.split('?')[0];
    }

    // Live update of the recent message display
    const currentMsgList = document.querySelector('#recent-list');

    if (fromUserId == sendUserId) {
        let toRecentChatDiv = document.querySelector(`#user-${toUserId}`);
        // if div exists remove before adding to page
        if (toRecentChatDiv) {
            toRecentChatDiv.parentElement.removeChild(toRecentChatDiv);
        }
        // If the message is sent by current user
        let toNewRecentChatDiv = document.createElement('li');
        toNewRecentChatDiv.setAttribute('id', `user-${toUserId}`);

        toNewRecentChatDiv.innerHTML = `<a href="/chat/${toUserId}"><div><h3 class="name">
        ${document.querySelector('.chatter-name').textContent}
        </h3><span class="latest-message">${message}</span></div></a>`;

        currentMsgList.insertBefore(toNewRecentChatDiv, currentMsgList.children[0]);

        // Put on top of the list
    } else if (toUserId == sendUserId) {
        let fromRecentChatDiv = document.querySelector(`#user-${fromUserId}`);
        // if div exists remove before adding to page
        if (fromRecentChatDiv) {
            fromRecentChatDiv.parentElement.removeChild(fromRecentChatDiv);
        }
        // If the message is sent by current user
        let fromNewRecentChatDiv = document.createElement('li');
        fromNewRecentChatDiv.setAttribute('id', `user-${fromUserId}`);

        fromNewRecentChatDiv.innerHTML = `<a href="/chat/${fromUserId}"><div><h3 class="name">
        ${document.querySelector('.chatter-name').textContent}
        </h3><span class="latest-message">${message}</span></div></a>`;

        currentMsgList.insertBefore(fromNewRecentChatDiv, currentMsgList.children[0]);
    }


    // Live update of messages
    if (
        // If message is sent by current user AND the recipient is in the url
        (fromUserId == sendUserId && toUserId == webUrlPage) ||
        // OR message is sent by the user in the page url AND the recipient is current user
        (fromUserId == webUrlPage && toUserId == sendUserId)
    ) {
        // Gets class name for message display depending on who sent/received
        const messageClass = (sendUserId, fromUserId) => {
            if (sendUserId != fromUserId) {
                return 'received';
            }
            return 'sent';
        };
        // Get time at message send
        function msgTime() {
            return new Date().toLocaleString('en-US', {
                hour12: true,
                hourCycle: 'h12',
                hour: 'numeric',
                minute: '2-digit'
            });
        }

        // Create list element with the message and send time
        let messageLi = document.createElement('li');
        messageLi.className = messageClass(sendUserId, fromUserId);
        messageLi.innerHTML = `<div class="message">${message}</div>
      <p class="timeSent">${msgTime()}</p>`;

        // Append to chat messages list
        document.querySelector('#chat-messages').appendChild(messageLi);

        // Clear message input text box
        document.querySelector('#message').value = '';
    }
    // Reset atmID and pageId once message is sent and page displays message
    atmID = 0;
    webID = 0;
});