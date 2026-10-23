const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("【entity-MongoDB¦canonical_name=MongoDB】 Connected"))
  .catch(e=>console.log("Mongo fallback:", e.message));
const Project = mongoose.model('Project', {
  title: String,
  description: String,
  tech: [String],
  source: String,
  live: String,
  image: String
});
app.get('/api/projects', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const projects = await Project.find();
      if (projects.length > 0) return res.json(projects);
    }
  } catch(e){}
  res.json([
    { title: "Personal Portfolio Website", description: "Full-stack MERN portfolio with 【entity-MongoDB¦canonical_name=MongoDB】", tech: ["React", "Node.js", "【entity-MongoDB¦canonical_name=MongoDB】"], source: "https://github.com/shreyasarroju11-debug", live: "", image: "" },
    { title: "Python CLI Task Manager", description: "Python file handling project", tech: ["Python"], source: "https://github.com/shreyasarroju11-debug", live: "", image: "" },
    { title: "C Student Management System", description: "C language data structures", tech: ["C"], source: "https://github.com/shreyasarroju11-debug", live: "", image: "" }
  ]);
});
app.post('/api/projects', async (req, res) => {
  try {
    const p = new Project(req.body);
    await p.save();
    res.json(p);
  } catch(e){ res.status(500).json({error: e.message}) }
});
app.get('/', (req,res)=>res.send('Shreyas Arroju Portfolio API Running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("Server running on", PORT));
