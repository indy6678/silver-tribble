function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#un-signup').value.trim();
    const email = document.querySelector('#e-signup').value.trim();
    const password = document.querySelector('#pw-signup').value.trim();

    if(username && email && password) {
        fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        }).then((response)=> {console.log(response)})
    }
}

document.querySelector('.login').addEventListener('submit',signupFormHandler);