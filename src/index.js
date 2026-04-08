let tickets = [];  // ГЛОБАЛЬНОЕ состояние

document.addEventListener('DOMContentLoaded', async () => {
  console.log('⭐ HelpDesk HTTP API');
  
  document.getElementById('addBtn').onclick = createNewTicket;
  await loadTickets();
});

window.getAllTickets = async () => {
  try {
    const response = await fetch('http://95.217.113.180:7070/?method=allTickets');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log('✅ Тикеты загружены:', data.length);
    tickets = data;
    return data;
  } catch (error) {
    console.log('🌐 API недоступен, демо-данные');
    tickets = [
      {id:1, name:'Поменять краску принтер 404', description:'HP LJ-1210', status:false},
      {id:2, name:'Windows PC-Hall24', description:'Переустановить', status:false},
      {id:3, name:'KB-31642dv3875', description:'Критическое обновление', status:true}
    ];
    return tickets;
  }
};

window.createTicket = async (data) => {
  const newTicket = { id: Date.now(), ...data, status: false };
  tickets.unshift(newTicket);
  renderTickets();
  return newTicket;
};

async function loadTickets() {
  await getAllTickets();
  renderTickets();
}

function renderTickets() {
  const container = document.getElementById('tickets');
  container.innerHTML = tickets.map(t => `
    <div class="ticket" style="border:1px solid #ccc; padding:15px; margin:10px 0; cursor:pointer;">
      <strong>${t.name}</strong>
      <span style="float:right; color:${t.status ? 'green' : 'orange'}; font-weight:bold;">
        ${t.status ? '✅ Выполнен' : '⏳ В работе'}
      </span>
      <br><small>${t.description}</small>
      <div style="margin-top:10px;">
        <button onclick="showTicket(${t.id})" style="margin-right:5px;">👁️</button>
        <button onclick="toggleTicket(${t.id}, event)" style="margin-right:5px;">
          ${t.status ? '⏳ В работе' : '✅ Выполнено'}
        </button>
        <button onclick="editTicket(${t.id}, event)" style="margin-right:5px;">✎</button>
        <button onclick="deleteTicket(${t.id}, event)">🗑</button>
      </div>
    </div>
  `).join('');
}

window.showTicket = (id) => {
  const ticket = tickets.find(t => t.id === id);
  alert(`#${ticket.id}\n${ticket.name}\n\n${ticket.description}`);
};

window.toggleTicket = (id, ev) => {
  ev.stopPropagation();
  const ticket = tickets.find(t => t.id === id);
  ticket.status = !ticket.status;
  renderTickets();
};

window.editTicket = (id, ev) => {
  ev.stopPropagation();
  const ticket = tickets.find(t => t.id === id);
  const name = prompt('Новое название:', ticket.name);
  const desc = prompt('Описание:', ticket.description);
  if (name && desc) {
    ticket.name = name;
    ticket.description = desc;
    renderTickets();
  }
};

window.deleteTicket = (id, ev) => {
  ev.stopPropagation();
  if (confirm('Удалить тикет?')) {
    tickets = tickets.filter(t => t.id !== id);
    renderTickets();
  }
};

window.createNewTicket = async () => {
  const name = prompt('Название тикета:');
  const desc = prompt('Описание:');
  if (name && desc) {
    await createTicket({ name, description: desc });
  }
};