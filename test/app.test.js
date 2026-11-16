const {test}=require("node:test"), assert=require("node:assert/strict");
const fs=require("node:fs"), os=require("node:os"), path=require("node:path");
const temp=fs.mkdtempSync(path.join(os.tmpdir(),"helpdesk-test-"));process.env.DATA_DIR=temp;
const {createApp}=require("../app");
test("health endpoint returns healthy",async()=>{
 const server=createApp().listen(0);
 try{const r=await fetch(`http://127.0.0.1:${server.address().port}/api/health`);
 assert.equal(r.status,200);assert.equal((await r.json()).status,"healthy");}
 finally{await new Promise(resolve=>server.close(resolve));}
});
test("ticket can be created and listed",async()=>{
 const server=createApp().listen(0);
 try{const base=`http://127.0.0.1:${server.address().port}`;
 const r=await fetch(`${base}/api/tickets`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requester:"Test User",title:"VPN issue",description:"Cannot connect",priority:"High"})});
 assert.equal(r.status,201);assert.equal((await r.json()).status,"Open");
 const listed=await fetch(`${base}/api/tickets`);assert.equal((await listed.json()).length,1);}
 finally{await new Promise(resolve=>server.close(resolve));}
});
test("ticket creation validates required fields",async()=>{
 const server=createApp().listen(0);
 try{const r=await fetch(`http://127.0.0.1:${server.address().port}/api/tickets`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requester:"Only a name"})});assert.equal(r.status,400);}
 finally{await new Promise(resolve=>server.close(resolve));}
});
