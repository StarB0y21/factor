"use strict";
let edit = 0;
let exitTableExist = 0;
let enterTableExist = 0;
document.getElementById("main").style.pointerEvents = "none";
function exitFactor() {

    if (exitTableExist == 1) {
        window.alert("جدول ایجاد شده است");
    } else {
        exitTableExist = 1;

        let mainSection = document.getElementById("main");

        let headerSection = document.createElement("div");
        headerSection.id = "header";

        let factorDetailSection = document.createElement("div");
        factorDetailSection.id = "factor-detail";
        let dateItem = document.createElement("p");
        dateItem.innerText = "تاریخ:....................";
        let numberItem = document.createElement("p");
        numberItem.innerText = "شماره:....................";

        let factorTitleSection = document.createElement("div");
        factorTitleSection.id = "factor-title";
        let factorTitleItem = document.createElement("h1");
        factorTitleItem.innerText = "شرکت تکمیل بافت";
        let factorSecTitleItem = document.createElement("h3");
        factorSecTitleItem.innerText = "قبض خروج کالای امانی";

        let customerSection = document.createElement("div");
        customerSection.id = "customer";
        let customerNameItem = document.createElement("input");
        customerNameItem.placeholder = "نام مشتری";
        customerNameItem.id = "customer-name";
        customerNameItem.type = "text";
        // let customerNameItem = document.createElement("p");
        // customerNameItem.innerText = "نام مشتری:";

        let tableSction = document.createElement("div");
        tableSction.id = "table";

        let factorTableSection = document.createElement("table");
        factorTableSection.id = "factor";

        let footerSection = document.createElement("div");
        footerSection.id = "footer";

        let deliverySignature = document.createElement("p");
        deliverySignature.innerText = "امضا تحویل گیرنده";

        let guardingSignature = document.createElement("p");
        guardingSignature.innerText = "امضا نگهبانی";

        factorDetailSection.appendChild(dateItem);
        factorDetailSection.appendChild(numberItem);
        factorTitleSection.appendChild(factorTitleItem);
        factorSecTitleItem.appendChild(customerNameItem);
        factorTitleSection.appendChild(factorSecTitleItem);
        // factorTitleSection.appendChild(customerNameItem);
        // customerSection.appendChild(customerNameItem);
        headerSection.appendChild(factorDetailSection);
        headerSection.appendChild(factorTitleSection);
        // headerSection.appendChild(customerSection);
        tableSction.appendChild(factorTableSection);
        footerSection.appendChild(deliverySignature);
        footerSection.appendChild(guardingSignature);
        mainSection.appendChild(headerSection);
        mainSection.appendChild(tableSction);
        mainSection.appendChild(footerSection);

        for (let i = 1; i <= 12; i++) {
            let trTable = document.createElement("tr");
            trTable.id = i;
            trTable.classList.add("tr-table");
            trTable.classList.add(`tr-${i}`);
            factorTableSection.appendChild(trTable);
            for (let z = 0; z <= 6; z++) {
                if (i == 1) {
                    let thTable = document.createElement("th");
                    thTable.classList.add("th-table");
                    thTable.classList.add(`th-${i}-${z}`);
                    thTable.id = `th-${i}-${z}`;
                    trTable.appendChild(thTable);
                    switch (true) {
                        case z == 0:
                            thTable.innerText = "ردیف";
                            break;
                        case z == 1:
                            thTable.innerText = "مشخصات کالا";
                            break;
                        case z == 2:
                            thTable.innerText = "شماره فاکتور";
                            break;
                        case z == 3:
                            thTable.innerText = "تعداد";
                            break;
                        case z == 4:
                            thTable.innerText = "متراژ";
                            break;
                        case z == 5:
                            thTable.innerText = "وزن";
                            break;
                        case z == 6:
                            thTable.innerText = "جمع کل";
                            break;
                        default:
                            window.alert("end");
                            break;
                    }
                } else {
                    let tdTable = document.createElement("td");
                    let inputs = document.createElement("input");
                    inputs.id = `inputs-${z}-${i}`;
                    tdTable.classList.add("td-table");
                    tdTable.classList.add(`td-${i}-${z}`);
                    tdTable.id = `td-${i}-${z}`;

                    trTable.appendChild(tdTable);
                    if (z == 1) {
                        let textAreaItam = document.createElement("textarea");
                        textAreaItam.addEventListener("click", productList);
                        textAreaItam.id = `inputs-${z}-${i}`;
                        tdTable.appendChild(textAreaItam);

                    } else {
                        inputs.type = "text";
                        inputs.classList.add("inputs");
                        inputs.id = `inputs-${z}-${i}`;
                        tdTable.appendChild(inputs);
                    }
                }
            }
        }
    }
}


function editFactor() {
    document.getElementById("main").style.pointerEvents = "auto";
}

function closeEdit() {
    document.getElementById("main").style.pointerEvents = "none";
}

function saveEdit() {
    document.getElementById("product-detial-selection").style.display = "none";
    document.getElementById("factor-type").style.display = "none";
    print();
    document.getElementById("product-detial-selection").style.display = "block";
    document.getElementById("factor-type").style.display = "block";
}

function productList() {
    let thisItem = this;

    let productDetialSelection = document.getElementById("product-detial-selection");
    productDetialSelection.innerHTML = "";

    let coords = document.createElement("p");
    let thisId = this.id;
    thisId.split("-");
    let mark = Number(thisId[9]);
    mark--;
    coords.innerText = `ردیف: ${mark}`;

    console.log(coords);
    console.log(thisId);
    console.log(thisId[9]);

    let detailLable = document.createElement("lable");
    detailLable.setAttribute("for", "product-detial-selection");

    let inputProductList = document.createElement("input");
    inputProductList.id = "product-type-input";
    inputProductList.setAttribute("list", "product-types");

    let dataListProduct = document.createElement("datalist");
    dataListProduct.id = "product-types";

    let breakLine = document.createElement("br");

    let submitButton = document.createElement("button");
    submitButton.innerText = "درج";
    submitButton.id = "type-submit";
    submitButton.addEventListener("click", function () {
        setProductType(thisItem);
    });

    let opt1 = document.createElement("option");
    opt1.value = "رنگرزی و تکمیل پارچه 270 گرمی";
    let opt2 = document.createElement("option");
    opt2.value = "رنگرزی و تکمیل پارچه 500 گرمی";
    let opt3 = document.createElement("option");
    opt3.value = "چاپ و تکمیل پارچه 270 گرمی";
    let opt4 = document.createElement("option");
    opt4.value = "چاپ و تکمیل پارچه 500 گرمی";

    dataListProduct.appendChild(opt1);
    dataListProduct.appendChild(opt2);
    dataListProduct.appendChild(opt3);
    dataListProduct.appendChild(opt4);

    productDetialSelection.appendChild(coords);
    productDetialSelection.appendChild(detailLable);
    productDetialSelection.appendChild(inputProductList);
    productDetialSelection.appendChild(dataListProduct);
    productDetialSelection.appendChild(breakLine);
    productDetialSelection.appendChild(submitButton);
}

function setProductType(i) {
    let inputValue = document.getElementById("product-type-input").value;
    i.innerText = inputValue;
    console.log(inputValue);
    console.log(i);
}