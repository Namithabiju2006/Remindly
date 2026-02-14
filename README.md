📍 REMINDLY
Plan smarter • Remember better • Never miss what matters

👥 Basic Details
Team Name: Novacoders

Team Members:

Member 1: Namitha Biju - Rajiv Gandhi Institute of Technology

Member 2: Ditha J S - Rajiv Gandhi Institute of Technology, Kottayam

Hosted Project Link: http://127.0.0.1:5500/index.html (Local Development Link)

📖 Project Description
Remindly addresses the "Environmental Disconnect" found in traditional productivity tools. Standard alarms often trigger at the wrong time (e.g., reminding you to buy groceries while you are still at your desk).

The Problem:

Notification Fatigue: Irrelevant time-based alerts are often ignored.

Fragmented Planning: Users must manually coordinate between map apps and task lists.

Inefficiency: Current tools lack geographical context, leading to missed opportunities and wasted travel time.

The Solution:
Remindly bridges this gap by using a Smart Proximity Engine. It focuses on:

Geospatial Integration: Linking tasks to coordinates via OpenStreetMap.

Dynamic Alerts: Using the Haversine Formula to calculate real-time distance.

Prioritized Visualization: A dashboard that sorts tasks by urgency and physical location.

🛠 Technical Details
Technologies Used
Languages: JavaScript (ES6+), HTML5, CSS3

Database-as-a-Service: Supabase (PostgreSQL) for real-time cloud storage and cross-session persistence.

Libraries: Leaflet.js (Interactive mapping), Nominatim API (Geocoding/Search).

Tools: VS Code, Live Server, Git, Supabase Dashboard.

✨ Key Features
☁️ Cloud-Integrated Persistence: Uses Supabase to sync reminders across sessions; data is never lost on refresh.

🗺️ Geospatial Contextualization: Users can search for locations or drop custom markers on an interactive map.

🧠 Intelligent Proximity Engine: A background watcher that turns passive reminders into active alerts when a user enters a task's physical radius.

🚦 Visual Priority Hierarchy: Color-coded cards (High, Medium, Low) for instant identification of urgent nearby tasks.

📍 Seamless Reverse-Geocoding: Automatically translates map clicks into human-readable addresses.

🚀 Implementation & Setup
Installation
Clone the Repository:

Bash
git clone https://github.com/Namitha-Biju/remindly.git
CDN Dependencies: Ensure you have an active internet connection to load Leaflet.js and the Supabase JS Client via the included CDN links in index.html.

Run
Supabase Setup: Create a table named reminders with columns: id, text, time, priority, location_name, lat, and lng.

Start the Project: Open the project in VS Code and use the Live Server extension to launch index.html.

Access: Open your browser to http://127.0.0.1:5500.
Program Documentation
Image 1
<img width="1418" height="830" alt="11" src="https://github.com/user-attachments/assets/dd9fb2a8-0bad-4684-81df-dd4b68afa0a5" />

Image 2
<img width="1645" height="915" alt="2" src="https://github.com/user-attachments/assets/3d0252d3-2bb0-4cac-bc52-0f1a0c42c51e" />
Image 3
<img width="1505" height="911" alt="3" src="https://github.com/user-attachments/assets/029853af-e569-463d-8aab-2ecd7e2e37c1" />
Image 4
<img width="1642" height="758" alt="Screenshot 2026-02-14 083501" src="https://github.com/user-attachments/assets/6cbd2c93-d679-443d-a0a7-d8f70e31b511" />


📊 Application Workflow
Input: User enters a task and sets a priority.

Locate: User searches for a location or clicks the map; the app captures the lat/lng.

Store: Data is pushed to the Supabase PostgreSQL cloud database.

Monitor: The Haversine Engine calculates the distance between the user's live GPS and the stored lat/lng.

Alert: If distance < 200m, a notification is triggered.

🤝 Team Contributions
Namitha Biju: Frontend architecture, Leaflet.js map integration, and UI/UX design.

Ditha J S: Database design with Supabase, API integration, and Haversine proximity logic.

Made with ❤️ at TinkerHub


