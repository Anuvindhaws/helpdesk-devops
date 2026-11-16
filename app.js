const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "tickets.json");
const STATUSES = ["Open", "In Progress", "Resolved"];
function readTickets() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}
function writeTickets(tickets) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(tickets, null, 2), "utf8");
}
function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));
  app.get("/api/health", (_req, res) => res.json({status:"healthy", application:"HelpDesk"}));
  app.get("/api/tickets", (_req, res) => res.json(readTickets().sort((a,b)=>b.createdAt.localeCompare(a.createdAt))));
  app.post("/api/tickets", (req, res) => {
    const {requester,title,description,priority} = req.body || {};
    if (![requester,title,description].every(v=>typeof v==="string" && v.trim()))
      return res.status(400).json({error:"Requester, title and description are required."});
    const ticket = {id:randomUUID(), requester:requester.trim(), title:title.trim(),
      description:description.trim(), priority:["Low","Medium","High"].includes(priority)?priority:"Medium",
      status:"Open", createdAt:new Date().toISOString()};
    const tickets=readTickets(); tickets.push(ticket); writeTickets(tickets);
    return res.status(201).json(ticket);
  });
  app.patch("/api/tickets/:id", (req,res) => {
    const {status}=req.body || {};
    if (!STATUSES.includes(status)) return res.status(400).json({error:"Invalid ticket status."});
    const tickets=readTickets(); const ticket=tickets.find(t=>t.id===req.params.id);
    if (!ticket) return res.status(404).json({error:"Ticket not found."});
    ticket.status=status; ticket.updatedAt=new Date().toISOString(); writeTickets(tickets);
    return res.json(ticket);
  });
  return app;
}
if (require.main===module) {
  const port=Number(process.env.PORT||3000);
  createApp().listen(port,"0.0.0.0",()=>console.log(`HelpDesk running on port ${port}`));
}
module.exports={createApp,STATUSES};
