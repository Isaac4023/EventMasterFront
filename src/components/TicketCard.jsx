import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export const TicketCard = ({ title, date, status, onCancel }) => {
  const isCompleted = status === 'completed';

  return (
    <View style={[styles.card, isCompleted && styles.completedCard]}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      {!isCompleted && (
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
      )}
      
      {isCompleted && (
        <Text style={styles.completedText}>Completed</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a232e',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  completedCard: {
    opacity: 0.6,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: colors.textSecondary,
    fontSize: 10,
  },
  cancelButton: {
    padding: 5,
  },
  cancelText: {
    color: colors.danger,
    fontSize: 10,
    fontWeight: '900',
  },
  completedText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '500',
  }
});
