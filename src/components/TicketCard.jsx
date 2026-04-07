import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { StyleSheet } from 'react-native';

export const TicketCard = ({ title, date, status, qr, onCancel }) => {
  const isCompleted = status === 'completed';

  return (
    <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#333' }}>
      <Text style={{ color: '#fff', fontSize: 16 }}>{title}</Text>
      <Text style={{ color: '#aaa' }}>{date}</Text>

      <Text style={{ color: '#00ffcc', marginTop: 10 }}>
        QR: {qr}
      </Text>

      {!isCompleted && (
        <TouchableOpacity onPress={onCancel}>
          <Text style={{ color: 'red', marginTop: 10 }}>CANCEL</Text>
        </TouchableOpacity>
      )}

      {isCompleted && (
        <Text style={{ color: 'green' }}>Completed</Text>
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
