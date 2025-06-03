import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = () => {
    
    if (username && password) {
      router.replace('/home'); // الانتقال إلى الصفحة الرئيسية
    } else {
      alert('يرجى ملء جميع الحقول');
    }
  };

  return (
    <View style={styles.container}>
      {/* المحتوى الرئيسي */}
      <View style={styles.content}>
        <Image source={require('../assets/images/toppnj.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>  أهلا و سهلا بك!  </Text>

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

        <View style={styles.row}>
          <View style={styles.rememberBox}>
            <Checkbox value={rememberMe} onValueChange={setRememberMe} />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </View>

        <TouchableOpacity style={styles.button}  onPress={handleLogin}>

          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/register')}>
          <Text style={styles.link}>Haven’t Account ? Register</Text>
        </TouchableOpacity>
      </View>

      {/* الفوتر في الأسفل */}
      <Text style={styles.footer}>NOGA Software © 2024</Text>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center', // توزيع بين الأعلى والأسفل
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 100,
    marginBottom: 40,
  
  },
  title: {
    fontSize: 28,
    fontFamily: 'Cairo',
    color: '#455A64',
    
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    width: '100%',
    marginVertical: 12,
    height: 50,
    justifyContent: 'space-between',
    top:20,
  },
  input: {
    flex: 1,
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    color: '#000',
    
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    top:30,
  },
  rememberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  rememberText: {
    marginLeft: 8,
    fontFamily: 'Cairo-Regular',
    fontSize: 13,
  },
  forgotText: {
    fontSize: 13,
    fontFamily: 'Cairo-Regular',
  },
  button: {
    backgroundColor: '#3b55e6',
    borderRadius: 30,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 70,
    top:5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
  },
  link: {
    fontSize: 13,
    color: '#000',
    marginTop: 50,
    fontFamily: 'Cairo-Regular',
    bottom:26,
  },
  footer: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Cairo-Regular',
    marginBottom: 10,
    top:60,
  },
});