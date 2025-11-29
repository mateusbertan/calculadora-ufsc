/* NF — Nota final do candidato
 * PT — Soma dos pontos obtidos nas questões de proposições múltiplas, abertas, discursivas e na redação, considerando os pesos do curso
 * PMC — Pontuação máxima possível do curso, aplicando-se os pesos definidos no edital
 */

const cursosPath = '/assets/cursos.json';

function NotaFinal() {
  const notaPli = Number(document.getElementById('pli').value.replace(/\D/g, "") / 100);
  const notaSli = Number(document.getElementById('sli').value.replace(/\D/g, "") / 100);
  const notaMtm = Number(document.getElementById('mtm').value.replace(/\D/g, "") / 100);
  const notaChs = Number(document.getElementById('chs').value.replace(/\D/g, "") / 100);
  const notaBlg = Number(document.getElementById('blg').value.replace(/\D/g, "") / 100);
  const notaFsc = Number(document.getElementById('fsc').value.replace(/\D/g, "") / 100);
  const notaQmc = Number(document.getElementById('qmc').value.replace(/\D/g, "") / 100);
  const notaDsc = Number(document.getElementById('dsc').value.replace(/\D/g, "") / 100);
  const notaRdc = Number(document.getElementById('rdc').value.replace(/\D/g, "") / 100);

  const numeroCurso = document.getElementById('curso').value;

  fetch(cursosPath)
    .then((response) => response.json())
    .then((json) => {
      const cursos = json;

      const arrayCurso = cursos.filter((curso) => curso.curso == numeroCurso);
      const pesosCurso = arrayCurso[0].pesos;
      const pmc = Number(arrayCurso[0].pmc);

      const pt =
        (notaPli * pesosCurso.pli) +
        (notaSli * pesosCurso.sli) +
        (notaMtm * pesosCurso.mtm) +
        (notaChs * pesosCurso.chs) +
        (notaBlg * pesosCurso.blg) +
        (notaFsc * pesosCurso.fsc) +
        (notaQmc * pesosCurso.qmc) +
        (notaDsc * pesosCurso.dsc) +
        (notaRdc * pesosCurso.rdc);

      const nf = (pt * 100) / pmc;

      const pontuacao = notaPli + notaSli + notaMtm + notaChs + notaBlg + notaFsc + notaQmc + notaDsc + notaRdc;

      document.getElementById('notafinal').innerHTML = `<b>Nota Final:</b> ${nf.toFixed(2).replace('.', ',')}`;
      document.getElementById('pontuacaototal').innerHTML = `<b>Pontuação Total:</b> ${pontuacao.toFixed(2).replace('.', ',')}`;
    });
};

window.NotaFinal = NotaFinal;
