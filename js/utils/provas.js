const provasPath = '/assets/gabaritos.json';

document.addEventListener('DOMContentLoaded', async () => {
  const anoSelect = document.getElementById('ano');
  const diaSelect = document.getElementById('dia');
  const modeloSelect = document.getElementById('modelo');

  const gabaritos = await fetch(provasPath).then(r => r.json());

  const ordenarAnos = (anos) => {
    return anos.sort((a, b) => {
      const [anoA, extraA] = a.split('/');
      const [anoB, extraB] = b.split('/');

      if (anoA !== anoB) {
        return Number(anoB) - Number(anoA);
      }

      if (extraA && !extraB) return -1;
      if (!extraA && extraB) return 1;

      return 0;
    });
  };

  const anosOrdenados = ordenarAnos(Object.keys(gabaritos));

  anosOrdenados.forEach(ano => {
    const opt = document.createElement('option');
    opt.value = ano;
    opt.textContent = ano;
    anoSelect.appendChild(opt);
  });

  anoSelect.addEventListener('change', () => {
    const ano = anoSelect.value;
    const dias = Object.keys(gabaritos[ano]);

    diaSelect.innerHTML = '';
    modeloSelect.innerHTML = '';

    dias.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = `Dia ${d}`;
      diaSelect.appendChild(opt);
    });

    diaSelect.dispatchEvent(new Event('change'));
  });

  diaSelect.addEventListener('change', () => {
    const ano = anoSelect.value;
    const dia = diaSelect.value;
    const modelos = gabaritos[ano][dia];

    modeloSelect.innerHTML = '';

    modelos.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      modeloSelect.appendChild(opt);
    });
  });

  anoSelect.value = anosOrdenados[0];
  anoSelect.dispatchEvent(new Event('change'));
});
