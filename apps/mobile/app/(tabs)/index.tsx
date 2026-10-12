import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.header}>
          <Text style={s.greeting}>Good morning, Alex 👋</Text>
          <Text style={s.school}>UBC · 3rd year</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Upcoming deadlines</Text>
          {[
            { label: 'Trek Excellence Scholarship', date: 'Jan 15', type: 'funding' },
            { label: 'CS 310 Assignment 4', date: 'Nov 8', type: 'grades' },
            { label: 'Hiking Club event RSVP', date: 'Nov 2', type: 'clubs' },
          ].map(({ label, date, type }) => (
            <View key={label} style={s.deadlineRow}>
              <View style={[s.deadlineDot, type === 'funding' ? s.dotGreen : type === 'grades' ? s.dotPurple : s.dotAmber]} />
              <View style={s.deadlineInfo}>
                <Text style={s.deadlineLabel}>{label}</Text>
                <Text style={s.deadlineDate}>{date}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Quick actions</Text>
          <View style={s.quickGrid}>
            {[
              { label: 'Grades', icon: '📊', route: '/(tabs)/grades' },
              { label: 'Clubs', icon: '🤝', route: '/(tabs)/clubs' },
              { label: 'Funding', icon: '🎓', route: '/(tabs)/funding' },
              { label: 'Chat', icon: '💬', route: '/(tabs)/chat' },
            ].map(({ label, icon }) => (
              <TouchableOpacity key={label} style={s.quickCard} activeOpacity={0.7}>
                <Text style={s.quickIcon}>{icon}</Text>
                <Text style={s.quickLabel}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  header: { marginBottom: 28 },
  greeting: { fontSize: 24, fontWeight: '800', color: NAVY, marginBottom: 2 },
  school: { fontSize: 14, color: MUTED },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 },
  deadlineRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: BORDER },
  deadlineDot: { width: 10, height: 10, borderRadius: 5 },
  dotGreen: { backgroundColor: '#16A34A' },
  dotPurple: { backgroundColor: PURPLE },
  dotAmber: { backgroundColor: '#D97706' },
  deadlineInfo: { flex: 1 },
  deadlineLabel: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  deadlineDate: { fontSize: 12, color: MUTED, marginTop: 1 },
  quickGrid: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  quickCard: { flex: 1, minWidth: '44%', backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: BORDER, padding: 18, alignItems: 'center', gap: 8 },
  quickIcon: { fontSize: 28 },
  quickLabel: { fontSize: 13, fontWeight: '700', color: NAVY },
})
