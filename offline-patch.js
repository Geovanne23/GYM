const fs = require('fs');
let html = fs.readFileSync('gym-android/app/src/main/assets/index.html', 'utf8');

// 1. Remove queueRequest function
html = html.replace(/function queueRequest[\s\S]*?\}\r?\n\r?\n/, '');

// 2. Fix switchProfile to use local data.js
const spRegex = /function switchProfile\(p\) \{[\s\S]*?\}\r?\n\r?\n\s*function renderTabs/m;
const spReplacement = `function switchProfile(p) {
      currentProfile = p;
      document.body.classList.toggle('theme-p1', p === 1);
      document.body.classList.toggle('theme-emagrecimento', p === 2);
      document.body.classList.toggle('theme-abcd', p === 3);

      document.getElementById('p1Btn').className = 'p-tab' + (p === 1 ? ' active' : '');
      document.getElementById('p2Btn').className = 'p-tab' + (p === 2 ? ' active' : '');
      document.getElementById('p3Btn').className = 'p-tab' + (p === 3 ? ' active' : '');

      document.getElementById('hEyebrow').innerHTML = profilesMeta[p].eyebrow;
      document.getElementById('hTitle').innerHTML = profilesMeta[p].title;
      document.getElementById('hDesc').innerHTML = profilesMeta[p].desc;

      // Carrega dados diretamente do data.js (offline)
      D = typeof PROFILES_DATA !== 'undefined' ? PROFILES_DATA[p] || [] : [];
      diet = typeof DIETAS !== 'undefined' ? DIETAS[p] || [] : [];

      // Carrega progresso e notas do localStorage
      st = {};
      notes = {};
      try {
        const cachedProgress = localStorage.getItem('gym-progress-' + p);
        if (cachedProgress) {
          const progList = JSON.parse(cachedProgress);
          progList.forEach(r => {
            st[k(r.treino_id, r.exercicio_id, r.serie_index)] = r.concluido === 1;
          });
        }
        const cachedNotes = localStorage.getItem('gym-notes-' + p);
        if (cachedNotes) {
          const notesList = JSON.parse(cachedNotes);
          notesList.forEach(r => { notes[r.exercicio_id] = r.nota; });
        }
      } catch (e) {
        console.error('Erro ao ler localStorage:', e);
      }

      if (!D.some(t => t.id === act)) act = 'semana';
      $t.style.display = 'flex';
      renderTabs();
      render();
    }

    function renderTabs`;
html = html.replace(spRegex, spReplacement);

// 3. Fix sc() to remove queueRequest
const scRegex = /function sc\(a, b, c, v\) \{[\s\S]*?\}\r?\n/m;
const scReplacement = `function sc(a, b, c, v) {
      st[k(a, b, c)] = v;
      saveProfileProgressCache();
      if (v) {
        startRestTimer(a, b);
      }
    }\n`;
html = html.replace(scRegex, scReplacement);

// 4. Fix btn-complete and btn-reset
html = html.replace(/queueRequest\('\/api\/progress'[\s\S]*?\);/g, '');
html = html.replace(/queueRequest\('\/api\/reset'[\s\S]*?\);/g, '');

// 5. Fix saveNote
const saveNoteRegex = /window\.saveNote = function\(eid, val\) \{[\s\S]*?\}\;/m;
const saveNoteReplacement = `window.saveNote = function(eid, val) {
      notes[eid] = val;
      saveProfileNotesCache();
    };`;
html = html.replace(saveNoteRegex, saveNoteReplacement);

fs.writeFileSync('gym-android/app/src/main/assets/index.html', html);
console.log('Patched index.html for full offline functionality. Size: ' + html.length);
