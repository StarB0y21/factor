"use strict";

function exitFactorCreate() {

    let styles = document.getElementById("exit-factor-style");
    if (!styles) {
        let exitFactorStyle = document.createElement("link");
        exitFactorStyle.rel = "stylesheet";
        exitFactorStyle.href = "style/ExitFactor.css";
        exitFactorStyle.id = "exit-factor-style";
        document.head.appendChild(exitFactorStyle);
    }

    let mainSection = document.getElementById("main");

    let factorContainer = document.createElement("div");
    factorContainer.id = "factor-container";

    let headerSection = document.createElement("div");
    headerSection.id = "header";

    let factorDetailSection = document.createElement("div");
    factorDetailSection.id = "factor-detail";

    let dateItem = document.createElement("input");
    dateItem.setAttribute("data-jdp", "");
    dateItem.id = "date-item";
    dateItem.value = "انتخاب تاریخ...";

    let dateInputLable = document.createElement("label");
    dateInputLable.setAttribute("for", "Date-Input");
    dateInputLable.innerHTML = "تاریخ: ";

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

    factorDetailSection.appendChild(dateInputLable);
    factorDetailSection.appendChild(dateItem);
    factorDetailSection.appendChild(numberItem);

    factorTitleSection.appendChild(factorTitleItem);
    factorTitleSection.appendChild(factorSecTitleItem);
    factorTitleSection.appendChild(customerNameItem);

    headerSection.appendChild(factorDetailSection);
    headerSection.appendChild(factorTitleSection);

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