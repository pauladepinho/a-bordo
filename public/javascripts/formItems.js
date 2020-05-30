let schoolNumber = 1;

const addSchoolBtn = document.getElementById("add-school");
const delSchoolBtn = document.getElementById("del-school");

addSchoolBtn.addEventListener("mouseup", () => {
    schoolNumber++;

    /* 
        ADD NEW TAB BUTTON TO SCHOOLS TABS
    */

    // REMOVE CLASS SELECTED FROM PREVIOUSLY SELECTED TAB (HTML SCHOOLS SECTION ONLY)
    const tabsSSec = document.querySelectorAll("#new-schools .schools-tabs button");
    tabsSSec.forEach(tab => tab.classList.remove("selected"));

    // CREATE NEW TAB
    // HTML SCHOOLS SECTION TAB
    const tabSSec = document.createElement("button");
    tabSSec.type = "button";
    tabSSec.classList.add(`school${schoolNumber}`, "selected");
    tabSSec.innerText = `Escola ${schoolNumber}`;

    // HTML CLASSES SECTION TAB
    const tabCSec = document.createElement("button");
    tabCSec.type = "button";
    tabCSec.className = `school${schoolNumber}`;
    tabCSec.innerText = `Escola ${schoolNumber}`;

    // APPEND EACH NEW TAB TO TABS ON CORRESPONDING SECTIONS
    const tabsList = document.querySelectorAll(".schools-tabs");
    tabsList[0].appendChild(tabSSec);
    tabsList[1].appendChild(tabCSec);

    /* 
        ADD NEW SCHOOL OPTIONS TO FORM
    */

    // HIDE PREVIOUSLY SELECTED SCHOOL INFOS
    const previousSchoolsContents = document.getElementsByClassName("school-content");
    [...previousSchoolsContents].forEach(c => c.hidden = true);

    // NEW CONTENT DIV
    const schoolContent = document.createElement("div");
    schoolContent.className = "school-content";

    // CREATE SCHOOL LOCATION TO APPEND STATE AND MUNICIPALITY SELECTS
    const schoolLocation = document.createElement("div");
    schoolLocation.className = "school-location";

    // CREATE STATE SELECT
    const state = document.createElement("select");
    state.name = `school${schoolNumber}[]`;
    state.id = `state-school${schoolNumber}`;
    state.required = true;

    const stateOption = document.createElement("option");
    stateOption.disabled = true;
    stateOption.selected = true;
    stateOption.innerText = "UF";

    // MUNICIPALITY SELECT
    const municipality = document.createElement("select");
    municipality.name = `school${schoolNumber}[]`;
    municipality.id = `municipality-school${schoolNumber}`;
    municipality.required = true;
    municipality.disabled = true;

    const municipalityOption = document.createElement("option");
    municipalityOption.disabled = true;
    municipalityOption.selected = true;
    municipalityOption.innerText = "Município";

    // SCHOOL'S NAME SELECT
    const school = document.createElement("select");
    school.name = `school${schoolNumber}[]`;
    school.id = `school${schoolNumber}`;
    school.required = true;
    school.disabled = true;

    const schoolOption = document.createElement("option");
    schoolOption.disabled = true;
    schoolOption.selected = true;
    schoolOption.innerText = "Nome da escola";

    // PASS GRADE SELECT
    const passGrade = document.createElement("select");
    passGrade.name = `school${schoolNumber}[]`;
    passGrade.required = true;

    const passGradeOption = document.createElement("option");
    passGradeOption.disabled = true;
    passGradeOption.selected = true;
    passGradeOption.innerText = "Média para aprovação";

    const scaleTenOption = document.createElement("option");
    scaleTenOption.disabled = true;
    scaleTenOption.innerText = "Escala de 0 a 10 pontos";

    const five = document.createElement("option");
    five.value = 5;
    five.innerText = "5,0 pontos";
    const six = document.createElement("option");
    six.value = 6;
    six.innerText = "6,0 pontos";
    const seven = document.createElement("option");
    seven.value = 7;
    seven.innerText = "7,0 pontos";

    const scaleHundredOption = document.createElement("option");
    scaleHundredOption.disabled = true;
    scaleHundredOption.innerText = "Escala de 0 a 100 pontos";

    const fifty = document.createElement("option");
    fifty.value = 50;
    fifty.innerText = "50 pontos";
    const sixty = document.createElement("option");
    sixty.value = 60;
    sixty.innerText = "60 pontos";
    const seventy = document.createElement("option");
    seventy.value = 70;
    seventy.innerText = "70 pontos";

    // ACADEMIC YEAR DIVISIONS
    const evaluationSystem = document.createElement("p");
    evaluationSystem.innerHTML = 'Sistema de avaliação: <span id="term"></span>'

    const bimontly = document.createElement("label");
    bimontly.className = "btn-appearance"
    bimontly.id = "bimonthly";
    bimontly.innerHTML = `Bimestral <input type="radio" name="school${schoolNumber}[]" value="4" required />`

    const trimontly = document.createElement("label");
    trimontly.className = "btn-appearance"
    trimontly.id = "trimonthly";
    trimontly.innerHTML = `Trimestral <input type="radio" name="school${schoolNumber}[]" value="3" required />`

    // APPEND ELEMENTS
    const schoolGrayBox = document.querySelector("#set-schools .gray-box");
    schoolGrayBox.appendChild(schoolContent);
    schoolContent.appendChild(schoolLocation);
    schoolContent.appendChild(school);
    schoolContent.appendChild(passGrade);
    schoolContent.appendChild(evaluationSystem);
    schoolContent.appendChild(bimontly);
    schoolContent.appendChild(trimontly);

    schoolLocation.appendChild(state);
    schoolLocation.appendChild(municipality);
    school.appendChild(schoolOption);
    passGrade.appendChild(passGradeOption);
    passGrade.appendChild(scaleTenOption);
    passGrade.appendChild(five);
    passGrade.appendChild(six);
    passGrade.appendChild(seven);
    passGrade.appendChild(scaleHundredOption);
    passGrade.appendChild(fifty);
    passGrade.appendChild(sixty);
    passGrade.appendChild(seventy);

    state.appendChild(stateOption);
    municipality.appendChild(municipalityOption);

    // (IN)ACTIVATE BUTTONS
    delSchoolBtn.disabled = false;
    if (schoolNumber == 5) {
        addSchoolBtn.disabled = true;
    }
});

delSchoolBtn.addEventListener("mouseup", () => {
    schoolNumber--;

    let deleted;

    const tabsSSec = document.querySelectorAll("#new-schools .schools-tabs button");
    tabsSSec.forEach(tab => {
        const classList = tab.classList;
        [...classList].forEach(c => {
            if (c == "selected") {
                deleted = tab;
                tab.remove();
            }
        })
    });
    tabsSSec[tabsSSec.length - 2].classList.add("selected");

    const tabsCSec = document.querySelectorAll("#new-classes .schools-tabs button");
    tabsCSec.forEach(tab => {
        if (tab.innerText == deleted.innerText) {
            tab.remove();
        }
    });
    tabsCSec[0].classList.add("selected");

    addSchoolBtn.disabled = false;
    if (schoolNumber == 1) {
        delSchoolBtn.disabled = true;
    }

});

// IDENTIFYING CLASSES BY SCHOOL
let schoolSelect = document.getElementById("school1");

schoolSelect.addEventListener("change", () => {
    const schoolName = schoolSelect.value;

    const span = document.createElement("span");
    span.innerText = schoolName;

    const p = document.getElementsByClassName("name-school1");
    [...p].forEach(p => p.appendChild(span));
});