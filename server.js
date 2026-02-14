import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 🔐 Supabase config
const SUPABASE_URL = "https://ixlufxpcehhcpuftqiiw.supabase.co";
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4bHVmeHBjZWhoY3B1ZnRxaWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTQwODUsImV4cCI6MjA4NjU3MDA4NX0.UT1nbsZb0bslagBn4UzRwcci81XyZJWe28TJ38AMBfc"; 
// ⚠️ Use SERVICE ROLE KEY here (from Supabase settings → API), not anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ✅ Get all reminders
app.get("/api/reminders", async (req, res) => {
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .order("time", { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ✅ Add a reminder
app.post("/api/reminders", async (req, res) => {
  const { text, location, time, priority } = req.body;

  const { data, error } = await supabase
    .from("reminders")
    .insert([{ text, location, time, priority }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data[0]);
});

// ✅ Delete a reminder
app.delete("/api/reminders/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("reminders")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// ✅ Search reminders by location (e.g. Kottayam)
app.get("/api/reminders/search/:place", async (req, res) => {
  const place = req.params.place;

  const { data, error } = await supabase
    .from("reminders") 
    .select("*")
    .ilike("location", `%${place}%`);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});
