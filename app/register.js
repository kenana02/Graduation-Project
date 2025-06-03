import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreePolicy, setAgreePolicy] = useState(false);
  const handleLogin = () => {
    
    if (username && password) {
      router.replace('/home'); // الانتقال إلى الصفحة الرئيسية
    } else {
      alert('يرجى ملء جميع الحقول');
    }
  };
  return (
    <View style={styles.container}>
      {/* الشعار */}
      <Image source={require('../assets/images/toppnj.png')} style={styles.logo} resizeMode="contain" />

      {/* العنوان */}
      <Text style={styles.title}>تسجيل الدخول</Text>

      {/* username */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="username"
          placeholderTextColor="#888"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <FontAwesome name="user" size={20} color="#3b55e6" />
      </View>

      {/* password */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <FontAwesome name="lock" size={20} color="#3b55e6" />
      </View>

      {/* confirm password */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirm password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <FontAwesome name="lock" size={20} color="#3b55e6" />
      </View>

      {/* سياسة الخصوصية */}
      <View style={styles.checkboxContainer}>
        <Checkbox value={agreePolicy} onValueChange={setAgreePolicy} />
        <Text style={styles.checkboxLabel}>I Agree With privacy Policy</Text>
      </View>

      {/* زر التسجيل */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* رابط تسجيل الدخول */}
      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text style={styles.link}>You already have an account ? Log in</Text>
      </TouchableOpacity>

      {/* الفوتر */}
      <Text style={styles.footer}>NOGA Software © 2024</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 100,
    marginBottom: 40,
    bottom:30
  },
  title: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#2d3f46',
    marginBottom: 20,
    bottom:30
  },
  inputContainer: {
    backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    width: '100%',
    marginVertical: 8,
    height: 50,
    justifyContent: 'space-between',
    bottom:32

  },
  input: {
    flex: 1,
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    alignSelf: 'flex-start',
    left:90,
    bottom:24
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 13,
    fontFamily: 'Cairo-Regular',
  },
  button: {
    backgroundColor: '#3b55e6',
    borderRadius: 30,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    bottom:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
  },
  link: {
    fontSize: 13,
    color: '#000',
    marginTop: 15,
    fontFamily: 'Cairo-Regular',
    textAlign: 'center',
    top:5
  },
  footer: {
   
    fontSize: 12,
    color: '#888',
    fontFamily: 'Cairo-Regular',
    top:80
  },
});
