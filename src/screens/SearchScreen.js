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

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const search = async () => {
    if (!query.trim()) return;
    try {
      if (!refreshing) setLoading(true);
      const res = await tmdb.search(query);
      // filter out people results:
      setResults(res?.results?.filter((r) => r.media_type !== 'person') || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
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
      <TouchableOpacity style={styles.resultRow} onPress={() => goDetail(item)} activeOpacity={0.8}>
        {item.poster_path ? (
          <Image source={{ uri: img.w200(item.poster_path) }} style={styles.resultImage} />
        ) : (
          <View style={[styles.resultImage, styles.resultPlaceholder]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.resultTitle}>{title}</Text>
          {date ? <Text style={styles.resultMeta}>{date.slice(0, 4)}</Text> : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search movies or TV shows..."
          placeholderTextColor="#666"
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e50914" />
        </View>
      ) : results.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.muted}>Type to search a movie or TV show</Text>
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
  container: { flex: 1, backgroundColor: '#0b0b0f' },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchInput: {
    backgroundColor: '#141418',
    color: '#fff',
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#222226',
  },
  resultImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#2f2f36',
  },
  resultPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { color: '#777', fontSize: 12 },
  resultTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  resultMeta: { color: '#9aa0a6', fontSize: 13, marginTop: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  muted: { color: '#9aa0a6' },
});
