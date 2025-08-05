import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { TextInput, List, Text } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SupportScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const phoneNumber = '+963933445566';
  const whatsappNumber = '963933445566';
  const router = useRouter();

  const handleCall = () => Linking.openURL(`tel:${phoneNumber}`);
  const handleWhatsApp = () => Linking.openURL(`https://wa.me/${whatsappNumber}`);

  const faqItems = [
    { id: '1', question: 'هل يمكنني شراء المنتج من خلال التطبيق؟', answer: 'لا، التطبيق مخصص فقط لعرض المنتجات. للشراء، يرجى زيارة أحد فروعنا أو التواصل معنا.' },
    { id: '2', question: 'كيف أتأكد من توفر المنتج؟', answer: 'جميع المنتجات المعروضة متوفرة حالياً، ويتم تحديثها بشكل مستمر.' },
    { id: '3', question: 'هل الأسعار الموجودة نهائية؟', answer: 'نعم، الأسعار المعروضة تعكس السعر الحالي في المتجر.' },
    { id: '4', question: 'هل الأجهزة المعروضة مضمونة؟', answer: 'جميع الأجهزة تأتي بضمان رسمي من الوكيل المعتمد لمدة سنة على الأقل.' },
    { id: '5', question: 'هل يمكنني حجز منتج من خلال التطبيق؟', answer: 'لا، التطبيق لا يدعم الحجز حاليًا. يرجى التواصل مع الفرع مباشرة لتأكيد التوفر.' },
    { id: '6', question: 'هل يمكنني المقارنة بين الأجهزة؟', answer: 'لا حالياً لا توجد ميزة المقارنة داخل التطبيق، ولكن يمكنك تصفح مواصفات كل منتج بسهولة.' },
    { id: '7', question: 'هل الأسعار تشمل الضريبة؟', answer: ' نعم، جميع الأسعار المعروضة تشمل ضريبة القيمة المضافة.' },
    { id: '8', question: 'هل يمكنني رؤية مواصفات الجهاز بالتفصيل؟', answer: ' نعم، اضغط على أي منتج لعرض جميع المواصفات والصور.' }
  ];

  const filteredItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleFaqItems = showAllFaqs ? filteredItems : filteredItems.slice(0, 4);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome onPress={() => router.replace('/settings')} name="arrow-left" size={24} color="#234ED5" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الدعم الفني</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        <TextInput
          mode="outlined"
          placeholder="ابحث عن سؤال أو استفسار..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          right={<TextInput.Icon icon="magnify" />}
          style={styles.searchBox}
          textAlign="right"
        />

        <Text style={styles.sectionTitle}>الأسئلة الشائعة</Text>

        <List.AccordionGroup
          expandedId={expandedId}
          onAccordionPress={id => setExpandedId(expandedId === id ? null : id)}
        >
          {visibleFaqItems.length > 0 ? (
            visibleFaqItems.map(item => (
              <List.Accordion key={item.id} title={item.question} id={item.id}>
                <List.Item title={item.answer} />
              </List.Accordion>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginVertical: 16 }}>لا توجد نتائج مطابقة.</Text>
          )}
        </List.AccordionGroup>

        {filteredItems.length > 4 && (
          <TouchableOpacity
            onPress={() => setShowAllFaqs(!showAllFaqs)}
            style={styles.moreButton}
          >
            <Text style={styles.moreButtonText}>{showAllFaqs ? 'عرض أقل' : 'عرض المزيد'}</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>بحاجة لمساعدة مباشرة؟</Text>

        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <View style={styles.iconCircle}>
            <Ionicons name="call" size={20} color="#234ED5" />
          </View>
          <Text style={styles.callButtonText}> اتصل بنا   +963933445566 </Text>
        </TouchableOpacity>

        {/* زر واتساب في الأسفل أعلى شريط التنقل */}
        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
          <View style={styles.iconCircle}>
            <FontAwesome name="whatsapp" size={20} color="#25D366" />
          </View>
          <Text style={styles.whatsappButtonText}> تواصل معنا عبر واتساب +9630445566</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* شريط التنقل السفلي */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.replace('/home')}>
          <FontAwesome name="home" size={24} color="#292D32" />
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
  container: {
    padding: 16,
    marginBottom: 70,
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#234ED5',
  },
  searchBox: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 12,
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
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
    width: 350,
    height: 50,
    alignSelf: 'center',
  },
  callButtonText: {
    fontSize: 16,
    color: '#234ED5',
  },
  whatsappButton: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    width: 350,
    height: 50,
    alignSelf: 'center',
  },
  whatsappButtonText: {
    fontSize: 16,
    color: '#25D366',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#407BFF',
  },
  moreButton: {
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#234ED5',
    borderRadius: 20,
  },
  moreButtonText: {
    color: 'white',
    fontSize: 14,
  },
});
