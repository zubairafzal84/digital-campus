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
import { Link, router } from 'expo-router'
import { useSignIn } from '@clerk/clerk-expo'

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleLogin() {
    if (!isLoaded || !email.trim() || !password) return

    setLoading(true)
    setError('')

    try {
      const result = await signIn.create({
        identifier: email.trim().toLowerCase(),
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.replace('/(tabs)')
      } else {
        setError('Additional verification required. Please use the web app.')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed.'
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
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>DK</Text>
        </View>
        <Text style={styles.h1}>Welcome back</Text>
        <Text style={styles.sub}>Sign in to your Digital Kampus account</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@school.ca"
            placeholderTextColor="rgba(255,255,255,0.4)"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Your password"
            placeholderTextColor="rgba(255,255,255,0.4)"
            secureTextEntry
            autoComplete="password"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>Sign in</Text>
            }
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account? </Text>
          <Link href="/(auth)/signup" style={styles.footerLink}>Sign up free</Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0A1F5D' },
  inner: { flex: 1, paddingHorizontal: 28, justifyContent: 'center' },
  logoWrap: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#6B3EF2', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  logo: { color: '#fff', fontSize: 20, fontWeight: '800' },
  h1: { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 6 },
  sub: { color: 'rgba(255,255,255,0.65)', fontSize: 15, marginBottom: 32 },
  error: { color: '#fca5a5', fontSize: 13, marginBottom: 16, backgroundColor: 'rgba(239,68,68,0.15)', padding: 12, borderRadius: 8 },
  form: { gap: 10, marginBottom: 28 },
  label: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '600', marginBottom: 4 },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 14, fontSize: 15, color: '#fff', marginBottom: 8 },
  btn: { backgroundColor: '#6B3EF2', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  footerLink: { color: '#8B5CFF', fontSize: 14, fontWeight: '700' },
})
