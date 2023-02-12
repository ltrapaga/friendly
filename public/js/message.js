async function sendMessage(event) {
  event.preventDefault();

  const text_messages = document.querySelector('#message').value.trim();

  const sender_id = document
    .querySelector('#send-message-btn')
    .getAttribute('data-user');

  let recipient_id = window.location.toString().split('/');
  recipient_id = parseInt(recipient_id[recipient_id.length - 1].split('#')[0]);

  if (text_messages) {
    const res = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        sender_id,
        recipient_id,
        text_messages,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      alert(res.statusText);
    }
  }
}

document.querySelector('.send-message').addEventListener('submit', sendMessage);
