import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('agent@smartsante.mg');
  const [password, setPassword] = useState('Demo1234!');

  async function handleLogin() {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      navigation.replace('Home');
    } catch (e) {
      Alert.alert('Erreur', 'Identifiants invalides ou serveur injoignable. Vous pouvez quand meme utiliser le mode offline.');
      navigation.replace('Home');
    }
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Smart Sante 2035</Text>
      <Text style={s.subtitle}>Triage hospitalier - Madagascar</Text>
      <TextInput style={s.input} value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" />
      <TextInput style={s.input} value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry />
      <TouchableOpacity style={s.btn} onPress={handleLogin}><Text style={s.btnText}>Se connecter</Text></TouchableOpacity>
      <Text style={s.hint}>Mode offline disponible meme sans connexion.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container:{ flex:1, padding:24, backgroundColor:'#F0F9FF', justifyContent:'center' },
  title:{ fontSize:28, fontWeight:'bold', textAlign:'center', color:'#0C4A6E' },
  subtitle:{ fontSize:14, textAlign:'center', color:'#475569', marginBottom:30 },
  input:{ backgroundColor:'#fff', padding:14, borderRadius:10, marginBottom:12, borderWidth:1, borderColor:'#BAE6FD' },
  btn:{ backgroundColor:'#0EA5E9', padding:16, borderRadius:10, alignItems:'center', marginTop:8 },
  btnText:{ color:'#fff', fontWeight:'bold', fontSize:16 },
  hint:{ textAlign:'center', marginTop:20, color:'#64748B', fontSize:12 }
});
