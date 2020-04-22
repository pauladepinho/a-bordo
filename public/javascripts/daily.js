function mostrarChamada(){
    let presence = document.getElementById("presence")
    presence.hidden = false;
    let notes = document.getElementById("notes")
    notes.hidden = true
    let container = document.getElementById("chart")
    container.hidden = true
}

function mostrarNota(){
    let presence = document.getElementById("presence")
    presence.hidden = true;
    let notes = document.getElementById("notes")
    notes.hidden = false;
    let container = document.getElementById("chart")
    container.hidden = false
}

