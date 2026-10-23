const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("✅ 【entity-MongoDB¦canonical_name=MongoDB】 Connected")).catch(e=>console.log("⚠️ Mongo fallback mode:", e.message));

const Project = mongoose.model('Project', { title:String, description:String, tech:[String], 【entity-github¦canonical_name=GitHub】:String, live:String, image:String });

app.get('/api/projects', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const projects = await Project.find();
      if (projects.length > 0) return res.json(projects);
    }
  } catch(e){}
  res.json([
    { title: "Personal Portfolio Website", description: "Full-stack MERN portfolio with 【entity-MongoDB¦canonical_name=MongoDB】", tech: ["React", "Node.js", "【entity-MongoDB¦canonical_name=MongoDB】"], 【entity-github¦canonical_name=GitHub】: "https://github.com/shreyasarroju11-debug", live: "", image: "" },
    { title: "Python CLI Task Manager", description: "Python file handling project", tech: ["Python"], 【entity-github¦canonical_name=GitHub】: "https://github.com/shreyasarroju11-debug", live: "", image: "" },
    { title: "C Student Management System", description: "C language data structures", tech: ["C"], 【entity-github¦canonical_name=GitHub】: "https://github.com/shreyasarroju11-debug", live: "", image: "" }
  ]);
});

app.get('/', (req,res)=>res.send('Shreyas Arroju Portfolio API Running'));
app.listen(process.env.PORT || 5000, ()=>console.log("Server running"));
