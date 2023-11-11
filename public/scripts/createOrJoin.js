const userUsername = document.querySelector('#user-username');
const user = JSON.parse(localStorage.getItem('user'));

userUsername.innerHTML = user['username'];
