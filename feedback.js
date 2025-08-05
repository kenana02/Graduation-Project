import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


I18nManager.forceRTL(true); // دعم اللغة العربية من اليمين لليسار

export default function FeedbackScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* رأس الصفحة */}
      <TouchableOpacity >
        <FontAwesome onPress={()=>router.replace('./home')}
         name="arrow-left" size={24} color="#234ED5" />
      </TouchableOpacity>

      <Text style={styles.title}>التقييمات</Text>

      <Text style={styles.question}>هل كنت راضياً عن الاداء</Text>

      {/* تقييم النجوم */}
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <FontAwesome
              name="star"
              size={35}
              color={i <= rating ? '#FFD700' : '#ccc'}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subText}>مهتمون بمعرفة رأيك :</Text>

      {/* نص الملاحظة */}
      <TextInput
        multiline
        numberOfLines={6}
        value={feedback}
        onChangeText={setFeedback}
        style={styles.textArea}
        placeholder=""
        textAlign="right"
      />

      {/* زر الإرسال */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>PUBLISH FEEDBACK</Text>
      </TouchableOpacity>

      {/* شريط التنقل السفلي */}
      <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.replace('/home')}>
                  <FontAwesome  name="home" size={24} color="#292D32" />
     </TouchableOpacity>
         <TouchableOpacity onPress={() => router.replace('/settings')}>
                  <Ionicons name="settings" size={24} color="#292D32" />
                </TouchableOpacity>
        {/* <Ionicons name="chatbubble-ellipses" size={24} color="#fff" /> */}
        <View style={styles.profileIconContainer}>
                  <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
                  <View style={styles.underline} />
                </View>
        
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
    padding: 20,
  },

  title: {
    textAlign: 'center',
    fontSize: 22,
    color: '#234ED5',
    //fontWeight: 'bold',
    marginVertical: 12,
    bottom:40
  },
  question: {
    color: '#234ED5',
    fontSize: 20,
    textAlign: 'right',
    marginBottom: 8,
    
  },
  starsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginBottom: 10,
    width:"100%",
   
  },
  star: {
    marginHorizontal: 20,
    top:10
  
  },
  subText: {
    textAlign: 'right',
    color: '#234ED5',
    fontSize: 20,
    marginBottom: 8,
    top:15

  },
  textArea: {
    backgroundColor: '#e8e8e8',
    borderColor: '#234ED5',
    borderWidth: 1,
    borderRadius: 10,
    height: 290,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    top:20
  },
  button: {
    backgroundColor:'#234ED5',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
   
    top:25
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '111%',
    height: 50,
    backgroundColor: '#234ED5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor:'#407BFF'
  },
  underline: {
    width: 30,
    height: 2,
    backgroundColor: '#fff',
    // marginTop: 4,
    borderRadius: 2,
    right:3
  },
});