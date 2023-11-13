const form = document.querySelector('form');

const user = JSON.parse(localStorage.getItem('user'));

form.addEventListener('submit', handleJoinForm)

async function handleJoinForm(e) {
    e.preventDefault();
    const formData = new FormData(form);
    user['type'] = 'joiner';
    user['roomJoined'] = formData.get('room-name');

    console.log(user);
    const userToServer = await sendUserToServer(user);
    window.location.href = '/room';
}

async function sendUserToServer(newUser) {
    try {
        const response = await fetch('api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: newUser })
        })

        if (response.ok) {
            return await response.json();
        }

        throw new Error('Response failed!');
    } catch (error) {
        console.error(error);
    }
}