const STORAGE_KEY = 'gym-workout-v2';

const tabsData = [
  {
    id: 'semana',
    title: 'Semana',
    type: 'week',
    days: [
      { day: 'Seg', plan: 'Treino A - Peito/Ombro/Tri' },
      { day: 'Ter', plan: 'Treino B - Costas/Bíceps' },
      { day: 'Qua', plan: 'Treino C - Quadríceps' },
      { day: 'Qui', plan: 'Descanso Ativo' },
      { day: 'Sex', plan: 'Treino D - Posterior/Panturrilha' },
      { day: 'Sáb', plan: 'Treino E - Fullbody' },
      { day: 'Dom', plan: 'Descanso' }
    ]
  },
  {
    id: 'treino-a',
    title: 'Treino A',
    type: 'workout',
    subtitle: 'Peito, Ombros e Tríceps',
    focus: 'Hipertrofia com técnicas de pico de contração',
    alert: 'Aquecimento: mobilidade de ombros 5 min',
    exercises: [
      {
        id: 'a-1',
        name: 'Supino Inclinado com Halteres',
        image: 'supino-inclinado',
        technique: '2s pico de contração no topo do movimento',
        sets: [
          { label: 'Aquecimento', detail: '2 x 12-15 reps (30s intervalo)' },
          { label: 'Série 1', detail: '4 x 8-10 reps (90s intervalo)' },
          { label: 'Série 2', detail: '3 x 8-10 reps (90s intervalo)' },
          { label: 'Drop Set', detail: '1 x 12-15 reps (sem intervalo)' }
        ]
      },
      {
        id: 'a-2',
        name: 'Supino Reto com Barra',
        image: 'supino-reto',
        technique: '2 rest-pause de 10s na última série',
        sets: [
          { label: 'Ajuste', detail: '1 x 6-8 reps (2min intervalo)' },
          { label: 'Série 1', detail: '4 x 6-8 reps (2min intervalo)' },
          { label: 'Série 2', detail: '3 x 6-8 reps (2min intervalo)' }
        ]
      },
      {
        id: 'a-3',
        name: 'Supino Declinado na Máquina',
        image: 'supino-declinado',
        technique: 'Contração excêntrica lenta 3s',
        sets: [
          { label: 'Ajuste', detail: '1 x 8-10 reps' },
          { label: 'Série 1', detail: '3 x 8-10 reps (90s intervalo)' },
          { label: 'Série 2', detail: '3 x 10-12 reps (90s intervalo)' }
        ]
      },
      {
        id: 'a-4',
        name: 'Voador ou Crucifixo Máquina',
        image: 'voador',
        technique: '2s pico + 1 dropset na última série',
        sets: [
          { label: 'Série 1', detail: '3 x 10-12 reps (60s intervalo)' },
          { label: 'Série 2', detail: '3 x 12-15 reps (60s intervalo)' }
        ]
      },
      {
        id: 'a-5',
        name: 'Elevação Frontal com Halteres',
        image: 'elevacao-frontal',
        technique: 'Movimento controlado, sem impulso',
        sets: [
          { label: 'Ajuste', detail: '1 x 10-12 reps' },
          { label: 'Série 1', detail: '3 x 10-12 reps (60s intervalo)' },
          { label: 'Série 2', detail: '3 x 12-15 reps (60s intervalo)' }
        ]
      },
      {
        id: 'a-6',
        name: 'Elevação Lateral Sentado',
        image: 'elevacao-lateral',
        technique: '1 dropset na última série',
        sets: [
          { label: 'Série 1', detail: '3 x 8-10 reps (60s intervalo)' },
          { label: 'Série 2', detail: '3 x 12-15 reps (60s intervalo)' }
        ]
      },
      {
        id: 'a-7',
        name: 'Tríceps Francês na Polia',
        image: 'triceps-frances',
        technique: 'Cotovelos fixos, contração no fundo',
        sets: [
          { label: 'Ajuste', detail: '1 x 10-12 reps' },
          { label: 'Série 1', detail: '3 x 10-12 reps (90s intervalo)' },
          { label: 'Série 2', detail: '3 x 12-15 reps (90s intervalo)' }
        ]
      }
    ]
  },
  {
    id: 'treino-b',
    title: 'Treino B',
    type: 'workout',
    subtitle: 'Costas e Bíceps',
    focus: 'Remadas com tensão contínua',
    alert: 'Alongamento de peitorais antes de iniciar',
    exercises: [
      {
        id: 'b-1',
        name: 'Remada Curvada com Barra',
        image: 'remada-curvada',
        technique: '2s pico de contração, costas reta',
        sets: [
          { label: 'Aquecimento', detail: '2 x 12-15 reps' },
          { label: 'Ajuste', detail: '2 x 6-8 reps (2min intervalo)' },
          { label: 'Série 1', detail: '4 x 6-8 reps (2min intervalo)' },
          { label: 'Série 2', detail: '3 x 8-10 reps (90s intervalo)' }
        ]
      },
      {
        id: 'b-2',
        name: 'Remada Baixa no Triângulo',
        image: 'remada-baixa',
        technique: '2s pico + 2 rest-pause na última série',
        sets: [
          { label: 'Ajuste', detail: '2 x 6-8 reps' },
          { label: 'Série 1', detail: '4 x 6-8 reps (2min intervalo)' },
          { label: 'Série 2', detail: '3 x 8-10 reps (90s intervalo)' }
        ]
      },
      {
        id: 'b-3',
        name: 'Puxada Frente na Polia',
        image: 'puxada-frente',
        technique: '2s pico, cotovelos para baixo',
        sets: [
          { label: 'Ajuste', detail: '1 x 8-10 reps' },
          { label: 'Série 1', detail: '3 x 8-10 reps (90s intervalo)' },
          { label: 'Série 2', detail: '3 x 10-12 reps (90s intervalo)' }
        ]
      },
      {
        id: 'b-4',
        name: 'Remada Unilateral (Halter)',
        image: 'remada-curvada',
        technique: '2s pico, controlado',
        sets: [
          { label: 'Série 1', detail: '3 x 10-12 cada lado (60s intervalo)' }
        ]
      },
      {
        id: 'b-5',
        name: 'Bíceps no Curvo com Barra',
        image: 'biceps-curvo',
        technique: '2s pico, sem balanço',
        sets: [
          { label: 'Ajuste', detail: '1 x 10-12 reps' },
          { label: 'Série 1', detail: '3 x 8-10 reps (60s intervalo)' },
          { label: 'Série 2', detail: '3 x 10-12 reps (60s intervalo)' }
        ]
      },
      {
        id: 'b-6',
        name: 'Bíceps Martelo com Halteres',
        image: 'biceps-martelo',
        technique: 'Movimento completo',
        sets: [
          { label: 'Série 1', detail: '3 x 10-12 cada braço (45s intervalo)' },
          { label: 'Drop Set', detail: '1 x 15-20 reps' }
        ]
      }
    ]
  },
  {
    id: 'treino-c',
    title: 'Treino C',
    type: 'workout',
    subtitle: 'Quadríceps',
    focus: 'Força e hipertrofia de membros inferiores',
    alert: 'Aquecimento: agachamentos com peso corporal 5 min',
    exercises: [
      {
        id: 'c-1',
        name: 'Agachamento com Barra',
        image: 'agachamento',
        technique: 'Descida 3s, explode subindo',
        sets: [
          { label: 'Aquecimento', detail: '2 x 15-20 reps' },
          { label: 'Ajuste', detail: '2 x 8-10 reps (2min intervalo)' },
          { label: 'Série 1', detail: '4 x 6-8 reps (2min intervalo)' },
          { label: 'Série 2', detail: '3 x 8-10 reps (90s intervalo)' }
        ]
      },
      {
        id: 'c-2',
        name: 'Leg Press 45°',
        image: 'leg-press',
        technique: 'Não travar os joelhos no topo',
        sets: [
          { label: 'Ajuste', detail: '2 x 10-12 reps' },
          { label: 'Série 1', detail: '4 x 10-12 reps (90s intervalo)' },
          { label: 'Série 2', detail: '3 x 12-15 reps (90s intervalo)' }
        ]
      },
      {
        id: 'c-3',
        name: 'Avanço (Leg Step)',
        image: 'agachamento',
        technique: '2s pausa no fundo, tronco ereto',
        sets: [
          { label: 'Série 1', detail: '3 x 10-12 cada perna (60s intervalo)' },
          { label: 'Série 2', detail: '3 x 12-15 cada perna (60s intervalo)' }
        ]
      },
      {
        id: 'c-4',
        name: 'Extensão de Quadríceps',
        image: 'leg-press',
        technique: '2s pico de contração no topo',
        sets: [
          { label: 'Série 1', detail: '3 x 12-15 reps (60s intervalo)' },
          { label: 'Drop Set', detail: '1 x 20 reps' }
        ]
      },
      {
        id: 'c-5',
        name: 'Agachamento Sumo com Halteres',
        image: 'agachamento',
        technique: 'Postura larga, foco nos adutores',
        sets: [
          { label: 'Série 1', detail: '3 x 12-15 reps (60s intervalo)' }
        ]
      }
    ]
  },
  {
    id: 'treino-d',
    title: 'Treino D',
    type: 'workout',
    subtitle: 'Posterior e Panturrilha',
    focus: 'Isquiotibiais e solear',
    alert: 'Alongamento de quadríceps antes',
    exercises: [
      {
        id: 'd-1',
        name: 'Stiff com Barra',
        image: 'stiff',
        technique: 'Descida controlada 3s, pelvis fixa',
        sets: [
          { label: 'Aquecimento', detail: '2 x 12-15 reps' },
          { label: 'Ajuste', detail: '2 x 8-10 reps' },
          { label: 'Série 1', detail: '4 x 8-10 reps (90s intervalo)' },
          { label: 'Série 2', detail: '3 x 10-12 reps (90s intervalo)' }
        ]
      },
      {
        id: 'd-2',
        name: 'Curl de Posterior Sentado',
        image: 'stiff',
        technique: '2s pico, não levantar o quadril',
        sets: [
          { label: 'Ajuste', detail: '1 x 10-12 reps' },
          { label: 'Série 1', detail: '3 x 10-12 reps (60s intervalo)' },
          { label: 'Série 2', detail: '3 x 12-15 reps (60s intervalo)' }
        ]
      },
      {
        id: 'd-3',
        name: 'Curl de Posterior em Pé',
        image: 'stiff',
        technique: 'Uma perna de cada vez',
        sets: [
          { label: 'Série 1', detail: '3 x 10-12 cada perna (45s intervalo)' }
        ]
      },
      {
        id: 'd-4',
        name: 'Hack Machine',
        image: 'hack',
        technique: 'Foco nos isquiotibiais',
        sets: [
          { label: 'Série 1', detail: '3 x 12-15 reps (60s intervalo)' }
        ]
      },
      {
        id: 'd-5',
        name: 'Panturrilha em Pé',
        image: 'panturrilha',
        technique: 'Completa amplitude, 2s pico',
        sets: [
          { label: 'Ajuste', detail: '1 x 15-20 reps' },
          { label: 'Série 1', detail: '4 x 15-20 reps (45s intervalo)' },
          { label: 'Série 2', detail: '3 x 20-25 reps (45s intervalo)' }
        ]
      },
      {
        id: 'd-6',
        name: 'Panturrilha Sentado',
        image: 'panturrilha',
        technique: 'Complementar',
        sets: [
          { label: 'Série 1', detail: '3 x 15-20 reps (45s intervalo)' }
        ]
      }
    ]
  },
  {
    id: 'treino-e',
    title: 'Treino E',
    type: 'workout',
    subtitle: 'Fullbody - Hipertrofia Total',
    focus: 'Múltiplos grupos musculares',
    alert: 'Descanso ativo: caminhada leve 20-30min',
    exercises: [
      {
        id: 'e-1',
        name: 'Agachamento frontal',
        image: 'agachamento',
        technique: 'Core engajado, profundidade total',
        sets: [
          { label: 'Ajuste', detail: '2 x 8-10 reps' },
          { label: 'Série 1', detail: '4 x 8-10 reps (90s intervalo)' },
          { label: 'Série 2', detail: '3 x 10-12 reps (90s intervalo)' }
        ]
      },
      {
        id: 'e-2',
        name: 'Puxada ou Remada',
        image: 'puxada-frente',
        technique: 'Alternar pegada',
        sets: [
          { label: 'Ajuste', detail: '1 x 10-12 reps' },
          { label: 'Série 1', detail: '3 x 8-10 reps (90s intervalo)' },
          { label: 'Série 2', detail: '3 x 10-12 reps (90s intervalo)' }
        ]
      },
      {
        id: 'e-3',
        name: 'Supino ou Crucifixo',
        image: 'supino-reto',
        technique: '2s pico na última série',
        sets: [
          { label: 'Série 1', detail: '3 x 8-10 reps (90s intervalo)' },
          { label: 'Série 2', detail: '3 x 10-12 reps (90s intervalo)' }
        ]
      },
      {
        id: 'e-4',
        name: 'Elevação de Quadril (Glúteo)',
        image: 'elevacao-pelve',
        technique: '2s pico, squeeze no topo',
        sets: [
          { label: 'Série 1', detail: '3 x 12-15 reps (60s intervalo)' },
          { label: 'Série 2', detail: '3 x 15-20 reps (60s intervalo)' }
        ]
      },
      {
        id: 'e-5',
        name: 'Abdominal Crunch',
        image: 'abdominal',
        technique: 'Mãos na nuca, não puxar o pescoço',
        sets: [
          { label: 'Série 1', detail: '3 x 15-20 reps (30s intervalo)' },
          { label: 'Série 2', detail: '3 x 20-25 reps (30s intervalo)' }
        ]
      },
      {
        id: 'e-6',
        name: 'Prancha Abdominal',
        image: 'abdominal',
        technique: 'Core contraído, posição neutra',
        sets: [
          { label: 'Série 1', detail: '3 x 45-60 segundos' },
          { label: 'Série 2', detail: '3 x 60-90 segundos' }
        ]
      }
    ]
  }
];

