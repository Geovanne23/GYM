const { db, initDB } = require('./database');

const D1 = [
  {
    id: 'semana', title: 'Semana', type: 'week', days: [
      { d: 'Seg', plan: 'Treino A', sub: 'Peito · Ombro · Tríceps · Abd' },
      { d: 'Ter', plan: 'Treino B', sub: 'Costas · Bíceps' },
      { d: 'Qua', plan: 'Descanso', sub: 'Recuperação ativa' },
      { d: 'Qui', plan: 'Treino C', sub: 'Membros Inferiores · Abd' },
      { d: 'Sex', plan: 'Treino D', sub: 'Ombros · Peito · Tríceps' },
      { d: 'Sáb', plan: 'Treino E', sub: 'Bíceps · Costas · Abd' },
      { d: 'Dom', plan: 'Descanso', sub: 'Repouso total' }
    ]
  },
  {
    id: 'treino-a', title: 'Treino A', sub: 'Peito, Ombros e Tríceps', alert: 'Mobilidade de ombros antes de começar',
    ex: [
      { id: 'a1', n: 'Supino Inclinado c/ Halteres ou Máquina', t: null, s: [{ l: 'Aquecimento', d: '1–2 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2–3 min)' }] },
      { id: 'a2', n: 'Supino Reto c/ Halteres ou Máquina', t: '2 rest-pause de 10s na última série', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2–3 min)' }] },
      { id: 'a3', n: 'Supino Declinado — Barra ou Máquina', t: null, s: [{ l: 'Ajuste', d: '1 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2 min)' }] },
      { id: 'a4', n: 'Voador', t: '2s pico de contração + 1 dropset', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 10–15 (1 min)' }] },
      { id: 'a5', n: 'Elevação Frontal', t: null, s: [{ l: 'Ajuste', d: '1 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2 min)' }] },
      { id: 'a6', n: 'Elevação Lateral Sentado c/ Halteres', t: '1 drop set', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1 min)' }, { l: 'Trabalho', d: '2 × 8–12 (1 min)' }] },
      { id: 'a7', n: 'Tríceps Francês na Corda', t: null, s: [{ l: 'Ajuste', d: '1 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '3 × 6–10 (2 min)' }] },
      { id: 'a8', n: 'Abdominal Infra na Torre', t: '2s pico', s: [{ l: 'Trabalho', d: '3 × RM (1 min)' }] },
      { id: 'a9', n: 'Abdominal Supra na Prancha Declinada', t: null, s: [{ l: 'Trabalho', d: '3 × RM (1 min)' }] }
    ]
  },
  {
    id: 'treino-b', title: 'Treino B', sub: 'Costas e Bíceps', alert: 'Mobilidade de ombros + alongamento do peito',
    ex: [
      { id: 'b1', n: 'Remada Curvada com Barra', t: '2s pico de contração', s: [{ l: 'Aquecimento', d: '1–2 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2–3 min)' }] },
      { id: 'b2', n: 'Remada Baixa Triângulo', t: '2s pico + 2 rest-pause', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2–3 min)' }] },
      { id: 'b3', n: 'Remada Baixa Pegada Aberta / Máquina', t: '2s pico', s: [{ l: 'Ajuste', d: '1 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2 min)' }] },
      { id: 'b4', n: 'Pulley Frente Triângulo', t: '2s pico + 1 drop', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 8–12 (2 min)' }] },
      { id: 'b5', n: 'Meio Terra', t: null, s: [{ l: 'Aquecimento', d: '1 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2–3 min)' }] },
      { id: 'b6', n: 'Hiperextensão no Banco Romano', t: null, s: [{ l: 'Trabalho', d: '3 × 10–15 (90s)' }] },
      { id: 'b7', n: 'Rosca Scott Máquina', t: '2s pico de contração', s: [{ l: 'Ajuste', d: '1 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '3 × 6–10 (2 min)' }] }
    ]
  },
  {
    id: 'treino-c', title: 'Treino C', sub: 'Membros Inferiores', alert: 'Mobilidade: posteriores, glúteos, quadríceps e ílio-psoas',
    ex: [
      { id: 'c1', n: 'Agachamento Livre', t: null, s: [{ l: 'Aquecimento', d: '1–2 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2–3 min)' }] },
      { id: 'c2', n: 'Leg 45°', t: '2 rest-pause', s: [{ l: 'Ajuste', d: '1 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 8–12 (2–3 min)' }] },
      { id: 'c3', n: 'Extensor', t: '2s pico', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 10–15 (1 min)' }] },
      { id: 'c4', n: 'Flexor Deitado', t: '2s pico', s: [{ l: 'Aquecimento', d: '1 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2–3 min)' }] },
      { id: 'c5', n: 'Stiff', t: null, s: [{ l: 'Aquecimento', d: '1 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 8–10 (2–3 min)' }] },
      { id: 'c6', n: 'Elevação de Quadril', t: '2s pico + 1 drop', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2–3 min)' }] },
      { id: 'c7', n: 'Panturrilha em Pé (máquina ou smith)', t: '2s pico', s: [{ l: 'Aquecimento', d: '1–2 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '3 × 10–15 (2 min)' }] },
      { id: 'c8', n: 'Abdominal Infra na Torre', t: '2s pico', s: [{ l: 'Trabalho', d: '3 × RM (1 min)' }] },
      { id: 'c9', n: 'Abdominal Supra na Prancha Declinada', t: null, s: [{ l: 'Trabalho', d: '3 × RM (1 min)' }] }
    ]
  },
  {
    id: 'treino-d', title: 'Treino D', sub: 'Ombros, Peito e Tríceps', alert: 'Mobilidade e alongamento de ombros e tríceps',
    ex: [
      { id: 'd1', n: 'Desenvolvimento com Halteres', t: null, s: [{ l: 'Aquecimento', d: '1–2 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2–3 min)' }] },
      { id: 'd2', n: 'Elevação Frontal', t: '2 rest-pause', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1 min)' }, { l: 'Trabalho', d: '2 × 10–15 (1 min)' }] },
      { id: 'd3', n: 'Elevação Lateral Sentado c/ Halteres', t: null, s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1 min)' }, { l: 'Trabalho', d: '2 × 8–12 (1 min)' }] },
      { id: 'd4', n: 'Elevação Lateral Máquina ou Unilateral no Cabo', t: '1 drop set', s: [{ l: 'Ajuste', d: '1 × 4–6 (1 min)' }, { l: 'Trabalho', d: '2 × 8–12 (1 min)' }] },
      { id: 'd5', n: 'Voador', t: '2s pico', s: [{ l: 'Aquecimento', d: '1–2 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '3 × 6–10 (2–3 min)' }] },
      { id: 'd6', n: 'Tríceps Corda', t: '2s pico', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '3 × 6–10 (2 min)' }] },
      { id: 'd7', n: 'Tríceps Testa Corda Banco 35°', t: '2 rest-pause', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '3 × 8–12 (2 min)' }] }
    ]
  },
  {
    id: 'treino-e', title: 'Treino E', sub: 'Bíceps, Costas e Abdômen', alert: 'Mobilidade de ombros + alongamento do peito',
    ex: [
      { id: 'e1', n: 'Rosca Direta Cabo', t: '2s pico', s: [{ l: 'Aquecimento', d: '1–2 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2–3 min)' }] },
      { id: 'e2', n: 'Rosca Scott Máquina ou no Cabo', t: '2s pico + 2 rest-pause', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 8–12 (2 min)' }] },
      { id: 'e3', n: 'Rosca Direta Corda', t: '1 drop set', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 10–15 (1 min)' }] },
      { id: 'e4', n: 'Pulley Frente Aberto', t: '2s pico', s: [{ l: 'Aquecimento', d: '1–2 × 10–15 (1 min)' }, { l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '3 × 8–12 (2 min)' }] },
      { id: 'e5', n: 'Pulley Frente Triângulo', t: '2s pico + 1 drop', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '3 × 8–12 (2 min)' }] },
      { id: 'e6', n: 'Serrote', t: '2s pico', s: [{ l: 'Ajuste', d: '1–2 × 4–6 (1–2 min)' }, { l: 'Trabalho', d: '2 × 6–10 (2 min)' }] },
      { id: 'e7', n: 'Abdominal Infra na Torre', t: '2s pico', s: [{ l: 'Trabalho', d: '3 × RM (1 min)' }] },
      { id: 'e8', n: 'Abdominal Supra na Prancha Declinada', t: null, s: [{ l: 'Trabalho', d: '3 × RM (1 min)' }] }
    ]
  }
];

const D2 = [
  {
    id: 'semana', title: 'Semana', type: 'week', days: [
      { d: 'Seg', plan: 'Treino A', sub: 'Pernas (Força)' },
      { d: 'Ter', plan: 'Treino B', sub: 'Peito + Tríceps' },
      { d: 'Qua', plan: 'Treino C', sub: 'Costas + Bíceps' },
      { d: 'Qui', plan: 'Treino D', sub: 'Pernas (Glúteo)' },
      { d: 'Sex', plan: 'Treino E', sub: 'Ombro + Abdômen' },
      { d: 'Sáb', plan: 'Descanso', sub: 'Recuperação' },
      { d: 'Dom', plan: 'Descanso', sub: 'Repouso total' }
    ]
  },
  {
    id: 'treino-a', title: 'Treino A', sub: 'Pernas (Força)', alert: 'Mounjaro: Evite treino pesado em jejum, ajuste a intensidade se houver fraqueza.',
    ex: [
      { id: 'a1', n: 'Agachamento livre (barra nas costas)', t: 'Descida 3s / Subida explosiva. Quase falha no final', s: [{ l: 'Trabalho', d: '4 × 6–8' }] },
      { id: 'a2', n: 'Leg press 45°', t: 'Descer 2-3s. Empurrar com calcanhar', s: [{ l: 'Trabalho', d: '4 × 10' }] },
      { id: 'a3', n: 'Cadeira extensora (máquina)', t: '1-2s pico + 1 drop set na última', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'a4', n: 'Mesa flexora (deitado)', t: '1s pico de contração', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'a5', n: 'Panturrilha em pé (máquina)', t: '2s pico. Descida lenta', s: [{ l: 'Trabalho', d: '4 × 15' }] },
      { id: 'a6', n: 'Cardio: Esteira inclinada (6–10%)', t: 'Ritmo constante', s: [{ l: 'Fim de Treino', d: '1 × 20–25 min' }] }
    ]
  },
  {
    id: 'treino-b', title: 'Treino B', sub: 'Peito + Tríceps', alert: 'Mounjaro: Consuma proteína leve antes e priorize hidratação.',
    ex: [
      { id: 'b1', n: 'Supino reto (barra)', t: 'Controle total do movimento', s: [{ l: 'Trabalho', d: '4 × 6–8' }] },
      { id: 'b2', n: 'Supino inclinado (halter 30-45°)', t: 'Foco em alongamento e contração', s: [{ l: 'Trabalho', d: '3 × 8–10' }] },
      { id: 'b3', n: 'Crucifixo (halter ou máquina)', t: '1s pico no fechamento', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'b4', n: 'Tríceps pulley (corda)', t: '1s pico. Abrir corda no final', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'b5', n: 'Tríceps banco (peso corporal)', t: 'Descer até 90° no cotovelo', s: [{ l: 'Trabalho', d: '3 × 10' }] },
      { id: 'b6', n: 'Tríceps testa (barra ou halter)', t: 'Cotovelos fixos', s: [{ l: 'Trabalho', d: '3 × 10' }] },
      { id: 'b7', n: 'HIIT', t: '30s forte / 1min leve', s: [{ l: 'Fim de Treino', d: '1 × 15 min' }] }
    ]
  },
  {
    id: 'treino-c', title: 'Treino C', sub: 'Costas + Bíceps', alert: 'Mounjaro: Ajuste a intensidade se houver fraqueza.',
    ex: [
      { id: 'c1', n: 'Puxada na frente (pulley barra)', t: 'Puxar até o peito. Contrair costas', s: [{ l: 'Trabalho', d: '4 × 10' }] },
      { id: 'c2', n: 'Remada curvada (barra)', t: 'Puxar até o abdômen', s: [{ l: 'Trabalho', d: '3 × 8–10' }] },
      { id: 'c3', n: 'Remada baixa (máquina)', t: '1s pico na contração', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'c4', n: 'Pulldown (barra aberta)', t: 'Movimento controlado', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'c5', n: 'Rosca direta (barra)', t: 'Subida controlada / Descida lenta', s: [{ l: 'Trabalho', d: '3 × 10' }] },
      { id: 'c6', n: 'Rosca alternada (halter)', t: 'Sem balançar o corpo', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'c7', n: 'Rosca martelo (halter)', t: 'Foco no antebraço', s: [{ l: 'Trabalho', d: '2 × 12' }] },
      { id: 'c8', n: 'Cardio: Caminhada rápida', t: 'Ritmo constante', s: [{ l: 'Fim de Treino', d: '1 × 20 min' }] }
    ]
  },
  {
    id: 'treino-d', title: 'Treino D', sub: 'Pernas (Glúteo)', alert: 'Mounjaro: Consuma proteína leve antes do treino.',
    ex: [
      { id: 'd1', n: 'Levantamento terra (barra)', t: 'Subir contraindo glúteo', s: [{ l: 'Trabalho', d: '4 × 6–8' }] },
      { id: 'd2', n: 'Afundo (halter)', t: 'Passo longo (ênfase glúteo)', s: [{ l: 'Trabalho', d: '3 × 10 (cada)' }] },
      { id: 'd3', n: 'Hip thrust (barra ou máq.)', t: '2s pico máximo', s: [{ l: 'Trabalho', d: '4 × 10' }] },
      { id: 'd4', n: 'Cadeira abdutora (máquina)', t: '1-2s pico aberto', s: [{ l: 'Trabalho', d: '3 × 15' }] },
      { id: 'd5', n: 'Glúteo no cabo', t: 'Lento e controlado', s: [{ l: 'Trabalho', d: '3 × 12 (cada)' }] },
      { id: 'd6', n: 'Panturrilha sentado', t: '2s pico no topo', s: [{ l: 'Trabalho', d: '4 × 15' }] },
      { id: 'd7', n: 'Cardio: Escada ou bike', t: 'Ritmo constante', s: [{ l: 'Fim de Treino', d: '1 × 15–20 min' }] }
    ]
  },
  {
    id: 'treino-e', title: 'Treino E', sub: 'Ombro + Abdômen', alert: 'Mounjaro: Priorize a hidratação e respeite limites.',
    ex: [
      { id: 'e1', n: 'Desenvolvimento c/ halter', t: 'Subida controlada', s: [{ l: 'Trabalho', d: '4 × 8–10' }] },
      { id: 'e2', n: 'Elevação lateral (halter)', t: 'Subir até ombro + 1 drop set na última', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'e3', n: 'Elevação frontal (halter ou anilha)', t: 'Movimento controlado', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'e4', n: 'Encolhimento (halter)', t: '1s pico no topo', s: [{ l: 'Trabalho', d: '3 × 12–15' }] },
      { id: 'e5', n: 'Face pull (corda pulley)', t: 'Foco em postura', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'e6', n: 'Prancha', t: 'Abdômen', s: [{ l: 'Trabalho', d: '3 × 40-60s' }] },
      { id: 'e7', n: 'Crunch', t: 'Abdômen', s: [{ l: 'Trabalho', d: '3 × 15' }] },
      { id: 'e8', n: 'Elevação de pernas', t: 'Abdômen', s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'e9', n: 'Abdominal infra banco', t: 'Abdômen', s: [{ l: 'Trabalho', d: '2 × 15' }] },
      { id: 'e10', n: 'Cardio Leve', t: 'Recuperação', s: [{ l: 'Fim de Treino', d: '1 × 20–25 min' }] }
    ]
  }
];

const D3 = [
  {
    id: 'semana', title: 'Semana', type: 'week', days: [
      { d: 'Seg', plan: 'Treino A', sub: 'Dorsais · Abdominal Supra' },
      { d: 'Ter', plan: 'Treino B', sub: 'Coxas · Glúteos · Panturrilha' },
      { d: 'Qua', plan: 'Treino C', sub: 'Peitoral · Deltoide · Abd Infra' },
      { d: 'Qui', plan: 'Treino D', sub: 'Bíceps · Tríceps' },
      { d: 'Sáb', plan: 'Descanso', sub: 'Recuperação' },
      { d: 'Dom', plan: 'Descanso', sub: 'Repouso total' }
    ]
  },
  {
    id: 'treino-a', title: 'Treino A', sub: 'Dorsais + Abdominal', alert: 'Ordem fixa · Foco em dorsais com abdominal supra no final',
    ex: [
      { id: 'a1', n: 'Pulley Costas', t: null, s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'a2', n: 'Remada Unilateral', t: null, s: [{ l: 'Trabalho', d: '3–4 séries (cada lado)' }] },
      { id: 'a3', n: 'Remada (máquina)', t: null, s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'a4', n: 'Pulley Frente', t: null, s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'a5', n: 'Pull Over', t: null, s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'a6', n: 'Peck Deck (inverso)', t: null, s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'a7', n: 'Abdominal Supra', t: null, s: [{ l: 'Trabalho', d: '3 × RM' }] }
    ]
  },
  {
    id: 'treino-b', title: 'Treino B', sub: 'Coxas, Glúteos e Panturrilha', alert: 'Ordem fixa · Membros inferiores completo',
    ex: [
      { id: 'b1', n: 'Extensão', t: null, s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'b2', n: 'Leg Press 45', t: null, s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'b3', n: 'Afundo', t: null, s: [{ l: 'Trabalho', d: '3 séries (cada lado)' }] },
      { id: 'b4', n: 'Flexão (deitado)', t: null, s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'b5', n: 'Flexor em Pé', t: null, s: [{ l: 'Trabalho', d: '3 séries (cada lado)' }] },
      { id: 'b6', n: 'Panturrilha (unilateral)', t: null, s: [{ l: 'Trabalho', d: '3–4 séries (cada lado)' }] },
      { id: 'b7', n: 'Panturrilha (sentado)', t: null, s: [{ l: 'Trabalho', d: '3–4 séries' }] }
    ]
  },
  {
    id: 'treino-c', title: 'Treino C', sub: 'Peitoral, Deltoide/Trapézio e Abdominal', alert: 'Ordem fixa · Peitoral + Deltoide + Abdominal infra no final',
    ex: [
      { id: 'c1', n: 'Crucifixo', t: null, s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'c2', n: 'Supino Inclinado', t: null, s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'c3', n: 'Supino Reto', t: null, s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'c4', n: 'Peck Deck', t: null, s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'c5', n: 'Supino Articulado', t: null, s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'c6', n: 'Desenvolvimento (articulado)', t: 'Deltoide / Trapézio', s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'c7', n: 'Elevação Lateral', t: 'Deltoide / Trapézio', s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'c8', n: 'Abdominal Infra', t: null, s: [{ l: 'Trabalho', d: '3 × RM' }] }
    ]
  },
  {
    id: 'treino-d', title: 'Treino D', sub: 'Bíceps/Antebraço e Tríceps', alert: 'Ordem fixa para os principais · Extras sem ordem definida',
    ex: [
      { id: 'd1', n: 'Rosca Direta', t: 'Bíceps / Antebraço', s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'd2', n: 'Rosca Scott (máquina)', t: 'Bíceps / Antebraço', s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'd3', n: 'Rosca Martelo', t: 'Bíceps / Antebraço', s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'd4', n: 'Testa', t: 'Tríceps', s: [{ l: 'Trabalho', d: '3–4 séries' }] },
      { id: 'd5', n: 'Pulley Corda', t: 'Tríceps', s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'd6', n: 'Pulley', t: 'Tríceps', s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'd7', n: 'Francês (extra)', t: 'Tríceps · Sem ordem definida', s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'd8', n: 'Supinado (extra)', t: 'Tríceps · Sem ordem definida', s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'd9', n: 'Banco (extra)', t: 'Tríceps · Sem ordem definida', s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'd10', n: 'Extensão (extra)', t: 'Tríceps · Sem ordem definida', s: [{ l: 'Trabalho', d: '3 séries' }] },
      { id: 'd11', n: 'Paralela (extra)', t: 'Tríceps · Sem ordem definida', s: [{ l: 'Trabalho', d: '3 séries' }] }
    ]
  }
];

const perfis = [
  { id: 1, nome: 'Geovanne', data: D1 },
  { id: 2, nome: 'Janaina', data: D2 },
  { id: 3, nome: 'Matheus', data: D3 }
];

async function seed() {
  await initDB();

  await new Promise(resolve => {
    db.serialize(() => {
      db.run('DELETE FROM semana');
      db.run('DELETE FROM treinos');
      db.run('DELETE FROM exercicios');
      db.run('DELETE FROM perfis', resolve);
    });
  });

  db.serialize(() => {
    // Inserir perfis
    const stmtPerfil = db.prepare('INSERT OR IGNORE INTO perfis (id, nome) VALUES (?, ?)');
    for (const p of perfis) {
      stmtPerfil.run(p.id, p.nome);
    }
    stmtPerfil.finalize();

    // Inserir dados
    const stmtTreino = db.prepare('INSERT OR IGNORE INTO treinos (id, perfil_id, title, sub, alert) VALUES (?, ?, ?, ?, ?)');
    const stmtSemana = db.prepare('INSERT INTO semana (perfil_id, d, plan, sub) VALUES (?, ?, ?, ?)');
    const stmtExercicio = db.prepare('INSERT OR IGNORE INTO exercicios (id, treino_id, nome, tecnica, series_json) VALUES (?, ?, ?, ?, ?)');

    db.run('BEGIN TRANSACTION');

    for (const p of perfis) {
      for (const item of p.data) {
        if (item.type === 'week') {
          for (const day of item.days) {
            stmtSemana.run(p.id, day.d, day.plan, day.sub);
          }
        } else {
          // É um treino (treino-a, treino-b...)
          const uniqueTreinoId = `${p.id}_${item.id}`; // Ex: 1_treino-a
          stmtTreino.run(uniqueTreinoId, p.id, item.title, item.sub, item.alert || null);

          if (item.ex) {
            for (const ex of item.ex) {
              const uniqueExId = `${p.id}_${ex.id}`; // Ex: 1_a1
              stmtExercicio.run(uniqueExId, uniqueTreinoId, ex.n, ex.t || null, JSON.stringify(ex.s));
            }
          }
        }
      }
    }

    stmtTreino.finalize();
    stmtSemana.finalize();
    stmtExercicio.finalize();
    
    db.run('COMMIT', () => {
      console.log('Seed finalizado! Banco de dados atualizado.');
      db.close(() => {
        process.exit(0);
      });
    });
  });
}

seed();
