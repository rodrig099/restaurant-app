import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ProductCard from '../src/components/ProductCard';
import { useSearch } from '../src/context/SearchContext';
import { colors } from '../src/utils/colors';
import { products } from '../src/utils/mockData';

export default function SearchScreen() {
  const router = useRouter();
  const { searchHistory, addSearchTerm, removeSearchTerm, clearSearchHistory } = useSearch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    filterAndSortProducts();
  }, [searchQuery, sortBy, priceRange]);

  const filterAndSortProducts = () => {
    let results = products;

    if (searchQuery.trim() !== '') {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceRange !== 'all') {
      switch (priceRange) {
        case '0-20000':
          results = results.filter(p => p.price < 20000);
          break;
        case '20000-40000':
          results = results.filter(p => p.price >= 20000 && p.price < 40000);
          break;
        case '40000+':
          results = results.filter(p => p.price >= 40000);
          break;
      }
    }

    switch (sortBy) {
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(results);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      addSearchTerm(searchQuery.trim());
    }
  };

  const handleHistoryItemPress = (term) => {
    setSearchQuery(term);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('name');
    setPriceRange('all');
  };

  const FilterButton = ({ label, value, currentValue, onPress }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        currentValue === value && styles.filterButtonActive
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.filterButtonText,
        currentValue === value && styles.filterButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const showingResults = searchQuery.trim() !== '';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buscar</Text>
        <TouchableOpacity 
          style={styles.filterToggleButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.filterToggleIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoFocus
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filters Section */}
      {showFilters && (
        <View style={styles.filtersSection}>
          <View style={styles.filtersHeader}>
            <Text style={styles.filtersTitle}>Filtros</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Limpiar todo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Ordenar por:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterButtons}>
                <FilterButton 
                  label="Nombre" 
                  value="name" 
                  currentValue={sortBy}
                  onPress={() => setSortBy('name')}
                />
                <FilterButton 
                  label="Menor precio" 
                  value="price-asc" 
                  currentValue={sortBy}
                  onPress={() => setSortBy('price-asc')}
                />
                <FilterButton 
                  label="Mayor precio" 
                  value="price-desc" 
                  currentValue={sortBy}
                  onPress={() => setSortBy('price-desc')}
                />
                <FilterButton 
                  label="Mejor valorados" 
                  value="rating" 
                  currentValue={sortBy}
                  onPress={() => setSortBy('rating')}
                />
              </View>
            </ScrollView>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Rango de precio:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterButtons}>
                <FilterButton 
                  label="Todos" 
                  value="all" 
                  currentValue={priceRange}
                  onPress={() => setPriceRange('all')}
                />
                <FilterButton 
                  label="< $20.000" 
                  value="0-20000" 
                  currentValue={priceRange}
                  onPress={() => setPriceRange('0-20000')}
                />
                <FilterButton 
                  label="$20K - $40K" 
                  value="20000-40000" 
                  currentValue={priceRange}
                  onPress={() => setPriceRange('20000-40000')}
                />
                <FilterButton 
                  label="> $40.000" 
                  value="40000+" 
                  currentValue={priceRange}
                  onPress={() => setPriceRange('40000+')}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      {/* Search History */}
      {!showingResults && searchHistory.length > 0 && (
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Búsquedas recientes</Text>
            <TouchableOpacity onPress={clearSearchHistory}>
              <Text style={styles.clearHistoryText}>Limpiar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.historyList}>
            {searchHistory.map((term, index) => (
              <View key={index} style={styles.historyItem}>
                <TouchableOpacity 
                  style={styles.historyItemButton}
                  onPress={() => handleHistoryItemPress(term)}
                >
                  <Text style={styles.historyIcon}>🕐</Text>
                  <Text style={styles.historyText}>{term}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.historyRemoveButton}
                  onPress={() => removeSearchTerm(term)}
                >
                  <Text style={styles.historyRemoveIcon}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Results */}
      {showingResults && (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {filteredProducts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>No se encontraron productos</Text>
              <Text style={styles.emptySubtitle}>
                Intenta con otros términos de búsqueda
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={({ item }) => <ProductCard product={item} />}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}

      {/* Popular Searches */}
      {!showingResults && (
        <View style={styles.popularSection}>
          <Text style={styles.popularTitle}>Búsquedas populares</Text>
          <View style={styles.popularTags}>
            {['Hamburguesa', 'Pizza', 'Ensalada', 'Pollo', 'Sushi', 'Bebidas'].map((tag, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.popularTag}
                onPress={() => setSearchQuery(tag)}
              >
                <Text style={styles.popularTagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  filterToggleButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterToggleIcon: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  clearIcon: {
    fontSize: 20,
    color: colors.textLight,
    paddingHorizontal: 8,
  },
  filtersSection: {
    backgroundColor: colors.white,
    padding: 20,
    paddingTop: 12,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  clearFiltersText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  historySection: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
  },
  clearHistoryText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  historyList: {
    gap: 8,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  historyText: {
    fontSize: 14,
    color: colors.text,
  },
  historyRemoveButton: {
    padding: 8,
  },
  historyRemoveIcon: {
    fontSize: 16,
    color: colors.textLight,
  },
  popularSection: {
    backgroundColor: colors.white,
    padding: 20,
  },
  popularTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  popularTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  popularTag: {
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  popularTagText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
});