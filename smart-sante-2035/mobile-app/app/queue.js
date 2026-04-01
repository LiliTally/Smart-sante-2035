import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { listPatients } from '../db/sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const COLORS = {
  CRITIQUE:'#FCA5A5', TRES_URGENT:'#FDBA74', URGENT:'#FDE68A',
  STABLE:'#86EFAC', LEGER:'#BFDBFE'
};

export default function QueueScreen() {
  const [list, setList] = useState([]);
  useFocusEffect(useCallback(() => { setList(listPatients()); }, []));

  // Tri local par score decroissant
  const sorted = [...list].sort((a,b) => (b.score_global||0) - (a.score_global||0));

  return (
    <ScrollView style={s.container}>
      {sorted.length === 0 && <Text style={s.empty}>Aucun patient local.</Text>}
      {sorted.map(p => (
        <View key={p.id} style={s.card}>
          <View style={[s.dot, { backgroundColor: COLORS[p.level] || '#94A3B8' }]} />
          <View style={{ flex:1 }}>
            <Text style={s.name}>{p.full_name}</Text>
            <Text style={s.sub}>{p.level} - score {p.score_global} - {p.synced ? 'synchro' : 'en attente'}</Text>
            {p.symptoms ? <Text style={s.sub}>{p.symptoms}</Text> : null}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container:{ backgroundColor:'#F0F9FF', padding:12 },
  empty:{ textAlign:'center', padding:30, color:'#64748B' },
  card:{ flexDirection:'row', backgroundColor:'#fff', borderRadius:10, padding:12, marginBottom:8, alignItems:'center' },
  dot:{ width:14, height:14, borderRadius:7, marginRight:10 },
  name:{ fontWeight:'bold', color:'#0F172A' },
  sub:{ color:'#475569', fontSize:12 }
});
