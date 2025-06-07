"use strict";

function importExel(event) {

    document.getElementById("exit").checked = false;
    document.getElementById("enter").checked = false;

    var createEnter = 0;
    var createExit = 0;

    if (exitFactorCondition == 1) {
        wipePage();
        createExit = 1;
    } else if (enterFactorCondition == 1) {
        wipePage();
        createEnter = 1;
    } else {
        window.alert("لطفا یک نوع فاکتور انتخاب کنید");
        location.reload();
        return;
    }

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        let containerFactors = document.getElementById("factor-container");
        if (containerFactors) {
            saveEdit();
            containerFactors.remove();
        }

        if (createExit == 1) {
            let exitExcelSample = ["واحد", "مقدار", "شرح", "تعداد", "نام", "کالا", "تاریخ", "شماره خروجی", "شماره  فاکتور"];
            if (rows[0].length != exitExcelSample.length) {
                window.alert("ساختار فایل اکسل صحیح نمیباشد!!!");
                location.reload();
            } else {
                for (let i = 0; i < rows[0].length; i++) {
                    let importExcel = rows[0][i].trim();
                    let sampleExitExcel = exitExcelSample[i].trim();
                    if (importExcel == sampleExitExcel) {
                    } else {
                        window.alert("ساختار فایل اکسل صحیح نمیباشد!!!");
                        location.reload();
                    }
                }
            }
        }
        if (createEnter == 1) {
            let enterExcelSample = ["واحد", "مقدار", "مشخصات", "نام", "کالا", "تاریخ", "شماره فاکتور"];
            if (rows[0].length != enterExcelSample.length) {
                window.alert("ساختار فایل اکسل صحیح نمیباشد!!!");
                location.reload();
            } else {
                for (let i = 0; i < rows[0].length; i++) {
                    let importExcel = rows[0][i].trim();
                    let sampleExitExcel = enterExcelSample[i].trim();
                    if (importExcel == sampleExitExcel) {
                    } else {
                        window.alert("ساختار فایل اکسل صحیح نمیباشد!!!");
                        location.reload();
                    }
                }
            }
        }

        createTable(rows, createExit, createEnter);
    };

    reader.readAsArrayBuffer(file);
}

function createTable(excelData, exit, enter) {


    excelData.forEach((item, index) => {
        if (enter == 1) {
            if (index > 0) {
                const excelRow = [];
                excelRow[0] = 1;

                excelRow[1] = item[2];

                excelRow[2] = item[6];

                excelRow[3] = item[1] + " ط";

                if (item[0] == "متر") {
                    excelRow[4] = item[1] + " " + item[0];
                    excelRow[6] = item[1] + " " + item[0];
                } else {
                    excelRow[4] = "";
                }

                if (item[0] == "کیلو") {
                    excelRow[5] = item[1] + " " + item[0];
                    excelRow[6] = item[1] + " " + item[0];
                } else {
                    excelRow[5] = "";
                }

                var dataExcel = item[5];
                if (typeof (dataExcel) != typeof "") {
                    let dateNum = item[5];
                    let dateStr = dateNum.toString();
                    let year = dateStr.substring(0, 4);
                    let month = dateStr.substring(4, 6);
                    let day = dateStr.substring(6, 8);
                    let formattedDate = year + "/" + month + "/" + day;
                    excelRow[7] = formattedDate;
                } else {
                    excelRow[7] = dataExcel;
                }

                excelRow[8] = item[3];

                createEnterFactor(excelRow);
            }
        } else if (exit == 1) {
            if (index > 0) {
                const excelRow = [];
                excelRow[0] = 1;
                excelRow[1] = 0;

                let desc = item[2];
                let product = item[5];
                if (desc == "چاپ") {
                    excelRow[1] = desc + " و تکمیل پارچه " + product + " گرمی";
                }
                if (desc == "الوان" || desc == "الوان (تیره)") {
                    excelRow[1] = "رنگرزی و تکمیل " + product + " گرمی";
                }

                excelRow[2] = item[8];

                excelRow[3] = item[3] + " ط";

                if (item[0] == "متر") {
                    excelRow[4] = item[1] + " " + item[0];
                    excelRow[6] = item[1] + " " + item[0];
                } else {
                    excelRow[4] = "";
                }

                if (item[0] == "کیلو") {
                    excelRow[5] = item[1] + " " + item[0];
                    excelRow[6] = item[1] + " " + item[0];
                } else {
                    excelRow[5] = "";
                }

                var dataExcel = item[6];
                if (typeof (dataExcel) != typeof "") {
                    let dateNum = item[6];
                    let dateStr = dateNum.toString();
                    let year = dateStr.substring(0, 4);
                    let month = dateStr.substring(4, 6);
                    let day = dateStr.substring(6, 8);
                    let formattedDate = year + "/" + month + "/" + day;
                    excelRow[7] = formattedDate;
                } else {
                    excelRow[7] = dataExcel;
                }

                excelRow[8] = item[4];
                createExitFactor(excelRow);
            }
        }
    });
}

