import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../state/theme/ThemeContext";
import { darkTheme, lightTheme } from "../../state/theme/colors";

export default function MediaCard({
  posterUrl,
  title,
  rating,
  year,
  onPress,
  style,
}) {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const Container = onPress ? TouchableOpacity : View;
  const ratingText = typeof rating === "number" ? rating.toFixed(1) : null;

  return (
    <Container
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.posterWrap, { backgroundColor: colors.card }]}>
        {posterUrl ? (
          <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
        ) : (
          <View style={[styles.poster, styles.posterPlaceholder, { backgroundColor: colors.card }]}>
            <Text style={[styles.posterPlaceholderText, { color: colors.muted }]}>No Image</Text>
          </View>
        )}

        {ratingText ? (
          <View style={[styles.ratingBadge, { backgroundColor: colors.text }]}>
            <Text style={[styles.ratingText, { color: colors.background }]}>★ {ratingText}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {title || "Untitled"}
        </Text>

        <Text style={[styles.year, { color: colors.muted }]} numberOfLines={1}>
          {year || ""}
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    overflow: "hidden",
  },

  posterWrap: {
    borderRadius: 16,
    overflow: "hidden",
  },

  poster: {
    width: "100%",
    height: 200,
  },

  posterPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  posterPlaceholderText: {
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
    fontSize: 12,
    fontWeight: "800",
  },

  info: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  year: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
  },
});
