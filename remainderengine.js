
let alarmSound = new Audio("alarm.mp3");

function showNotification(title, message) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: message,
      icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
    });
  }
}

if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

setInterval(async () => {
  const now = new Date();

  const { data: reminders, error } = await supabase
    .from("reminders")
    .select("*");

  if (error) {
    console.error("Error fetching reminders", error);
    return;
  }

  reminders.forEach(r => {
    const reminderTime = new Date(r.time);

    // Trigger if time is reached (within 1 minute window)
    if (Math.abs(reminderTime - now) < 60000) {
      showNotification("Reminder", r.text);

      if (r.priority === "High") {
        alarmSound.play();
      }
    }
  });

}, 60000);
