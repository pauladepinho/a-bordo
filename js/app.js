const assess = document.getElementById('assess');
const bimonthly = document.getElementById('bimonthly');
const trimonthly = document.getElementById('trimonthly');

function isBimonthly() {
    assess.innerHTML = 'Avaliações BIMESTRAIS';
    bimonthly.classList.add('active');
    trimonthly.classList.remove('active');
}

function isTrimonthly() {
    assess.innerHTML = 'Avaliações TRIMESTRAIS';
    trimonthly.classList.add('active');
    bimonthly.classList.remove('active');
}