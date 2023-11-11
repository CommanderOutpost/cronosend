const form = document.querySelector('form');

const user = JSON.parse(localStorage.getItem('user'));
const room = {};

form.addEventListener('submit', handleCreateForm)

function handleCreateForm(e) {
    e.preventDefault();
    const formData = new FormData(form);
    user['type'] = 'owner';
    room['group-name'] = formData.get('group-name');
    room['max-users'] = formData.get('max-users');
    window.location.href = '/room';
}