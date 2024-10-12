import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db,updateDoc,doc ,deleteDoc} from '../../firebase/index';

const Shoppingitem = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);
  
  const updateIsChecked = async ()=>{
   const shoppingRef = doc(db,"shopping",props.id)
   await updateDoc(shoppingRef,{
    isChecked:isChecked,
   });

  }

  useEffect(()=>{
    updateIsChecked()
  },[isChecked])

  const deleteShoppingItem = async () =>{
   await deleteDoc(doc(db,"shopping",props.id))
   props.getShoppingList();
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Toggle the checkmark-circle icon */}
      <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
        {isChecked ? (
          <Text style={styles.checkedButton}>Checked Button</Text>
        ) : (
          <Text style={styles.unCheckedButton}>Unchecked Button</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.title}>{props.title}</Text>

      <TouchableOpacity onPress={deleteShoppingItem}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Shoppingitem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginVertical: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '500',
  },
  checkedButton: {
    backgroundColor: 'green', // Green background for checked state
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  unCheckedButton: {
    backgroundColor: 'gray', // Gray background for unchecked state
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff0000', // Red background color for delete
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
