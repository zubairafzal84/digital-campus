import { useState, useEffect, useCallback } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { router } from 'expo-router'

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? ''

type Conversation = {
  id: string
  participant_a: string
  participant_b: string
  created_at: string
  updated_at: string
  last_message?: string
}

function getOtherParticipant(conv: Conversation, userId: string): string {
  const other = conv.participant_a === userId ? conv.participant_b : conv.participant_a
  if (other.length > 20) return other.slice(0, 20) + '…'
  return other
}

function relativeTime(dateString: string): string {
  const date = new Date(dateString)
  const diffMs = Date.now() - date.getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  if (diffDay > 1) return `${diffDay}d ago`
  if (diffDay === 1) return 'Yesterday'
  if (diffHour >= 1) return `${diffHour}h ago`
  if (diffMin >= 1) return `${diffMin}m ago`
  return 'Just now'
}

export default function ChatScreen() {
  const { getToken } = useAuth()
  const { user } = useUser()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const token = await getToken()
      const res = await fetch(`${API_URL}/api/conversations`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setConversations(Array.isArray(data) ? data : [])
    } catch {
      setError('Could not load conversations.')
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  const userId = user?.id ?? ''

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Text style={s.title}>Messages</Text>
      </View>

      {loading ? (
        <View style={s.center}>
          <ActivityIndicator size="large" color={PURPLE} />
        </View>
      ) : error ? (
        <View style={s.center}>
          <Text style={s.errorText}>{error}</Text>
          <TouchableOpacity style={s.retryBtn} onPress={fetchConversations} activeOpacity={0.7}>
            <Text style={s.retryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={s.empty}>
              <Text style={s.emptyIcon}>💬</Text>
              <Text style={s.emptyText}>
                No conversations yet. Connect with students through the web app.
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const other = getOtherParticipant(item, userId)
            const timestamp = item.updated_at ?? item.created_at
            return (
              <TouchableOpacity
                style={s.thread}
                activeOpacity={0.7}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/conversation',
                    params: { conversationId: item.id },
                  })
                }
              >
                <View style={s.avatar}>
                  <Text style={s.avatarText}>{other.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={s.threadInfo}>
                  <View style={s.threadTop}>
                    <Text style={s.threadFrom} numberOfLines={1}>
                      {other}
                    </Text>
                    <Text style={s.threadTime}>{relativeTime(timestamp)}</Text>
                  </View>
                  {item.last_message ? (
                    <Text style={s.threadPreview} numberOfLines={1}>
                      {item.last_message}
                    </Text>
                  ) : null}
                </View>
                <Text style={s.chevron}>›</Text>
              </TouchableOpacity>
            )
          }}
        />
      )}
    </SafeAreaView>
  )
}

const NAVY = '#0A1F5D'
const PURPLE = '#6B3EF2'
const LAV = '#E9E2FF'
const MUTED = '#475569'
const BORDER = '#E2E8F0'
const BG = '#F8FAFC'

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  title: { fontSize: 26, fontWeight: '800', color: NAVY },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { fontSize: 14, color: MUTED, textAlign: 'center', marginBottom: 16 },
  retryBtn: {
    backgroundColor: LAV,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryBtnText: { fontSize: 14, fontWeight: '700', color: PURPLE },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: {
    fontSize: 15,
    color: MUTED,
    textAlign: 'center',
    lineHeight: 22,
  },
  thread: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: BG,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: LAV,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: { fontSize: 18, fontWeight: '800', color: PURPLE },
  threadInfo: { flex: 1, minWidth: 0 },
  threadTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  threadFrom: { fontSize: 14, fontWeight: '600', color: '#0F172A', flex: 1, marginRight: 8 },
  threadTime: { fontSize: 11, color: MUTED, flexShrink: 0 },
  threadPreview: { fontSize: 13, color: MUTED },
  chevron: { fontSize: 22, color: MUTED, flexShrink: 0 },
})
