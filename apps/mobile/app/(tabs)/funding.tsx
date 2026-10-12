import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MATCHES = [
  { id: 1, name: 'Trek Excellence Scholarship', amount: 5000, match: 96, deadline: 'Jan 15', type: 'merit' },
  { id: 2, name: 'UBC International Student Award', amount: 8000, match: 88, deadline: 'Feb 1', type: 'entrance' },
  { id: 3, name: 'BC Access Grant', amount: 4000, match: 82, deadline: 'Rolling', type: 'needsbased' },
  { id: 4, name: 'Canada Graduate Scholarships', amount: 17500, match: 74, deadline: 'Dec 1', type: 'federal' },
]

const TYPE_COLOR: Record<string, string> = {
  merit: '#7c3aed',
  entrance: '#1d4ed8',
  needsbased: '#15803d',
  federal: '#b45309',
}

const TYPE_BG: Record<string, string> = {
  merit: '#ede9fe',
  entrance: '#dbeafe',
  needsbased: '#dcfce7',
  federal: '#fef9c3',
}

export default function FundingScreen() {
  const total = MATCHES.reduce((sum, m) => sum + m.amount, 0)

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.title}>Scholarships</Text>

        <View style={s.summaryCard}>
          <Text style={s.summaryLabel}>Matched funding available</Text>
          <Text style={s.summaryNum}>${total.toLocaleString()}</Text>
          <Text style={s.summaryNote}>{MATCHES.length} awards · Free to apply</Text>
        </View>

        <Text style={s.sectionTitle}>Your matches</Text>
        {MATCHES.map(({ id, name, amount, match, deadline, type }) => (
          <View key={id} style={s.card}>
            <View style={s.cardTop}>
              <Text style={s.cardAmount}>${amount.toLocaleString()}</Text>
              <View style={[s.typeBadge, { backgroundColor: TYPE_BG[type] }]}>
                <Text style={[s.typeText, { color: TYPE_COLOR[type] }]}>{type}</Text>
              </View>
            </View>
            <Text style={s.cardName}>{name}</Text>
            <View style={s.cardRow}>
              <View style={[s.matchBadge]}>
                <Text style={s.matchText}>{match}% match</Text>
              </View>
              <Text style={s.deadline}>Deadline: {deadline}</Text>
            </View>
            <TouchableOpacity style={s.applyBtn} activeOpacity={0.8}>
              <Text style={s.applyText}>View & Apply →</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={s.freeNote}>Scholarship matching is always free on Digital Kampus.</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const NAVY = '#0A1F5D'
const PURPLE = '#6B3EF2'
const MUTED = '#475569'
const BORDER = '#E2E8F0'
const BG = '#F8FAFC'

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  scroll: { padding: 20, paddingTop: 8 },
  title: { fontSize: 26, fontWeight: '800', color: NAVY, marginBottom: 20 },
  summaryCard: { backgroundColor: NAVY, borderRadius: 16, padding: 24, marginBottom: 28, alignItems: 'center' },
  summaryLabel: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  summaryNum: { fontSize: 42, fontWeight: '900', color: '#ffffff' },
  summaryNote: { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: BORDER, padding: 18, marginBottom: 14 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardAmount: { fontSize: 22, fontWeight: '900', color: NAVY },
  typeBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  typeText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize', letterSpacing: 0.5 },
  cardName: { fontSize: 14, fontWeight: '700', color: '#0F172A', lineHeight: 20, marginBottom: 10 },
  cardRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  matchBadge: { backgroundColor: '#dcfce7', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  matchText: { fontSize: 12, fontWeight: '700', color: '#15803d' },
  deadline: { fontSize: 12, color: MUTED },
  applyBtn: { backgroundColor: PURPLE, borderRadius: 10, paddingVertical: 11, alignItems: 'center' },
  applyText: { fontSize: 14, fontWeight: '700', color: '#ffffff' },
  freeNote: { fontSize: 12, color: MUTED, textAlign: 'center', marginTop: 8, marginBottom: 20 },
})
