import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const cityPopulations = [660, 310, 250, 240, 210, 195, 145, 120, 120, 85];

const getStemAndLeafData = (data: number[]): [number, number[]][] => {
  const map = new Map();

  data.sort((a: number, b: number) => a - b).forEach((num: number) => {
    const stem = Math.floor(num / 10); 
    const leaf = num % 10;
    if (!map.has(stem)) {
      map.set(stem, []);
    }
    map.get(stem).push(leaf);
  });

  return Array.from(map.entries());
};

const StemAndLeafPlot = ({ data }: { data: number[] }) => {
  const stemLeafData = getStemAndLeafData(data);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📈 Finnish City Populations (in thousands)</Text>
      <Text style={styles.legend}>Legend: "Stem | Leaf" → Stem ×10 + Leaf = Population in 1000s</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.headerStem}>Stem</Text>
        <Text style={styles.headerLeaf}>Leaf</Text>
      </View>

      {stemLeafData.map(([stem, leaves]) => (
        <View key={stem} style={styles.row}>
          <Text style={styles.stem}>{stem}</Text>
          <Text style={styles.leaf}>{leaves.join(' ')}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default function App() {
  return <StemAndLeafPlot data={cityPopulations} />;
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    color: '#1e3a8a',
  },
  legend: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    color: '#555',
    fontStyle: 'italic'
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingBottom: 6,
    marginBottom: 4,
  },
  headerStem: {
    width: 60,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#374151',
  },
  headerLeaf: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#374151',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
    backgroundColor: '#f0f4f8',
    marginBottom: 2,
    borderRadius: 6,
    paddingHorizontal: 8
  },
  stem: {
    width: 60,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  leaf: {
    flex: 1,
    fontSize: 18,
    color: '#1f2937',
  },
});
