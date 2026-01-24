

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../state/theme/ThemeContext';
import { darkTheme, lightTheme } from '../../state/theme/colors';

export default function DetailSkeleton() {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;
  const surface = colors.card;
  const subtle = colors.border;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image placeholder */}
        <View style={[styles.hero, { backgroundColor: subtle }]} />

        <View style={styles.content}>
          {/* Title */}
          <View style={[styles.title, { backgroundColor: surface }]} />

          {/* Meta row */}
          <View style={styles.metaRow}>
            <View style={[styles.metaItem, { backgroundColor: surface }]} />
            <View style={[styles.metaItem, { backgroundColor: surface }]} />
            <View style={[styles.metaItemSmall, { backgroundColor: surface }]} />
          </View>

          {/* Genres */}
          <View style={[styles.genre, { backgroundColor: surface }]} />

          {/* Watchlist button */}
          <View style={[styles.button, { backgroundColor: surface }]} />

          {/* Overview title */}
          <View style={[styles.sectionTitle, { backgroundColor: surface }]} />

          {/* Overview text lines */}
          <View style={[styles.textLine, { backgroundColor: surface }]} />
          <View style={[styles.textLine, { backgroundColor: surface }]} />
          <View style={[styles.textLineShort, { backgroundColor: surface }]} />

          {/* Cast title */}
          <View style={[styles.sectionTitle, { marginTop: 22, backgroundColor: surface }]} />

          {/* Cast avatars */}
          <View style={styles.castRow}>
            <View style={[styles.castAvatar, { backgroundColor: subtle }]} />
            <View style={[styles.castAvatar, { backgroundColor: subtle }]} />
            <View style={[styles.castAvatar, { backgroundColor: subtle }]} />
            <View style={[styles.castAvatar, { backgroundColor: subtle }]} />
            <View style={[styles.castAvatar, { backgroundColor: subtle }]} />
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  hero: {
    width: '100%',
    height: 360,
  },

  content: {
    padding: 16,
  },

  title: {
    width: '70%',
    height: 26,
    borderRadius: 6,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },

  metaItem: {
    width: 48,
    height: 14,
    borderRadius: 4,
  },

  metaItemSmall: {
    width: 36,
    height: 14,
    borderRadius: 999,
  },

  genre: {
    marginTop: 10,
    width: '60%',
    height: 14,
    borderRadius: 4,
  },

  button: {
    marginTop: 16,
    height: 44,
    borderRadius: 12,
  },

  sectionTitle: {
    marginTop: 20,
    width: 120,
    height: 18,
    borderRadius: 6,
  },

  textLine: {
    marginTop: 10,
    width: '100%',
    height: 14,
    borderRadius: 4,
  },

  textLineShort: {
    marginTop: 10,
    width: '70%',
    height: 14,
    borderRadius: 4,
  },

  castRow: {
    marginTop: 12,
    flexDirection: 'row',
  },

  castAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
});
