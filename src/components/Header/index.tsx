import React, {Dispatch, SetStateAction} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Header = ({
  setIsPaused,
  score,
  onPressReload,
}: {
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  score: number;
  onPressReload: () => void;
}) => {
  const onPressPause = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftIcon} onPress={onPressReload}>
        <Icon name="reload" size={32} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressPause}>
        <Icon name="pause" size={32} color={Colors.primary} />
      </TouchableOpacity>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    height: 60,
    backgroundColor: Colors.background,
  },
  leftIcon: {
    marginLeft: 25,
  },

  score: {
    marginRight: 25,
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
