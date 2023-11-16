const roomNameElement = document.querySelector('#room-name');
const userCountNominator = document.querySelector('#users-count-nominator');
const userCountDenominator = document.querySelector('#users-count-denominator');
const usersDropdown = document.querySelector('#dropdown');
const roomName = localStorage.getItem('roomName');

const getRoomDetails = async () => {
    try {
        const response = await fetch(`api/rooms?roomname=${roomName}`);
        if (response.ok) {
            const responseJson = await response.json();
            return responseJson;
        }

        throw new Error('Request failed!');
    } catch (error) {
        return error;
    }
}

const setRoomDetails = async () => {
    const roomJson = await getRoomDetails();
    roomNameElement.innerHTML = roomJson.roomName;
    userCountNominator.innerHTML = roomJson.currentUsersCount;
    userCountDenominator.innerHTML = roomJson.maxUsers;
    for (let i = 0; i < roomJson.currentUsers.length; i++) {
        const element = roomJson.currentUsers[i];
        const dropdownUser = document.createElement('option');
        dropdownUser.value = element;
        dropdownUser.innerHTML = element;
        usersDropdown.appendChild(dropdownUser);
    }
}

setRoomDetails();
