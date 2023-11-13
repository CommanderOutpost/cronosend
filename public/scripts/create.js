const form = document.querySelector('form');

const user = JSON.parse(localStorage.getItem('user'));
const room = {};

form.addEventListener('submit', handleCreateForm)

async function handleCreateForm(e) {
    e.preventDefault();
    const formData = new FormData(form);
    user['type'] = 'creator';
    user['roomOwned'] = formData.get('room-name');

    room['roomName'] = formData.get('room-name');
    room['maxUsers'] = formData.get('max-users');
    room['timer'] = formData.get('timer');
    room['roomOwner'] = user.username;
    room['currentUsersCount'] = 1;
    room['currentUsers'] = [user.username];

    console.log(user, room);
    const userToServer = await sendUserToServer(user);
    const roomToServer = await sendRoomToServer(room);
    // window.location.href = '/room';
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

async function sendRoomToServer(newRoom) {
    try {
        const response = await fetch('api/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ room: newRoom })
        })

        if (response.ok) {
            return await response.json();
        }

        throw new Error('Response failed!');
    } catch (error) {
        console.error(error);
    }
}