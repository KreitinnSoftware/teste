const DB_KEY='rayos_proto_v1';
const $=selector=>document.querySelector(selector);
const escapeHtml=value=>String(value==null?'':value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const statusLabels={Solicitada:'requested','Em trânsito':'transit',Recebida:'received',Cancelada:'cancelled'};
let database=loadDatabase();
let editingId=null;
function loadDatabase(){try{return JSON.parse(localStorage.getItem(DB_KEY))||{users:[],devs:[],ords:[],nid:{u:1,d:1,o:1}}}catch(error){return{users:[],devs:[],ords:[],nid:{u:1,d:1,o:1}}}}
function saveDatabase(){try{localStorage.setItem(DB_KEY,JSON.stringify(database))}catch(error){}}
function deviceForOrder(order){return database.devs.find(device=>device.id===order.did)||{}}
function orderLabel(order){const device=deviceForOrder(order);const customer=database.users.find(user=>user.id===device.uid)||{};return `OS #${order.id} - ${device.tipo||'Produto'} ${device.marca||''} ${device.modelo||''} (${customer.nome||'Cliente'})`.trim()}
function populateOrders(){const select=$('#pieceOrder');select.innerHTML='<option value="">Sem vínculo com produto/OS</option>'+database.ords.map(order=>`<option value="${order.id}">${escapeHtml(orderLabel(order))}</option>`).join('')}
function formatDate(value){if(!value)return '-';return new Date(`${value}T00:00:00`).toLocaleDateString('pt-BR')}
function statusBadge(status){return `<span class="status ${statusLabels[status]||''}">${escapeHtml(status)}</span>`}
function renderPieces(){const rows=database.pecas||[];$('#piecesBody').innerHTML=rows.length?rows.map(piece=>{const order=database.ords.find(item=>item.id===piece.orderId);return `<tr><td>${escapeHtml(piece.name)}</td><td>${piece.quantity}</td><td>${formatDate(piece.expectedDate)}</td><td>${statusBadge(piece.status)}</td><td>${order?escapeHtml(orderLabel(order)):'Sem vínculo'}</td><td><div class="actions"><button class="btn g" onclick="editPiece(${piece.id})">Editar</button><button class="btn g" onclick="removePiece(${piece.id})">Excluir</button></div></td></tr>`}).join(''):'<tr><td colspan="6" class="empty">Nenhuma peça cadastrada.</td></tr>'}
function resetForm(){editingId=null;$('#pieceForm').reset();$('#pieceId').value='';$('#saveButton').textContent='Cadastrar peça';$('#cancelButton').hidden=true}
function editPiece(id){const piece=(database.pecas||[]).find(item=>item.id===id);if(!piece)return;editingId=id;$('#pieceId').value=id;$('#pieceName').value=piece.name;$('#pieceSupplier').value=piece.supplier||'';$('#pieceQuantity').value=piece.quantity;$('#pieceOrder').value=piece.orderId||'';$('#pieceExpectedDate').value=piece.expectedDate;$('#pieceStatus').value=piece.status;$('#saveButton').textContent='Salvar alterações';$('#cancelButton').hidden=false;window.scrollTo({top:0,behavior:'smooth'})}
function removePiece(id){if(!confirm('Excluir esta peça?'))return;database.pecas=(database.pecas||[]).filter(piece=>piece.id!==id);saveDatabase();renderPieces()}
function savePiece(event){event.preventDefault();const form=event.target;const piece={id:editingId||Date.now(),name:form.name.value.trim(),supplier:form.supplier.value.trim(),quantity:Number(form.quantity.value),orderId:form.orderId.value?Number(form.orderId.value):null,expectedDate:form.expectedDate.value,status:form.status.value};if(!piece.name||!piece.quantity||!piece.expectedDate)return;database.pecas=database.pecas||[];const index=database.pecas.findIndex(item=>item.id===editingId);if(index>=0)database.pecas[index]=piece;else database.pecas.push(piece);saveDatabase();resetForm();renderPieces()}
$('#pieceForm').addEventListener('submit',savePiece);$('#cancelButton').addEventListener('click',resetForm);populateOrders();renderPieces();
