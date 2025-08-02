import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export function ProgressBar({
  current,
  total,
  showLabel = true,
  height = 8,
  color = '#3B82F6',
  backgroundColor = '#E5E7EB',
}: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{current} / {total}</Text>
          <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
        </View>
      )}
      <View style={[styles.progressBar, { height, backgroundColor }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
              height,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  percentage: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
  },
  progressBar: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 4,
  },
});