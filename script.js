"use strict";
let edit = 0;
for (let i = 1; i <= 12; i++) {
    let trTable = document.createElement("tr");
    trTable.id = i;
    trTable.classList.add("tr-table");
    document.getElementById("factor").appendChild(trTable);
    console.log(`create table row number: ${i}`);
    for (let z = 0; z <= 6; z++) {
        if (i == 1) {
            let thTable = document.createElement("th");
            thTable.classList.add("th-table");
            trTable.appendChild(thTable);
            console.log("zero");
            switch (true) {
                case z == 0:
                    thTable.innerText = "ردیف";
                    console.log("z = 0");
                    break;
                case z == 1:
                    thTable.innerText = "مشخصات کالا";
                    console.log("z = 1");
                    break;
                case z == 2:
                    thTable.innerText = "شماره فاکتور";
                    console.log("z = 2");
                    break;
                case z == 3:
                    thTable.innerText = "تعداد";
                    console.log("z = 3");
                    break;
                case z == 4:
                    thTable.innerText = "متراژ";
                    console.log("z = 4");
                    break;
                case z == 5:
                    thTable.innerText = "وزن";
                    console.log("z = 5");
                    break;
                case z == 6:
                    thTable.innerText = "جمع کل";
                    console.log("z = 6");
                    break;
                default:
                    window.alert("end");
                    break;
            }
        } else {
            let tdTable = document.createElement("td");
            tdTable.innerText = "";
            tdTable.classList.add("td-table");
            trTable.appendChild(tdTable);
            console.log("td");
        }
    }
}

document.getElementById("edit-table").style.visibility = "hidden";

function editFactor() {
    document.getElementById("edit-table").style.visibility = "visible";
    document.getElementById("main").style.filter = "blur(5px)";
    if (edit == 0) {
        edit = 1;
        console.log(`${edit}`);

        for (let i = 1; i <= 12; i++) {
            let trTable = document.createElement("tr");
            trTable.id = i;
            trTable.classList.add("tr-table");
            document.getElementById("edit-factor").appendChild(trTable);
            console.log(`create table row number: ${i}`);

            for (let z = 0; z <= 6; z++) {
                if (i == 1) {
                    let thTable = document.createElement("th");
                    thTable.classList.add("th-table");
                    trTable.appendChild(thTable);
                    console.log("zero");
                    switch (true) {
                        case z == 0:
                            thTable.innerText = "ردیف";
                            console.log("z = 0");
                            break;
                        case z == 1:
                            thTable.innerText = "مشخصات کالا";
                            console.log("z = 1");
                            break;
                        case z == 2:
                            thTable.innerText = "شماره فاکتور";
                            console.log("z = 2");
                            break;
                        case z == 3:
                            thTable.innerText = "تعداد";
                            console.log("z = 3");
                            break;
                        case z == 4:
                            thTable.innerText = "متراژ";
                            console.log("z = 4");
                            break;
                        case z == 5:
                            thTable.innerText = "وزن";
                            console.log("z = 5");
                            break;
                        case z == 6:
                            thTable.innerText = "جمع کل";
                            console.log("z = 6");
                            break;
                        default:
                            window.alert("end");
                            break;
                    }
                } else {
                    let tdTable = document.createElement("td");
                    let inputs = document.createElement("input");
                    inputs.type = "text";
                    inputs.classList.add("inputs");
                    tdTable.innerText = "";
                    tdTable.appendChild(inputs);
                    tdTable.classList.add("td-table");
                    trTable.appendChild(tdTable);
                    console.log("td");
                }
            }
        }
    }

}


function closeEdit() {
    document.getElementById("edit-table").style.visibility = "hidden";
    document.getElementById("main").style.filter = "";
    // edit = 0;
    console.log(`${edit}`);
}

function saveEdit() {
    
}
