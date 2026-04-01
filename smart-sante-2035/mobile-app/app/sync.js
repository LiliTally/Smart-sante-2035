import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { syncAll } from '../services/sync';
import { countUnsynced } from '../db/sqlite';

export default function SyncScreen() {
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(countUnsynced());

  async function run() {
    setLoading(true);
    try {
      const r = await syncAll();
      Alert.alert('Synchronisation', `Reussi : ${r.ok} / Echec : ${r.fail} / Total : ${r.total}`);
      setPending(countUnsynced());
    } catch (e) {
      Alert.alert('Erreur', 'Serveur injoignable. Reessayer plus tard.');
    } finally { setLoading(false); }
  }

  return (
    <View style={s.container}>
      <Text style={s.big}>{pending}</Text>
      <Text style={s.label}>enregistrement(s) en attente</Text>
      <TouchableOpacity style={s.btn} onPress={run} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Synchroniser maintenant</Text>}
      </TouchableOpacity>
      <Text style={s.hint}>Necessite une connexion internet et un serveur backend accessible.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:'#F0F9FF', alignItems:'center', justifyContent:'center' },
  big:{ fontSize:80, fontWeight:'bold', color:'#0EA5E9' },
  label:{ fontSize:16, color:'#475569', marginBottom:30 },
  btn:{ backgroundColor:'#0EA5E9', paddingHorizontal:40, paddingVertical:16, borderRadius:10 },
  btnText:{ color:'#fff', fontWeight:'bold', fontSize:16 },
  hint:{ marginTop:30, textAlign:'center', color:'#64748B', fontSize:12 }
});