function createExitFactor(factorArray) {

    let styles = document.getElementById("excel-exit-factor-style");
    if (!styles) {
        let exitFactorStyleExel = document.createElement("link");
        exitFactorStyleExel.rel = "stylesheet";
        exitFactorStyleExel.href = "style/ExitFactorExel.css";
        exitFactorStyleExel.id = "excel-exit-factor-style";
        document.head.appendChild(exitFactorStyleExel);
    }

    let mainDiv = document.getElementById("main");

    let factorsContainer = document.createElement("div");
    factorsContainer.classList.add("factors-container");

    let factorIs = document.createElement("div");
    factorIs.classList.add("factor");

    let headerSection = document.createElement("div");
    headerSection.classList.add("header-section");

    let factorDetailSection = document.createElement("div");
    factorDetailSection.classList.add("detail-section");

    let dateInputLable = document.createElement("label");
    dateInputLable.setAttribute("for", "Date-Input");
    dateInputLable.innerHTML = "تاریخ: ";

    let dateItem = document.createElement("input");
    dateItem.setAttribute("data-jdp", "");
    dateItem.classList.add("date-item");
    dateItem.value = factorArray[7];

    let numberItem = document.createElement("p");
    numberItem.innerText = "شماره:....................";

    let factorTitleSection = document.createElement("div");
    factorTitleSection.classList.add("title-section");

    let factorTitleItem = document.createElement("h1");
    factorTitleItem.innerText = "شرکت تکمیل بافت";
    factorTitleItem.classList.add("first-title");

    let factorSecTitleItem = document.createElement("h3");
    factorSecTitleItem.innerText = "قبض خروج کالای امانی";
    factorSecTitleItem.classList.add("second-title");

    let customerSection = document.createElement("div");
    customerSection.classList.add("customer");

    let customerNameItem = document.createElement("input");
    customerNameItem.placeholder = "نام مشتری";
    customerNameItem.classList.add("customer-name");
    customerNameItem.type = "text";
    customerNameItem.value = factorArray[8];

    let tableFactor = document.createElement("table");
    tableFactor.classList.add("factor-table");

    for (let i = 0; i < 12; i++) {
        let tableFactorTr = document.createElement("tr");
        tableFactorTr.classList.add("table-row");

        for (let l = 0; l < 7; l++) {
            if (i == 0) {
                let tableFactorTh = document.createElement("th");
                tableFactorTh.classList.add("table-row-header");
                switch (l) {
                    case 0:
                        tableFactorTh.innerText = "ردیف";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 1:
                        tableFactorTh.innerText = "مشخصات کالا";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 2:
                        tableFactorTh.innerText = "شماره فاکتور";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 3:
                        tableFactorTh.innerText = "تعداد";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 4:
                        tableFactorTh.innerText = "متراژ";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 5:
                        tableFactorTh.innerText = "وزن";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 6:
                        tableFactorTh.innerText = "جمع کل";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    default:
                        break;
                }
            } else {
                var tableFactorTd = document.createElement("td");
                tableFactorTd.classList.add("table-row-data");
                if (factorArray[l] != undefined && i == 1 && l != 6) {
                    if (l == 1 || l == 4 || l == 5) {
                        let textArea = document.createElement("textarea");
                        textArea.innerText = factorArray[l];
                        textArea.classList.add("textArea");
                        tableFactorTd.appendChild(textArea);
                    } else {
                        let inputs = document.createElement("input");
                        inputs.classList.add("inputs");
                        inputs.value = factorArray[l];
                        tableFactorTd.appendChild(inputs);
                    }
                } else {
                    tableFactorTd.innerText = "";
                }
                if (i == 11 && l == 6) {
                    if (factorArray[4]) {
                        let textArea = document.createElement("textarea");
                        textArea.innerText = factorArray[4];
                        textArea.classList.add("textArea");
                        tableFactorTd.appendChild(textArea);
                    }
                    if (factorArray[5]) {
                        let textArea = document.createElement("textarea");
                        textArea.innerText = factorArray[5];
                        textArea.classList.add("textArea");
                        tableFactorTd.appendChild(textArea);
                    }
                }
                tableFactorTr.appendChild(tableFactorTd);
            }
            tableFactor.appendChild(tableFactorTr);

        }


    }

    let footerSection = document.createElement("div");
    footerSection.classList.add("footer");

    let deliverySignature = document.createElement("p");
    deliverySignature.innerText = "امضا تحویل گیرنده";

    let guardingSignature = document.createElement("p");
    guardingSignature.innerText = "امضا نگهبانی";

    factorDetailSection.appendChild(dateInputLable);
    factorDetailSection.appendChild(dateItem);
    factorDetailSection.appendChild(numberItem);

    factorTitleSection.appendChild(factorTitleItem);
    factorTitleSection.appendChild(factorSecTitleItem);
    factorTitleSection.appendChild(customerSection);

    customerSection.appendChild(customerNameItem);

    headerSection.appendChild(factorDetailSection);
    headerSection.appendChild(factorTitleSection);

    footerSection.appendChild(deliverySignature);
    footerSection.appendChild(guardingSignature);

    factorIs.appendChild(headerSection);
    factorIs.appendChild(tableFactor);
    factorIs.appendChild(footerSection);

    factorsContainer.appendChild(factorIs);

    mainDiv.appendChild(factorsContainer);
}

