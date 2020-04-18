const term = document.getElementById('term');
const bimonthly = document.getElementById('bimonthly');
const trimonthly = document.getElementById('trimonthly');

function isBimonthly() {
    term.innerHTML = 'Bimestral';
    bimonthly.classList.add('selected');
    trimonthly.classList.remove('selected');
}

function isTrimonthly() {
    term.innerHTML = 'Trimestral';
    trimonthly.classList.add('selected');
    bimonthly.classList.remove('selected');
}

function enableOption() {
    let option = document.getElementById("evaluation").value;

    let av1 = document.querySelector('#av1');
    av1.disabled = true
    let av2 = document.querySelector('#av2');
    av2.disabled = true
    let av3 = document.querySelector('#av3');
    av3.disabled = true
    let av4 = document.querySelector('#av4');
    av4.disabled = true

    if (option == '1') {
        av1.disabled = false;
    } else if (option == '2') {
        av2.disabled = false;
    } else if (option == '3') {
        av3.disabled = false;
    } else if (option == '4') {
        av4.disabled = false;
    }
}