import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { insertPatient } from '../db/sqlite';

// Niveaux disponibles (synchro avec backend)
const LEVELS = [
  { code:'CRITIQUE',    label:'Critique',     color:'#FCA5A5' },
  { code:'TRES_URGENT', label:'Tres urgent',  color:'#FDBA74' },
  { code:'URGENT',      label:'Urgent',       color:'#FDE68A' },
  { code:'STABLE',      label:'Stable',       color:'#86EFAC' },
  { code:'LEGER',       label:'Leger',        color:'#BFDBFE' }
];

function computeLevel(vital, symp) {
  const s = 0.45 * vital + 0.30 * symp + 0.15 * 30 + 0.10 * 30;
  if (s >= 80) return 'CRITIQUE';
  if (s >= 65) return 'TRES_URGENT';
  if (s >= 45) return 'URGENT';
  if (s >= 25) return 'STABLE';
  return 'LEGER';
}

export default function PatientForm({ navigation }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('M');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [vital, setVital] = useState('30');
  const [symp, setSymp] = useState('30');

  function save() {
    if (!name) return Alert.alert('Nom requis');
    const v = Number(vital) || 0;
    const s = Number(symp) || 0;
    const level = computeLevel(v, s);
    const score = Math.round((0.45*v + 0.30*s + 0.15*30 + 0.10*30) * 100) / 100;
    const uuid = 'L-' + Date.now().toString(36).toUpperCase();
    insertPatient({ uuid, full_name:name, gender, phone, city, region, score_global:score, level, symptoms });
    Alert.alert('Enregistre', `Niveau : ${level}\nScore : ${score}\n(stocke localement)`);
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={st.container}>
      <Text style={st.label}>Nom complet *</Text>
      <TextInput style={st.input} value={name} onChangeText={setName} />

      <Text style={st.label}>Genre</Text>
      <View style={st.row}>
        {['M','F','AUTRE'].map(g => (
          <TouchableOpacity key={g} onPress={() => setGender(g)} style={[st.chip, gender===g && st.chipActive]}>
            <Text style={gender===g ? st.chipTextActive : st.chipText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={st.label}>Telephone</Text>
      <TextInput style={st.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={st.label}>Ville</Text>
      <TextInput style={st.input} value={city} onChangeText={setCity} />

      <Text style={st.label}>Region</Text>
      <TextInput style={st.input} value={region} onChangeText={setRegion} />

      <Text style={st.label}>Symptomes observes</Text>
      <TextInput style={[st.input, { height:80 }]} value={symptoms} onChangeText={setSymptoms} multiline />

      <Text style={st.label}>Score signes vitaux (0-100) : {vital}</Text>
      <TextInput style={st.input} value={vital} onChangeText={setVital} keyboardType="numeric" />

      <Text style={st.label}>Score symptomes (0-100) : {symp}</Text>
      <TextInput style={st.input} value={symp} onChangeText={setSymp} keyboardType="numeric" />

      <TouchableOpacity style={st.btn} onPress={save}>
        <Text style={st.btnText}>Enregistrer (offline OK)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  container:{ padding:20, backgroundColor:'#F0F9FF' },
  label:{ marginTop:12, marginBottom:6, color:'#0F172A', fontWeight:'600' },
  input:{ backgroundColor:'#fff', padding:12, borderRadius:10, borderWidth:1, borderColor:'#BAE6FD' },
  row:{ flexDirection:'row', gap:8 },
  chip:{ paddingHorizontal:16, paddingVertical:10, backgroundColor:'#fff', borderRadius:20, borderWidth:1, borderColor:'#BAE6FD' },
  chipActive:{ backgroundColor:'#0EA5E9', borderColor:'#0EA5E9' },
  chipText:{ color:'#0C4A6E' },
  chipTextActive:{ color:'#fff', fontWeight:'bold' },
  btn:{ backgroundColor:'#22C55E', padding:16, borderRadius:10, alignItems:'center', marginTop:20 },
  btnText:{ color:'#fff', fontWeight:'bold', fontSize:16 }
});
