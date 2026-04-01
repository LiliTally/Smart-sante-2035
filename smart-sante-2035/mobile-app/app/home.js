import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { countUnsynced } from '../db/sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function HomeScreen({ navigation }) {
  const [pending, setPending] = useState(0);

  useFocusEffect(useCallback(() => { setPending(countUnsynced()); }, []));

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.welcome}>Bienvenue</Text>
      <Text style={s.subtitle}>Application terrain pour agents communautaires</Text>

      {pending > 0 && (
        <View style={s.alertBox}>
          <Text style={s.alertText}>{pending} enregistrement(s) en attente de synchronisation</Text>
        </View>
      )}

      <TouchableOpacity style={[s.card, { backgroundColor:'#E0F2FE' }]} onPress={() => navigation.navigate('PatientForm')}>
        <Text style={s.cardTitle}>+ Nouveau patient</Text>
        <Text style={s.cardSub}>Enregistrement rapide (fonctionne hors ligne)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[s.card, { backgroundColor:'#DCFCE7' }]} onPress={() => navigation.navigate('Queue')}>
        <Text style={s.cardTitle}>Liste locale</Text>
        <Text style={s.cardSub}>Patients enregistres sur cet appareil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[s.card, { backgroundColor:'#FEF3C7' }]} onPress={() => navigation.navigate('Sync')}>
        <Text style={s.cardTitle}>Synchroniser</Text>
        <Text style={s.cardSub}>Envoyer les donnees vers le serveur central</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container:{ padding:20, backgroundColor:'#F0F9FF', flexGrow:1 },
  welcome:{ fontSize:24, fontWeight:'bold', color:'#0C4A6E' },
  subtitle:{ color:'#64748B', marginBottom:16 },
  alertBox:{ backgroundColor:'#FEE2E2', padding:12, borderRadius:10, marginBottom:12 },
  alertText:{ color:'#991B1B', fontWeight:'600' },
  card:{ padding:18, borderRadius:14, marginBottom:12 },
  cardTitle:{ fontSize:18, fontWeight:'bold', color:'#0F172A' },
  cardSub:{ color:'#475569', marginTop:4, fontSize:13 }
});
