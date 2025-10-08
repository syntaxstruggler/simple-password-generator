function getRandomChar(str) {
    return str[getSecureRandomInt(str.length)];
};

function getSecureRandomInt(max) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
};

function secureShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getSecureRandomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function generatePassword() {
    const passwordLength = parseInt(document.getElementById("passwordLength").value, 10);
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_-+=[]{}\\/?<>";

    let selectedChars = "";
    let guaranteedChars = [];

    const messageDiv = document.getElementById("message");
    const passwordInput = document.getElementById("password");

    messageDiv.textContent = ""; // clear message

    if (includeLowercase) {
        selectedChars += lowercaseChars;
        guaranteedChars.push(getRandomChar(lowercaseChars));
    }

    if (includeUppercase) {
        selectedChars += uppercaseChars;
        guaranteedChars.push(getRandomChar(uppercaseChars));
    }

    if (includeNumbers) {
        selectedChars += numberChars;
        guaranteedChars.push(getRandomChar(numberChars));
    }

    if (includeSymbols) {
        selectedChars += symbolChars;
        guaranteedChars.push(getRandomChar(symbolChars));
    }

    if (passwordLength < 8) {
        messageDiv.textContent = "⚠️ Password must be at least 8 characters.";
        passwordInput.value = "";
        return;
    }

    if (selectedChars.length === 0) {
        messageDiv.textContent = "⚠️ Please select at least one character type.";
        passwordInput.value = "";
        return;
    }

    let passwordArray = [...guaranteedChars];
    for (let i = passwordArray.length; i < passwordLength; i++) {
        passwordArray.push(getRandomChar(selectedChars));
    }

    const finalPassword = secureShuffle(passwordArray).join('');
    passwordInput.value = finalPassword;
    messageDiv.textContent = "✅ Password generated!";
};

function copyToClipboard() {
    const passwordInput = document.getElementById("password");
    const messageDiv = document.getElementById("message");

    if (passwordInput.value === "") {
        messageDiv.textContent = "⚠️ Nothing to copy.";
        return;
    }

    passwordInput.select();
    passwordInput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
            messageDiv.textContent = "✅ Password copied to clipboard!";
        })
        .catch(() => {
            messageDiv.textContent = "❌ Failed to copy.";
        });
};