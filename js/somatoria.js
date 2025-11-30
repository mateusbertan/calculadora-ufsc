import calcSomatoria from './utils/calcSomatoria.js';

function Somatoria() {
  event.preventDefault();

  const np = Number(document.getElementById('quantidade').value);
  const soma = Number(document.getElementById('soma').value);
  const gabarito = Number(document.getElementById('gabarito').value);

  const resultado = calcSomatoria(np, soma, gabarito);

  if (resultado === 1) {
    return alert('Há algum dado incorreto!');
  };

  if (resultado === 2) {
    return alert('A soma ou o gabarito estão acima do máximo!');
  };

  document.getElementById('pontuacao').innerHTML = `<b>Pontuação:</b> ${resultado.p.replace('.', ',')}`;
  document.getElementById('corretas').innerHTML = `<b>Corretas:</b> ${resultado.corretas.join(',&thinsp;')}`;
  document.getElementById('incorretas').innerHTML = `<b>Incorretas:</b> ${resultado.incorretas.join(',&thinsp;')}`;
  document.getElementById('assinaladas').innerHTML = `<b>Assinaladas:</b> ${resultado.assinaladas.join(',&thinsp;')}`;
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-somatoria');

  form.addEventListener('submit', Somatoria);
});
