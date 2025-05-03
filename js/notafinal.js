const cursosPath = '/assets/cursos.json';

document.addEventListener('DOMContentLoaded', () => {
    const campusSelect = document.getElementById('campus');
    const cursoSelect = document.getElementById('curso');
    const elementosPeso = document.getElementsByClassName('peso');

    fetch(cursosPath)
    .then((response) => response.json())
    .then((json) => {
        const cursos = json;

        cursos.forEach(curso => {
            if (curso.campus === campusSelect.value) {
                atualizarCursos(curso);
            };
        });
        
        const pesosPrimeiroCurso = cursos[0].pesos;

        for (i = 0; i < elementosPeso.length; i++) {
            const disciplina = elementosPeso[i].className.slice(5,8);
            const peso = pesosPrimeiroCurso[disciplina];
            elementosPeso[i].innerHTML = `<b>${String(peso).replace('.',',')}</b>`;
        };

        campusSelect.addEventListener("change", () => {
            cursoSelect.innerHTML = '';

            cursos.forEach(curso => {
                if (curso.campus === campusSelect.value) {
                    atualizarCursos(curso);
                };
            });

            atualizarPesos();
        });

        cursoSelect.addEventListener("change", () => {
            atualizarPesos();
        });

        function atualizarCursos(curso) {
            const option = document.createElement('option');
            option.value = curso.curso;
            option.textContent = curso.nome;
            cursoSelect.appendChild(option);
        };

        function atualizarPesos() {
            const numeroCurso = cursoSelect.value;
            const arrayCurso = cursos.filter((curso) => curso.curso == numeroCurso);
            const pesosCurso = arrayCurso[0].pesos;

            for (i = 0; i < elementosPeso.length; i++) {
                const disciplina = elementosPeso[i].className.slice(5,8);
                const peso = pesosCurso[disciplina];
                elementosPeso[i].innerHTML = `<b>${String(peso).replace('.',',')}</b>`;
            };
        };
    });
});

/* NF — Nota final do candidato
 * PT — Soma dos pontos obtidos nas questões de proposições múltiplas, abertas, discursivas e na redação, considerando os pesos do curso
 * PMC — Pontuação máxima possível do curso, aplicando-se os pesos definidos no edital
 */

function NotaFinal() {
    const notaPli = Number(document.getElementById('pli').value);
    const notaSli = Number(document.getElementById('sli').value);
    const notaMtm = Number(document.getElementById('mtm').value);
    const notaChs = Number(document.getElementById('chs').value);
    const notaBlg = Number(document.getElementById('blg').value);
    const notaFsc = Number(document.getElementById('fsc').value);
    const notaQmc = Number(document.getElementById('qmc').value);
    const notaDsc = Number(document.getElementById('dsc').value);
    const notaRdc = Number(document.getElementById('rdc').value);

    const numeroCurso = document.getElementById('curso').value;

    fetch(cursosPath)
    .then((response) => response.json())
    .then((json) => {
        const cursos = json;

        const arrayCurso = cursos.filter((curso) => curso.curso == numeroCurso);
        const pesosCurso = arrayCurso[0].pesos;
        const pmc = Number(arrayCurso[0].pmc);

        const pt = (notaPli * pesosCurso.pli) + (notaSli * pesosCurso.sli) + (notaMtm * pesosCurso.mtm) + (notaChs * pesosCurso.chs) + (notaBlg * pesosCurso.blg) + (notaFsc * pesosCurso.fsc) + (notaQmc * pesosCurso.qmc) + (notaDsc * pesosCurso.dsc) + (notaRdc * pesosCurso.rdc);

        const nf = (pt * 100)/pmc;

        const pontuacao = notaPli + notaSli + notaMtm + notaChs + notaBlg + notaFsc + notaQmc + notaDsc + notaRdc;
    
        document.getElementById('notafinal').innerHTML = `<b>Nota final:</b> ${nf.toFixed(2).replace('.', ',')}`;
        document.getElementById('pontuacaototal').innerHTML = `<b>Pontuação Total:</b> ${pontuacao.toFixed(2).replace('.', ',')}`;
    });
};
