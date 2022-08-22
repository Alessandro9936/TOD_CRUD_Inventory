// Title
const inputTitle = document.getElementById("title");
const outputTitle = document.querySelector(".title-content");
const inputBody = document.getElementById("body");
const outputBody = document.querySelector(".body-content");

const categoryInput = document.getElementById("category");
const categoryOutput = document.querySelector(".category-content");

const buttonReset = document.querySelectorAll("[field-reset]");

function changeContentOnInput(e, outputTarget) {
  outputTarget.textContent = e.target.value;
}

function changeSelectValue() {
  categoryOutput.textContent = categoryInput.value;
}

inputTitle.addEventListener("keyup", (e) => {
  changeContentOnInput(e, outputTitle);
});

inputBody.addEventListener("keyup", (e) => {
  changeContentOnInput(e, outputBody);
});

buttonReset.forEach((button) =>
  button.addEventListener("click", (e) => {
    outputBody.textContent = "";
    outputTitle.textContent = "";
  })
);

categoryInput.addEventListener("change", changeSelectValue);

window.addEventListener("load", () => {
  outputTitle.textContent = inputTitle.value;
  outputBody.textContent = inputBody.textContent;
  categoryOutput.textContent = categoryInput.value;
});
