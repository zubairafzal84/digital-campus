import { useState, useEffect, useRef, useCallback } from 'react'
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useLocalSearchParams, router } from 'expo-router'

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? ''

type Message = {
  id: string
  conversation_id: string
  sender_id: string
  body: string
  created_at: string
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

export default function ConversationScreen() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>()
  const { getToken } = useAuth()
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [draft, setDraft] = useState('')
  const listRef = useRef<FlatList<Message>>(null)

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return
    try {
      setLoading(true)
      const token = await getToken()
      const res = await fetch(`${API_URL}/api/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setMessages(Array.isArray(data) ? data : [])
    } catch {
      // silently retain whatever messages are already shown
    } finally {
      setLoading(false)
    }
  }, [conversationId, getToken])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const sendMessage = async () => {
    const text = draft.trim()
    if (!text || !conversationId || sending) return
    setSending(true)
    setDraft('')
    try {
      const token = await getToken()
      const res = await fetch(`${API_URL}/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: text }),
      })
      if (res.ok) {
        const msg: Message = await res.json()
        setMessages((prev) => [...prev, msg])
        setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100)
      } else {
        setDraft(text)
      }
    } catch {
      setDraft(text)
    } finally {
      setSending(false)
    }
  }

  const userId = user?.id ?? ''
  const canSend = draft.trim().length > 0 && !sending

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn} activeOpacity={0.7}>
          <Text style={s.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={s.title} numberOfLines={1}>
          Conversation
        </Text>
        {/* spacer to centre the title */}
        <View style={s.backBtn} />
      </View>

      {/* Message list */}
      {loading ? (
        <View style={s.center}>
          <ActivityIndicator size="large" color={PURPLE} />
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={s.messageList}
          ListEmptyComponent={
            <View style={s.empty}>
              <Text style={s.emptyText}>No messages yet. Say hello!</Text>
            </View>
          }
          onContentSizeChange={() => {
            if (messages.length > 0) {
              listRef.current?.scrollToEnd({ animated: false })
            }
          }}
          renderItem={({ item }) => {
            const isMe = item.sender_id === userId
            return (
              <View style={[s.bubbleRow, isMe ? s.bubbleRowMe : s.bubbleRowThem]}>
                <View style={[s.bubble, isMe ? s.bubbleMe : s.bubbleThem]}>
                  <Text style={[s.bubbleText, isMe ? s.bubbleTextMe : s.bubbleTextThem]}>
                    {item.body}
                  </Text>
                  <Text style={[s.bubbleTime, isMe ? s.bubbleTimeMe : s.bubbleTimeThem]}>
                    {relativeTime(item.created_at)}
                  </Text>
                </View>
              </View>
            )
          }}
        />
      )}

      {/* Compose bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={s.inputRow}>
          <TextInput
            style={s.input}
            placeholder="Type a message…"
            placeholderTextColor="#94A3B8"
            value={draft}
            onChangeText={setDraft}
            multiline
            maxLength={2000}
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[s.sendBtn, !canSend && s.sendBtnDisabled]}
            onPress={sendMessage}
            activeOpacity={0.7}
            disabled={!canSend}
          >
            {sending ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={s.sendBtnText}>Send</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const NAVY = '#0A1F5D'
const PURPLE = '#6B3EF2'
const LAV = '#E9E2FF'
const MUTED = '#475569'
const BORDER = '#E2E8F0'

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  backBtn: { minWidth: 60 },
  backText: { fontSize: 16, color: PURPLE, fontWeight: '600' },
  title: { fontSize: 17, fontWeight: '700', color: NAVY, flex: 1, textAlign: 'center' },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  messageList: { padding: 16, gap: 8, flexGrow: 1 },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: { fontSize: 14, color: MUTED, textAlign: 'center' },

  bubbleRow: { flexDirection: 'row', marginVertical: 4 },
  bubbleRowMe: { justifyContent: 'flex-end' },
  bubbleRowThem: { justifyContent: 'flex-start' },

  bubble: {
    maxWidth: '78%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleMe: {
    backgroundColor: PURPLE,
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    backgroundColor: LAV,
    borderBottomLeftRadius: 4,
  },

  bubbleText: { fontSize: 15, lineHeight: 21 },
  bubbleTextMe: { color: '#ffffff' },
  bubbleTextThem: { color: NAVY },

  bubbleTime: { fontSize: 10, marginTop: 4 },
  bubbleTimeMe: { color: 'rgba(255,255,255,0.65)', textAlign: 'right' },
  bubbleTimeThem: { color: MUTED },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: BORDER,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0F172A',
  },
  sendBtn: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 68,
  },
  sendBtnDisabled: { opacity: 0.45 },
  sendBtnText: { fontSize: 15, fontWeight: '700', color: '#ffffff' },
})
