"use strict";

function enterFactorCreate() {

    let styles = document.getElementById("enter-factor-style");
    if (!styles) {
        let enterFactorStyle = document.createElement("link");
        enterFactorStyle.rel = "stylesheet";
        enterFactorStyle.href = "style/enterFactor.css";
        enterFactorStyle.id = "enter-factor-style";
        document.head.appendChild(enterFactorStyle);
    }

    let mainSection = document.getElementById("main");

    let factorContainer = document.createElement("div");
    factorContainer.id = "factor-container";

    let headerSection = document.createElement("div");
    headerSection.id = "header";

    let factorTop = document.createElement("div");
    factorTop.id = "factor-top";

    let factorDetailSection = document.createElement("div");
    factorDetailSection.id = "factor-detail";

    let factorTitleSection = document.createElement("div");
    factorTitleSection.id = "factor-title";

    let numberItem = document.createElement("p");
    numberItem.innerText = "شماره:....................";

    let dateItem = document.createElement("input");
    dateItem.setAttribute("data-jdp", "");
    dateItem.id = "date-item";
    dateItem.value = "انتخاب تاریخ...";
    let dateInputLable = document.createElement("label");
    dateInputLable.setAttribute("for", "Date-Input");
    dateInputLable.innerHTML = "تاریخ: ";

    let customerNameItem = document.createElement("div");
    customerNameItem.id = "customer-data";

    let customerNameInput = document.createElement("input");
    customerNameInput.type = "text";
    customerNameInput.value = "نام مشتری...";
    customerNameInput.id = "customer-name-input";

    let customerNameVal1 = document.createElement("p");
    customerNameVal1.innerText = "اجازه داده میشود آقای شرکت...";
    customerNameVal1.classList.add("header-p");
    let customerNameVal2 = document.createElement("p");
    customerNameVal2.innerText = " اجناس مشروحه را به انبار تحویل نماید.";
    customerNameVal2.classList.add("header-p");

    customerNameItem.appendChild(customerNameVal1);
    customerNameItem.appendChild(customerNameInput);
    customerNameItem.appendChild(customerNameVal2);

    let factorTitleItem = document.createElement("h1");
    factorTitleItem.innerText = "شرکت تکمیل بافت";
    let factorSecTitleItem = document.createElement("h3");
    factorSecTitleItem.innerText = "قبض ورود کالای امانی";

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

    factorDetailSection.appendChild(numberItem);
    factorDetailSection.appendChild(dateInputLable);
    factorDetailSection.appendChild(dateItem);

    factorTitleSection.appendChild(factorTitleItem);
    factorTitleSection.appendChild(factorSecTitleItem);

    factorTop.appendChild(factorDetailSection);
    factorTop.appendChild(factorTitleSection);

    headerSection.appendChild(factorTop);
    headerSection.appendChild(customerNameItem);

    tableSction.appendChild(factorTableSection);

    footerSection.appendChild(deliverySignature);
    footerSection.appendChild(guardingSignature);

    factorContainer.appendChild(headerSection);
    factorContainer.appendChild(tableSction);
    factorContainer.appendChild(footerSection);
    mainSection.appendChild(factorContainer);

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
                        thTable.innerText = "شماره بارنامه";
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
                tdTable.classList.add("td-table");
                tdTable.classList.add(`td-${i}-${z}`);
                tdTable.id = `td-${i}-${z}`;

                trTable.appendChild(tdTable);
                if (z == 1 || z == 4 || z == 5 || z == 6) {
                    let textArea = document.createElement("textarea");
                    textArea.classList.add("inputs");
                    textArea.classList.add("textarea-inputs");
                    textArea.id = `inputs-${z}-${i}`;
                    textArea.addEventListener("focus", () => SuggestionActive(textArea));
                    tdTable.appendChild(textArea);
                } else {
                    let inputs = document.createElement("input");
                    inputs.id = `inputs-${z}-${i}`;
                    inputs.type = "text";
                    inputs.classList.add("inputs");
                    inputs.addEventListener("focus", () => SuggestionDeactivate());
                    tdTable.appendChild(inputs);
                }
            }
        }
    }
}