import "@testing-library/jest-native/extend-expect";

// If your Watchlist uses AsyncStorage, mock it so tests don't crash
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);