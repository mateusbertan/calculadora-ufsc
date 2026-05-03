import calcSomatorio from './utils/calcSomatorio.js';

function Somatorio() {
  event.preventDefault();

  const np = Number(document.getElementById('quantidade').value);
  const soma = Number(document.getElementById('soma').value);
  const gabarito = Number(document.getElementById('gabarito').value);

  const resultado = calcSomatorio(np, soma, gabarito);

  if (resultado === 1) {
    return alert('Há algum dado incorreto!');
  };

  if (resultado === 2) {
    return alert('A soma ou o gabarito estão acima do máximo!');
  };

  document.getElementById('pontuacao').innerHTML = `<b>Pontuação:</b> ${resultado.p.replace('.', ',')}`;
  document.getElementById('corretas').innerHTML = resultado.corretas.length > 0 ? `<b>Corretas:</b> ${resultado.corretas.join(',&thinsp;')}` : '';
  document.getElementById('incorretas').innerHTML = resultado.incorretas.length > 0 ? `<b>Incorretas:</b> ${resultado.incorretas.join(',&thinsp;')}` : '';
  document.getElementById('assinaladas').innerHTML = `<b>Assinaladas:</b> ${resultado.assinaladas.join(',&thinsp;')}`;
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-somatorio');

  form.addEventListener('submit', Somatorio);
});
