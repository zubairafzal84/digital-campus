import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const THREADS = [
  { id: 1, from: 'Jordan Lee', preview: 'Hey, are you going to the hackathon this weekend?', time: '2h ago', unread: 2, isContact: true },
  { id: 2, from: 'CS Club Announcements', preview: 'New event posted: AI Workshop on November 15', time: '5h ago', unread: 1, isContact: false },
  { id: 3, from: 'Priya Sharma', preview: 'Thanks for the notes! Really helped for the midterm.', time: 'Yesterday', unread: 0, isContact: true },
  { id: 4, from: 'Housing Office', preview: 'Your application has been received.', time: '2 days ago', unread: 0, isContact: false },
]

export default function ChatScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Text style={s.title}>Messages</Text>
        <TouchableOpacity style={s.newBtn} activeOpacity={0.7}>
          <Text style={s.newBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <View style={s.search}>
        <TextInput
          style={s.searchInput}
          placeholder="Search messages…"
          placeholderTextColor="#94A3B8"
        />
      </View>

      <ScrollView>
        {THREADS.map(({ id, from, preview, time, unread, isContact }) => (
          <TouchableOpacity key={id} style={s.thread} activeOpacity={0.7}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{from.charAt(0)}</Text>
            </View>
            <View style={s.threadInfo}>
              <View style={s.threadTop}>
                <Text style={[s.threadFrom, unread > 0 && s.bold]}>{from}</Text>
                <Text style={s.threadTime}>{time}</Text>
              </View>
              <Text style={[s.threadPreview, unread > 0 && s.bold]} numberOfLines={1}>{preview}</Text>
              {!isContact && (
                <Text style={s.notContact}>Accept contact request to reply</Text>
              )}
            </View>
            {unread > 0 && (
              <View style={s.badge}>
                <Text style={s.badgeText}>{unread}</Text>
              </View>
            )}
          </TouchableOpacity>
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
  safe: { flex: 1, backgroundColor: '#ffffff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingBottom: 12 },
  title: { fontSize: 26, fontWeight: '800', color: NAVY },
  newBtn: { backgroundColor: LAV, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 7 },
  newBtnText: { fontSize: 13, fontWeight: '700', color: PURPLE },
  search: { paddingHorizontal: 20, paddingBottom: 12 },
  searchInput: { height: 42, backgroundColor: BG, borderRadius: 10, borderWidth: 1.5, borderColor: BORDER, paddingHorizontal: 14, fontSize: 14, color: '#0F172A' },
  thread: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: BORDER },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: LAV, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  avatarText: { fontSize: 18, fontWeight: '800', color: PURPLE },
  threadInfo: { flex: 1, minWidth: 0 },
  threadTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  threadFrom: { fontSize: 14, color: '#0F172A' },
  threadTime: { fontSize: 11, color: MUTED },
  threadPreview: { fontSize: 13, color: MUTED },
  notContact: { fontSize: 11, color: PURPLE, marginTop: 2, fontStyle: 'italic' },
  bold: { fontWeight: '700', color: '#0F172A' },
  badge: { backgroundColor: PURPLE, borderRadius: 20, width: 20, height: 20, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#ffffff' },
})
