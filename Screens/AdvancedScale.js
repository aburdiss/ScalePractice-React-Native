import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import RandomizeButton from '../Components/RandomizeButton';
import ScaleDisplay from '../Components/ScaleDisplay';
import AddToListButton from '../Components/AddToListButton';
import ResetButton from '../Components/ResetButton';

/**
 * @description A view that allows the user to randomize between a list of 
 * selected scales.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const AdvancedScale = () => {
  const noteNames = ["C", "C♯", "D♭", "D", "D♯", "E♭", "E", "F", "F♯", "G♭", "G", "G♯", "A♭", "A", "A♯", "B♭", "B"];
  const scaleNames = ["Major", "Natural Minor", "Harmonic Minor", "Melodic Minor", "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian", "Minor Major", "Dorian ♭2", "Lydian Augmented", "Lydian Dominant", "Mixolydian ♭6", "Locrian ♮2", "Altered Scale", "Blues", "Major Pentatonic", "Minor Pentatonic", "Whole-Half Octatonic", "Half-Whole Octatonic", "Whole Tone"];

  const [possibleScales, setPossibleScales] = useState([]);
  const [currentScale, setCurrentScale] = useState("No Scale Selected");

  const [selectedNote, setSelectedNote] = useState('C');
  const [selectedScale, setSelectedScale] = useState('Major');

  const addToScaleList = () => {
    let scaleAlreadyInList = false;
    const newScale = `${selectedNote} ${selectedScale}`;
    if (possibleScales.includes(newScale)) {
      scaleAlreadyInList = true;
    }
    if (!scaleAlreadyInList) {
      setPossibleScales([newScale, ...possibleScales]);
    } else {
      Alert.alert(
        "Scale Already in List",
        "",
        [
          {
            text: "Return",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    }
    
  }

  const generateScale = () => {
    if (possibleScales.length === 0) {
      Alert.alert(
        "No Scale Selected",
        "Please select at least one scale",
        [
          {
            text: "Return",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      let newScale = possibleScales[Math.floor(Math.random() * possibleScales.length)];
      if (possibleScales.length > 1) {
        do {
          newScale = possibleScales[Math.floor(Math.random() * possibleScales.length)];
        } while (newScale === currentScale);
      }
      setCurrentScale(newScale ? newScale : "No Scale Selected");
    }
  }

  const removeAllScales = () => {
    setPossibleScales([]);
  }

  return (
    <View style={styles.container}>
      <ScaleDisplay>{ currentScale }</ScaleDisplay>
      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedNote}
            dropdownIconColor="#800080"
            onValueChange={(itemValue, itemIndex) => setSelectedNote(itemValue)}
            >
            {
              noteNames.map(noteName => (
                <Picker.Item label={noteName} value={noteName} key={noteName} />
                ))
              }
          </Picker>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedScale}
            dropdownIconColor="#800080"
            onValueChange={(itemValue, itemIndex) => setSelectedScale(itemValue)}
            >
            {
              scaleNames.map(scaleName => (
                <Picker.Item label={scaleName} value={scaleName} key={scaleName} />
                ))
              }
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ResetButton handler={removeAllScales} />
        <AddToListButton handler={addToScaleList} />
      </View>
      <FlatList
        style={styles.list}
        data={possibleScales}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Text style={styles.listItemText}>{item}</Text>
          </View>
        )}
        keyExtractor={item => item}
      />
      <RandomizeButton handler={generateScale} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listItemContainer: {
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  listItemText: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    paddingVertical: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 4,
    borderRadius: 8,
  },
  pickerContainer: {
    paddingHorizontal: 26,
  },
});

export default AdvancedScale;