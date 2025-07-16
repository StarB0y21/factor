"use strict";

jalaliDatepicker.startWatch();

let edit = 0;
let suggestionValue;

var enterFactorCondition = 0;
var exitFactorCondition = 0;

// var paddingValue;

document.getElementById("main").style.pointerEvents = "none";

function editFactor() {
    document.getElementById("main").style.pointerEvents = "auto";
}

function saveEdit() {
    // let theFactor = document.getElementById("factor-container");
    
    // if (enterFactorCondition || exitFactorCondition) {
    //     if (theFactor) {
    //         theFactor.style.paddingTop = `${paddingValue}mm`;
    //         theFactor.style.backgroundColor = "red";
    //     } else {
    //         console.log("something is fucking wrong!");
    //     }
    // } else {
    //     console.log("lose");
    // }

    print();
    // theFactor.style.paddingTop = "";
    // theFactor.style.backgroundColor = "blue";
}

function enterFactorChecked() {
    if (exitFactorCondition != 0) {
        exitFactorCondition = 0;
        enterFactorCondition = 1;
    } else {
        enterFactorCondition = 1;
    }
}

function exitFactorChecked() {
    if (enterFactorCondition != 0) {
        enterFactorCondition = 0;
        exitFactorCondition = 1;
    } else {
        exitFactorCondition = 1;
    }

}

function newFactor() {
    if (enterFactorCondition == 1) {
        wipePage();
        enterFactorCreate();
    } else if (exitFactorCondition == 1) {
        wipePage();
        exitFactorCreate();
    } else {
        window.alert("لطفا یک نوع فاکتور انتخاب کنید");
    }
}

// function paddingTop(paddingInput) {
//     paddingValue = paddingInput.value;
//     console.log(paddingValue);
// }

function SuggestionActive(thisItem) {
    let suggestItems = document.getElementsByClassName("suggestion");
    for (let i of suggestItems) {
        i.classList.add("active-suggest");
        i.classList.remove("deactive-suggest");
    }

    if (thisItem != undefined) {
        suggestionValue = thisItem;
    } else {
        SuggestionDeactivate();
    }
}

function SuggestionDeactivate() {
    let suggestItems = document.getElementsByClassName("suggestion");
    for (let i of suggestItems) {
        i.classList.add("deactive-suggest");
        i.classList.remove("active-suggest");
    }
    let productTypeInput = document.getElementById("product-types-input");
    productTypeInput.value = "";
}

function submitSuggest() {
    let input = document.getElementById("product-types-input").value.trim();
    if (input == "") {
        window.alert("شما هیچ مقداری را انتخاب یا وارد نکرده اید!");
    } else {
        suggestionValue.innerText = input;
        SuggestionDeactivate();
    }
}

function wipePage() {

    let enterStyle = document.getElementById("enter-factor-style");
    let exitStyle = document.getElementById("exit-factor-style");
    let excelExitStyle = document.getElementById("excel-exit-factor-style");
    let excelEnterStyle = document.getElementById("excel-enter-factor-style");

    // paddingValue = 0;
    // document.getElementById("padding-top-factor").value = 0;

    if (enterStyle != null) {
        saveEdit();
        enterFactorCondition = 0;
        document.getElementById("enter").checked = false;
        enterStyle.remove();
    } else if (exitStyle != null) {
        saveEdit();
        document.getElementById("exit").checked = false;
        exitFactorCondition = 0;
        exitStyle.remove();
    } else if (excelExitStyle != null) {
        saveEdit();
        exitFactorCondition = 0;
        document.getElementById("exit").checked = false;
        excelExitStyle.remove();
    } else if (excelEnterStyle != null) {
        saveEdit();
        enterFactorCondition = 0;
        document.getElementById("enter").checked = false;
        excelEnterStyle.remove();
    } 
    // else {
    //     console.log("wtf?")
    // }
    document.getElementById("main").innerHTML = "";
}

window.addEventListener("DOMContentLoaded", () => {
    const savedOptions = JSON.parse(localStorage.getItem("options")) || [];
    const datalist = document.getElementById("product-types");

    savedOptions.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        datalist.appendChild(option);
    });
});

function saveOption() {
    const input = document.getElementById("product-types-input");
    const newValue = input.value.trim();

    if (!newValue) {
        window.alert("شما هیچ مقداری وارد نکرده اید!");
    }

    let options = JSON.parse(localStorage.getItem("options")) || [];

    if (!options.includes(newValue)) {
        options.push(newValue);
        localStorage.setItem("options", JSON.stringify(options));

        const option = document.createElement("option");
        option.value = newValue;
        document.getElementById("product-types").appendChild(option);
    } else {
        window.alert("این مقدار قبلا ثبت شده است!");
    }

    input.value = "";
}