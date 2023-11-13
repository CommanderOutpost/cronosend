const form = document.querySelector('form');

const user = JSON.parse(localStorage.getItem('user'));

form.addEventListener('submit', handleJoinForm)

async function handleJoinForm(e) {
    e.preventDefault();
    const formData = new FormData(form);
    user['type'] = 'joiner';
    user['roomJoined'] = formData.get('room-name');

    const userToServer = await sendUserToServer(user);
    const updatedRoom = await updateRoom('join');
    localStorage.setItem('roomName', formData.get('room-name'));
    window.location.href = '/room';
}

async function updateRoom(action) {
    try {
        const response = await fetch(`api/rooms?action=${action}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user.username, roomJoined: user.roomJoined })
        });
        if (response.ok) {
            const responseJson = await response.json();
            return responseJson;
        }

        throw new Error('Request failed!');
    } catch (error) {
        return error;
    }
}