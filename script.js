const API_URL = 'https://eventos-backend-zcsx.onrender.com/';

const form = document.getElementById('form-evento');
const listaEventos = document.getElementById('lista-eventos');

async function carregarEventos() {
  try {
    const resposta = await fetch(API_URL);
    const eventos = await resposta.json();

    listaEventos.innerHTML = '';

    eventos.forEach(evento => {
      const card = document.createElement('div');
      card.className = 'card-evento';
      card.innerHTML = `
        <h3>${evento.titulo}</h3>
        <p>${evento.descricao || 'Sem descrição'}</p>
        <p><strong>Data:</strong> ${evento.data_evento} | <strong>Local:</strong> ${evento.local}</p>
      `;
      listaEventos.appendChild(card);
    });
  } catch (erro) {
    listaEventos.innerHTML = '<p>Erro ao carregar eventos. Aguarde o servidor do Render iniciar e recarregue a página.</p>';
    console.error(erro);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const novoEvento = {
    titulo: document.getElementById('titulo').value,
    descricao: document.getElementById('descricao').value,
    data_evento: document.getElementById('data_evento').value,
    local: document.getElementById('local').value
  };

  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoEvento)
    });

    if (resposta.ok) {
      form.reset();
      carregarEventos();
    } else {
      alert('Erro ao cadastrar evento.');
    }
  } catch (erro) {
    alert('Erro de conexão com o servidor.');
    console.error(erro);
  }
});

carregarEventos();