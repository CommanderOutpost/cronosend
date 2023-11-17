const form = document.querySelector('form');

form.addEventListener('submit', handleSubmitUsername);

// User object
const user = {};

// Function to handle username form by storing it in local storage and going to the next page
function handleSubmitUsername(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const inputedUsername = formData.get('username-input');
    user['username'] = inputedUsername;
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'createorjoin';
}