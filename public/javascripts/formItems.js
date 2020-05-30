/*
    TEACHER'S REGISTER FORM LAYOUT:
    (SCHOOLS SECTION - SS)
     ----------------------- --- ---
    |   SCHOOLS TABS        | + | - |
     ----------------------- --- ---
    |   SELECTED SCHOOL CONTENT     |
     -------------------------------
    (CLASSES SECTION - CS)
     -------------------
    |   SCHOOLS TABS    |
     ----------------------- --- ---
    |   CLASSES TABS        | + | - |
     ----------------------- --- ---
    |   SELECTED CLASS CONTENT      |
     -------------------------------
*/

let schoolCount = 0; // decreases on school deletion
let schoolNumber = 0; // never decreases

// let schoolCount = 1; // decreases on school deletion
// let schoolNumber = 1; // never decreases

const enter = 13; // keyboard key;

const addSchoolBtn = document.getElementById("add-school");
const delSchoolBtn = document.getElementById("del-school");
let schoolsTabs = document.querySelectorAll("#new-schools .schools-tabs button");

const selectSchool = (tab) => {
    // REMOVE THE SELECTED CLASS FROM ALL TABS
    schoolsTabs.forEach(tab => tab.classList.remove("selected"));

    // TOGGLE SCHOOLS CONTENTS VISIBILITY
    const schoolsContents = document.getElementsByClassName("school-content");
    [...schoolsContents].forEach(school => {

        school.classList.forEach(c => {

            if (c != tab.className) {
                school.hidden = true;
            } else {
                school.hidden = false;
            }
        })
    });
    // ADD SELECTED CLASS ONLY TO THIS TAB
    tab.classList.add("selected");
};

const addSchool = () => {
    schoolNumber++;
    schoolCount++;

    /* 
        NEW SCHOOL TAB
    */

    // REMOVE CLASS SELECTED FROM PREVIOUSLY SELECTED TAB (HTML SCHOOLS SECTION ONLY)
    schoolsTabs.forEach(tab => tab.classList.remove("selected"));

    // CREATE NEW TAB
    // HTML SCHOOLS SECTION TAB
    const schoolTab = document.createElement("button");
    schoolTab.type = "button";
    schoolTab.classList.add(`school${schoolNumber}`, "selected");
    schoolTab.innerText = `Escola ${schoolNumber}`;

    // HTML CLASSES SECTION TAB
    const tabCSec = document.createElement("button");
    tabCSec.type = "button";
    tabCSec.className = `school${schoolNumber}`;
    tabCSec.innerText = `Escola ${schoolNumber}`;

    // APPEND EACH NEW TAB TO TABS ON CORRESPONDING SECTIONS
    const tabsList = document.querySelectorAll(".schools-tabs");
    tabsList[0].appendChild(schoolTab);
    tabsList[1].appendChild(tabCSec);

    /* 
        NEW SCHOOL CONTENT
    */

    // HIDE PREVIOUSLY SELECTED SCHOOL CONTENT
    const previousSchoolsContents = document.getElementsByClassName("school-content");
    [...previousSchoolsContents].forEach(school => {
        if (!school.hidden) {
            school.hidden = true;
        }
    });

    // NEW CONTENT DIV
    const schoolContent = document.createElement("div");
    schoolContent.classList.add("school-content", `school${schoolNumber}`);

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

    /*
        APPEND ELEMENTS
    */

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

    /*
        WRAP EVERYTHING UP
    */

    // POPULATE SELECTS THROUGH API
    populateStatesSelect(state);
    state.addEventListener("change", () => populateMunicipalitiesSelect(municipality, state));
    municipality.addEventListener("change", () => populateSchoolsSelect(school, municipality));

    // UPDATE TABS LIST
    schoolsTabs = document.querySelectorAll("#new-schools .schools-tabs button");

    // LISTEN TO SELECT SCHOOL FUNCTION
    schoolsTabs.forEach(tab => {
        tab.addEventListener("mouseup", () => selectSchool(tab));
        tab.addEventListener("keydown", evt => {
            if (evt.keyCode == enter) { selectSchool(tab); }
        });
    });
    // TOGGLE ADD AND DEL BUTTONS
    delSchoolBtn.disabled = false;
    if (schoolCount == 5) {
        addSchoolBtn.disabled = true;
    }
};

