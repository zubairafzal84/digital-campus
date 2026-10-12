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
  Alert,
  ScrollView,
} from 'react-native'
import { Link, router } from 'expo-router'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto'

const supabaseUrl  = process.env.EXPO_PUBLIC_SUPABASE_URL  ?? ''
const supabaseAnon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ''

const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
})

export default function SignupScreen() {
  const [fullName, setFullName] = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSignup() {
    if (!fullName.trim() || !email.trim() || !password) return
    if (password.length < 8) {
      Alert.alert('Password too short', 'Use at least 8 characters.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { full_name: fullName.trim() } },
    })
    setLoading(false)

    if (error) {
      Alert.alert('Sign up failed', error.message)
      return
    }

    Alert.alert(
      'Check your email',
      'We sent a confirmation link. Open it to activate your account.',
      [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }],
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>DK</Text>
        </View>
        <Text style={styles.h1}>Create account</Text>
        <Text style={styles.sub}>Free forever for students</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="rgba(255,255,255,0.4)"
            autoCapitalize="words"
            autoComplete="name"
            value={fullName}
            onChangeText={setFullName}
          />

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
            placeholder="At least 8 characters"
            placeholderTextColor="rgba(255,255,255,0.4)"
            secureTextEntry
            autoComplete="new-password"
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.terms}>
            By signing up you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>Create account</Text>
            }
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
  root: {
    flex: 1,
    backgroundColor: '#0A1F5D',
  },
  inner: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 48,
    justifyContent: 'center',
  },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#6B3EF2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  h1: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  sub: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 15,
    marginBottom: 32,
  },
  form: {
    gap: 10,
    marginBottom: 28,
  },
  label: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#fff',
    marginBottom: 8,
  },
  terms: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
  termsLink: {
    color: '#8B5CFF',
    fontWeight: '600',
  },
  btn: {
    backgroundColor: '#6B3EF2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  footerLink: {
    color: '#8B5CFF',
    fontSize: 14,
    fontWeight: '700',
  },
})
