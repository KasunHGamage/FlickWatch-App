import React from "react";
import { renderHook, act } from "@testing-library/react-native";
import { WatchlistProvider, useWatchlist } from "../WatchlistContext";

const wrapper = ({ children }) => (
  <WatchlistProvider>{children}</WatchlistProvider>
);

describe("WatchlistContext", () => {
  const sampleItem = {
    id: 1,
    type: "movie",
    title: "Test Movie",
    year: "2024",
    rating: 8.5,
    posterPath: "/test.jpg",
  };

  test("adds item to watchlist", () => {
    const { result } = renderHook(() => useWatchlist(), { wrapper });

    act(() => {
      result.current.addToWatchlist(sampleItem);
    });

    expect(result.current.watchlist.length).toBe(1);
    expect(result.current.watchlist[0].title).toBe("Test Movie");
  });

  test("removes item from watchlist", () => {
    const { result } = renderHook(() => useWatchlist(), { wrapper });

    act(() => {
      result.current.addToWatchlist(sampleItem);
    });

    act(() => {
      result.current.removeFromWatchlist(sampleItem.id, sampleItem.type);
    });

    expect(result.current.watchlist.length).toBe(0);
  });

  test("checks if item exists in watchlist", () => {
    const { result } = renderHook(() => useWatchlist(), { wrapper });

    act(() => {
      result.current.addToWatchlist(sampleItem);
    });

    expect(result.current.isInWatchlist(sampleItem.id, sampleItem.type)).toBe(true);
  });
});