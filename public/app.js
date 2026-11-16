const form=document.querySelector("#ticket-form"), list=document.querySelector("#ticket-list");
const message=document.querySelector("#message");
function safe(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
async function refresh(){
 const r=await fetch("/api/tickets"), tickets=await r.json();
 for(const [id,status] of [["open-count","Open"],["progress-count","In Progress"],["resolved-count","Resolved"]])
  document.getElementById(id).textContent=tickets.filter(t=>t.status===status).length;
 if(!tickets.length){list.innerHTML='<p class="empty">No tickets yet. Create your first request.</p>';return;}
 list.innerHTML=tickets.map(t=>`<article class="ticket"><h4>${safe(t.title)}</h4><p>${safe(t.requester)} · ${safe(t.priority)} priority</p><p>${safe(t.description)}</p><label>Status<select data-id="${t.id}">${["Open","In Progress","Resolved"].map(s=>`<option ${s===t.status?"selected":""}>${s}</option>`).join("")}</select></label></article>`).join("");
}
form.addEventListener("submit",async e=>{
 e.preventDefault();const data=Object.fromEntries(new FormData(form));
 const r=await fetch("/api/tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
 const result=await r.json();if(!r.ok){message.textContent=result.error;return;}
 form.reset();message.textContent="Ticket created successfully.";await refresh();
});
list.addEventListener("change",async e=>{
 if(!e.target.matches("select[data-id]"))return;
 await fetch(`/api/tickets/${e.target.dataset.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e.target.value})});
 await refresh();
});
refresh().catch(()=>message.textContent="Unable to load tickets. Check the server.");
