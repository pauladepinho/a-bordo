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