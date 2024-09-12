import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>見たい動画が見つからないあなたへ</h1>
      <p>APMOがあなたのバイオリズムを診断します</p>
      <p>あなたの今の気分を教えてください</p>
      <Link to="/diagnosis">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>診断する</button>
      </Link>
    </div>
  );
};

export default Home;
