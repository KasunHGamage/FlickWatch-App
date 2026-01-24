import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { tmdb, img } from '../services/tmdb';
import { useWatchlist } from '../state/watchlist/WatchlistContext';
import DetailSkeleton from '../components/skeleton/DetailSkeleton';
import { useTheme } from '../state/theme/ThemeContext';
import { darkTheme, lightTheme } from '../state/theme/colors';

function normalizeDetails(raw, type) {
  const isMovie = type === 'movie';
  const title = isMovie
    ? raw?.title || raw?.original_title || 'Untitled'
    : raw?.name || raw?.original_name || 'Untitled';

  const date = isMovie ? raw?.release_date : raw?.first_air_date;
  const year = date ? String(date).slice(0, 4) : '';
  const rating = typeof raw?.vote_average === 'number' ? raw.vote_average : null;

  // runtime: movies have `runtime` (minutes), TV often has `episode_run_time` (array of minutes)
  const runtimeMinutes =
    type === 'movie'
      ? (typeof raw?.runtime === 'number' ? raw.runtime : null)
      : (Array.isArray(raw?.episode_run_time) && typeof raw.episode_run_time[0] === 'number'
          ? raw.episode_run_time[0]
          : null);
  
  const genres = Array.isArray(raw?.genres)
    ? raw.genres.map((g) => g?.name).filter(Boolean)
    : [];

  return {
    id: raw?.id,
    type,
    title,
    overview: raw?.overview || '',
    year,
    rating,
    runtimeMinutes,
    genres,
    posterPath: raw?.poster_path || null,
    backdropPath: raw?.backdrop_path || null,
  };
}

function normalizeCast(credits) {
  const castArr = Array.isArray(credits?.cast) ? credits.cast : [];
  return castArr
    .filter((c) => c?.name) // keep valid
    .slice(0, 6)
    .map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character || '',
      profilePath: c.profile_path || null,
    }));
}

function formatRuntime(minutes) {
  if (typeof minutes !== 'number' || !Number.isFinite(minutes) || minutes <= 0) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h <= 0) return `${minutes}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export default function DetailScreen({ route, navigation }) {
  const { id, type } = route.params || {};
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkTheme : lightTheme;

  const [data, setData] = useState(null);
  const [cast, setCast] = useState([]);
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

      // fetch details + credits in parallel
      const [rawDetails, rawCredits] =
        type === 'movie'
          ? await Promise.all([tmdb.movieDetails(id), tmdb.movieCredits(id)])
          : await Promise.all([tmdb.tvDetails(id), tmdb.tvCredits(id)]);

      const normalized = normalizeDetails(rawDetails, type);
      setData(normalized);
      setCast(normalizeCast(rawCredits));
    } catch (e) {
      setError(e?.message || 'Failed to load details.');
      setData(null);
      setCast([]);
    } finally {
      setLoading(false);
    }
  }, [id, type]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  useEffect(() => {
    navigation.setOptions({ title: data?.title || 'Details' });
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

  const renderCast = ({ item }) => {
    const profileUrl = item.profilePath
      ? (img.w185?.(item.profilePath) ||
          img.w200?.(item.profilePath) ||
          img.w300?.(item.profilePath) ||
          img.w500?.(item.profilePath) ||
          img.original?.(item.profilePath))
      : null;

    return (
      <View style={styles.castCard}>
        {profileUrl ? (
          <Image source={{ uri: profileUrl }} style={styles.castAvatar} />
        ) : (
          <View style={[styles.castAvatar, { backgroundColor: colors.card }, styles.castAvatarPlaceholder, { borderColor: colors.border }]}>
            <Text style={[styles.castAvatarPlaceholderText, { color: colors.muted }]}>👤</Text>
          </View>
        )}
        <Text style={[styles.castName, { color: colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        {!!item.character && (
          <Text style={[styles.castRole, { color: colors.muted }]} numberOfLines={1}>
            {item.character}
          </Text>
        )}
      </View>
    );
  };

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['left', 'right']}>
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: colors.accent }]}>{error}</Text>
          <TouchableOpacity style={[styles.retryBtn, { backgroundColor: colors.accent }]} onPress={fetchDetails} activeOpacity={0.85}>
            <Text style={[styles.retryText, { color: colors.text }]}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['left', 'right']}>
        <View style={styles.center}>
          <Text style={[styles.muted, { color: colors.muted }]}>No details found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.hero} resizeMode="cover" />
        ) : (
          <View style={[styles.hero, { backgroundColor: colors.card }, styles.heroPlaceholder]}>
            <Text style={[styles.heroPlaceholderText, { color: colors.muted }]}>No Image</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>

          <View style={styles.metaRow}>
            {data.rating != null && <Text style={[styles.metaText, { color: colors.muted }]}>⭐ {data.rating.toFixed(1)}</Text>}
            {data.year && <Text style={[styles.metaText, { color: colors.muted }]}>{data.year}</Text>}
            {data.runtimeMinutes ? (
              <Text style={[styles.metaText, { color: colors.muted }]}>{formatRuntime(data.runtimeMinutes)}</Text>
            ) : null}
            <Text style={[styles.typeTag, { color: colors.muted, borderColor: colors.border }]}>
              {data.type.toUpperCase()}
            </Text>
          </View>

          {genreText ? <Text style={[styles.genres, { color: colors.muted }]}>{genreText}</Text> : null}

          <TouchableOpacity
            style={[
              styles.watchBtn,
              { backgroundColor: colors.accent },
              saved && [styles.watchBtnSaved, { backgroundColor: colors.card, borderColor: colors.border }],
            ]}
            onPress={toggleWatchlist}
            activeOpacity={0.85}
          >
          <Text style={[styles.watchText, { color: colors.text }, saved && styles.watchTextSaved, saved && { color: colors.text }]}>
            {saved ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
          <Text style={[styles.overview, { color: colors.muted }]}>
            {data.overview || 'No overview available.'}
          </Text>

          {/* ✅ CAST SECTION */}
          {cast.length ? (
            <>
              <View style={styles.castHeaderRow}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Cast</Text>
                <Text style={[styles.castHint, { color: colors.muted }]}>Top {cast.length}</Text>
              </View>

              <FlatList
                data={cast}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderCast}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.castList}
              />
            </>
          ) : null}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  hero: { width: '100%', height: 360 },

  heroPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  heroPlaceholderText: { fontWeight: '700' },

  content: { padding: 16 },

  title: { fontSize: 22, fontWeight: '800', lineHeight: 28 },

  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' },
  metaText: { fontSize: 13 },

  typeTag: {
    fontSize: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  genres: { marginTop: 8, fontSize: 13 },

  watchBtn: {
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  watchBtnSaved: { borderWidth: 1 },

  watchText: { fontWeight: '800' },
  watchTextSaved: {},

  sectionTitle: { fontSize: 16, fontWeight: '800', marginTop: 18, marginBottom: 8 },
  overview: { fontSize: 14, lineHeight: 20 },

  // Cast styles
  castHeaderRow: {
    marginTop: 18,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  castHint: { fontSize: 12 },

  castList: { paddingVertical: 6, paddingRight: 6 },

  castCard: {
    width: 86,
    marginRight: 12,
    alignItems: 'center',
  },
  castAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#222226',
  },
  castAvatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  castAvatarPlaceholderText: { fontSize: 18 },

  castName: { marginTop: 8, fontSize: 12, fontWeight: '700' },
  castRole: { marginTop: 2, fontSize: 11 },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  muted: { marginTop: 10 },

  errorText: { textAlign: 'center', marginBottom: 12 },
  retryBtn: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
  retryText: { fontWeight: '800' },
});
