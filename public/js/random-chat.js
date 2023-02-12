async function getOtherUserId() {
   
    const currentUserId = parseInt(
      document.querySelector('#random-btn').getAttribute('data-user')
    );
  
    fetch('/api/users')
      .then((res) => {
        return res.json();
      })
      .then((totalUsers) => {
        const usersArray = [];
  
        totalUsers.forEach((user) => {
          if (user.id !== currentUserId) {
            usersArray.push(user.id);
          }
        });
  
        checkCurrentMessages(usersArray);
      });
  }
  
  async function checkCurrentMessages(usersArray) {
    fetch('/api/messages/recent', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
         
          data.forEach((user) => {
         
            if (usersArray.includes(user.id)) {
              usersArray.splice(usersArray.indexOf(user.id), 1);
            }
          });
        }
      
        const randomUserId = Math.floor(Math.random() * usersArray.length);
        // Go to url for that user
        document.location.replace(`/chat/${usersArray[randomUserId]}`);
      });
  }
  
  document.getElementById('random-btn').addEventListener('click', getOtherUserId);