let activeTabId = 'semana';
let state = loadState();

const tabsRoot = document.getElementById('tabs');
const contentRoot = document.getElementById('content');

renderTabs();
renderContent();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function key(tabId, exerciseId, setIndex) {
  return `${tabId}__${exerciseId}__${setIndex}`;
}

function isChecked(tabId, exerciseId, setIndex) {
  return Boolean(state[key(tabId, exerciseId, setIndex)]);
}

function setChecked(tabId, exerciseId, setIndex, checked) {
  state[key(tabId, exerciseId, setIndex)] = checked;
}

function renderTabs() {
  tabsRoot.innerHTML = '';
  tabsData.forEach(tab => {
    const btn = document.createElement('button');
    btn.className = `py-3 px-2 rounded-lg text-sm font-semibold transition-all card-glass ${tab.id === activeTabId ? 'tab-active' : 'text-gray-300 hover:bg-white/10'}`;
    btn.textContent = tab.title;
    btn.onclick = () => {
      activeTabId = tab.id;
      renderTabs();
      renderContent();
    };
    tabsRoot.appendChild(btn);
  });
}

function renderContent() {
  const tab = tabsData.find(t => t.id === activeTabId);
  if (!tab) {
    contentRoot.innerHTML = '';
    return;
  }

  if (tab.type === 'week') {
    renderWeek(tab);
    return;
  }

  const panel = document.createElement('div');
  panel.className = 'glass rounded-2xl p-6';

  const header = document.createElement('div');
  header.className = 'mb-6';
  
  const title = document.createElement('h2');
  title.className = 'font-display text-3xl font-bold mb-1';
  title.innerHTML = `${tab.title} <span class="text-gray-400 text-lg font-sans font-normal">- ${tab.subtitle}</span>`;
  header.appendChild(title);

  if (tab.focus) {
    const focus = document.createElement('p');
    focus.className = 'text-primary text-sm font-medium';
    focus.textContent = `Foco: ${tab.focus}`;
    header.appendChild(focus);
  }

  if (tab.alert) {
    const alert = document.createElement('div');
    alert.className = 'mt-3 bg-amber-500/20 border border-amber-500/40 rounded-lg p-3 text-amber-200 text-sm flex items-center gap-2';
    alert.innerHTML = `<i class="ph ph-warning text-lg"></i> ${tab.alert}`;
    header.appendChild(alert);
  }
  panel.appendChild(header);

  if (!tab.exercises.length) {
    const empty = document.createElement('p');
    empty.className = 'text-gray-400 text-center py-8';
    empty.textContent = 'Em breve: exercícios detalhados';
    panel.appendChild(empty);
  } else {
    const list = document.createElement('div');
    list.className = 'space-y-4';
    tab.exercises.forEach(ex => {
      list.appendChild(buildExerciseCard(tab.id, ex));
    });
    panel.appendChild(list);
  }

  const resetWrap = document.createElement('div');
  resetWrap.className = 'mt-6 flex justify-center';
  const resetBtn = document.createElement('button');
  resetBtn.className = 'bg-red-500/20 hover:bg-red-500/30 text-red-300 px-6 py-2 rounded-lg text-sm font-medium transition-colors border border-red-500/30';
  resetBtn.innerHTML = '<i class="ph ph-arrow-counter-clockwise mr-2"></i>Zerar Treino';
  resetBtn.onclick = () => {
    resetWorkoutDay(tab.id, tab.exercises);
    renderContent();
  };
  resetWrap.appendChild(resetBtn);
  panel.appendChild(resetWrap);

  contentRoot.innerHTML = '';
  contentRoot.appendChild(panel);
}

