import React from 'react'; 
import { useLocation } from 'react-router-dom';

const categories = [
  '戦争・復讐劇 系',
  '戦後サバイバル系',
  '弱者が強者を倒す系',
  '平和な日常系'
];

const movieGenres = [
  { category: '戦争・復讐劇 系', genres: 'アクション, ホラー, 戦争ドラマ' },
  { category: '戦後サバイバル系', genres: '世界崩壊後のサバイバル, 冒険ドラマ' },
  { category: '弱者が強者を倒す系', genres: 'ヒーローもの, 逆転劇, ドラマ' },
  { category: '平和な日常系', genres: '恋愛ドラマ, コメディ, ヒューマンドラマ' }
];

const Result = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const result = params.get('result');

  const currentIndex = categories.indexOf(result); // 現在のインデックス
  const nextIndex = (currentIndex + 1) % categories.length; // 次のインデックス

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>あなたの診断結果</h2>

      {/* 現在の状態と次に訪れる状態を2段で表示 */}
      <div style={{ marginBottom: '20px' }}>
        {/* 1段目 - 現在の状態 */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: '10px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '3px 20px', // サイズを調整
            backgroundColor: 'red', // 赤い角丸枠
            borderRadius: '15px', // 角丸
          }}>
            <div style={{
              width: '30px',  // 赤い■のサイズを大きく
              height: '30px', 
              backgroundColor: 'red', // 赤い■
              marginRight: '15px',
              borderRadius: '6px'
            }}></div>
            <p style={{ fontWeight: 'bold', color: 'white', fontSize: 'clamp(12px, 2vw, 24px)' }}>
              現在の状態：<span style={{ color: 'white' }}>{categories[currentIndex]}</span>
            </p>
          </div>
        </div>

        {/* 2段目 - 次に訪れる状態 */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '3px 20px', // サイズを調整
            backgroundColor: 'blue', // 青い角丸枠
            borderRadius: '15px', // 角丸
          }}>
            <div style={{
              width: '30px',  // 青い■のサイズを大きく
              height: '30px', 
              backgroundColor: 'blue', // 青い■
              marginRight: '15px',
              borderRadius: '6px'
            }}></div>
            <p style={{ fontWeight: 'bold', color: 'white', fontSize: 'clamp(12px, 2vw, 24px)' }}>
              約2週間後の状態：<span style={{ color: 'white' }}>{categories[nextIndex]}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 円形レイアウトのコンテナ */}
      <div style={{ 
        position: 'relative', 
        width: '350px',  // コンテナのサイズを大きく
        height: '350px', 
        margin: '0 auto',
        borderRadius: '50%', // 円形に
        border: '2px solid lightgray', // 外枠1本に変更
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* 各カテゴリーを円の周りに配置 */}
        {categories.map((category, index) => {
          const isCurrent = index === currentIndex; // 現在の状態
          const isNext = index === nextIndex; // 次に訪れる状態

          // 円形の位置を計算
          const angle = (index / categories.length) * 360;
          const x = 140 * Math.cos((angle * Math.PI) / 180);  // 距離を少し広げる
          const y = 140 * Math.sin((angle * Math.PI) / 180);  // 距離を少し広げる

          const backgroundColor = isCurrent ? 'red' : isNext ? 'blue' : 'lightgray'; // 現在は赤、次は青、他は灰色
          const textColor = isCurrent || isNext ? 'white' : 'black'; // テキスト色

          return (
            <div 
              key={index} 
              style={{
                position: 'absolute',
                top: `calc(50% + ${y}px)`, 
                left: `calc(50% + ${x}px)`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: backgroundColor,
                color: textColor,
                width: '150px',  // 枠のサイズを1.5倍に
                height: '60px',  // 枠のサイズを1.5倍に
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '15px', // 角丸を少し大きく
                fontWeight: 'bold',
                fontSize: 'clamp(14px, 2.5vw, 20px)',  // テキストのサイズを調整
                zIndex: 2 // 枠を矢印より前に表示
              }}
            >
              {category}
            </div>
          );
        })}

        {/* 矢印を表示して枠の後ろに配置 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          zIndex: 0, // 矢印を枠の後ろに配置
          pointerEvents: 'none',
        }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* 時計回りの矢印 */}
            <path d="M 50 5 A 45 45 0 0 1 95 50" fill="none" stroke="gray" strokeWidth="2"/>
            <polygon points="95,50 90,45 90,55" fill="gray"/> {/* 矢印の三角形 */}
            <path d="M 95 50 A 45 45 0 0 1 50 95" fill="none" stroke="gray" strokeWidth="2"/>
            <polygon points="50,95 55,90 45,90" fill="gray"/> {/* 矢印の三角形 */}
            <path d="M 50 95 A 45 45 0 0 1 5 50" fill="none" stroke="gray" strokeWidth="2"/>
            <polygon points="5,50 10,55 10,45" fill="gray"/> {/* 矢印の三角形 */}
            <path d="M 5 50 A 45 45 0 0 1 50 5" fill="none" stroke="gray" strokeWidth="2"/>
            <polygon points="50,5 45,10 55,10" fill="gray"/> {/* 矢印の三角形 */}
          </svg>
        </div>

        {/* 円の中央に画像を表示 */}
        <img 
          src="/images/biorhythm.jpg"  // 画像のパス
          alt="バイオリズムの画像" 
          style={{
            position: 'absolute', 
            width: '150px',  // 画像のサイズも調整
            height: '150px',
            borderRadius: '0%',  // 画像を丸くする場合
            objectFit: 'cover',  // 画像の調整
            zIndex: 1 // 画像が枠より前に表示されるようにする
          }}
        />
      </div>

      {/* 映画ジャンルの表を表示 */}
      <div style={{ marginTop: '40px', textAlign: 'left' }}>
        <h3>おすすめのジャンル</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {movieGenres.map((genre, index) => (
              <tr key={index} style={{ borderBottom: '1px solid gray' }}>
                <td style={{
                  backgroundColor: index === currentIndex ? 'red' : index === nextIndex ? 'blue' : 'lightgray', 
                  color: 'white', 
                  padding: '10px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  {genre.category}
                </td>
                <td style={{ padding: '10px', textAlign: 'left' }}>{genre.genres}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Result;
