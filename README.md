# Calculadora UFSC

Site com o objetivo de facilitar cálculos relacionados ao vestibular da UFSC, como a pontuação de questões do tipo somatória e a nota final do candidato levando em consideração o peso das disciplinas.

### Somatória

O cálculo da pontuação de questões do tipo somatória segue a seguinte fórmula:

Se $NPC > NPI$

Então $P = \frac{NP - [ NTPC - ( NPC - NPI )]}{NP}$

Senão $P = 0.00$

Onde: <br/>
P — Pontuação do candidato na questão <br/>
NP — Número de proposições da questão <br/>
NTPC — Número total de proposições corretas na questão <br/>
NPC — Número de proposições corretas consideradas corretas pelo candidato <br/>
NPI — Número de proposições incorretas consideradas corretas pelo candidato <br/>

> Obs.: A pontuação da questão é expressa com duas casas decimais, com arredondamento na segunda casa decimal.

### Nota final

O cálculo da nota final, considerando o peso de cada disciplina para o curso escolhido, é dado pela fórmula:

$NF = \frac{100 * PT}{PMC}$

Onde: <br/>
NF — Nota final do candidato <br/>
PT — Soma dos pontos obtidos nas questões de proposições múltiplas, abertas, discursivas e na redação, considerando os pesos do curso <br/>
PMC — Pontuação máxima possível do curso, aplicando-se os pesos definidos no edital <br/>

> Obs.: A nota final do candidato é expressa na base centesimal, com duas casas decimais e arredondamento na segunda casa decimal.

### Edital

As fórmulas e os pesos adotados seguem o [edital do Vestibular de 2025](https://vestibularunificado2025.ufsc.br/edital/).
