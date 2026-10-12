import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser, useClerk } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { Image } from 'react-native'

export default function ProfileScreen() {
  const { user }    = useUser()
  const { signOut } = useClerk()

  const firstName = user?.firstName ?? ''
  const lastName  = user?.lastName  ?? ''
  const email     = user?.primaryEmailAddress?.emailAddress ?? ''
  const initials  = ((firstName[0] ?? '') + (lastName[0] ?? '')).toUpperCase() || 'DK'

  async function handleSignOut() {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          await signOut()
          router.replace('/(auth)/login')
        },
      },
    ])
  }

  const sections = [
    {
      title: 'Account',
      rows: [
        { label: 'Full name', value: `${firstName} ${lastName}`.trim() || 'Not set' },
        { label: 'Email',     value: email || 'Not set' },
      ],
    },
    {
      title: 'Education',
      rows: [
        { label: 'School',    value: 'Not yet set' },
        { label: 'Programme', value: 'Not yet set' },
        { label: 'Year',      value: 'Not yet set' },
      ],
    },
  ]

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.avatarRow}>
          {user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} style={s.avatarImg} />
          ) : (
            <View style={s.avatar}>
              <Text style={s.avatarText}>{initials}</Text>
            </View>
          )}
          <View>
            <Text style={s.name}>{`${firstName} ${lastName}`.trim() || 'Student'}</Text>
            <Text style={s.email}>{email}</Text>
          </View>
        </View>

        {/* Verification banner */}
        <View style={s.verifyCard}>
          <Text style={s.verifyTitle}>Verify your student status</Text>
          <Text style={s.verifySub}>Unlock scholarship matching and full access.</Text>
          <TouchableOpacity style={s.verifyBtn} activeOpacity={0.85}>
            <Text style={s.verifyBtnText}>Get verified →</Text>
          </TouchableOpacity>
        </View>

        {sections.map((sec) => (
          <View key={sec.title} style={s.section}>
            <Text style={s.sectionTitle}>{sec.title}</Text>
            <View style={s.card}>
              {sec.rows.map(({ label, value }, i) => (
                <View key={label} style={[s.row, i < sec.rows.length - 1 && s.rowBorder]}>
                  <Text style={s.rowLabel}>{label}</Text>
                  <Text style={s.rowValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={s.section}>
          <Text style={s.sectionTitle}>Privacy</Text>
          <View style={s.card}>
            <Text style={s.privacyNote}>
              Your grades and private messages are never publicly indexed. Only students you connect with can message you.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={s.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
          <Text style={s.signOutText}>Sign out</Text>
        </TouchableOpacity>

        <Text style={s.version}>Digital Kampus · Free for students</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const NAVY   = '#0A1F5D'
const PURPLE = '#6B3EF2'
const MUTED  = '#475569'
const BORDER = '#E2E8F0'
const BG     = '#F8FAFC'

const s = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: BG },
  scroll:       { padding: 20, paddingBottom: 48 },
  avatarRow:    { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  avatar:       { width: 64, height: 64, borderRadius: 32, backgroundColor: PURPLE, alignItems: 'center', justifyContent: 'center' },
  avatarImg:    { width: 64, height: 64, borderRadius: 32 },
  avatarText:   { color: '#fff', fontSize: 22, fontWeight: '800' },
  name:         { fontSize: 18, fontWeight: '800', color: NAVY, marginBottom: 2 },
  email:        { fontSize: 13, color: MUTED },
  verifyCard:   { backgroundColor: '#EDE9FE', borderRadius: 14, padding: 16, marginBottom: 24 },
  verifyTitle:  { fontSize: 15, fontWeight: '800', color: NAVY, marginBottom: 4 },
  verifySub:    { fontSize: 13, color: '#5B21B6', marginBottom: 12 },
  verifyBtn:    { backgroundColor: PURPLE, borderRadius: 8, padding: 10, alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 16 },
  verifyBtnText:{ color: '#fff', fontSize: 13, fontWeight: '700' },
  section:      { marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  card:         { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: BORDER, overflow: 'hidden' },
  row:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 16 },
  rowBorder:    { borderBottomWidth: 1, borderBottomColor: BORDER },
  rowLabel:     { fontSize: 14, fontWeight: '600', color: NAVY },
  rowValue:     { fontSize: 14, color: MUTED, maxWidth: '55%', textAlign: 'right' },
  privacyNote:  { fontSize: 13, color: MUTED, lineHeight: 19, padding: 16 },
  signOutBtn:   { marginTop: 8, backgroundColor: '#FEF2F2', borderRadius: 14, borderWidth: 1.5, borderColor: '#FECACA', padding: 16, alignItems: 'center' },
  signOutText:  { fontSize: 15, fontWeight: '700', color: '#EF4444' },
  version:      { textAlign: 'center', fontSize: 12, color: '#94A3B8', marginTop: 16 },
})
