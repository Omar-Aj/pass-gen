const passwordRules = [
  [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  ["!", "@", "#", "$", "%", "^", "&", "*", "/", "+", "_"],
];

let password = document.getElementById("password");
let passLengthTxt = document.getElementById("pass-length-txt");
let passLength = 15;

let rangeInput = document.getElementById("password-length");
rangeInput.addEventListener("input", () => {
  passLength = rangeInput.value;
  if (passLength >= 26 && !password.classList.contains("text-sm")) {
    password.classList.replace("text-md", "text-sm");
  } else if (passLength < 26 && !password.classList.contains("text-md")) {
    password.classList.replace("text-sm", "text-md");
  }
  displayPassword(generatePassword(passLength));
});

let regenerateBtn = document.getElementById("regenerate");
regenerateBtn.addEventListener("click", () => {
  displayPassword(generatePassword(passLength));
});

let copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", copyPass);

window.onload = () => {
  displayPassword(generatePassword(passLength));
};

function generatePassword(passLength) {
  let newPass = "";
  for (let i = 0; i < passLength; i++) {
    let pos = i % 4;
    let rule = passwordRules[pos];
    let randomNum = Math.floor(Math.random() * rule.length);
    newPass += rule[randomNum];
  }

  let passAfterShuffle = "";
  // shuffle
  for (let i = 0; i < passLength; i++) {
    let randomIndex = Math.floor(Math.random() * newPass.length);
    passAfterShuffle += newPass[randomIndex];
    newPass =
      newPass.substring(0, randomIndex) +
      newPass.substring(randomIndex + 1, newPass.length);
  }

  return passAfterShuffle;
}

function displayPassword(pass) {
  password.innerText = pass;
  passLengthTxt.innerText = passLength;
}

let errMessage = document.getElementById("err");
async function copyPass() {
  let copyBtnTxt = document.getElementById("copy-btn-txt");
  let copyBtnIcon = document.getElementById("copy-btn-icon");
  try {
    await navigator.clipboard.writeText(password.innerText);
    copyBtnTxt.innerText = "Copied";
    copyBtnIcon.classList.add("hidden");
  } catch (err) {
    copyBtnTxt.innerText = "Error";
    errMessage.innerText = err;
    // console.log(err);
  }
  setTimeout(() => {
    copyBtnTxt.innerText = "Copy";
    copyBtnIcon.classList.remove("hidden");
  }, 1000);
}
