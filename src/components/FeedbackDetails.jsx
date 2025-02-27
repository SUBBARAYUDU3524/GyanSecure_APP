import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FeedbackDetails = ({ route }) => {
  const { feedback } = route.params;

  // Helper function to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={20}
          color="#f1c40f"
          style={styles.starIcon}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback Details</Text>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{feedback.name}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{feedback.email}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Rating:</Text>
        <View style={styles.starsContainer}>{renderStars(feedback.rating)}</View>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Message:</Text>
        <Text style={styles.value}>{feedback.message}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Timestamp:</Text>
        <Text style={styles.value}>
          {new Date(feedback.createdAt?.seconds * 1000).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default FeedbackDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    width: '30%',
  },
  value: {
    fontSize: 18,
    color: '#7f8c8d',
    flexShrink: 1,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginHorizontal: 2,
  },
});
