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
    if (!(userToServer instanceof Error)) {
        const updatedRoom = await updateRoom('join', user);
        if (!(updatedRoom instanceof Error)) {
            localStorage.setItem('roomName', updatedRoom.roomName);
            window.location.href = '/room';
        } else {
            console.log(updatedRoom);
        }
    } else {
        console.log(userToServer)
    }
}

console.log(user);

async function updateRoom(action, user) {
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