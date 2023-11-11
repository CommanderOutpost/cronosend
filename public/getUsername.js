const form = document.querySelector('form');

form.addEventListener('submit', handleSubmitUsername);

async function handleSubmitUsername(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const inputedUsername = formData.get('username-input');
    const response = await sendUsernameToServer(inputedUsername);
}

async function sendUsernameToServer(newUsername) {
    try {
        const response = await fetch('api/username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername })
        })

        if (response.ok) {
            return await response.json();
        }

        throw new Error('Response failed!');
    } catch (error) {
        console.error(error);
    }
}