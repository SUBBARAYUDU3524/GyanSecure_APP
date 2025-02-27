import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/native';
import BannerAdComponent from './BannerAdComponent';

const TeamScreen = () => {
  const navigation = useNavigation();
  const animValues = [
    useSharedValue(-50),
    useSharedValue(50),
    useSharedValue(-50),
    useSharedValue(50),
  ];

  useFocusEffect(
    React.useCallback(() => {
      animValues.forEach(anim => {
        anim.value = 0;
      });

      return () => {
        animValues.forEach(anim => {
          anim.value = 0;
        });
      };
    }, [animValues]),
  );

  const getAnimatedStyle = animValue =>
    useAnimatedStyle(() => ({
      transform: [{translateX: withTiming(animValue.value, {duration: 500})}],
      opacity: withTiming(animValue.value === 0 ? 1 : 0, {duration: 500}),
    }));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>About Team</Text>
      </View>

      <View style={styles.cardContainer}>
        {[
          {
            name: 'Shaik Shareef',
            rollNo: '6012363098',
            image: require('../assets/Shareef.jpeg'),
          },
          {
            name: 'Damerla Bala Chandar',
            rollNo: '6012363025',
            image: require('../assets/balu.jpeg'),
          },
          {
            name: 'Yarraguntla Vikram Kumar',
            rollNo: '6012363122',
            image: require('../assets/Vikram.jpg'),
          },
          {
            name: 'Shaik Ruhee',
            rollNo: '6012363097',
            image: require('../assets/Ruhee.jpg'),
          },
        ].map((member, index) => (
          <Animated.View
            key={index}
            style={[styles.cardWrapper, getAnimatedStyle(animValues[index])]}>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Image source={member.image} style={styles.image} />
                <Title style={styles.name}>{member.name}</Title>
                <Paragraph style={styles.paragraph}>
                  Roll No: {member.rollNo}
                </Paragraph>
                <Paragraph style={styles.paragraph}>
                  Student of MCA, Sri Venkateswara University
                </Paragraph>
              </Card.Content>
            </Card>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    elevation: 4,
  },
  backButton: {
    marginRight: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardWrapper: {
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
});

export default TeamScreen;
