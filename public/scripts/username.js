const form = document.querySelector('form');

form.addEventListener('submit', handleSubmitUsername);

const user = {};

async function handleSubmitUsername(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const inputedUsername = formData.get('username-input');
    user['username'] = inputedUsername;
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'createorjoin';
}