import React, { createContext, useContext, useMemo, useReducer } from "react";

const WatchlistContext = createContext(null);

const initialState = {
  items: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const item = action.payload;
      const exists = state.items.some((x) => x.id === item.id && x.type === item.type);
      if (exists) return state;
      return { ...state, items: [item, ...state.items] };
    }

    case "REMOVE": {
      const { id, type } = action.payload;
      return { ...state, items: state.items.filter((x) => !(x.id === id && x.type === type)) };
    }

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function WatchlistProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    const addToWatchlist = (item) => {
      if (!item?.id || !item?.type) return;
      dispatch({ type: "ADD", payload: item });
    };

    const removeFromWatchlist = (id, type) => {
      if (!id || !type) return;
      dispatch({ type: "REMOVE", payload: { id, type } });
    };

    const isInWatchlist = (id, type) => {
      if (!id || !type) return false;
      return state.items.some((x) => x.id === id && x.type === type);
    };

    const clearWatchlist = () => dispatch({ type: "CLEAR" });

    return {
      watchlist: state.items,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      clearWatchlist,
    };
  }, [state.items]);

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
}