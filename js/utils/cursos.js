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
        const disciplina = elementosPeso[i].className.slice(5, 8);
        const peso = pesosPrimeiroCurso[disciplina];
        elementosPeso[i].innerHTML = `<b>${String(peso).replace('.', ',')}</b>`;
      };

      campusSelect.addEventListener('change', () => {
        cursoSelect.innerHTML = '';

        cursos.forEach(curso => {
          if (curso.campus === campusSelect.value) {
            atualizarCursos(curso);
          };
        });

        atualizarPesos();
      });

      cursoSelect.addEventListener('change', () => {
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
          const disciplina = elementosPeso[i].className.slice(5, 8);
          const peso = pesosCurso[disciplina];
          elementosPeso[i].innerHTML = `<b>${String(peso).replace('.', ',')}</b>`;
        };
      };
    });
});
