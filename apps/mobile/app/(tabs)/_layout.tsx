import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

const NAVY = '#0A1F5D'
const PURPLE = '#6B3EF2'
const MUTED = '#94A3B8'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PURPLE,
        tabBarInactiveTintColor: MUTED,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#E2E8F0',
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          height: Platform.OS === 'ios' ? 80 : 64,
        },
      }}
    >
      <Tabs.Screen name="index"   options={{ title: 'Home',    tabBarIcon: ({ color }) => <TabIcon label="◉"  color={color} /> }} />
      <Tabs.Screen name="grades"  options={{ title: 'Grades',  tabBarIcon: ({ color }) => <TabIcon label="📊" color={color} /> }} />
      <Tabs.Screen name="clubs"   options={{ title: 'Clubs',   tabBarIcon: ({ color }) => <TabIcon label="🤝" color={color} /> }} />
      <Tabs.Screen name="funding" options={{ title: 'Funding', tabBarIcon: ({ color }) => <TabIcon label="🎓" color={color} /> }} />
      <Tabs.Screen name="chat"    options={{ title: 'Chat',    tabBarIcon: ({ color }) => <TabIcon label="💬" color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <TabIcon label="👤" color={color} /> }} />
    </Tabs>
  )
}

function TabIcon({ label, color }: { label: string; color: string }) {
  const { Text } = require('react-native')
  return <Text style={{ fontSize: 20, color }}>{label}</Text>
}