const delSchool = () => {
    // IDENTIFY SCHOOL TO DELETE
    let school;
    schoolsTabs.forEach(tab => {
        const classList = tab.classList;
        [...classList].forEach(c => {
            if (c == "selected") { school = tab; }
        });
    });
    // CONFIRM DELETION
    if (!confirm(`Tem certeza que deseja deletar a ${school.innerText}?`)) { return; }
    schoolCount--;
    // REMOVE TAB BUTTON FROM SCHOOLS TABS
    school.remove();
    const tabsCSec = document.querySelectorAll("#new-classes .schools-tabs button");
    tabsCSec.forEach(tab => {
        if (tab.innerText == school.innerText) {
            tab.remove();
        }
    });

    //  UPDATE TABS LIST
    schoolsTabs = document.querySelectorAll("#new-schools .schools-tabs button");

    // ADD SELECTED CLASS TO LAST TAB IN THE LIST
    schoolsTabs[schoolsTabs.length - 1].classList.add("selected");
    tabsCSec[0].classList.add("selected");

    /* 
        REMOVE SCHOOL CONTENT FROM SCHOOL SECTION FORM
    */
    const schoolsContents = document.getElementsByClassName("school-content");
    [...schoolsContents].forEach(school => {
        if (!school.hidden) {
            school.remove();
        }
    });
    schoolsContents[schoolsContents.length - 1].hidden = false;
    /*
        (IN)ACTIVATE BUTTONS
    */
    addSchoolBtn.disabled = false;
    if (schoolCount == 1) {
        delSchoolBtn.disabled = true;
    }

};

// APIs

const populateStatesSelect = (statesSelect) => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            states.forEach(state => {

                const option = document.createElement("option");
                option.value = state.sigla;
                option.textContent = state.nome;

                statesSelect.appendChild(option);
            })
        })
        .catch(error => {
            console.log(error);
        });
};

const populateMunicipalitiesSelect = (municipalitiesSelect, statesSelect) => {

    municipalitiesSelect.removeAttribute("disabled");
    let nodesMunicipalitiesSelect = municipalitiesSelect.childNodes;
    [...nodesMunicipalitiesSelect].map(node => node.remove());

    let selectedState = statesSelect.options[statesSelect.selectedIndex].value;

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = `http://educacao.dadosabertosbr.com/api/cidades/${selectedState}`;

    fetch(proxyUrl + targetUrl)
        .then(res => res.json())
        .then(municipalities => {

            municipalities.forEach(municipality => {

                let codeName = municipality.split(":");
                let name = codeName[1];

                const option = document.createElement("option");
                option.value = municipality;
                option.textContent = name;

                municipalitiesSelect.appendChild(option);
            });

            const option = document.createElement("option");
            option.textContent = "Município";
            option.selected = "selected";
            option.disabled = "disabled";
            municipalitiesSelect.prepend(option);
        })
        .catch(error => {
            console.log(error);
        });
};

const populateSchoolsSelect = (schoolsSelect, municipalitiesSelect) => {

    schoolsSelect.removeAttribute("disabled");
    let nodesSchoolsSelect = schoolsSelect.childNodes;
    [...nodesSchoolsSelect].map(node => node.remove());

    let selectedMunicipality = municipalitiesSelect.options[municipalitiesSelect.selectedIndex].value;
    let codeName = selectedMunicipality.split(":");
    let code = codeName[0];

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = `http://educacao.dadosabertosbr.com/api/escolas/buscaavancada?cidade=${code}`;

    fetch(proxyUrl + targetUrl)
        .then(res => res.json())
        .then(schools => {

            schools[1].forEach(school => {

                const option = document.createElement("option");
                option.value = school.nome;
                option.textContent = school.nome;

                schoolsSelect.appendChild(option);
            });

            const option = document.createElement("option");
            option.textContent = "Nome da escola";
            option.selected = "selected";
            option.disabled = "disabled";
            schoolsSelect.prepend(option);
        })
        .catch(error => {
            console.log(error);
        });
};




