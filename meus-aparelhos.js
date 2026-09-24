const personalDb=loadDb();
const personalOrders=personalDb.ords||[];
$('#ordersBody').innerHTML=personalOrders.length?personalOrders.map(order=>`<tr><td>#${order.id}</td><td>${escapeHtml(orderLabel(personalDb,order))}</td><td>${escapeHtml(order.status)}</td><td>${escapeHtml(order.entrada||'-')}</td></tr>`).join(''):'<tr><td colspan="4" class="empty">Você ainda não cadastrou aparelhos.</td></tr>';
