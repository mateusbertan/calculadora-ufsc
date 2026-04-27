/* P = Pontuação do candidato na questão
 * NP = Número de proposições da questão
 * NTPC = Número total de proposições corretas da questão
 * NPC = Número de proposições corretas consideradas corretas pelo candidato
 * NPI = Número de proposições incorretas consideradas corretas pelo candidato
 */

export default function calcSomatoria(np, soma, gabarito) {
  // Questão anulada
  if (np == 0) return 0;

  // Dado incorreto
  if (np < 0 | np > 7 | soma <= 0 | soma > 99 | gabarito <= 0 | gabarito > 99) {
    return 1;
  };

  // Questão aberta
  if (np == 1 && soma == gabarito) {
    return {p: '1.00'};
  } else if (np == 1 && soma !== gabarito) {
    return {p: '0.00'};
  };

  // Acima do limite (pode-se considerar a pontuação como 0 ou erro de validação)
  if (soma > (2 ** np) - 1 | gabarito > (2 ** np) - 1) {
    return 2;
  };

  let props = [];

  for (let i = np - 1; i >= 0; i--) {
    props.push(2 ** i);
  };

  let ntpc = 0;
  let corretas = [];
  let incorretas = [];
  let assinaladas = [];

  props.forEach((prop) => {
    if (gabarito >= prop) {
      ntpc++;
      corretas.push(prop);
      gabarito -= prop;
    } else {
      incorretas.push(prop);
    };

    if (soma >= prop) {
      assinaladas.push(prop);
      soma -= prop;
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

  p = p.toFixed(2);

  const resultado = { p, corretas, incorretas, assinaladas };

  return resultado;
};
