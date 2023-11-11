const userUsername = document.querySelector('#user-username');
const user = JSON.parse(localStorage.getItem('user'));
const createButton = document.querySelector('#create');
const joinButton = document.querySelector('#join');

createButton.addEventListener('click', () => {
    window.location.href = 'create';
});

joinButton.addEventListener('click', () => {
    window.location.href = 'join';
});

userUsername.innerHTML = user['username'];
