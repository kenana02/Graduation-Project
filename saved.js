import React from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useSavedItems } from '../context/SavedItemsContext';

export default function SavedScreen() {
  const { savedItems, toggleSave } = useSavedItems();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-right" size={24} color="#234ED5" />
        </TouchableOpacity>
        <Text style={styles.title}>العناصر المحفوظة</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {savedItems.length === 0 ? (
          <Text style={styles.emptyText}>لا توجد عناصر محفوظة حالياً</Text>
        ) : (
          savedItems.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productDesc}>Screen Size: {item.screen}</Text>
                <Text style={styles.productDesc}>Sim Slots: {item.sim}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleSave(item)}>
                <FontAwesome name="bookmark" size={24} color="#3B3B98" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234ED5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
    fontSize: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  productImage: {
    width: 70,
    height: 100,
    resizeMode: 'contain',
    marginEnd: 10,
  },
  productInfo: { flex: 1 },
  productTitle: { fontWeight: 'bold', fontSize: 14 },
  productDesc: { fontSize: 13, color: '#333', marginTop: 2 },
  productPrice: { color: 'green', fontWeight: 'bold', marginTop: 5 },
});
