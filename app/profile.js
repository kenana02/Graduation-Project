import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
   ScrollView,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  // 🧠 تحميل البيانات المحفوظة عند بدء الصفحة
  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedUri = await AsyncStorage.getItem('profileImage');
        if (savedUri) setImageUri({ uri: savedUri });
        else setImageUri(require('../assets/images/avatar.jpg'));
      } catch (e) {
        console.log('خطأ في تحميل الصورة:', e);
      }
    };
    loadImage();
  }, []);
  
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('يرجى السماح بالوصول للصور.');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri({ uri });
      try {
        await AsyncStorage.setItem('profileImage', uri);
      } catch (e) {
        console.log('خطأ في حفظ الصورة:', e);
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
         const storedEmail= await AsyncStorage.getItem('email');
        const storedPhone = await AsyncStorage.getItem('phone');
        const storedDob = await AsyncStorage.getItem('dob');
        const storedAddress = await AsyncStorage.getItem('address');

        if (storedName) setName(storedName);
        else setName('Andi Jane');

        if (storedEmail) setEmail(storedEmail);
        else setEmail('andijane@gmail.com');

        if (storedPhone) setPhone(storedPhone);
        else setPhone('+963 ------');

        if (storedDob) setDob(storedDob);
        else setDob('dd/mm/yy');

        if (storedAddress) setAddress(storedAddress);
        else setAddress('homs.alarman.13');
      } catch (e) {
        console.log('Failed to load data:', e);
      }
    };

    loadData();
  }, []);

  // 💾 حفظ البيانات عند الضغط على الزر
  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('phone', phone);
      await AsyncStorage.setItem('dob', dob);
      await AsyncStorage.setItem('address', address);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (e) {
      console.log('Saving error:', e);
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
        {/* <TouchableOpacity>
          <FontAwesome name="user-circle-o" size={28} color="#234ED5" />
        </TouchableOpacity> */}
      </View>

      <Text style={styles.editText}>قم بتعديل ملفك الشخصي:</Text>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
  <Image
    source={imageUri ? imageUri : require('../assets/images/avatar.jpg')}
    style={styles.avatar}
  />
  <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
    <Ionicons name="camera" size={20} color="#fff" />
  </TouchableOpacity>
</View>

      

      {/* Form Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>User Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          onFocus={() => name === 'Andi Jane' && setName('')}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          onFocus={() => name === 'andijane@gmail.com' && setName('')}
        />

        <Text style={styles.label}>phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          onFocus={() => phone === '+963 ------' && setPhone('')}
        />

        <Text style={styles.label}>Data of Birth</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          onFocus={() => dob === 'dd/mm/yy' && setDob('')}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          onFocus={() => address === 'homs.alarman.13' && setAddress('')}
        />
      </View>

      {/* Save & Logout */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.savetText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
     
  </ScrollView>
   </View>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.replace('/home')}>
          <FontAwesome name="home" size={24} color="#292D32" />
        </TouchableOpacity>
        <Ionicons name="settings" size={24} color="#292D32" />
        <TouchableOpacity onPress={() => router.replace('/feedback')}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#292D32" />
        </TouchableOpacity>
        <View style={styles.profileIconContainer}>
          <Ionicons name="person" size={24} color="#fff" />
          <View style={styles.underline} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    height: 40,
    width: 120,
    right: 135,
  },
  editText: {
    fontSize: 14,
    color: '#234ED5',
    marginVertical: 10,
    fontFamily: 'Cairo-Regular',
    textAlign:"right",
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 10,
    right: 110,
    backgroundColor: '#234ED5',
    borderRadius: 20,
    padding: 8,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#99a',
    marginBottom: 4,
    marginTop: 8,
    fontFamily: 'Cairo-Regular',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#234ED5',
    paddingVertical: 6,
    marginBottom: 10,
    color: '#000',
    fontFamily: 'Cairo-Regular',
  },
  logoutButton: {
    backgroundColor: '#99a',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignSelf: 'flex-start',
    bottom:45
    // marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#2c6be0',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  savetText:{ color: '#fff',
    fontSize: 14,
    fontFamily: 'Cairo-Bold',},

  logoutText: {
    color: '#2c6be0',
    fontSize: 14,
    fontFamily: 'Cairo-Bold',

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
