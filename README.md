Got you 👍
Here is the FULL README.md as a single clean Markdown code block, ready to copy–paste directly.

⸻


# 🎬 FlickWatch

![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Navigation](https://img.shields.io/badge/React_Navigation-6B46C1?style=for-the-badge&logo=react&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-0D253F?style=for-the-badge&logo=themoviedatabase&logoColor=01B4E4)

FlickWatch is a sleek **movie & TV discovery mobile app** built with **React Native (Expo)** and powered by the **TMDB API**.  
Users can browse popular titles, explore trending movies and shows, search instantly, and curate a personal watchlist — all within a polished **dark-first UI**.

---

## ✨ Features

- 🔥 Discover **Popular Movies**
- 📈 Explore **Trending Movies & TV Shows**
- ⭐ Browse **Top Rated TV Shows**
- 🔍 Real-time **Search** for movies and series
- ❤️ Add / remove items in a **Watchlist**
- 💾 Persistent watchlist using local storage
- 🌙 Clean **Dark Mode** with Light Mode support
- 📱 Runs on **Android & iOS**

---

## 🛠 Tech Stack

- **React Native (Expo)**
- **React Navigation** (Stack + Bottom Tabs)
- **Axios** (API requests)
- **TMDB API**
- **Context API** (Global state)
- **AsyncStorage** (Persistence)
- **JavaScript (ES6+)**

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```
⚠️ This file is ignored by Git and should never be committed.

⸻

🚀 Getting Started

1️⃣ Clone the repository
```

git clone https://github.com/KasunHGamage/FlickWatch.git
cd FlickWatch
```

2️⃣ Install dependencies
```

npm install
```

3️⃣ Start the app
```

npx expo start
```

	•	Scan the QR code using Expo Go
	•	Or run on an Android emulator / iOS simulator

⸻

## 📸 Screenshots

## 🏠 Home Screen

<p align="left">
  <img src="./screenshots/home.PNG" alt="Home Screen" width="260" />
</p>


## 🔍 Search Screen

<p align="left">
  <img src="./screenshots/search.PNG" alt="Search Screen" width="260" />
</p>


## 🎬 Detail Screen

<p align="left">
  <img src="./screenshots/detail.PNG" alt="Detail Screen" width="260" />
</p>


## ❤️ Watchlist Screen

<p align="left">
  <img src="./screenshots/watchlist.PNG" alt="Watchlist Screen" width="260" />
</p>



⸻

## 🤖 AI Usage

AI tools were used as assistive tools during both the UI/UX design and development stages of this project.

🎨 UI / UX Design
	•	Stitch AI was used to explore and refine UI layouts.
	•	Focused on card-based layouts, spacing, typography, and dark/light mode consistency.
	•	All designs were reviewed and adjusted manually to ensure usability and feasibility in React Native.

🛠 Development
	•	Codex was used as a coding assistant during development.
	•	Assisted with component structure, navigation setup, and UI implementation.
	•	All generated code was reviewed, tested, and refactored manually.

⸻

##  🧠 Top AI Prompts Used

	1.	App-wide UI style (Dark & Light Mode).
Designed a cinematic UI with consistent components and spacing.
	2.	Home Screen with Card Sections
Horizontal card-based sections for Popular, Trending, and Top Rated content.
	3.	Reusable Media Card Component
Poster-focused cards with rating badge, title, and year reusable across screens.
	4.	Search & Watchlist UI
Clean search experience with empty states and a list-based watchlist layout.
	5.	Detail Screen (Cinematic Layout)
Poster hero, grouped metadata, primary action button, overview, and cast section.

⸻

## ❗ What AI Got Right / Wrong

✔️ What AI Got Right
	•	Provided a strong base for card-based layouts
	•	Helped define dark mode–first design
	•	Suggested reusable component patterns
	•	Improved visual hierarchy planning

❌ What Needed Manual Fixes
	•	Some layouts were visually heavy and required simplification
	•	Spacing was not always optimized for real mobile screens
	•	Certain UI ideas were not practical in React Native without adjustment
	•	Generated code required refactoring for structure and clarity

⸻

🛠 Manual Improvements & Edge Cases
	•	Reduced card height and improved padding for smoother scrolling
	•	Refined rating badge to be subtle and non-intrusive
	•	Unified card styles across Home, Search, and Watchlist
	•	Simplified watchlist remove action
	•	Handled empty states (search & watchlist)
	•	Added fallback handling for missing images
	•	Refactored navigation and global state logic
	•	Tested manually on an Android emulator

⸻

## 🧠 Learning Outcomes
	•	API integration with Axios
	•	Reusable UI component patterns
	•	Global state management using Context API
	•	Navigation with Stack & Bottom Tabs
	•	Dark-mode–first UI design
	•	Handling loading, empty, and error states
	•	Using AI as a support tool, not a replacement

⸻

## 🎯 Future Improvements
	•	User authentication
	•	Cloud-synced watchlist
	•	Pagination & infinite scrolling
	•	Genre-based filtering
	•	Trailer playback support

⸻

## 🧪 Testing

Basic unit tests are implemented using Jest and React Native Testing Library to verify core logic such as watchlist add/remove/check.

Run tests with:
```
npm test
```

⸻

## 👨‍💻 Author

Kasun Harsha
🔗 GitHub: https://github.com/KasunHGamage

⸻

## 📄 License

This project was created for learning and portfolio purposes.

---
