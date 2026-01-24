
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../state/theme/ThemeContext';
import { darkTheme, lightTheme } from '../../state/theme/colors';

function Section({ title, count = 3, surface, subtle }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderRow}>
        <View style={[styles.sectionTitle, { backgroundColor: surface }]} />
        <View style={[styles.sectionAction, { backgroundColor: subtle }]} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {Array.from({ length: count }).map((_, i) => (
          <View key={i} style={[styles.card, { backgroundColor: surface }]}>
            <View style={[styles.poster, { backgroundColor: subtle }]} />
            <View style={styles.cardInfo}>
              <View style={[styles.line1, { backgroundColor: subtle }]} />
              <View style={styles.metaRow}>
                <View style={[styles.metaItem, { backgroundColor: subtle }]} />
                <View style={[styles.metaItemSmall, { backgroundColor: subtle }]} />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default function HomeSkeleton() {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;
  const surface = colors.card;
  const subtle = colors.border;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Page title placeholder */}
        <View style={[styles.pageTitle, { backgroundColor: surface }]} />

        {/* Sections */}
        <Section title="Popular" surface={surface} subtle={subtle} />
        <Section title="Trending" surface={surface} subtle={subtle} />
        <Section title="Top Rated" surface={surface} subtle={subtle} />

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 6,
    paddingBottom: 12,
  },

  pageTitle: {
    height: 26,
    width: 140,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },

  section: {
    marginTop: 14,
  },

  sectionHeaderRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  sectionTitle: {
    height: 18,
    width: 160,
    borderRadius: 8,
  },

  sectionAction: {
    height: 14,
    width: 44,
    borderRadius: 7,
    opacity: 0.7,
  },

  row: {
    paddingLeft: 16,
    paddingRight: 6,
  },

  card: {
    width: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
  },

  poster: {
    width: '100%',
    height: 200,
  },

  cardInfo: {
    padding: 10,
    paddingBottom: 12,
  },

  line1: {
    width: '85%',
    height: 14,
    borderRadius: 6,
  },

  metaRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  metaItem: {
    width: 46,
    height: 12,
    borderRadius: 6,
  },

  metaItemSmall: {
    width: 28,
    height: 12,
    borderRadius: 6,
    opacity: 0.8,
  },
});
