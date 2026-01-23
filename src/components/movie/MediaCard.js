import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function MediaCard({
  posterUrl,
  title,
  rating,
  year,
  onPress,
  style,
}) {
  const Container = onPress ? TouchableOpacity : View;
  const ratingText = typeof rating === "number" ? rating.toFixed(1) : null;

  return (
    <Container style={[styles.card, style]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.posterWrap}>
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
        ) : (
          <View style={[styles.poster, styles.posterPlaceholder]}>
            <Text style={styles.posterPlaceholderText}>No Image</Text>
          </View>
        )}

        {ratingText ? (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {ratingText}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title || "Untitled"}
        </Text>

        <Text style={styles.year} numberOfLines={1}>
          {year || ""}
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
  },

  posterWrap: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#15151a",
  },

  poster: {
    width: "100%",
    height: 200,
    backgroundColor: "#15151a",
  },

  posterPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  posterPlaceholderText: {
    color: "#9aa0a6",
    fontSize: 12,
    fontWeight: "700",
  },

  ratingBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  info: {
    marginTop: 10,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    minHeight: 36,
  },
  year: {
    marginTop: 4,
    color: "#9aa0a6",
    fontSize: 12,
    fontWeight: "600",
  },
});