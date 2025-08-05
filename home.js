import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, TouchableOpacity,
  I18nManager, SafeAreaView, Alert, ActivityIndicator, Dimensions
} from 'react-native';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSavedItems } from '../context/SavedItemsContext';
import { getProducts, toggleSaveProduct } from '../services/products';

I18nManager.forceRTL(true);

const { width } = Dimensions.get('window');
export default function HomeScreen() {
  const { savedItems, toggleSave: toggleSaveContext } = useSavedItems();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    const response = await getProducts();
    console.log(' البيانات القادمة من السيرفر:', response.data);

    if (response.success && Array.isArray(response.data)) {
      setProducts(response.data);
    } else {
      setProducts([]);
      console.warn(' البيانات غير صالحة أو ليست Array:', response.data);
    }

    setLoading(false); // لا تنسى توقف التحميل بعد الاسترجاع
  };

  fetchProducts(); // استدعاء الدالة داخل useEffect
}, []);


  const toggleSave = async (item) => {
    try {
      const res = await toggleSaveProduct(parseInt(item.id));
      if (res.success) {
        toggleSaveContext(item); // تحديث الحالة في Context
      } else {
        Alert.alert('خطأ', res.error || 'فشل في تحديث حالة الحفظ');
      }
    } catch (error) {
      console.error('خطأ غير متوقع في toggle save:', error);
      Alert.alert('خطأ', 'حدث خطأ غير متوقع أثناء الحفظ');
    }
  };  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const renderProduct = (item) => (
    <View key={item.id} style={styles.productCard}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => router.push({ pathname: '/productdetails', params: { id: item.id } })}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.name}</Text>
          <Text style={styles.productDesc}>Screen Size: {item.screen}</Text>
          <Text style={styles.productDesc}>Sim Slots: {item.sim}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <Ionicons
            name={likedItems.includes(item.id) ? 'heart' : 'heart-outline'}
            size={22}
            color={likedItems.includes(item.id) ? '#234ED5' : '#999'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleSave(item)}>
          <FontAwesome
            name={savedItems.some(el => el.id === item.id) ? 'bookmark' : 'bookmark-o'}
            size={20}
            color="#234ED5"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/settings')}>
          <FontAwesome name="arrow-left" size={24} color="#234ED5" />
        </TouchableOpacity>
        <Image source={require('../assets/images/logo.jpg')} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle-outline" size={26} color="#234ED5" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchText}>ابحث في محافظتك</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterIcon}>
          <FontAwesome name="sliders" size={18} color="#234ED5" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>المنتجات المتوفرة:</Text>
      <View style={styles.dropdown}>
        <Text style={styles.dropdownText}>IPhone</Text>
        <Entypo name="chevron-down" size={20} color="#234ED5" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {products.map(renderProduct)}
      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.replace('/home')}>
          <Ionicons name="home" size={24} color="#fff" />
          <View style={styles.underline} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/settings')}>
          <Ionicons name="settings" size={24} color="#292D32" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/feedback')}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#292D32" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/profile')}>
          <Ionicons name="person" size={24} color="#292D32" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { height: 40, width: width * 0.3 },

  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#E4E4E4',
    borderRadius: 20,
    flex: 1,
    marginEnd: 10,
    paddingVertical: 10,
  },
  searchText: {
    color: '#234ED5',
    textAlign: 'center',
    fontSize: 14,
  },
  filterIcon: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#234ED5',
    borderRadius: 10,
  },
  label: {
    marginHorizontal: 20,
    color: '#234ED5',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'right',
  },
  dropdown: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#234ED5',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdownText: { color: '#234ED5', fontSize: 14 },

  productCard: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    marginHorizontal: 20,
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

  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#407BFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 6,
  },
  underline: {
    width: 30,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginTop: 2,
  },
});
