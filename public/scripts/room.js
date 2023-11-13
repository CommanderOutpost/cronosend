const roomName = document.querySelector('#room-name');
const userCountNominator = document.querySelector('#users-count-nominator');
const userCountDenominator = document.querySelector('#users-count-denominator');

const getRoomDetails = async () => {
    const roomName = localStorage.getItem('roomName');
    try {
        const response = await fetch(`api/rooms?roomname=${roomName}`);
        if (response.ok) {
            const responseJson = await response.json();
            setRoomDetails(responseJson);
        }

        throw new Error('Request failed!');
    } catch (error) {
        return error;
    }
}

const setRoomDetails = (roomJson) => {
    roomName.innerHTML = roomJson.roomName;
    userCountNominator.innerHTML = roomJson.currentUsersCount;
    userCountDenominator.innerHTML = roomJson.maxUsers;
}

getRoomDetails();
