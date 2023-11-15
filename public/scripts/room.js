const roomNameElement = document.querySelector('#room-name');
const userCountNominator = document.querySelector('#users-count-nominator');
const userCountDenominator = document.querySelector('#users-count-denominator');
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
}

setRoomDetails();
