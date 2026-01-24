import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tmdb, img } from '../services/tmdb';
import { useTheme } from '../state/theme/ThemeContext';
import { darkTheme, lightTheme } from '../state/theme/colors';

export default function SearchScreen({ navigation }) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    if (!query.trim()) return;
    setError('');
    try {
      if (!refreshing) setLoading(true);
      const res = await tmdb.search(query);
      // filter out people results:
      setResults(res?.results?.filter((r) => r.media_type !== 'person') || []);
    } catch (err) {
      console.error(err);
      setResults([]);
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError('');
      setLoading(false);
      setRefreshing(false);
      return;
    }
    const delay = setTimeout(search, 500);
    return () => clearTimeout(delay);
  }, [query]);

  const onRefresh = () => {
    if (!query.trim()) return;
    setRefreshing(true);
    search();
  };

  const goDetail = (item) => {
    const type = item.media_type || (item.title ? 'movie' : 'tv');
    navigation.navigate('Detail', { id: item.id, type });
  };

  const renderResult = ({ item }) => {
    const isMovie = item.media_type === 'movie';
    const title = isMovie ? item.title : item.name;
    const date = isMovie ? item.release_date : item.first_air_date;
    return (
      <TouchableOpacity style={[styles.resultRow, { borderBottomColor: colors.border }]} onPress={() => goDetail(item)} activeOpacity={0.8}>
        {item.poster_path ? (
          <Image source={{ uri: img.w200(item.poster_path) }} style={styles.resultImage} />
        ) : (
          <View style={[styles.resultImage, styles.resultPlaceholder, { backgroundColor: colors.card }]}>
            <Text style={[styles.placeholderText, { color: colors.muted }]}>No Image</Text>
          </View>
        )}
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[styles.resultTitle, { color: colors.text }]} numberOfLines={1}>
            {title}
          </Text>

          <View style={styles.metaRow}>
            <Text style={[styles.typePill, { color: colors.accent, borderColor: colors.border, backgroundColor: colors.card }]}>
              {(item.media_type || (item.title ? 'movie' : 'tv')).toUpperCase()}
            </Text>
            {date ? <Text style={[styles.resultMeta, { color: colors.muted }]}>{date.slice(0, 4)}</Text> : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search movies or TV shows..."
          placeholderTextColor={colors.muted}
          style={[styles.searchInput, { backgroundColor: colors.card, color: colors.text }]}
          returnKeyType="search"
        />
      </View>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={[styles.muted, { color: colors.muted }]}>Searching…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: colors.accent }]}>{error}</Text>
          <TouchableOpacity style={[styles.retryBtn, { backgroundColor: colors.accent }]} onPress={search} activeOpacity={0.85}>
            <Text style={[styles.retryText, { color: colors.text }]}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : !query.trim() ? (
        <View style={styles.center}>
          <Text style={[styles.muted, { color: colors.muted }]}>Search for a movie or TV show</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.center}>
          <Text style={[styles.muted, { color: colors.muted }]}>No results found.</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderResult}
          keyExtractor={(item) => String(item.id)}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
  },
  resultPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { fontSize: 12 },
  resultTitle: { fontSize: 16, fontWeight: '700' },
  metaRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  typePill: {
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    overflow: 'hidden',
  },
  resultMeta: { fontSize: 13 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  muted: {},
  errorText: {
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  retryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryText: {
    fontWeight: '900',
    letterSpacing: 0.4,
  },
});
