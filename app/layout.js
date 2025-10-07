import { Stack, Redirect } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext'; 
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  return (
    <AuthProvider> 
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} /> 
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}

function LayoutContent() {
  const { user, loading } = useAuth(); 

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" /> 
      </View>
    );
  }

  // Se DESLOGADO: Vai para a tela de Login
  if (!user) {
    return (
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Redirect href="/(auth)/login" /> 
      </Stack>
    );
  }

  // Se LOGADO: Vai para a tela Home
  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Redirect href="/(app)/home" /> 
    </Stack>
  );
}