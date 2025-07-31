document.getElementById('go').addEventListener('click', function () {
    const code = document.getElementById('searchbar').value.trim();
    if (code) {
        window.location.href = `Glizzywood/${code}`;
    } else {
        alert("Veuillez entrer un code.");
    }
});