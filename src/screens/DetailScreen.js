import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { tmdb, img } from '../services/tmdb';
import { useWatchlist } from '../state/watchlist/WatchlistContext';

function normalizeDetails(raw, type) {
  const isMovie = type === 'movie';
  const title = isMovie
    ? raw?.title || raw?.original_title || 'Untitled'
    : raw?.name || raw?.original_name || 'Untitled';
  const date = isMovie ? raw?.release_date : raw?.first_air_date;
  const year = date ? String(date).slice(0, 4) : '';
  const rating = typeof raw?.vote_average === 'number' ? raw.vote_average : null;
  const genres = Array.isArray(raw?.genres) ? raw.genres.map((g) => g?.name).filter(Boolean) : [];
  return {
    id: raw?.id,
    type,
    title,
    overview: raw?.overview || '',
    year,
    rating,
    genres,
    posterPath: raw?.poster_path || null,
    backdropPath: raw?.backdrop_path || null,
  };
}

export default function DetailScreen({ route, navigation }) {
  const { id, type } = route.params || {};
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDetails = useCallback(async () => {
    if (!id || (type !== 'movie' && type !== 'tv')) {
      setError('Invalid detail parameters.');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError('');
      const raw = type === 'movie' ? await tmdb.movieDetails(id) : await tmdb.tvDetails(id);
      setData(normalizeDetails(raw, type));
    } catch (e) {
      setError(e?.message || 'Failed to load details.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [id, type]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  useEffect(() => {
    navigation.setOptions({ title: data?.title || "Details" });
  }, [data?.title, navigation]);

  const imageUrl = useMemo(() => {
    return img.original(data?.backdropPath) || img.original(data?.posterPath);
  }, [data]);

  const genreText = useMemo(() => {
    if (!data?.genres?.length) return '';
    return data.genres.slice(0, 6).join(' • ');
  }, [data]);

  const saved = useMemo(() => {
    if (!data) return false;
    return isInWatchlist(data.id, data.type);
  }, [data, isInWatchlist]);

  const toggleWatchlist = () => {
    if (!data) return;
    if (saved) {
      removeFromWatchlist(data.id, data.type);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    } else {
      addToWatchlist({
        id: data.id,
        type: data.type,
        title: data.title,
        posterPath: data.posterPath,
        year: data.year,
        rating: data.rating,
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e50914" />
          <Text style={styles.muted}>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchDetails} activeOpacity={0.85}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <View style={styles.center}>
          <Text style={styles.muted}>No details found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.hero} resizeMode="cover" />
        ) : (
          <View style={[styles.hero, styles.heroPlaceholder]}>
            <Text style={styles.heroPlaceholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.metaRow}>
            {data.rating != null && <Text style={styles.metaText}>⭐ {data.rating.toFixed(1)}</Text>}
            {data.year && <Text style={styles.metaText}>{data.year}</Text>}
            <Text style={styles.typeTag}>{data.type.toUpperCase()}</Text>
          </View>
          {genreText ? <Text style={styles.genres}>{genreText}</Text> : null}
          <TouchableOpacity
            style={[styles.watchBtn, saved && styles.watchBtnSaved]}
            onPress={toggleWatchlist}
            activeOpacity={0.85}
          >
            <Text style={[styles.watchText, saved && styles.watchTextSaved]}>
              {saved ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>{data.overview || 'No overview available.'}</Text>
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0f' },
  hero: { width: '100%', height: 360, backgroundColor: '#222226' },
  heroPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  heroPlaceholderText: { color: '#777', fontWeight: '700' },
  content: { padding: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', lineHeight: 28 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' },
  metaText: { color: '#9aa0a6', fontSize: 13 },
  typeTag: {
    color: '#9aa0a6',
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#44474b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  genres: { color: '#9aa0a6', marginTop: 8, fontSize: 13 },
  watchBtn: {
    marginTop: 14,
    backgroundColor: '#e50914',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  watchBtnSaved: { backgroundColor: '#f4f4f5', borderWidth: 1, borderColor: '#e6e6e7' },
  watchText: { color: '#fff', fontWeight: '800' },
  watchTextSaved: { color: '#111' },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginTop: 18, marginBottom: 8 },
  overview: { color: '#d1d1d1', fontSize: 14, lineHeight: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  muted: { marginTop: 10, color: '#9aa0a6' },
  errorText: { color: '#d11a2a', textAlign: 'center', marginBottom: 12 },
  retryBtn: { backgroundColor: '#e50914', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
  retryText: { color: '#fff', fontWeight: '800' },
});
