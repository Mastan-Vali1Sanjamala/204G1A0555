import React, { useState } from 'react';

function Nms() {
  const [mergedNumbers, setMergedNumbers] = useState([]);
  const [inputUrls, setInputUrls] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const urls = inputUrls.split('\n').filter((url) => url.trim() !== '');
    fetchNumbers(urls);
  };

  async function fetchNumbers(urls) {
    try {
      const promises = urls.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.numbers;
      });

      const numbersArrays = await Promise.all(promises);
      const merged = numbersArrays
        .flat()
        .filter((num, index, arr) => arr.indexOf(num) === index)
        .sort((a, b) => a - b);
      setMergedNumbers(merged);
      setError('');
    } catch (error) {
      console.error('Error fetching numbers:', error);
      setError('An error occurred while fetching numbers.');
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', color: '#333', marginBottom: '20px', fontWeight: 'bold' }}>Number Management Service</h1>
      <form style={{ width: '80%', maxWidth: '400px', margin: '0 auto' }} onSubmit={handleSubmit}>
        <textarea
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', marginBottom: '10px' }}
          value={inputUrls}
          onChange={(e) => setInputUrls(e.target.value)}
          placeholder="Enter URLs, one per line"
          rows={4}
        />
        <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} type="submit">
          Fetch Numbers
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</p>}
      {mergedNumbers.length > 0 && (
        <div style={{ width: '80%', maxWidth: '400px', margin: '20px auto', padding: '20px', backgroundColor: '#fff', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Number</h2>
          <p style={{ fontSize: '18px' }}>{mergedNumbers.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default Nms;
