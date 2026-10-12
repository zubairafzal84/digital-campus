import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MY_CLUBS = [
  { id: 1, name: 'UBC Computer Science Club', members: 340, nextEvent: 'Hackathon — Nov 8', joined: true },
  { id: 2, name: 'UBC Hiking Club', members: 520, nextEvent: 'Garibaldi hike — Nov 2', joined: true },
]

const SUGGESTED = [
  { id: 3, name: 'UBC Photography Collective', members: 90, category: 'Arts' },
  { id: 4, name: 'UBC Entrepreneurship Club', members: 210, category: 'Academic' },
  { id: 5, name: 'UBC Sustainability Society', members: 160, category: 'Environment' },
]

export default function ClubsScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.title}>Clubs</Text>

        <Text style={s.sectionTitle}>Your clubs</Text>
        {MY_CLUBS.map(({ id, name, members, nextEvent }) => (
          <View key={id} style={s.card}>
            <View style={s.cardLeft}>
              <View style={s.icon}>
                <Text style={s.iconText}>{name.charAt(0)}</Text>
              </View>
              <View style={s.cardInfo}>
                <Text style={s.cardName}>{name}</Text>
                <Text style={s.cardMeta}>{members} members</Text>
                {nextEvent && <Text style={s.nextEvent}>📅 {nextEvent}</Text>}
              </View>
            </View>
          </View>
        ))}

        <Text style={[s.sectionTitle, { marginTop: 24 }]}>Suggested for you</Text>
        {SUGGESTED.map(({ id, name, members, category }) => (
          <View key={id} style={s.card}>
            <View style={s.cardLeft}>
              <View style={[s.icon, s.iconSuggested]}>
                <Text style={s.iconText}>{name.charAt(0)}</Text>
              </View>
              <View style={s.cardInfo}>
                <Text style={s.cardName}>{name}</Text>
                <Text style={s.cardMeta}>{members} members · {category}</Text>
              </View>
            </View>
            <TouchableOpacity style={s.joinBtn} activeOpacity={0.7}>
              <Text style={s.joinBtnText}>Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const NAVY = '#0A1F5D'
const PURPLE = '#6B3EF2'
const MUTED = '#475569'
const BORDER = '#E2E8F0'
const LAV = '#E9E2FF'
const BG = '#F8FAFC'

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  scroll: { padding: 20, paddingTop: 8 },
  title: { fontSize: 26, fontWeight: '800', color: NAVY, marginBottom: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: BORDER, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  icon: { width: 44, height: 44, borderRadius: 12, backgroundColor: LAV, alignItems: 'center', justifyContent: 'center' },
  iconSuggested: { backgroundColor: '#E0F2FE' },
  iconText: { fontSize: 20, fontWeight: '800', color: PURPLE },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 14, fontWeight: '700', color: '#0F172A', lineHeight: 18 },
  cardMeta: { fontSize: 12, color: MUTED, marginTop: 2 },
  nextEvent: { fontSize: 11, color: PURPLE, marginTop: 3, fontWeight: '600' },
  joinBtn: { backgroundColor: LAV, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 7 },
  joinBtnText: { fontSize: 13, fontWeight: '700', color: PURPLE },
})
