
function string30Val (input) {
    if ((input.length > 0) && (input.length <31)) {
        return true;
    } else return false;
}

function phoneVal (phone) {
    if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
        return true;
    }
    return false;
}

function emailVal (email) {
    if (email.length < 51) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true;
        }
    return false;
    }
return false;
}

function stringVal (input) {
    if (input.length > 0) {
        return true;
    } else return false;
}

function starVal (input){
    if ((input > 0) && (input < 6)){
        return true;
    } else return false;
}

function string20Val (input) {
    if ((input.length > 0) && (input.length <21)) {
        return true;
    } else return false;
}

function passwordVal (input) {
    if ((input.length > 5) && (input.length <17)) {
        return true;
    } else return false;
}

export {string30Val, phoneVal, emailVal, stringVal, starVal, string20Val, passwordVal}

