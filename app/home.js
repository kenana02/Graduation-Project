import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

I18nManager.forceRTL(true);

const productData = [
  {
    id: 1,
    name: 'Apple Iphone 16 pro Max',
    screen: '6.3',
    sim: 'Dual SIM',
    price: '1.399.00$',
    image: require('../assets/images/iphone1.jpg'),
  },
  {
    id: 2,
    name: 'Apple Iphone 16 pro Max',
    screen: '6.3',
    sim: 'Dual SIM',
    price: '1.399.00$',
    image: require('../assets/images/iphone2.jpg'),
  },
  {
    id: 3,
    name: 'Apple Iphone 16 pro Max',
    screen: '6.3',
    sim: 'Dual SIM',
    price: '1.399.00$',
    image: require('../assets/images/iphone1.jpg'),
  },
  {
    id: 4,
    name: 'Apple Iphone 16 pro Max',
    screen: '6.3',
    sim: 'Dual SIM',
    price: '1.399.00$',
    image: require('../assets/images/iphone2.jpg'),
  },
  {
    id: 5,
    name: 'Apple Iphone 16 pro Max',
    screen: '6.3',
    sim: 'Dual SIM',
    price: '1.399.00$',
    image: require('../assets/images/iphone1.jpg'),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="arrow-left" size={24} color="#234ED5" />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity>
          <FontAwesome name="user-circle-o" size={26} color="#234ED5" />
        </TouchableOpacity>
      </View>

      {/* Search + Filter */}
      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchText}>ابحث في محافظتك</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterIcon}>
          <FontAwesome name="sliders" size={18} color="#234ED5" />
        </TouchableOpacity>
      </View>

      {/* Dropdown label */}
      <Text style={styles.label}>المنتجات المتوفرة:</Text>

      {/* Dropdown (not functional for now) */}
      <View style={styles.dropdown}>
        <Text style={styles.dropdownText}>IPhone</Text>
        <Entypo name="chevron-down" size={20} color="#234ED5" />
      </View>

      {/* Products List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {productData.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.name}</Text>
              <Text style={styles.productDesc}>Screen Size : {item.screen}</Text>
              <Text style={styles.productDesc}>Sim Solts : {item.sim}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <TouchableOpacity style={styles.bookmarkIcon}>
              <FontAwesome name="bookmark-o" size={24} color="#3B3B98" />
            </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <FontAwesome name="home" size={24} color="#fff" />
        <Ionicons name="settings" size={24} color="#292D32" />
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 120,
    right:30
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    alignItems: 'center',
    color:'#D9D9D9'
  },
  searchButton: {
    backgroundColor: '#E4E4E4',
    borderRadius: 20,
    flex: 1,
    marginEnd: 10,
    padding: 10,
    // color:'#'
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
    left:265
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
  dropdownText: {
    color: '#234ED5',
    fontSize: 14,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    color:'#D9D9D9'
  },
  productImage: {
    width: 70,
    height: 100,
    resizeMode: 'contain',
    marginEnd: 10,
  },
  productInfo: {
    flex: 1,

  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  productDesc: {
    fontSize: 13,
    color: '#333',
    marginTop: 2,
  },
  productPrice: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
  },
  bookmarkIcon: {
    marginLeft:200,
    
  },
  navbar: {
    position: 'static',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#234ED5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor:'#407BFF'
  },
 
});