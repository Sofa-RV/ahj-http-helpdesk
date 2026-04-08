const API_BASE = 'http://95.217.113.180:7070/';

export async function getAllTickets() {
  try {
    const response = await fetch(`${API_BASE}?method=allTickets`);
    console.log('Status:', response.status);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log('✅ Тикеты загружены:', data.length, 'шт');
    return data;
  } catch (error) {
    console.error('❌ API Error:', error);
    return [];
  }
}

export async function getTicketById(id) {
  const response = await fetch(`${API_BASE}?method=ticketById&id=${id}`);
  if (!response.ok) throw new Error('Тикет не найден');
  return await response.json();
}

export async function createTicket(data) {
  const response = await fetch(`${API_BASE}?method=createTicket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Ошибка создания');
  return await response.json();
}
getAllTickets = getAllTickets;
getTicketById = getTicketById;
createTicket = createTicket;