let display = document.querySelector("#display");
display.dataset.num1 = "";
display.dataset.num2 = "";
display.dataset.operator = "";
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".ops");
let equal = document.querySelector("#equal");
let del = document.querySelector("#del");
let clear = document.querySelector("#clear");

function operate(operator, num1, num2){
    if (operator == "+")
        return num1 + num2;
    else if (operator == "-")
        return num1 - num2;
    else if (operator == "/")
        return num1 / num2;
    else
        return num1 * num2
}

operators.forEach(button => {
    button.addEventListener("click", (e) => {
        if (display.classList.contains("num1")){
            display.classList.add("op");
            display.dataset.operator = button.textContent;
        }
    })
})

numbers.forEach(button => {
    button.addEventListener("click", (e) => {
        if (display.classList.contains("result") && !(display.classList.contains("op"))){
            display.classList.remove("num2");
            display.innerHTML = button.textContent;
            if (!(display.classList.contains("num1")))
                display.classList.add("num1");
            display.dataset.num1 = button.textContent;
            display.classList.remove("result");
        }
        else if (display.classList.contains("op")){
            display.innerHTML = button.textContent;
            display.classList.remove("op");
            display.classList.add("num2");
            display.dataset.num2 = button.textContent;
            display.classList.add("ready");
        } 
        else if (display.classList.contains("num2")){
            display.innerHTML += button.textContent;
            display.dataset.num2 += button.textContent;
        }
        else {
            display.classList.add("num1")
            display.innerHTML += button.textContent;
            display.dataset.num1 += button.textContent;
        }
    });
});

equal.addEventListener("click", (e) =>{
    if (display.classList.contains("ready") && !(Number(display.dataset.num2) === 0 && display.dataset.operator == "/")){
        let result = operate(display.dataset.operator, Number(display.dataset.num1), Number(display.dataset.num2));
        display.innerHTML = result;
        display.dataset.num1 = `${result}`;
        display.classList.remove("ready");
        display.classList.add("result");
    }
    else{
        display.innerHTML = "Error";
        display.classList.add("result");
        display.classList.remove("num1");
        display.classList.remove("ready");
        display.dataset.num2 = "";
        display.dataset.num1 = "";
        display.dataset.operator = "";
    }
});

del.addEventListener("click", (e) =>{
    let currentDisplay = display.innerHTML;
    currentDisplay = currentDisplay.slice(0,-1);
    display.innerHTML = currentDisplay;
    if (display.classList.contains("num1") && !(display.classList.contains("num2")))
        display.dataset.num1 = display.dataset.num1.slice(0,-1);
    else
        display.dataset.num2 = display.dataset.num2.slice(0, -1);
});

clear.addEventListener("click", (e) =>{
    display.innerHTML = "";
    display.classList.forEach(cls => display.classList.remove(cls));
    display.dataset.num1 = "";
    display.dataset.num2 = "";
    display.dataset.operator = "";
});