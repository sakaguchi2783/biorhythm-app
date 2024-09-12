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
  const result = params.get('result'); // パラメータから診断結果を取得

  const currentIndex = categories.indexOf(result); // 現在のインデックス
  const nextIndex = (currentIndex + 1) % categories.length; // 次に訪れるインデックス

  // currentIndex が -1 の場合のエラーハンドリング
  if (currentIndex === -1) {
    return <div>診断結果が見つかりませんでした。</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>あなたの診断結果</h2>

      {/* 現在の状態と次に訪れる状態を2段で表示 */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: '10px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '3px 20px',
            backgroundColor: 'red', 
            borderRadius: '15px',
          }}>
            <div style={{
              width: '30px',  
              height: '30px', 
              backgroundColor: 'red', 
              marginRight: '15px',
              borderRadius: '6px'
            }}></div>
            <p style={{ fontWeight: 'bold', color: 'white', fontSize: 'clamp(12px, 2vw, 24px)' }}>
              現在の状態：<span style={{ color: 'white' }}>{categories[currentIndex]}</span>
            </p>
          </div>
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '3px 20px',
            backgroundColor: 'blue', 
            borderRadius: '15px',
          }}>
            <div style={{
              width: '30px',  
              height: '30px', 
              backgroundColor: 'blue', 
              marginRight: '15px',
              borderRadius: '6px'
            }}></div>
            <p style={{ fontWeight: 'bold', color: 'white', fontSize: 'clamp(12px, 2vw, 24px)' }}>
              約2週間後の状態：<span style={{ color: 'white' }}>{categories[nextIndex]}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 円形レイアウト */}
      <div style={{ 
        position: 'relative', 
        width: '350px',  
        height: '350px', 
        margin: '0 auto',
        borderRadius: '50%', 
        border: '2px solid lightgray', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {categories.map((category, index) => {
          const isCurrent = index === currentIndex;
          const isNext = index === nextIndex;

          const angle = (index / categories.length) * 360;
          const x = 140 * Math.cos((angle * Math.PI) / 180);  
          const y = 140 * Math.sin((angle * Math.PI) / 180);  

          const backgroundColor = isCurrent ? 'red' : isNext ? 'blue' : 'lightgray'; 
          const textColor = isCurrent || isNext ? 'white' : 'black'; 

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
                width: '150px',  
                height: '60px',  
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '15px', 
                fontWeight: 'bold',
                fontSize: 'clamp(14px, 2.5vw, 20px)',  
                zIndex: 2
              }}
            >
              {category}
            </div>
          );
        })}

        {/* 矢印 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          zIndex: 0, 
          pointerEvents: 'none',
        }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M 50 5 A 45 45 0 0 1 95 50" fill="none" stroke="gray" strokeWidth="2"/>
            <polygon points="95,50 90,45 90,55" fill="gray"/>
            <path d="M 95 50 A 45 45 0 0 1 50 95" fill="none" stroke="gray" strokeWidth="2"/>
            <polygon points="50,95 55,90 45,90" fill="gray"/>
            <path d="M 50 95 A 45 45 0 0 1 5 50" fill="none" stroke="gray" strokeWidth="2"/>
            <polygon points="5,50 10,55 10,45" fill="gray"/>
            <path d="M 5 50 A 45 45 0 0 1 50 5" fill="none" stroke="gray" strokeWidth="2"/>
            <polygon points="50,5 45,10 55,10" fill="gray"/>
          </svg>
        </div>

        {/* 画像 */}
        <img 
          src="/images/biorhythm.jpg"  
          alt="バイオリズムの画像" 
          style={{
            position: 'absolute', 
            width: '150px',  
            height: '150px',
            borderRadius: '0%',  
            objectFit: 'cover',  
            zIndex: 1 
          }}
        />
      </div>

      {/* 映画ジャンル */}
      <div style={{ marginTop: '40px', textAlign: 'left' }}>
        <h3>おすすめのジャンル</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {movieGenres.map((genre, index) => (
              <tr key={index} style={{ borderBottom: '1px solid gray' }}>
                <td style={{
                  backgroundColor: index === 0 ? 'red' : index === 1 ? 'blue' : index === 2 ? 'gray' : 'lightgray', 
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
