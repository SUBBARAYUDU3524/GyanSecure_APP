import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationScreen = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Fetch feedback data
  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const feedbackSnapshot = await firestore().collection('feedback').get();
      const feedbackList = feedbackSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbackData(feedbackList);
    } catch (error) {
      console.error('Error fetching feedback: ', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeedback();
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {feedbackData.length === 0 ? (
        <Text style={styles.noFeedbackText}>No notifications available</Text>
      ) : (
        feedbackData.map((feedback) => (
          <TouchableOpacity
            key={feedback.id}
            style={styles.notificationContainer}
            onPress={() => navigation.navigate('FeedbackDetails', { feedback })}
          >
            <View style={styles.notificationRow}>
              <Icon name="notifications" size={24} color="#e74c3c" style={styles.icon} />
              <Text style={styles.notificationText}>
                {feedback.name} sent feedback: Tap to view details
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  noFeedbackText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
  notificationContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  notificationText: {
    fontSize: 16,
    color: '#2c3e50',
    flexShrink: 1,
  },
});
