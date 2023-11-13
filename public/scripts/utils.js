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