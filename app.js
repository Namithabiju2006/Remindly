const API_BASE = "http://localhost:3000/api";

async function saveReminder() {
  const text = document.getElementById("task").value.trim();
  const location = document.getElementById("locationName").value;
  const time = document.getElementById("time").value;
  const priority = document.getElementById("priority").value;

  if (!text) {
    alert("Please enter reminder text!");
    return;
  }

  const res = await fetch(`${API_BASE}/reminders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text, location, time, priority })
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Save failed:", err);
    alert("Failed to save reminder. Check console.");
    return;
  }

  // Clear input
  document.getElementById("task").value = "";

  // Reload list
  displayReminders();
}

async function displayReminders() {
  const container = document.getElementById("savedReminders");

  const res = await fetch(`${API_BASE}/reminders`);
  const reminders = await res.json();

  container.innerHTML = reminders.length
    ? reminders.map(createReminderCard).join("")
    : "<p>No reminders saved.</p>";
}

function createReminderCard(r) {
  const colors = {
    High: "#EF4444",
    Medium: "#F59E0B",
    Low: "#10B981"
  };

  const formattedTime = r.time
    ? new Date(r.time).toLocaleString()
    : "No time set";

  return `
    <div class="reminderCard" style="border-left:6px solid ${colors[r.priority]}">
      <div class="reminderTitle">${r.text}</div>
      <div class="reminderLocation">📍 ${r.location || "No location"}</div>
      <div class="reminderTime">⏰ ${formattedTime}</div>
      <button class="deleteBtn" onclick="deleteReminder(${r.id})">Delete</button>
    </div>
  `;
}

async function deleteReminder(id) {
  const res = await fetch(`${API_BASE}/reminders/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    alert("Failed to delete reminder");
    return;
  }

  displayReminders();
}

window.onload = displayReminders;
