async function createNewUser(event) {
  event.preventDefault();

  const first_name = document.querySelector('#register-lastname').value.trim();
  const last_name = document.querySelector('#register-lastname').value.trim();
  const email = document.querySelector('#register-email').value.trim();
  const password = document.querySelector('#register-password').value.trim();
  const gender = document.querySelector('#genders').value.trim();
  const pronouns = document.querySelector('#pronouns').value.trim();
  const bio = document.querySelector('#bio').value.trim();
  const required = [email, password, first_name, last_name, gender, bio];

  if (required === '' || null) {
    alert('Required field missing');
  } else {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        gender,
        pronouns,
        bio,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      logInUser(email, password);
    } else {
      alert(response.statusText);
    }
  }
}

async function logInUser(email, password) {
  const response = await fetch('/api/users/login', {
    method: 'post',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/chat');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.register-form')
  .addEventListener('submit', createNewUser);
