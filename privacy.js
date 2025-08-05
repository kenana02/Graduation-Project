import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, I18nManager } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

I18nManager.forceRTL(true);

export default function PrivacyScreen() {
  const router = useRouter();
   const phoneNumber = '+963933445566';
    const whatsappNumber = '963933445566';
  
    const handleCall = () => {
      Linking.openURL(`tel:${phoneNumber}`);
    };
  
    const handleWhatsApp = () => {
      Linking.openURL(`https://wa.me/${whatsappNumber}`);
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="#234ED5" />
        </TouchableOpacity>
        <Text style={styles.title}>الخصوصية والأمان</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المعلومات التي نجمعها</Text>
          <Text style={styles.text}>
            - معلومات الحساب عند التسجيل (مثل البريد الإلكتروني أو رقم الهاتف).
            {'\n'}- صورة الملف الشخصي عند اختيار صورة من الاستوديو.
            {'\n'}- العناصر التي قمت بحفظها في التطبيق.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>كيفية استخدام المعلومات</Text>
          <Text style={styles.text}>
            نستخدم هذه المعلومات لتسجيل الدخول، عرض صورتك الشخصية، وحفظ تفضيلاتك داخل التطبيق.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>صلاحيات الوصول</Text>
          <Text style={styles.text}>
            - الاستوديو: لاختيار صورة الملف الشخصي فقط.
            {'\n'}- الإنترنت: لتحميل المحتوى والتحقق من الحساب.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الأمان</Text>
          <Text style={styles.text}>
            نحن لا نشارك بياناتك مع أي طرف ثالث. جميع البيانات محمية ولا تُخزن كلمات المرور كنصوص صريحة.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>حقوق المستخدم</Text>
          <Text style={styles.text}>
            - يمكنك تعديل بياناتك أو حذف حسابك (في حال توفر هذه الميزة).
            {'\n'}- يمكنك إلغاء صلاحيات الوصول من إعدادات الهاتف.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>التواصل</Text>
          <Text style={styles.text}>
في حال لديك أي استفسار يمكنك التواصل معنا :
            {/* {'\n'}📧 support@example.com
            {'\n'}📞 +966-000000000 */}
              </Text>
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
  <View style={styles.iconCircle}>
    <Ionicons name="call" size={20} color="#234ED5" />
  </View>
  <Text style={styles.callButtonText}>+963-933445566</Text>
</TouchableOpacity>

{/* WhatsApp Button */}
<TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
  <View style={styles.iconCircle}>
    <FontAwesome name="whatsapp" size={20} color="#25D366" />
  </View>
  <Text style={styles.whatsappButtonText}>+963-933445566</Text>
</TouchableOpacity>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234ED5',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234ED5',
    marginBottom: 8,
    textAlign: 'right',
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    textAlign: 'right',
  },
   iconCircle: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
  
},

callButton: {
  flexDirection: 'row',
//   backgroundColor: '#F1F1F1',
  padding: 10,
  borderRadius: 30,
  alignItems: 'center',
  marginBottom: 10,
    alignSelf:"center",
//   top:70,
  width:200,
  height:50,
 
},

callButtonText: {
  fontSize: 16,
  color: '#234ED5',
  fontFamily: 'Cairo-Regular',
},

whatsappButton: {
  flexDirection: 'row',
//   backgroundColor: '#E6E6E6',
  padding: 10,
  borderRadius: 30,
  alignItems: 'center',
  marginBottom: 10,
  alignSelf:"center",
//   top:90,
  width:200,
    height:50,
},

whatsappButtonText: {
  fontSize: 16,
  color: '#25D366',
  fontFamily: 'Cairo-Regular',
},

});
