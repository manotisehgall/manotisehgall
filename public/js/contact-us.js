document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
});


const nameN = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', () => {
    console.log(nameN.value);
    fetch('/send-contact-us', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            name: nameN.value,
            email: email.value,
            message: message.value
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log("send successfully")
        })
    console.log('cicked');
    window.alert("From sent successfully")
    nameN.value=" "
    email.value=" "
    message.value=" "
})


const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}