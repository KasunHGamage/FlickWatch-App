import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useWatchlist } from "../state/watchlist/WatchlistContext";
import MediaCard from "../components/movie/MediaCard";
import { img } from "../services/tmdb";

export default function WatchlistScreen({ navigation }) {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [pendingRemove, setPendingRemove] = React.useState(null);

  // Tap on a saved item to view its detail page
  const goDetail = (item) => {
    navigation.navigate("Detail", { id: item.id, type: item.type });
  };

  // Render each saved item as a MediaCard with a gap at bottom
  const confirmRemove = (item) => setPendingRemove(item);
  const cancelRemove = () => setPendingRemove(null);
  const handleRemove = () => {
    if (!pendingRemove) return;
    removeFromWatchlist(pendingRemove.id, pendingRemove.type);
    setPendingRemove(null);
  };

  const renderItem = ({ item }) => {
    const subtitle = `${item.type === "tv" ? "TV Show" : "Movie"}${
      item.year ? ` • ${item.year}` : ""
    }`;
    const posterUrl = img.w500(item.posterPath);

    return (
      <View style={styles.rowCard}>
        <TouchableOpacity
          style={styles.rowMain}
          onPress={() => goDetail(item)}
          activeOpacity={0.85}
        >
          {posterUrl ? (
            <Image source={{ uri: posterUrl }} style={styles.rowPoster} />
          ) : (
            <View style={[styles.rowPoster, styles.rowPosterPlaceholder]}>
              <Text style={styles.rowPosterText}>No Image</Text>
            </View>
          )}
          <View style={styles.rowText}>
            <Text style={styles.rowTitle} numberOfLines={1}>
              {item.title || "Untitled"}
            </Text>
            <Text style={styles.rowSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => confirmRemove(item)}
          style={styles.trashButton}
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          accessibilityLabel="Remove from watchlist"
        >
          <Ionicons name="trash-outline" size={22} color="#9aa0a6" />
        </TouchableOpacity>
      </View>
    );
  };

  // If watchlist empty, show message
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Your watchlist is empty.</Text>
      <Text style={styles.emptySub}>
        Start adding movies and shows to see them here.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      {watchlist.length ? (
        <FlatList
          data={watchlist}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        renderEmpty()
      )}

      <Modal
        visible={!!pendingRemove}
        transparent
        animationType="fade"
        onRequestClose={cancelRemove}
      >
        <Pressable style={styles.modalBackdrop} onPress={cancelRemove}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Remove from watchlist?</Text>
            <Text style={styles.modalBody}>
              {pendingRemove?.title
                ? `Remove "${pendingRemove.title}" from your watchlist?`
                : "Remove this item from your watchlist?"}
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancel]}
                onPress={cancelRemove}
                activeOpacity={0.85}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalRemove]}
                onPress={handleRemove}
                activeOpacity={0.85}
              >
                <Text style={styles.modalRemoveText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0f" },

  listContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 22,
    padding: 14,
    marginBottom: 14,
  },
  rowMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rowPoster: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#15151a",
  },
  rowPosterPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  rowPosterText: {
    color: "#9aa0a6",
    fontSize: 10,
    fontWeight: "700",
  },
  rowText: {
    marginLeft: 12,
    flex: 1,
  },
  rowTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  rowSubtitle: {
    color: "#9aa0a6",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "600",
  },
  trashButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#15151a",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  modalBody: {
    color: "#9aa0a6",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 18,
  },
  modalButton: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 10,
  },
  modalCancel: {
    backgroundColor: "#222226",
  },
  modalCancelText: {
    color: "#e6e6e7",
    fontWeight: "700",
  },
  modalRemove: {
    backgroundColor: "#e50914",
  },
  modalRemoveText: {
    color: "#fff",
    fontWeight: "800",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptySub: {
    color: "#9aa0a6",
    fontSize: 14,
    textAlign: "center",
  },
});
