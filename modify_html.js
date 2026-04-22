const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'index.html');
let content = fs.readFileSync(file, 'utf8');

// Remover D1, D2, D3
content = content.replace(/const D1 = \[\s*\{[\s\S]*?\}\s*\];\s*const D2 = \[\s*\{[\s\S]*?\}\s*\];\s*const D3 = \[\s*\{[\s\S]*?\}\s*\];/g, '');

// Alterar switchProfile
content = content.replace(/function switchProfile\(p\) \{[\s\S]*?renderDietCard\(\);\s*\}/g, `
    async function switchProfile(p) {
      currentProfile = p;
      document.body.classList.toggle('theme-emagrecimento', p === 2);
      document.body.classList.toggle('theme-abcd', p === 3);

      document.getElementById('p1Btn').className = 'p-tab' + (p === 1 ? ' active' : '');
      document.getElementById('p2Btn').className = 'p-tab' + (p === 2 ? ' active' : '');
      document.getElementById('p3Btn').className = 'p-tab' + (p === 3 ? ' active' : '');

      // Alterar os textos do cabeçalho
      document.getElementById('hEyebrow').innerHTML = profilesMeta[p].eyebrow;
      document.getElementById('hTitle').innerHTML = profilesMeta[p].title;
      document.getElementById('hDesc').innerHTML = profilesMeta[p].desc;

      // Buscar os dados do banco de dados (API)
      const res = await fetch('/api/data?perfil_id=' + p);
      D = await res.json();
      
      // Buscar o progresso
      const pRes = await fetch('/api/progress?perfil_id=' + p);
      const rows = await pRes.json();
      
      st = {};
      rows.forEach(r => {
        st[k(r.treino_id, r.exercicio_id, r.serie_index)] = r.concluido === 1;
      });

      // Também buscar treinos concluídos inteiros, se houver
      // Para simular wd() (workout done), iteramos todos e vemos se o treino tá todo marcado.
      
      act = 'semana';
      renderTabs();
      render();
      renderDietCard();
    }
`);

// Substituir getD()
content = content.replace(/function getD\(\) \{\s*if \(currentProfile === 1\) return D1;\s*if \(currentProfile === 2\) return D2;\s*return D3;\s*\}/g, `
    let D = [];
    function getD() { return D; }
`);

// Substituir getSK() 
content = content.replace(/function getSK\(\) \{[\s\S]*?\}/g, '');

// Substituir gc() e sc()
content = content.replace(/function ld\(\) \{[\s\S]*?\}\s*function sv\(\) \{[\s\S]*?\}\s*function k\(a, b, c\) \{ return a \+ '\|' \+ b \+ '\|' \+ c \}\s*function gc\(a, b, c\) \{ return !!st\[k\(a, b, c\)\] \}\s*function sc\(a, b, c, v\) \{ st\[k\(a, b, c\)\] = v \}/g, `
    function k(a, b, c) { return a + '|' + b + '|' + c }
    function gc(a, b, c) { return !!st[k(a, b, c)] }
    
    function sc(a, b, c, v) { 
      st[k(a, b, c)] = v; 
      // Salvar no servidor em background
      fetch('/api/progress', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          perfilId: currentProfile,
          treinoId: a,
          exercicioId: b,
          serieIndex: c,
          concluido: v
        })
      }).catch(e => console.error(e));
    }
    
    function sv() {} // Fake sv since we auto-save via fetch
`);

// Mudar botão ZERAR TUDO
content = content.replace(/tr\.onclick = \(\) => ask\('Zerar TODO o progresso\? Não pode ser desfeito\.', \(\) => \{ st = \{\}; sv\(\); render\(\); uprog\(\) \}\);/g, `
      tr.onclick = () => ask('Zerar TODO o progresso? Não pode ser desfeito.', async () => { 
        st = {}; 
        await fetch('/api/progress/all', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ perfilId: currentProfile })
        });
        render(); 
        uprog(); 
      });
`);

// Mudar ZERAR TREINO
content = content.replace(/rb\.onclick = \(\) => ask\('Zerar o progresso deste treino\?', \(\) => \{\s*tab\.ex\.forEach\(e => e\.s\.forEach\(\(_, i\) => sc\(tab\.id, e\.id, i, false\)\)\);\s*swd\(tab\.id, false\); sv\(\); render\(\);\s*\}\);/g, `
      rb.onclick = () => ask('Zerar o progresso deste treino?', async () => {
        tab.ex.forEach(e => e.s.forEach((_, i) => { st[k(tab.id, e.id, i)] = false; }));
        swd(tab.id, false); 
        
        await fetch('/api/progress/workout', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
             perfilId: currentProfile,
             treinoId: tab.id,
             exercicios: tab.ex.map(e => ({id: e.id, numSets: e.s.length})),
             concluido: false
          })
        });
        render();
      });
`);

// Mudar MARCAR TREINO COMO CONCLUÍDO
content = content.replace(/cBtn\.onclick = \(\) => \{\s*const v = !wd\(tab\.id\);\s*tab\.ex\.forEach\(e => e\.s\.forEach\(\(_, i\) => sc\(tab\.id, e\.id, i, v\)\)\);\s*swd\(tab\.id, v\); sv\(\); render\(\);\s*\};/g, `
      cBtn.onclick = async () => {
        const v = !wd(tab.id);
        tab.ex.forEach(e => e.s.forEach((_, i) => { st[k(tab.id, e.id, i)] = v; }));
        swd(tab.id, v); 
        
        await fetch('/api/progress/workout', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
             perfilId: currentProfile,
             treinoId: tab.id,
             exercicios: tab.ex.map(e => ({id: e.id, numSets: e.s.length})),
             concluido: v
          })
        });
        render();
      };
`);

// Botões dos perfis
content = content.replace(/Perfil 1: Hipertrofia/g, 'Perfil 1: Geovanne');
content = content.replace(/Perfil 2: Emagrecimento/g, 'Perfil 2: Janaina');
content = content.replace(/Perfil 3: Evolução/g, 'Perfil 3: Matheus');

// Remover a inicialização do render que tinha embaixo (pq agora tem await no fetch)
content = content.replace(/renderTabs\(\);\s*render\(\);\s*renderDietCard\(\);\s*uprog\(\);/g, `
    switchProfile(1);
`);

// Mudar "st = ld();" logo abaixo do $t
content = content.replace(/let act = 'semana', st = ld\(\), mCb = null;/g, `
    let act = 'semana', st = {}, mCb = null;
`);

fs.writeFileSync(file, content);
console.log('index.html atualizado.');
