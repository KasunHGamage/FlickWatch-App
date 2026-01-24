import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { tmdb, img } from "../services/tmdb";
import MediaCard from "../components/movie/MediaCard";
import HomeSkeleton from "../components/skeleton/HomeSkeleton";
import { useTheme } from "../state/theme/ThemeContext";
import { darkTheme, lightTheme } from "../state/theme/colors";

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topTV, setTopTV] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      if (!refreshing) setLoading(true);
      setError("");

      const [popularRes, trendingRes, topTVRes] = await Promise.all([
        tmdb.popularMovies(),
        tmdb.trendingContent("week"),
        tmdb.topRatedTV(),
      ]);

      setPopular(popularRes?.results || []);
      setTrending((trendingRes?.results || []).filter((x) => x.media_type !== "person"));
      setTopTV(topTVRes?.results || []);
    } catch (e) {
      setError(e?.message || "Failed to load home.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchHome();
  };

  const goDetail = (item, forcedType) => {
    const type = forcedType || item.media_type || (item.title ? "movie" : "tv");
    navigation.navigate("Detail", { id: item.id, type });
  };

  function SectionHeader({ title }) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      </View>
    );
  }

  function Section({ title, data, renderItem }) {
    return (
      <View style={styles.section}>
        <SectionHeader title={title} />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        />
      </View>
    );
  }

  const renderPopular = ({ item }) => (
    <View style={styles.cardGap}>
      <MediaCard
        posterUrl={img.w500(item.poster_path)}
        title={item.title}
        rating={item.vote_average}
        year={item.release_date?.slice(0, 4)}
        onPress={() => goDetail(item, "movie")}
      />
    </View>
  );

  const renderTrending = ({ item }) => {
    const isMovie = item.media_type === "movie";
    const title = isMovie ? item.title : item.name;
    const date = isMovie ? item.release_date : item.first_air_date;

    return (
      <View style={styles.cardGap}>
        <MediaCard
          posterUrl={img.w500(item.poster_path)}
          title={title}
          rating={item.vote_average}
          year={date?.slice(0, 4)}
          onPress={() => goDetail(item)}
        />
      </View>
    );
  };

  const renderTopTV = ({ item }) => (
    <View style={styles.cardGap}>
      <MediaCard
        posterUrl={img.w500(item.poster_path)}
        title={item.name}
        rating={item.vote_average}
        year={item.first_air_date?.slice(0, 4)}
        onPress={() => goDetail(item, "tv")}
      />
    </View>
  );

  if (loading) {
    return <HomeSkeleton />;
  }
  

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["left", "right"]}>
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: colors.accent }]}>{error}</Text>
          <TouchableOpacity style={[styles.retryBtn, { backgroundColor: colors.accent }]} onPress={fetchHome} activeOpacity={0.85}>
            <Text style={[styles.retryText, { color: colors.text }]}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
        }
      >
        <Section title="Popular Movies" data={popular} renderItem={renderPopular} />
        <Section title="Trending This Week" data={trending} renderItem={renderTrending} />
        <Section title="Top Rated TV Shows" data={topTV} renderItem={renderTopTV} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  scrollContent: { paddingBottom: 100, paddingTop: 10 },

  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 16 },
  muted: { marginTop: 10 },

  errorText: { textAlign: "center", marginBottom: 12 },
  retryBtn: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 12 },
  retryText: { fontWeight: "900" },

  section: { marginTop: 22 },

  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  row: { paddingHorizontal: 16 },

  cardGap: { marginRight: 14 },
});
