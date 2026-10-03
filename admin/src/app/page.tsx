'use client';

import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { fetchCollections } from '../lib/api';
import { CollectionRecord } from '../types/collection';

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function HomePage() {
  const [records, setRecords] = useState<CollectionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const loadCollections = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCollections();
      setRecords(data);
    } catch (fetchError) {
      setError('Unable to connect to the backend API. Please verify the service is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCollections();
  }, []);

  const filteredRecords = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) {
      return records;
    }

    return records.filter((record) => record.qr_id.toLowerCase().includes(searchTerm));
  }, [records, search]);

  const summary = useMemo(() => {
    const totalCollections = records.length;
    const totalWaste = records.reduce((sum, item) => sum + item.weight, 0);
    const totalPoints = records.reduce((sum, item) => sum + item.points, 0);

    return {
      totalCollections,
      totalWaste,
      totalPoints,
    };
  }, [records]);

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px 64px' }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Waste Collection Dashboard</h1>
          <p style={{ margin: '8px 0 0', color: '#475569' }}>Operational overview for all successful collections.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <SummaryCard title="Total Collections" value={String(summary.totalCollections)} />
          <SummaryCard title="Total Waste (kg)" value={summary.totalWaste.toFixed(1)} />
          <SummaryCard title="Total Points" value={String(summary.totalPoints)} />
        </div>

        <section style={{ background: '#fff', borderRadius: 18, padding: 20, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by QR ID"
              style={{
                flex: 1,
                minWidth: 180,
                maxWidth: 280,
                padding: '12px 14px',
                border: '1px solid #cbd5e1',
                borderRadius: 10,
                fontSize: 14,
                outline: 'none',
              }}
            />
            <button
              onClick={() => void loadCollections()}
              style={{
                background: '#0f172a',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '12px 18px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={{ color: '#475569' }}>Loading collections…</p>
          ) : error ? (
            <div style={{ background: '#fee2e2', color: '#991b1b', borderRadius: 12, padding: 16 }}>{error}</div>
          ) : filteredRecords.length === 0 ? (
            <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 12, padding: 24, textAlign: 'center', color: '#475569' }}>
              No collections found for the current filter.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={cellStyle}>QR ID</th>
                    <th style={cellStyle}>Waste Weight (kg)</th>
                    <th style={cellStyle}>Points Allocated</th>
                    <th style={cellStyle}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={`${record.qr_id}-${record.timestamp}`} style={{ borderTop: '1px solid #e2e8f0' }}>
                      <td style={cellStyle}>{record.qr_id}</td>
                      <td style={cellStyle}>{record.weight.toFixed(1)}</td>
                      <td style={cellStyle}>{record.points}</td>
                      <td style={cellStyle}>{formatDateTime(record.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: 18, boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)', border: '1px solid #e2e8f0' }}>
      <p style={{ margin: 0, color: '#64748b', fontSize: 13, fontWeight: 600 }}>{title}</p>
      <h2 style={{ margin: '10px 0 0', fontSize: '1.8rem' }}>{value}</h2>
    </div>
  );
}

const cellStyle: CSSProperties = {
  padding: '14px 12px',
  textAlign: 'left',
  fontSize: 14,
  color: '#1f2937',
};
