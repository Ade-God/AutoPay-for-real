import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useTheme } from '@/utils/theme';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value?: string;
  options: Option[];
  onSelect: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ label, value, options, onSelect }) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      <TouchableOpacity
        style={[styles.selector, { borderColor: theme.border, backgroundColor: theme.card }]}
        onPress={() => setVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={`${label} selector`}
      >
        <Text style={{ color: selectedLabel ? theme.text : theme.muted }}>
          {selectedLabel ?? 'Select'}
        </Text>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modal, { backgroundColor: theme.card }]}
            accessibilityViewIsModal
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${item.label}`}
                >
                  <Text style={{ color: theme.text }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.close}
              accessibilityRole="button"
              accessibilityLabel="Close selector"
            >
              <Text style={{ color: theme.primary }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    marginBottom: 6,
    fontSize: 12,
    fontWeight: '500'
  },
  selector: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24
  },
  modal: {
    borderRadius: 16,
    padding: 16,
    maxHeight: '70%'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  option: {
    paddingVertical: 12
  },
  close: {
    alignSelf: 'flex-end',
    marginTop: 12
  }
});
