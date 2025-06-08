import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ITEM_WIDTH = Dimensions.get('window').width / 3;
const ITEM_HEIGHT = ITEM_WIDTH * 2; // Vertical height

const DEFAULT_IMAGES_API = 'https://api.unsplash.com/photos?per_page=30&client_id=YOUR_UNSPLASH_ACCESS_KEY';
const SEARCH_API = 'https://api.unsplash.com/search/photos?query=';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [defaultImages, setDefaultImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Load default grid on mount
  useEffect(() => {
    const loadDefaultImages = async () => {
      try {
        const res = await fetch(DEFAULT_IMAGES_API);
        const data = await res.json();
        setDefaultImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDefaultImages();
  }, []);

  const fetchSuggestions = async (text) => {
    try {
      const res = await fetch(`${SEARCH_API}${text}&per_page=5&client_id=YOUR_UNSPLASH_ACCESS_KEY`);
      const data = await res.json();
      setSuggestions(data.results);
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchChange = (text) => {
    setQuery(text);
    if (text.length > 1) {
      fetchSuggestions(text);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSelectSuggestion = (term) => {
    setQuery(term);
    fetchSearchResults(term);
    setShowDropdown(false);
  };

  const fetchSearchResults = async (term) => {
    setLoading(true);
    try {
      const res = await fetch(`${SEARCH_API}${term}&client_id=YOUR_UNSPLASH_ACCESS_KEY`);
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item.urls.small }}
      style={styles.image}
      resizeMode="cover"
    />
  );

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectSuggestion(item.alt_description || 'photo')}>
      <View style={styles.dropdownItem}>
        <Text numberOfLines={1}>{item.alt_description || 'Unnamed result'}</Text>
      </View>
    </TouchableOpacity>
  );

  const dataToShow = query.length > 1 && results.length > 0 ? results : defaultImages;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={query}
          onChangeText={handleSearchChange}
        />
      </View>

      {showDropdown && suggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={renderDropdownItem}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={dataToShow}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.grid}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginLeft: 6,
  },
  searchIcon: {
    marginRight: 6,
  },
  grid: {
    paddingHorizontal: 2,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: 1,
    borderRadius: 6,
  },
  loader: {
    marginTop: 20,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});
