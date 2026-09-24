const pendingDb=loadDb();
const pendingOrders=(pendingDb.ords||[]).filter(order=>order.status!=='Entregue');
$('#ordersBody').innerHTML=pendingOrders.length?pendingOrders.map(order=>`<tr><td>#${order.id}</td><td>${escapeHtml(orderLabel(pendingDb,order))}</td><td>${escapeHtml(order.status)}</td><td>${escapeHtml(order.entrada||'-')}</td></tr>`).join(''):'<tr><td colspan="4" class="empty">Nenhum pedido pendente.</td></tr>';
