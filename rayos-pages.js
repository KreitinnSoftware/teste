const DB_KEY='rayos_proto_v1';
const STATUS=['Recebido','Orçamento','Aguardando chegada de peças','Em reparo','Pronto','Entregue'];
const $=selector=>document.querySelector(selector);
const escapeHtml=value=>String(value==null?'':value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
function loadDb(){try{return JSON.parse(localStorage.getItem(DB_KEY))||{users:[],devs:[],ords:[]}}catch(error){return{users:[],devs:[],ords:[]}}}
function saveDb(db){try{localStorage.setItem(DB_KEY,JSON.stringify(db))}catch(error){}}
function orderLabel(db,order){const device=db.devs.find(item=>item.id===order.did)||{},user=db.users.find(item=>item.id===device.uid)||{};return `OS #${order.id} - ${device.tipo||'Produto'} ${device.marca||''} ${device.modelo||''} (${user.nome||'Cliente'})`.trim()}