function renderWeek(tab) {
  const panel = document.createElement('div');
  panel.className = 'glass rounded-2xl p-6';

  const title = document.createElement('h2');
  title.className = 'font-display text-2xl font-bold mb-6 text-center';
  title.textContent = 'Sugestão da Semana';
  panel.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-3';
  
  tab.days.forEach(item => {
    const isRest = item.plan.toLowerCase().includes('descanso');
    const dayItem = document.createElement('div');
    dayItem.className = `card-glass rounded-xl p-4 ${isRest ? 'opacity-60' : ''}`;
    dayItem.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="font-display text-lg font-semibold text-primary">${item.day}</span>
        <span class="text-gray-300 text-sm">${item.plan}</span>
      </div>
    `;
    grid.appendChild(dayItem);
  });
  panel.appendChild(grid);

  const legend = document.createElement('div');
  legend.className = 'mt-6 p-4 bg-white/5 rounded-xl';
  legend.innerHTML = `
    <h3 class="font-semibold mb-2 text-sm text-gray-300">Técnicas Aplicadas:</h3>
    <ul class="text-xs text-gray-400 space-y-1">
      <li>• <span class="text-primary">Pico de Contração:</span> 2 segundos de squeeze no ponto mais difícil</li>
      <li>• <span class="text-primary">Rest-Pause:</span> 10 segundos de pausa na última reps</li>
      <li>• <span class="text-primary">Drop Set:</span> Redução de carga sem pausa</li>
      <li>• <span class="text-primary">Contração Excêntrica:</span> Descida controlada 2-3 segundos</li>
    </ul>
  `;
  panel.appendChild(legend);

  contentRoot.innerHTML = '';
  contentRoot.appendChild(panel);
}

function buildExerciseCard(tabId, exercise) {
  const allChecked = exercise.sets.length > 0 && exercise.sets.every((set, idx) => isChecked(tabId, exercise.id, idx));
  
  const card = document.createElement('div');
  card.className = `card-glass rounded-xl overflow-hidden ${allChecked ? 'completed' : ''}`;

  const imgUrl = exerciseImages[exercise.image] || exerciseImages['default'];
  
  card.innerHTML = `
    <div class="relative h-40 overflow-hidden">
      <img src="${imgUrl}" alt="${exercise.name}" class="w-full h-full object-cover" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div class="absolute bottom-3 left-3 right-3">
        <h3 class="font-display text-lg font-semibold leading-tight">${exercise.name}</h3>
        ${exercise.technique ? `<p class="text-primary text-xs mt-1"><i class="ph ph-lightning mr-1"></i>${exercise.technique}</p>` : ''}
      </div>
    </div>
    <div class="p-4">
      <ul class="space-y-2">
        ${exercise.sets.map((set, idx) => `
          <li class="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
            <input type="checkbox" class="checkbox-custom" ${isChecked(tabId, exercise.id, idx) ? 'checked' : ''} data-tab="${tabId}" data-ex="${exercise.id}" data-idx="${idx}" />
            <div class="flex-1">
              <span class="text-xs text-gray-400">${set.label}:</span>
              <span class="text-sm ml-1">${set.detail}</span>
            </div>
          </li>
        `).join('')}
      </ul>
      <button class="mt-4 w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg text-sm font-semibold transition-colors" data-complete="${tabId}" data-ex="${exercise.id}">
        <i class="ph ph-check-circle mr-2"></i>Concluir Exercício
      </button>
    </div>
  `;

  card.querySelectorAll('.checkbox-custom').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const tab = e.target.dataset.tab;
      const ex = e.target.dataset.ex;
      const idx = parseInt(e.target.dataset.idx);
      setChecked(tab, ex, idx, e.target.checked);
      saveState();
      renderContent();
    });
  });

  const completeBtn = card.querySelector('[data-complete]');
  completeBtn.addEventListener('click', () => {
    exercise.sets.forEach((set, idx) => {
      setChecked(tabId, exercise.id, idx, true);
    });
    saveState();
    renderContent();
  });

  return card;
}

function resetWorkoutDay(tabId, exercises) {
  exercises.forEach(ex => {
    ex.sets.forEach((set, idx) => {
      delete state[key(tabId, ex.id, idx)];
    });
  });
  saveState();
}
