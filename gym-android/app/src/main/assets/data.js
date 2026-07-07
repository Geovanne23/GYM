// ============================================================
// data.js — Dados offline dos 3 perfis
// ============================================================

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
    id: 'treino-a', title: 'Treino A', sub: 'Peito, Ombros e Tríceps', type: 'workout', alert: 'Mobilidade de ombros antes de começar',
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
    id: 'treino-b', title: 'Treino B', sub: 'Costas e Bíceps', type: 'workout', alert: 'Mobilidade de ombros + alongamento do peito',
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
    id: 'treino-c', title: 'Treino C', sub: 'Membros Inferiores', type: 'workout', alert: 'Mobilidade: posteriores, glúteos, quadríceps e ílio-psoas',
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
    id: 'treino-d', title: 'Treino D', sub: 'Ombros, Peito e Tríceps', type: 'workout', alert: 'Mobilidade e alongamento de ombros e tríceps',
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
    id: 'treino-e', title: 'Treino E', sub: 'Bíceps, Costas e Abdômen', type: 'workout', alert: 'Mobilidade de ombros + alongamento do peito',
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
      { d: 'Seg', plan: 'Treino A', sub: 'Força (Corpo todo)' },
      { d: 'Ter', plan: 'Treino B', sub: 'Cardio' },
      { d: 'Qua', plan: 'Treino C', sub: 'Força' },
      { d: 'Qui', plan: 'Treino D', sub: 'Cardio Intervalado' },
      { d: 'Sex', plan: 'Treino E', sub: 'Força' },
      { d: 'Sáb', plan: 'Atividade Prazerosa', sub: 'Caminhada, bicicleta, dança ou natação' },
      { d: 'Dom', plan: 'Descanso', sub: 'Descanso total ou Caminhada leve' }
    ]
  },
  {
    id: 'treino-a', title: 'Segunda', sub: 'Treino de força (corpo todo)', type: 'workout', alert: 'Mounjaro: Priorize a perda de gordura preservando massa muscular. Não exagere no volume inicial.',
    ex: [
      { id: 'a1', n: 'Agachamento no banco ou livre', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'a2', n: 'Leg press', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'a3', n: 'Puxada na frente', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'a4', n: 'Supino na máquina', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'a5', n: 'Desenvolvimento de ombros', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'a6', n: 'Prancha', t: null, s: [{ l: 'Trabalho', d: '3 × 30s' }] },
      { id: 'a7', n: 'Caminhada rápida ou bicicleta', t: 'Fim do treino', s: [{ l: 'Cardio', d: '20 a 30 min' }] }
    ]
  },
  {
    id: 'treino-b', title: 'Terça', sub: 'Cardio', type: 'workout', alert: 'Beba bastante água. O Mounjaro pode favorecer a desidratação.',
    ex: [
      { id: 'b1', n: 'Caminhada em ritmo acelerado', t: null, s: [{ l: 'Cardio', d: '45 a 60 min' }] },
      { id: 'b2', n: 'Alongamento', t: null, s: [{ l: 'Recuperação', d: '10 min' }] }
    ]
  },
  {
    id: 'treino-c', title: 'Quarta', sub: 'Força', type: 'workout', alert: 'Consuma proteínas suficientes para preservar a massa muscular.',
    ex: [
      { id: 'c1', n: 'Afundo (ou passada)', t: null, s: [{ l: 'Trabalho', d: '3 × 10 (cada perna)' }] },
      { id: 'c2', n: 'Mesa flexora', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'c3', n: 'Remada baixa', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'c4', n: 'Rosca bíceps', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'c5', n: 'Tríceps na polia', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'c6', n: 'Abdominal infra', t: null, s: [{ l: 'Trabalho', d: '3 × 15' }] },
      { id: 'c7', n: 'Bicicleta', t: 'Fim do treino', s: [{ l: 'Cardio', d: '20 min' }] }
    ]
  },
  {
    id: 'treino-d', title: 'Quinta', sub: 'Cardio intervalado', type: 'workout', alert: 'Durma entre 7 e 9 horas por noite.',
    ex: [
      { id: 'd1', n: 'Aquecimento', t: 'Caminhada leve', s: [{ l: 'Cardio', d: '5 min' }] },
      { id: 'd2', n: 'Caminhada rápida', t: 'Intervalo forte', s: [{ l: 'Cardio', d: '1 min' }] },
      { id: 'd3', n: 'Caminhada moderada', t: 'Intervalo leve', s: [{ l: 'Cardio', d: '2 min' }] },
      { id: 'd4', n: 'Repetir ciclos', t: 'Alternar rápido/moderado', s: [{ l: 'Cardio', d: '30 a 40 min' }] },
      { id: 'd5', n: 'Alongamento', t: null, s: [{ l: 'Recuperação', d: 'Fim do treino' }] }
    ]
  },
  {
    id: 'treino-e', title: 'Sexta', sub: 'Força', type: 'workout', alert: 'Faça de 7.000 a 10.000 passos por dia.',
    ex: [
      { id: 'e1', n: 'Agachamento sumô', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'e2', n: 'Cadeira extensora', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'e3', n: 'Elevação pélvica', t: null, s: [{ l: 'Trabalho', d: '3 × 15' }] },
      { id: 'e4', n: 'Puxada alta', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'e5', n: 'Supino inclinado na máquina', t: null, s: [{ l: 'Trabalho', d: '3 × 12' }] },
      { id: 'e6', n: 'Prancha lateral', t: null, s: [{ l: 'Trabalho', d: '3 × 20s (cada lado)' }] },
      { id: 'e7', n: 'Caminhada', t: 'Fim do treino', s: [{ l: 'Cardio', d: '20 a 30 min' }] }
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
    id: 'treino-a', title: 'Treino A', sub: 'Dorsais + Abdominal', type: 'workout', alert: 'Ordem fixa · Foco em dorsais com abdominal supra no final',
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
    id: 'treino-b', title: 'Treino B', sub: 'Coxas, Glúteos e Panturrilha', type: 'workout', alert: 'Ordem fixa · Membros inferiores completo',
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
    id: 'treino-c', title: 'Treino C', sub: 'Peitoral, Deltoide/Trapézio e Abdominal', type: 'workout', alert: 'Ordem fixa · Peitoral + Deltoide + Abdominal infra no final',
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
    id: 'treino-d', title: 'Treino D', sub: 'Bíceps/Antebraço e Tríceps', type: 'workout', alert: 'Ordem fixa para os principais · Extras sem ordem definida',
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

// Dietas por perfil (id é index+1 para uso no localStorage)
const DIETAS = {
  1: [
    { id: 1, refeicao: 'Café da Manhã', ingredientes: '2 ovos mexidos, 1 copo de leite, 1 pão francês', proteina: '~20 g' },
    { id: 2, refeicao: 'Almoço', ingredientes: '100g frango grelhado, 2 colheres arroz, 1 concha feijão, Salada', proteina: '~33 g' },
    { id: 3, refeicao: 'Lanche da Tarde', ingredientes: '1 iogurte natural, 1 banana, 2 colheres de aveia', proteina: '~10 g' },
    { id: 4, refeicao: 'Jantar', ingredientes: '100g carne (ou frango), Arroz + feijão', proteina: '~25 g' },
    { id: 5, refeicao: 'Ceia (Opcional)', ingredientes: '1 copo de leite OU 1 ovo cozido', proteina: '6–8 g' }
  ],
  2: [
    { id: 1, refeicao: 'Café da Manhã', ingredientes: '2 ovos mexidos, 1 fruta (maçã/mamão), Café sem açúcar', proteina: '~14 g' },
    { id: 2, refeicao: 'Almoço', ingredientes: '120g peito de frango/peixe, 1 colher arroz integral, salada abundante e legumes', proteina: '~36 g' },
    { id: 3, refeicao: 'Lanche da Tarde', ingredientes: '1 copo de iogurte desnatado, 10g de castanhas ou nozes', proteina: '~8 g' },
    { id: 4, refeicao: 'Jantar', ingredientes: 'Omelete de 3 ovos com espinafre e tomate, Salada de folhas verdes', proteina: '~20 g' },
    { id: 5, refeicao: 'Ceia (Opcional)', ingredientes: 'Chá de camomila/hortelã + 1 fatia fina de queijo minas', proteina: '5-6 g' }
  ],
  3: [
    { id: 1, refeicao: 'Café da Manhã', ingredientes: '3 ovos mexidos, 2 fatias de pão integral, 1 copo de suco de uva integral', proteina: '~25 g' },
    { id: 2, refeicao: 'Almoço', ingredientes: '150g de patinho moído/frango grelhado, 4 colheres arroz, 1 concha de feijão, legumes', proteina: '~45 g' },
    { id: 3, refeicao: 'Lanche da Tarde', ingredientes: 'Vitamina com 30g de Whey, 1 banana, 30g aveia, 200ml de leite', proteina: '~35 g' },
    { id: 4, refeicao: 'Jantar', ingredientes: '150g de peito de frango, 150g de purê de batata doce ou arroz integral', proteina: '~40 g' },
    { id: 5, refeicao: 'Ceia', ingredientes: '1 copo de iogurte grego natural ou 40g de queijo coalho grelhado', proteina: '~12 g' }
  ]
};

// Mapa perfil → dados de treino
const PROFILES_DATA = { 1: D1, 2: D2, 3: D3 };
