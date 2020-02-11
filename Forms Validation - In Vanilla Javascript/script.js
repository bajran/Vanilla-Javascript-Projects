const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('ConfirmPassword');

//show input success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.classList.remove("error");
    formControl.classList.add("success")
}


//show input error message -
function showError(input , message){
    const formControl = input.parentElement;
    formControl.classList.add("error");
    const small = formControl.querySelector('small')
    small.innerText = message
}

//check isValid Email
function checkEmail(email) {
    if(email.value !== ''){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email.value.trim())){
            showSuccess(email)
        }else{
            showError(email, 'Email is not valid')
        }
    }
}

//get input field name
function getFieldName(input){
    let name = input.id;
    return name.charAt(0).toUpperCase() + name.slice(1);
}

//check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        }else{
            showSuccess(input)
        }
    })
}

//check input length of fields
function checkLength(input, min, max){
    if(input.value !== ''){
        if(input.value.length < min){
            showError(input, `${getFieldName(input)} must be at least ${min} characters`)
        }else if(input.value.length > max){
            showError(input, `${getFieldName(input)} must be less than ${max} characters`)
        }else{
            showSuccess(input)
        }
    }
}

//check password match
function checkPasswordMatch(input1, input2){
    if(input2.value !== ''){
        if(input1.value === input2.value){
            showSuccess(input2)
        }else{
            showError(input2,'Password not match')
        }
    }
}


//Submit Form - Event Listeners
form.addEventListener('submit',function (e){
    e.preventDefault()
    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15)
    checkLength(password, 6, 25)
    checkEmail(email)
    checkPasswordMatch(password, password2)
})
