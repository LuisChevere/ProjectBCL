async function signupFormHandler(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('first-name-signup').value.trim();
    const lastName = document.getElementById('last-name-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();

    if (firstName && lastName && email && password) {
        const response = await fetch('/api/users/register', {
            method: 'post',
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}


document.getElementById('register-button').addEventListener('click', signupFormHandler);
