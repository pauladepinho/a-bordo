function mostrarChamada(){
    let presence = document.getElementById("presence")
    presence.hidden = false;
    let notes = document.getElementById("notes")
    notes.hidden = true
}

function mostrarNota(){
    let presence = document.getElementById("presence")
    presence.hidden = true;
    let notes = document.getElementById("notes")
    notes.hidden = false;
}