// ADD SCHOOL
window.addEventListener("load", () => addSchool());
addSchoolBtn.addEventListener("mouseup", () => addSchool());
addSchoolBtn.addEventListener("keydown", evt => {
    if (evt.keyCode == enter) { addSchool(); }
});
// DELETE SCHOOL
delSchoolBtn.addEventListener("mouseup", () => delSchool());
delSchoolBtn.addEventListener("keydown", evt => {
    if (evt.keyCode == enter) { delSchool(); }
});





/////////////////////////////////////////////////////////

// IDENTIFYING CLASSES BY SCHOOL
// let schoolSelect = document.getElementById("school1");
// schoolSelect.addEventListener("change", () => {
//     const schoolName = schoolSelect.value;

//     const span = document.createElement("span");
//     span.innerText = schoolName;

//     const p = document.getElementsByClassName("name-school1");
//     [...p].forEach(p => p.appendChild(span));
// });



/*
    API CONSUMPTION
*/

// const statesSelect = document.getElementById("state-school1");
// const municipalitiesSelect = document.getElementById("municipality-school1");
// const schoolsSelect = document.getElementById("school1");

/*
    FUNCTIONS EXPRESSIONS
*/

// const populateStatesSelect = (statesSelect) => {
//     fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
//         .then(res => res.json())
//         .then(states => {

//             states.forEach(state => {

//                 const option = document.createElement("option");
//                 option.value = state.sigla;
//                 option.textContent = state.nome;

//                 statesSelect.appendChild(option);
//             })
//         })
//         .catch(error => {
//             console.log(error);
//         });
// };

// const populateMunicipalitiesSelect = (municipalitiesSelect) => {

//     municipalitiesSelect.removeAttribute("disabled");
//     let nodesMunicipalitiesSelect = municipalitiesSelect.childNodes;
//     [...nodesMunicipalitiesSelect].map(node => node.remove());

//     let selectedState = statesSelect.options[statesSelect.selectedIndex].value;

//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
//         targetUrl = `http://educacao.dadosabertosbr.com/api/cidades/${selectedState}`;

//     fetch(proxyUrl + targetUrl)
//         .then(res => res.json())
//         .then(municipalities => {

//             municipalities.forEach(municipality => {

//                 let codeName = municipality.split(":");
//                 let name = codeName[1];

//                 const option = document.createElement("option");
//                 option.value = municipality;
//                 option.textContent = name;

//                 municipalitiesSelect.appendChild(option);
//             });

//             const option = document.createElement("option");
//             option.textContent = "Município";
//             option.selected = "selected";
//             option.disabled = "disabled";
//             municipalitiesSelect.prepend(option);
//         })
//         .catch(error => {
//             console.log(error);
//         });
// };

// const populateSchoolsSelect = (schoolsSelect) => {

//     schoolsSelect.removeAttribute("disabled");
//     let nodesSchoolsSelect = schoolsSelect.childNodes;
//     [...nodesSchoolsSelect].map(node => node.remove());

//     let selectedMunicipality = municipalitiesSelect.options[municipalitiesSelect.selectedIndex].value;
//     let codeName = selectedMunicipality.split(":");
//     let code = codeName[0];

//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
//         targetUrl = `http://educacao.dadosabertosbr.com/api/escolas/buscaavancada?cidade=${code}`;

//     fetch(proxyUrl + targetUrl)
//         .then(res => res.json())
//         .then(schools => {

//             schools[1].forEach(school => {

//                 const option = document.createElement("option");
//                 option.value = school.nome;
//                 option.textContent = school.nome;

//                 schoolsSelect.appendChild(option);
//             });

//             const option = document.createElement("option");
//             option.textContent = "Nome da escola";
//             option.selected = "selected";
//             option.disabled = "disabled";
//             schoolsSelect.prepend(option);
//         })
//         .catch(error => {
//             console.log(error);
//         });
// };

/*
    FUNCTIONS CALLS
*/

// populateStatesSelect(statesSelect);
// statesSelect.addEventListener("change", () => populateMunicipalitiesSelect(municipalitiesSelect));
// municipalitiesSelect.addEventListener("change", () => populateSchoolsSelect(schoolsSelect));