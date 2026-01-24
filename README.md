# 🎬 FlickWatch
![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Navigation](https://img.shields.io/badge/React_Navigation-6B46C1?style=for-the-badge&logo=react&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-0D253F?style=for-the-badge&logo=themoviedatabase&logoColor=01B4E4)

FlickWatch is a sleek **movie & TV discovery app** built with **React Native (Expo)** and powered by the **TMDB API**.  
Browse popular titles, explore trending movies and shows, search instantly, and curate a personal watchlist — all in a polished **dark UI**.

---

## ✨ Features

- 🔥 Discover **Popular Movies**
- 📈 Explore **Trending Movies & TV Shows**
- ⭐ Browse **Top Rated TV Shows**
- 🔍 Real-time **Search** for movies and series
- ❤️ Add/remove items in a **Watchlist**
- 💾 Persistent watchlist with local storage
- 🌙 Consistent **Dark Mode UI**
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

⚠️ The `.env` file is ignored by Git and should never be committed.

---

## 🚀 Getting Started

1️⃣ Clone the repository

```bash
git clone https://github.com/KasunHGamage/FlickWatch.git
cd FlickWatch
```

2️⃣ Install dependencies

```bash
npm install
```

3️⃣ Start the app

```bash
npx expo start
```

- Scan the QR code using Expo Go
- Or run on an Android emulator / iOS simulator

---

## 📸 Screenshots

### 🏠 Home Screen
<p align="left">
  <img src="./screenshots/home.PNG" alt="Home Screen" width="260" />
</p>

### 🔍 Search Screen
<p align="left">
  <img src="./screenshots/search.PNG" alt="Search Screen" width="260" />
</p>

### 🎬 Detail Screen
<p align="left">
  <img src="./screenshots/detail.PNG" alt="Detail Screen" width="260" />
</p>

### ❤️ Watchlist Screen
<p align="left">
  <img src="./screenshots/watchlist.PNG" alt="Watchlist Screen" width="260" />
</p>

---

## 🧠 Learning Outcomes

- API integration in React Native
- Reusable UI component patterns
- Global state with Context API
- Navigation using Stack & Bottom Tabs
- Clean dark-mode UI design
- Loading, error, and empty states

---

## 🎯 Future Improvements

- User authentication
- Cloud-synced watchlist
- Pagination & infinite scrolling
- Genre-based filtering
- Trailer playback support

---

## 🧪 Testing

Basic unit tests are implemented using **Jest** and **React Native Testing Library** to verify core logic like watchlist add/remove/check.

Run tests with:
```bash
npm test
```

---

## 👨‍💻 Author

Kasun Harsha  
🔗 GitHub: https://github.com/KasunHGamage

---

## 📄 License

This project is created for learning and portfolio purposes.
