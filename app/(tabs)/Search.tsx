import { tmdbService } from "@/api/service/tmdbService";
import MovieGridCard from "@/components/MovieGridCard";
import SearchInput from "@/components/SearchInput";
import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Movie } from "@/types/TMBDTypes";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search
  const debounce = useCallback((text: string) => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(text);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    debounce(text);
  };

  const handleClear = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchMovies", debouncedQuery],
    queryFn: () => tmdbService.searchMovies(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const {
    data: trendingMovies,
    isLoading: isTrendingLoading,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () => tmdbService.getTrendingMovies("week"),
  });

  const renderEmptyState = () => {
    if (debouncedQuery.length === 0) {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <Image source={icons.search} style={styles.emptyIcon} />
        <Text style={styles.emptyTitle}>No results found</Text>
        <Text style={styles.emptySubtitle}>
          Try searching for a different movie
        </Text>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Image source={icons.logo} style={styles.logo} />
      <Text style={styles.title}>Search</Text>
      <Text style={styles.subtitle}>Find your favorite movies</Text>
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          onClear={handleClear}
          placeholder="Search for movies..."
          autoFocus={false}
        />
      </View>
    </View>
  );

  const renderContent = () => {
    // Show loading state
    if (isLoading && debouncedQuery.length > 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.LIGHT[100]} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      );
    }

    // Show search results
    if (debouncedQuery.length > 0 && searchResults) {
      if (searchResults.results.length === 0) {
        return renderEmptyState();
      }

      return (
        <View style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>
            Search Results ({searchResults.total_results})
          </Text>
          <FlatList
            data={searchResults.results}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <MovieGridCard
                id={item.id}
                poster={item.poster}
                title={item.title}
              />
            )}
          />
        </View>
      );
    }

    // Show trending when no search
    if (trendingMovies && trendingMovies.results.length > 0) {
      return (
        <View style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>Trending This Week</Text>
          <FlatList
            data={trendingMovies.results}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <MovieGridCard
                id={item.id}
                poster={item.poster}
                title={item.title}
              />
            )}
          />
        </View>
      );
    }

    if (isTrendingLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.LIGHT[100]} />
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.backdrop} />
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <>
            {renderHeader()}
            {renderContent()}
          </>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  backdrop: {
    width: "100%",
    position: "absolute",
    zIndex: 0,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  logo: {
    width: 48,
    height: 48,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.LIGHT[300],
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 24,
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: "center",
  },
  loadingText: {
    color: COLORS.LIGHT[300],
    marginTop: 12,
    fontSize: 14,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    tintColor: COLORS.DARK[100],
    marginBottom: 16,
  },
  emptyTitle: {
    color: COLORS.LIGHT[100],
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: COLORS.LIGHT[300],
    fontSize: 14,
    textAlign: "center",
  },
  resultsContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: COLORS.LIGHT[100],
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    justifyContent: "space-between",
  },
});
