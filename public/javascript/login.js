// const { response } = require("express");

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#un-signup').value.trim();
    const email = document.querySelector('#e-signup').value.trim();
    const password = document.querySelector('#pw-signup').value.trim();

    if(username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        
        if(response.ok) {
            console.log('Eureka!')
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup').addEventListener('submit',signupFormHandler);

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#e-login').value.trim();
    const password = document.querySelector('#pw-login').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        
        if(response.ok) {
            console.log("It's good!")
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signin').addEventListener('submit', loginFormHandler);