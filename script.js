/* P = Pontuação do candidato na questão
 * NP = Número de proposições da questão
 * NTPC = Número total de proposições corretas da questão
 * NPC = Número de proposições corretas consideradas corretas pelo candidato
 * NPI = Número de proposições incorretas consideradas corretas pelo candidato
 */

function Calcular() {
    const np = Number(document.getElementById("quantidade").value);
    let soma = Number(document.getElementById("soma").value);
    let gabarito = Number(document.getElementById("gabarito").value);

    if (np < 3 | np > 7 | soma <= 0 | soma > 99 | gabarito <= 0 | gabarito > 99) {
        return alert("Há algum dado incorreto!");
    };

    if (soma > ((2 ** ( np - 1)) * 2) - 1 | gabarito > ((2 ** ( np - 1)) * 2) - 1) {
        return alert("A soma ou o gabarito estão acima do máximo!");
    };

    var preps = [];

    for (let i = np - 1; i >= 0; i--) {
        preps.push(2**i);
    };

    var ntpc = 0;
    var corretas = [];
    var incorretas = [];
    var assinaladas = [];

    preps.forEach((prep) => {
        if (gabarito >= prep) {
            ntpc++;
            corretas.push(prep);
            gabarito -= prep;
        } else {
            incorretas.push(prep);
        };

        if (soma >= prep) {
            assinaladas.push(prep);
            soma -= prep;
        };
    });

    const npc = corretas.filter(i => assinaladas.includes(i)).length;
    const npi = incorretas.filter(i => assinaladas.includes(i)).length;

    let p;

    if (npc > npi) {
        p = (np - (ntpc - (npc - npi))) / np;
    } else {
        p = 0;
    };

    document.getElementById('pontuacao').innerHTML = `<b>Pontuação:</b> ${p.toFixed(2).replace('.', ',')}`;
    document.getElementById('corretas').innerHTML = `<b>Corretas:</b> ${corretas.join(',&thinsp;')}`;
    document.getElementById('incorretas').innerHTML = `<b>Incorretas:</b> ${incorretas.join(',&thinsp;')}`;
    document.getElementById('assinaladas').innerHTML = `<b>Assinaladas:</b> ${assinaladas.join(',&thinsp;')}`;
};
