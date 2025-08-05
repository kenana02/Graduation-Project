import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  I18nManager,
} from 'react-native';

import { useRouter } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

I18nManager.forceRTL(true); 

export default function SettingsScreen() {
  const router = useRouter();

  const settingsList = [
    { title: 'الملف الشخصي', icon: 'person-outline' },
    { title: 'العناصر المحفوظة', icon: 'bookmark-outline' },
    // { title: 'مشترياتي', icon: 'bag-outline' },
    // { title: 'حذف الذاكرة المؤقتة', icon: 'trash-outline' },
    { title: 'الدعم الفني والمساعدة', icon: 'help-circle-outline' },
    { title: 'الخصوصية والأمان', icon: 'lock-closed-outline' },
    { title: 'التعليقات والمقترحات', icon: 'chatbubble-ellipses-outline' },
    { title: 'اتصل بنا', icon: 'call-outline' },
    { title: 'تسجيل الخروج', icon: 'arrow-forward-circle-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
          <TouchableOpacity>
       <FontAwesome onPress={()=> router.replace('/home')} name="arrow-left" size={24} color="#234ED5" />
      </TouchableOpacity>
            <Text style={styles.title}>الإعدادات</Text>
            <View style={{ width: 30 }} />
          </View>

          {/* Settings Items */}
          {settingsList.map((item, index) => (
       <TouchableOpacity
  key={index}
  onPress={() => {
    switch (item.title) {
      case 'الملف الشخصي':
        router.push('/profile');
        break;
      case 'العناصر المحفوظة':
         router.push('/saved');
        break;
    
      case 'الدعم الفني والمساعدة':
         router.push('/SupportScreen');
        break;
      case 'الخصوصية والأمان':
         router.push('/privacy');
        break;
      case 'التعليقات والمقترحات':
        router.push('/feedback');
        break;
      case 'اتصل بنا':
         router.push('/contact');
        break;
      case 'تسجيل الخروج':
        // مثلاً تسجيل الخروج وتنظيف التوكن
        alert('تم تسجيل الخروج!');
        break;
      default:
        break;
    }
  }}
  style={[
    styles.item,
    item.title === 'تسجيل الخروج' && { marginTop: 20 },
  ]}
>
  <View style={styles.itemContent}>
    <Text style={styles.itemText}>{item.title}</Text>
    <Ionicons name={item.icon} size={22} color="#234ED5" />
  </View>
</TouchableOpacity>

          ))}
        </ScrollView>
      </View>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.replace('/home')}>
          <FontAwesome name="home" size={24} color="#292D32" />
        </TouchableOpacity>
        <View style={styles.homeIconContainer}>
          <Ionicons name="settings" size={24} color="#fff" />
          <View style={styles.underline} />
        </View>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#234ED5',
    fontFamily: 'Cairo-Bold',
    textAlign: 'right',
    
  },
  item: {
    backgroundColor: '#e6e6e6',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  itemContent: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    color: '#234ED5',
    fontFamily: 'Cairo-Regular',
    textAlign: 'right',
    writingDirection: 'rtl',
    flex: 1, // لضمان التمدد الصحيح للنص
    marginRight: 10, // مسافة بين الأيقونة والنص
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#407BFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  homeIconContainer: {
    alignItems: 'center',
  },
  underline: {
    width: 30,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 2,
   
  },
});
