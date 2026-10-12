import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const COURSES = [
  { code: 'CPSC 310', name: 'Software Engineering', grade: 87, letter: 'A', credits: 3 },
  { code: 'CPSC 340', name: 'ML & Data Mining', grade: 91, letter: 'A+', credits: 3 },
  { code: 'MATH 221', name: 'Linear Algebra', grade: 78, letter: 'B+', credits: 3 },
  { code: 'ENGL 110', name: 'Academic Writing', grade: 82, letter: 'A-', credits: 3 },
]

function ProgressBar({ value }: { value: number }) {
  return (
    <View style={s.bar}>
      <View style={[s.fill, { width: `${value}%` as any }]} />
    </View>
  )
}

export default function GradesScreen() {
  const gpa = 3.7

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.title}>Grades</Text>

        <View style={s.gpaCard}>
          <Text style={s.gpaLabel}>Current GPA</Text>
          <Text style={s.gpaNum}>{gpa.toFixed(1)}</Text>
          <Text style={s.gpaScale}>/ 4.0</Text>
          <Text style={s.gpaTrend}>↑ +0.1 this term</Text>
        </View>

        <Text style={s.sectionTitle}>Courses</Text>
        {COURSES.map(({ code, name, grade, letter, credits }) => (
          <View key={code} style={s.courseCard}>
            <View style={s.courseTop}>
              <View>
                <Text style={s.courseCode}>{code} · {credits} credits</Text>
                <Text style={s.courseName}>{name}</Text>
              </View>
              <View style={s.gradeRight}>
                <Text style={s.gradeNum}>{grade}%</Text>
                <Text style={s.gradeLetter}>{letter}</Text>
              </View>
            </View>
            <ProgressBar value={grade} />
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
const BG = '#F8FAFC'

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  scroll: { padding: 20, paddingTop: 8 },
  title: { fontSize: 26, fontWeight: '800', color: NAVY, marginBottom: 20 },
  gpaCard: {
    backgroundColor: NAVY,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 28,
  },
  gpaLabel: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  gpaNum: { fontSize: 52, fontWeight: '900', color: '#ffffff', lineHeight: 56 },
  gpaScale: { fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 8 },
  gpaTrend: { fontSize: 13, color: '#86efac', fontWeight: '600' },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 },
  courseCard: { backgroundColor: '#ffffff', borderRadius: 14, borderWidth: 1.5, borderColor: BORDER, padding: 18, marginBottom: 12 },
  courseTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  courseCode: { fontSize: 11, fontWeight: '700', color: MUTED, letterSpacing: 0.5, marginBottom: 2 },
  courseName: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  gradeRight: { alignItems: 'flex-end', gap: 2 },
  gradeNum: { fontSize: 18, fontWeight: '900', color: NAVY },
  gradeLetter: { fontSize: 13, fontWeight: '700', color: PURPLE },
  bar: { height: 6, backgroundColor: BORDER, borderRadius: 3, overflow: 'hidden' },
  fill: { height: 6, backgroundColor: PURPLE, borderRadius: 3 },
})
