import calcSomatorio from '/js/utils/calcSomatorio.js';
import { maskSoma } from '/js/utils/inputMasks.js';

const gabaritoPath = '/assets/Gabaritos';

function atualizarResultadoDisciplina(element) {
  const disciplina = element.name.split('_')[1]; 
  const inputsDisciplina = document.querySelectorAll(`input[name^="soma_${disciplina}_"]`);

  let total = 0;

  inputsDisciplina.forEach(inp => {
    const num = inp.getAttribute('num');
    const pontEl = document.getElementById(`pont_${num}`);
    if (pontEl) {
      const val = pontEl.innerHTML.replace(',', '.');
      const f = parseFloat(val);
      if (!isNaN(f)) total += f;
    }
  });

  const resDisciplina = document.getElementById(`resultado_${disciplina}`);
  if (resDisciplina) {
    resDisciplina.innerHTML = total.toFixed(2).replace('.', ',');
  }
};

function Simular() {
  event.preventDefault();

  const anoProva = document.getElementById('ano').value;
  const diaProva = document.getElementById('dia').value;
  const modeloProva = document.getElementById('modelo').value

  const inputsContainer = document.getElementById('inputs');
  const resultContainer = document.getElementById('resultado');

  inputsContainer.innerHTML = '';
  resultContainer.innerHTML = '';

  fetch(`${gabaritoPath}/${anoProva.replace('/', '-')}/${diaProva}_${modeloProva}.json`)
    .then(response => response.json())
    .then(json => {
      resultContainer.innerHTML += `
        <section class="resultadoTitle">
          <p>Pontuação:</p>
        </section>
      `;

      Object.keys(json).forEach(disciplina => {
        let anuladas = 0;
        let blocoDisciplina = document.createElement('section');
        blocoDisciplina.classList.add('disciplinaContainer');
        blocoDisciplina.id = disciplina;

        blocoDisciplina.innerHTML += `
          <section class="disciplinaHeader">
            <p class="disciplinaTitle">${disciplina}</p>
            <section class="questoesHeader">
              <p>Questão</p>
              <p>Resposta</p>
              <p>Gabarito</p>
              <p>Pontuação</p>
            </section>
          </section>
        `;

        json[disciplina].forEach(questao => {
          if (questao.props == 0) {
            anuladas++;
            blocoDisciplina.innerHTML += `
              <section class="questao anulada" id="q${questao.num}">
                <section class="num">${questao.num}</section>
                <p>ANULADA</p>
              `;
            return;
          };

          blocoDisciplina.innerHTML += `
            <section class="questao" id="q${questao.num}">
              <section class="num">
                ${questao.num}
              </section>
              <section class="soma">
                <input
                  type="number"
                  id="soma_${disciplina}_${questao.num}"
                  name="soma_${disciplina}_${questao.num}"
                  class="somaInputs"
                  min="0"
                  max="99"
                  maxlength="2"
                  num="${questao.num}"
                  np="${questao.props}"
                  gab="${questao.soma}"
                  required
                  maskSoma
                  questao
                >
              </section>
              <section class="gabarito">
                ${questao.soma}
              </section>
              <section id="pont_${questao.num}">
                0,00
              </section>
            </section>
          `;
        });

        resultContainer.innerHTML += `
          <section class="containerResultado">
            <p class="resultadoDisciplina">${disciplina}:</p>
            <section class="resultadoPontuacao">
              <p id="resultado_${disciplina}">0,00</p>
              <p class="resultadoPontos">/${json[disciplina].length - anuladas}pts</p>
            </section>
          </section>
        `;

        inputsContainer.appendChild(blocoDisciplina);
      });

      document.querySelectorAll('[questao]').forEach(element => {
        maskSoma(element);
        element.addEventListener('change', () => {
          const pontSec = document.getElementById(`pont_${element.getAttribute("num")}`);

          if (element.value === '') {
            pontSec.innerHTML = '0,00';
            pontSec.style.color = '';
            atualizarResultadoDisciplina(element);
            return;
          };

          const resultado = calcSomatorio(
            Number(element.getAttribute("np")),
            Number(element.value),
            Number(element.getAttribute("gab"))
          );

          const pont = resultado.p || '0,00';
          pontSec.innerHTML = pont.replace('.', ',');

          function getColor(pont) {
            const n = Number(pont);

            if (n > 0.7) return '#00C853';
            if (n > 0.0) return '#FF9800';
            return '#D50000';
          };

          let color = getColor(pont);

          pontSec.style.color = color;

          atualizarResultadoDisciplina(element);
        });
      });
    });
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-simulado');

  form.addEventListener('submit', Simular);
});
