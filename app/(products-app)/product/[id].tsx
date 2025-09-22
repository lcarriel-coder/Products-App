import { ThemedView } from '@/presentation/theme/components/themed-view';
import ThemedTextInput from '@/presentation/theme/components/ui/ThemedTextInput';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const ProductScreen = () => {

  const navigation = useNavigation();
  useEffect(() => {



    navigation.setOptions({

      headerRight: () => (
        <Ionicons name='camera-outline' size={25} />
      )
    })

  }, []);



  return (
    <KeyboardAvoidingView

      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>


        <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>


          <ThemedTextInput
            placeholder='Título del producto'
            style={{ marginVertical: 5 }}
          />

          <ThemedTextInput
            placeholder='Slug'
            style={{ marginVertical: 5 }}
          />

          <ThemedTextInput
            placeholder='Descripción'
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }}
          />

        </ThemedView>



        <ThemedView style={{

          marginHorizontal: 10,
          marginVertical: 5,
          flexDirection: 'row',
          gap: 10
        }} >

          <ThemedTextInput placeholder='Precio' style={{ flex: 1 }} />


          <ThemedTextInput placeholder='Inventario' style={{ flex: 1 }} />


        </ThemedView>




      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ProductScreen;