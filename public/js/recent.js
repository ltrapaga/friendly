const recentList = document.querySelector('#recent-list');

async function displayChatList() {
  const response = await fetch('/api/messages/recent', { method: 'GET' });
  const data = await response.json();

  if (data.length > 0) {
    var pageUrl = document.location.href.split('/');
    pageUrl = pageUrl[pageUrl.length - 1].split('#')[0];

    data.forEach((element) => {
      let recents = document.createElement('li');
      recents.setAttribute('id', `user-${element.id}`);

      if (element.id == pageUrl) {
        recents.className = 'selected';
      }

      recents.innerHTML = `<a href="/chat/${element.id}"><div>
      <h3 class="name"> ${
        element.first_name.charAt(0).toUpperCase() + element.first_name.slice(1)
      } ${element.last_name.charAt(0).toUpperCase()}.</h3>
      <span class="latest-message">${element.latest_message}</span>
      </div></a>`;

      recentList.appendChild(recents);
    });
  } else {
    recentList.innerHTML = `<li><div>You have no current messages.</div></li>`;
  }
}

displayChatList().catch(
  (response) =>
    (recentList.innerHTML = `<li class="error-msg"><div>Your message list is unable to display at this time. <button onclick="window.location.reload()" class="error-btn">Refresh the page <i class="fa-solid fa-rotate-right"></i></button></div></li>`)
);
