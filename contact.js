import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!name || !email || !message) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    // قم بإرسال البيانات إلى السيرفر هنا باستخدام axios مثلاً
    alert('تم إرسال الرسالة بنجاح!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
         <TouchableOpacity>
       <FontAwesome onPress={()=> router.replace('/settings')}
        name="arrow-left" size={24} color="#234ED5" />
      </TouchableOpacity>

      <Text style={styles.title}>تواصل معنا</Text>
     

      <Text style={styles.subHeader}> في حال لديك أي استفسار أو سؤال
    يمكنك زيارة مركزنا أو التواصل معنا:</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#3b55e6" style={styles.icon} />
        <TextInput
          placeholder="الاسم الكامل"
          placeholderTextColor="#888"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={18} color="#3b55e6" style={styles.icon} />
        <TextInput
          placeholder="البريد الإلكتروني"
          placeholderTextColor="#888"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.textAreaContainer}>
        <Ionicons name="chatbox-ellipses" size={20} color="#3b55e6" style={styles.icon} />
        <TextInput
          placeholder="رسالتك"
          placeholderTextColor="#888"
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>إرسال</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: '#234ED5',
    marginVertical: 12,
    bottom:40

  },


  subHeader: {
    fontSize: 20,
    color: '#455A64',
    fontFamily: 'Cairo-Regular',
    marginBottom: 30,
    textAlign:"right"
  },
  inputContainer: {
    backgroundColor: '#eee',
    borderRadius: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    height: 50,
    
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#000',
  },
  textAreaContainer: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
    minHeight: 120,
  },
  textArea: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#000',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3b55e6',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 240,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
});
