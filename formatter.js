function manualFormatter() {

    // recupero il valore dall'id dell'elemento
    let soldi = document.getElementById("soldi").value;
    // controllo che vengano inserite solo cifre e virgole/punti
    let soloNumeri = /^(?!,$)[\d,.]+$/.test(soldi); // (?!,$) negative lookahead, per non avere solo la virgola come unico carattere

    while (!soloNumeri) {
        confirm("Capra!");
        return;
    }

    // test in console
    console.log("Hai inserito: " + soldi)
    console.log("Tipo: " + typeof(soldi))
    
    // elimino i punti e splitto la stringa alla virgola (altrimenti devo cancellare e riscrivere il numero per intero)
    soldiSenzaPunti = soldi.replaceAll('.', '');
    soldiDivisi = soldiSenzaPunti.split(',');

    console.log("Pezzo a sinistra della virgola: " + soldiDivisi[0] + ", lunghezza = " + soldiDivisi[0].length);
    if(soldiDivisi[1]) {
        console.log("Pezzo a destra della virgola: " + soldiDivisi[1] + ", lunghezza = " + soldiDivisi[1].length);
    } 

    if (soldiDivisi[0].length >= 3) {
        // parte intera + di 3 cifre -> inserisco punto ogni 3 posti
        soldiDivisi[0] = soldiDivisi[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    } else if (soldiDivisi[0].length == 0) {
        soldiDivisi[0] = "".padStart(1, '0');
    }

    if (!soldiDivisi[1]) {
        // se non ci sono decimali, creo una stringa nuova e inserisco zeri
        soldiDivisi[1] = "".padEnd(2, '0');
    } else if (soldiDivisi[1] && soldiDivisi[1].length < 2) {
        // se meno di 2 decimali, inserisco max 2 zeri in coda
        soldiDivisi[1] = soldiDivisi[1].padEnd(2, '0');
    } else if (soldiDivisi[1].length > 2) {
        // se più di 3 cifre decimali
        alert("Non si arrotonda niente.");
    }

    // rimetto insieme le due stringhe
    soldi = soldiDivisi.join(',');
    console.log("Formattato manualmente: " + soldi);
    // modifico il valore all'interno del text field
    document.getElementById("soldi").value = soldi;
}

// test
function localeFormatter() {
    let soldi = parseInt(document.getElementById("cash").value);
    soldi.toLocaleString();
    console.log("Formattato con locale: " + soldi);
}

// test
function internationalFormatter() {
    let soldi = parseInt(document.getElementById("cash").value);
    console.log(typeof(soldi))
    var formatter = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    });
    formatter.format(soldi);
    console.log("Formattato con Intl: " + soldi);
   
}