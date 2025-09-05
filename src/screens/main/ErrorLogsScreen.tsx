import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Share } from 'react-native';
import { Button, Card, Chip, Searchbar } from 'react-native-paper';
import { COLORS, SPACING } from '../../constants';
import { ErrorLogEntry } from '../../services/errorTracking';
import { useErrorTracking } from '../../hooks/useErrorTracking';
import { formatDate } from '../../utils';

const ErrorLogsScreen: React.FC = () => {
  const { getLocalLogs, clearLocalLogs, exportLogs } = useErrorTracking();
  const [logs, setLogs] = useState<ErrorLogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ErrorLogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchQuery, selectedLevel]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const localLogs = await getLocalLogs();
      setLogs(localLogs.reverse()); // Show newest first
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLogs = () => {
    let filtered = logs;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(log =>
        log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.stack?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by level
    if (selectedLevel) {
      filtered = filtered.filter(log => log.level === selectedLevel);
    }

    setFilteredLogs(filtered);
  };

  const handleClearLogs = () => {
    Alert.alert(
      'Clear Logs',
      'Are you sure you want to clear all error logs? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearLocalLogs();
            setLogs([]);
            setFilteredLogs([]);
          },
        },
      ]
    );
  };

  const handleExportLogs = async () => {
    try {
      const exportData = await exportLogs();
      await Share.share({
        message: exportData,
        title: 'Error Logs Export',
      });
    } catch (error) {
      Alert.alert('Export Failed', 'Failed to export logs. Please try again.');
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'fatal':
        return COLORS.error;
      case 'error':
        return '#FF6B6B';
      case 'warning':
        return COLORS.warning;
      case 'info':
        return COLORS.info;
      default:
        return COLORS.gray[500];
    }
  };

  const renderLogEntry = (log: ErrorLogEntry, index: number) => (
    <Card key={`${log.id}-${index}`} style={styles.logCard}>
      <Card.Content>
        <View style={styles.logHeader}>
          <Chip
            mode="outlined"
            style={[styles.levelChip, { borderColor: getLevelColor(log.level) }]}
            textStyle={{ color: getLevelColor(log.level) }}
          >
            {log.level.toUpperCase()}
          </Chip>
          <Text style={styles.timestamp}>
            {formatDate(log.timestamp, 'MMM dd, HH:mm:ss')}
          </Text>
        </View>

        <Text style={styles.message}>{log.message}</Text>

        {log.stack && (
          <ScrollView style={styles.stackContainer} horizontal>
            <Text style={styles.stackText}>{log.stack}</Text>
          </ScrollView>
        )}

        {log.context && Object.keys(log.context).length > 0 && (
          <View style={styles.contextContainer}>
            <Text style={styles.contextTitle}>Context:</Text>
            <Text style={styles.contextText}>
              {JSON.stringify(log.context, null, 2)}
            </Text>
          </View>
        )}

        <Text style={styles.environment}>Environment: {log.environment}</Text>
      </Card.Content>
    </Card>
  );

  const levels = ['info', 'warning', 'error', 'fatal'];

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading logs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Error Logs ({logs.length})</Text>
        
        <Searchbar
          placeholder="Search logs..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          <Button
            mode={selectedLevel === null ? 'contained' : 'outlined'}
            onPress={() => setSelectedLevel(null)}
            style={styles.filterButton}
          >
            All
          </Button>
          {levels.map(level => (
            <Button
              key={level}
              mode={selectedLevel === level ? 'contained' : 'outlined'}
              onPress={() => setSelectedLevel(selectedLevel === level ? null : level)}
              style={styles.filterButton}
            >
              {level}
            </Button>
          ))}
        </ScrollView>

        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={handleExportLogs}
            style={styles.actionButton}
            disabled={logs.length === 0}
          >
            Export
          </Button>
          <Button
            mode="outlined"
            onPress={handleClearLogs}
            style={styles.actionButton}
            disabled={logs.length === 0}
          >
            Clear All
          </Button>
        </View>
      </View>

      {filteredLogs.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            {logs.length === 0 ? 'No error logs found' : 'No logs match your filter'}
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.logsList} showsVerticalScrollIndicator={false}>
          {filteredLogs.map(renderLogEntry)}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  searchBar: {
    marginBottom: SPACING.md,
  },
  filterContainer: {
    marginBottom: SPACING.md,
  },
  filterButton: {
    marginRight: SPACING.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  logsList: {
    flex: 1,
    padding: SPACING.md,
  },
  logCard: {
    marginBottom: SPACING.md,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  levelChip: {
    height: 28,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  message: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    fontWeight: '500',
  },
  stackContainer: {
    backgroundColor: COLORS.gray[100],
    padding: SPACING.sm,
    borderRadius: 4,
    marginBottom: SPACING.sm,
    maxHeight: 100,
  },
  stackText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  contextContainer: {
    backgroundColor: COLORS.gray[50],
    padding: SPACING.sm,
    borderRadius: 4,
    marginBottom: SPACING.sm,
  },
  contextTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  contextText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  environment: {
    fontSize: 10,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
  },
});

export default ErrorLogsScreen;