function createEnterFactor(factorArray) {

    let styles = document.getElementById("excel-enter-factor-style");
    if (!styles) {
        let exitFactorStyleExel = document.createElement("link");
        exitFactorStyleExel.rel = "stylesheet";
        exitFactorStyleExel.href = "style/EnterFactorExel.css";
        exitFactorStyleExel.id = "excel-enter-factor-style";
        document.head.appendChild(exitFactorStyleExel);
    }

    let mainDiv = document.getElementById("main");

    let factorsContainer = document.createElement("div");
    factorsContainer.classList.add("factors-container");

    let factorIs = document.createElement("div");
    factorIs.classList.add("factor");

    let headerSection = document.createElement("div");
    headerSection.classList.add("header-section");

    let factorDetailSection = document.createElement("div");
    factorDetailSection.classList.add("detail-section");

    let numberItem = document.createElement("p");
    numberItem.innerText = "شماره:....................";

    let dateInputLable = document.createElement("label");
    dateInputLable.setAttribute("for", "Date-Input");
    dateInputLable.innerHTML = "تاریخ: ";

    let dateItem = document.createElement("input");
    dateItem.setAttribute("data-jdp", "");
    dateItem.classList.add("date-item");
    dateItem.value = factorArray[7];

    let factorTitleSection = document.createElement("div");
    factorTitleSection.classList.add("title-section");

    let factorTitleItem = document.createElement("h1");
    factorTitleItem.innerText = "شرکت تکمیل بافت";
    factorTitleItem.classList.add("first-title");

    let factorSecTitleItem = document.createElement("h3");
    factorSecTitleItem.innerText = "قبض ورود کالای امانی";
    factorSecTitleItem.classList.add("second-title");

    let customerNameItem = document.createElement("div");
    customerNameItem.classList.add("customer-data");

    let customerNameInput = document.createElement("input");
    customerNameInput.type = "text";
    customerNameInput.value = factorArray[8];
    customerNameInput.classList.add("customer-name-input");

    let lengthOfCustomerName = customerNameInput.value.length;
    if (lengthOfCustomerName > 17) {
        customerNameInput.style.fontSize = "12px";
    } else {
        customerNameInput.style.fontSize = "17px";
    }

    let customerNameVal1 = document.createElement("p");
    customerNameVal1.innerText = "اجازه داده میشود آقای شرکت...";
    customerNameVal1.classList.add("header-p");
    let customerNameVal2 = document.createElement("p");
    customerNameVal2.innerText = " اجناس مشروحه را به انبار تحویل نماید.";
    customerNameVal2.classList.add("header-p");

    let tableFactor = document.createElement("table");
    tableFactor.classList.add("factor-table");

    for (let i = 0; i < 12; i++) {
        let tableFactorTr = document.createElement("tr");
        tableFactorTr.classList.add("table-row");

        for (let l = 0; l < 7; l++) {
            if (i == 0) {
                let tableFactorTh = document.createElement("th");
                tableFactorTh.classList.add("table-row-header");
                switch (l) {
                    case 0:
                        tableFactorTh.innerText = "ردیف";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 1:
                        tableFactorTh.innerText = "مشخصات کالا";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 2:
                        tableFactorTh.innerText = "شماره فاکتور";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 3:
                        tableFactorTh.innerText = "تعداد";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 4:
                        tableFactorTh.innerText = "متراژ";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 5:
                        tableFactorTh.innerText = "وزن";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    case 6:
                        tableFactorTh.innerText = "جمع کل";
                        tableFactorTh.classList.add(`th-${l}`);
                        tableFactorTr.appendChild(tableFactorTh);
                        break;
                    default:
                        break;
                }
            } else {
                var tableFactorTd = document.createElement("td");
                tableFactorTd.classList.add("table-row-data");
                if (factorArray[l] != undefined && i == 1 && l != 6) {
                    if (l == 1 || l == 4 || l == 5) {
                        let textArea = document.createElement("textarea");
                        textArea.innerText = factorArray[l];
                        textArea.classList.add("textArea");
                        tableFactorTd.appendChild(textArea);
                    } else {
                        let inputs = document.createElement("input");
                        inputs.classList.add("inputs");
                        inputs.value = factorArray[l];
                        tableFactorTd.appendChild(inputs);
                    }
                } else {
                    tableFactorTd.innerText = "";
                }
                if (i == 11 && l == 6) {
                    if (factorArray[4]) {
                        let textArea = document.createElement("textarea");
                        textArea.innerText = factorArray[4];
                        textArea.classList.add("textArea");
                        tableFactorTd.appendChild(textArea);
                    }
                    if (factorArray[5]) {
                        let textArea = document.createElement("textarea");
                        textArea.innerText = factorArray[5];
                        textArea.classList.add("textArea");
                        tableFactorTd.appendChild(textArea);
                    }
                }
                tableFactorTr.appendChild(tableFactorTd);
            }
            tableFactor.appendChild(tableFactorTr);

        }


    }

    let footerSection = document.createElement("div");
    footerSection.classList.add("footer");

    let deliverySignature = document.createElement("p");
    deliverySignature.innerText = "امضا تحویل گیرنده";

    let guardingSignature = document.createElement("p");
    guardingSignature.innerText = "امضا نگهبانی";

    factorDetailSection.appendChild(numberItem);
    factorDetailSection.appendChild(dateInputLable);
    factorDetailSection.appendChild(dateItem);

    customerNameItem.appendChild(customerNameVal1);
    customerNameItem.appendChild(customerNameInput);
    customerNameItem.appendChild(customerNameVal2);

    factorTitleSection.appendChild(factorTitleItem);
    factorTitleSection.appendChild(factorSecTitleItem);

    headerSection.appendChild(factorDetailSection);
    headerSection.appendChild(factorTitleSection);
    headerSection.appendChild(customerNameItem);

    footerSection.appendChild(deliverySignature);
    footerSection.appendChild(guardingSignature);

    factorIs.appendChild(headerSection);
    factorIs.appendChild(tableFactor);
    factorIs.appendChild(footerSection);

    factorsContainer.appendChild(factorIs);

    mainDiv.appendChild(factorsContainer);
}

function printInputExel() {
    print();
}
