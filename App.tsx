import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shoppingitem from './src/components/Shoppingitem';
import { db, collection, addDoc, getDocs } from './firebase/index';

const App = () => {
  const [title, setTitle] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true); 

  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, 'shopping'), {
        title: title,
        isChecked: false,
      });
      console.log('Document written with ID:', docRef.id);
      setTitle('');
      getShoppingList(); 
    } catch (e) {
      console.error('Error adding document:', e);
    }
    getShoppingList();
  };

  const getShoppingList = async () => {
    setLoading(true); 
    const querySnapshot = await getDocs(collection(db, 'shopping'));
    const list = []; 

    querySnapshot.forEach((doc) => {
      list.push({
        id: doc.id, 
        ...doc.data(), 
      });
    });

    setShoppingList(list); 
    setLoading(false); 
  };

  

  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>
        
          
      </View>

      {/* Display the shopping list */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => <Shoppingitem title={item.title} isChecked={item.isChecked} id={item.id}
          getShoppingList={getShoppingList} />}
          keyExtractor={(item) => item.id}

        />
      )}

      {/* Input for adding new items */}
      <TextInput
        placeholder="Enter Shopping Item"
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    color: 'black',
    fontSize: 30,
    fontWeight: '500',
    flex: 1,
  },
  button: {
    backgroundColor: '#ff0000',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'lightgrey',
    padding: 10,
    fontSize: 15,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 10,
  },
});

export default App;
