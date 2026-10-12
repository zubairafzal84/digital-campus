import { Link, Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page not found' }} />
      <View style={styles.container}>
        <Text style={styles.emoji}>🔍</Text>
        <Text style={styles.heading}>Page not found</Text>
        <Text style={styles.body}>This page doesn't exist in the app.</Text>
        <Link href="/" style={styles.link}>
          Go to home screen
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#ffffff',
    gap: 12,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  heading: {
    fontWeight: '800',
    fontSize: 22,
    color: '#0A1F5D',
    textAlign: 'center',
  },
  body: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  link: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#6B3EF2',
    textDecorationLine: 'underline',
  },
})
