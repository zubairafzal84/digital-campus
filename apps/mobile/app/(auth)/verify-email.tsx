import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { router } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'

export default function VerifyEmailScreen() {
  const { signUp, setActive, isLoaded } = useSignUp()
  const [code,    setCode]    = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleVerify() {
    if (!isLoaded || !code.trim()) return

    setLoading(true)
    setError('')

    try {
      const result = await signUp.attemptEmailAddressVerification({ code: code.trim() })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.replace('/(tabs)')
      } else {
        setError('Verification incomplete. Please try again.')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Verification failed.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>✉</Text>
        </View>
        <Text style={styles.h1}>Check your email</Text>
        <Text style={styles.sub}>
          We sent a 6-digit code to your email address. Enter it below to verify your account.
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Verification code</Text>
        <TextInput
          style={styles.input}
          placeholder="000000"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
          autoFocus
        />

        <TouchableOpacity
          style={[styles.btn, (loading || code.length < 6) && styles.btnDisabled]}
          onPress={handleVerify}
          disabled={loading || code.length < 6}
          activeOpacity={0.85}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnText}>Verify email</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendBtn}
          onPress={() => signUp?.prepareEmailAddressVerification({ strategy: 'email_code' })}
          activeOpacity={0.7}
        >
          <Text style={styles.resendText}>Didn&apos;t get a code? Resend</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root:      { flex: 1, backgroundColor: '#0A1F5D' },
  inner:     { flex: 1, paddingHorizontal: 28, justifyContent: 'center' },
  iconWrap:  { width: 72, height: 72, borderRadius: 20, backgroundColor: 'rgba(107,62,242,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  icon:      { fontSize: 32 },
  h1:        { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  sub:       { color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 22, marginBottom: 32 },
  error:     { color: '#fca5a5', fontSize: 13, marginBottom: 16, backgroundColor: 'rgba(239,68,68,0.15)', padding: 12, borderRadius: 8 },
  label:     { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input:     { backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 16, fontSize: 24, letterSpacing: 8, color: '#fff', textAlign: 'center', marginBottom: 16 },
  btn:       { backgroundColor: '#6B3EF2', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 16 },
  btnDisabled: { opacity: 0.5 },
  btnText:   { color: '#fff', fontSize: 16, fontWeight: '700' },
  resendBtn: { alignItems: 'center', paddingVertical: 8 },
  resendText: { color: '#8B5CFF', fontSize: 14, fontWeight: '600' },
})
