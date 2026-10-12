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
  ScrollView,
  Alert,
} from 'react-native'
import { Link, router } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'

export default function SignupScreen() {
  const { signUp, setActive, isLoaded } = useSignUp()
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')

  async function handleSignup() {
    if (!isLoaded || !firstName.trim() || !email.trim() || !password) return
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await signUp.create({
        firstName: firstName.trim(),
        lastName:  lastName.trim(),
        emailAddress: email.trim().toLowerCase(),
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      Alert.alert(
        'Check your email',
        'We sent a verification code. Enter it on the next screen.',
        [{ text: 'OK', onPress: () => router.push('/(auth)/verify-email') }],
      )
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign up failed.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>DK</Text>
        </View>
        <Text style={styles.h1}>Create account</Text>
        <Text style={styles.sub}>Free forever for students</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>First name</Text>
              <TextInput style={styles.input} placeholder="First" placeholderTextColor="rgba(255,255,255,0.4)" autoCapitalize="words" value={firstName} onChangeText={setFirstName} />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>Last name</Text>
              <TextInput style={styles.input} placeholder="Last" placeholderTextColor="rgba(255,255,255,0.4)" autoCapitalize="words" value={lastName} onChangeText={setLastName} />
            </View>
          </View>

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="you@school.ca" placeholderTextColor="rgba(255,255,255,0.4)" autoCapitalize="none" keyboardType="email-address" autoComplete="email" value={email} onChangeText={setEmail} />

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="At least 8 characters" placeholderTextColor="rgba(255,255,255,0.4)" secureTextEntry autoComplete="new-password" value={password} onChangeText={setPassword} />

          <Text style={styles.terms}>
            By signing up you agree to our <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>

          <TouchableOpacity style={[styles.btn, loading && styles.btnDisabled]} onPress={handleSignup} disabled={loading} activeOpacity={0.85}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Create account</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/login" style={styles.footerLink}>Sign in</Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0A1F5D' },
  inner: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 80, paddingBottom: 48 },
  logoWrap: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#6B3EF2', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  logo: { color: '#fff', fontSize: 20, fontWeight: '800' },
  h1: { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 6 },
  sub: { color: 'rgba(255,255,255,0.65)', fontSize: 15, marginBottom: 32 },
  error: { color: '#fca5a5', fontSize: 13, marginBottom: 16, backgroundColor: 'rgba(239,68,68,0.15)', padding: 12, borderRadius: 8 },
  form: { gap: 10, marginBottom: 28 },
  row: { flexDirection: 'row', gap: 10 },
  halfField: { flex: 1 },
  label: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '600', marginBottom: 4 },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 14, fontSize: 15, color: '#fff', marginBottom: 8 },
  terms: { color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 18, marginBottom: 4 },
  termsLink: { color: '#8B5CFF', fontWeight: '600' },
  btn: { backgroundColor: '#6B3EF2', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  footerLink: { color: '#8B5CFF', fontSize: 14, fontWeight: '700' },
})
