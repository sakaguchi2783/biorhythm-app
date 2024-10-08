import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 質問内容
const questions = [
  '●『今日、感情的にどれくらい安定していると感じますか？』',
  '●『最近、ストレスや不安をどれくらい感じていますか？』',
  '●『人とのコミュニケーションはどうですか？』',
  '●『最近、自己嫌悪や落ち込みを感じる頻度はどれくらいですか？』',
  '●『自分の感情をコントロールできていると感じますか？』',
  '●『最近、気分が変わりやすいと感じることがありましたか？』',
  '●『リラックスやリフレッシュをする時間は確保できていますか？』'
];

// 各質問に対しての選択肢
const options = [
  [  // 質問1
    { label: 'a) とても安定している', value: '1' },
    { label: 'b) 少し揺れ動いているが、コントロールできる', value: '2' },
    { label: 'c) 感情が不安定である', value: '3' },
    { label: 'd) 非常に不安定で、コントロールが難しい', value: '4' }
  ],
  [  // 質問2
    { label: 'a) ほとんど感じない', value: '1' },
    { label: 'b) 時々感じる', value: '2' },
    { label: 'c) 頻繁に感じる', value: '3' },
    { label: 'd) ほぼ常に感じる', value: '4' }
  ],
  [  // 質問3
    { label: 'a) とても円滑で、スムーズに交流できている', value: '1' },
    { label: 'b) 時々難しいが、全般的に問題ない', value: '2' },
    { label: 'c) しばしば衝突や誤解がある', value: '3' },
    { label: 'd) 現在、他者とのコミュニケーションが難しいと感じる', value: '4' }
  ],
  [  // 質問4
    { label: 'a) まったく感じない', value: '1' },
    { label: 'b) たまに感じる', value: '2' },
    { label: 'c) 頻繁に感じる', value: '3' },
    { label: 'd) ほぼ毎日感じる', value: '4' }
  ],
  [  // 質問5
    { label: 'a) 完全にコントロールできている', value: '1' },
    { label: 'b) 大部分はコントロールできている', value: '2' },
    { label: 'c) 時々コントロールが難しい', value: '3' },
    { label: 'd) ほとんどコントロールできていない', value: '4' }
  ],
  [  // 質問6
    { label: 'a) まったくない', value: '1' },
    { label: 'b) 少しだけある', value: '2' },
    { label: 'c) かなりの頻度である', value: '3' },
    { label: 'd) すぐ気分が変わってしまう自分に嫌気がさす', value: '4' }
  ],
  [  // 質問7
    { label: 'a) 十分に確保できている', value: '1' },
    { label: 'b) 時々確保できている', value: '2' },
    { label: 'c) あまり確保できていない', value: '3' },
    { label: 'd) ほとんど確保できていない', value: '4' }
  ]
];

const Diagnosis = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill('')); // 回答を初期化
  const navigate = useNavigate();

  // ラジオボタンの選択を処理
  const handleChange = (questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  // 診断結果を計算し、ページ遷移
  const handleSubmit = () => {
    const total = answers.reduce((acc, curr) => acc + Number(curr), 0); // 合計スコアを計算
    let result = '';

    // 合計値に基づいて診断結果を設定
    if (total <= 7) {
      result = '戦争・復讐劇 系';
    } else if (total <= 14) {
      result = '戦後サバイバル系';
    } else if (total <= 21) {
      result = '弱者が強者を倒す系';
    } else {
      result = '平和な日常系';
    }

    // 結果画面に遷移
    navigate(`/result?result=${result}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>バイオリズム診断（７つの質問に応えて下さい）</h2>

      {questions.map((question, questionIndex) => (
        <div key={questionIndex} style={{ 
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa', // カード風の背景色
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' // カードに影を追加
        }}>
          {/* 質問部分 */}
          <p style={{ fontWeight: 'bold', fontSize: 'clamp(14px, 2vw, 18px)', marginBottom: '10px' }}>
            {question}
          </p>

          {/* 回答選択肢部分 */}
          <div>
            {options[questionIndex].map((option, optionIndex) => (
              <label key={optionIndex} style={{ 
                display: 'block', 
                marginBottom: '10px',
                padding: '10px', 
                backgroundColor: '#ffffff', 
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease', // ホバー時の背景色変更
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={option.value}
                  checked={answers[questionIndex] === option.value}
                  onChange={(e) => handleChange(questionIndex, e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={handleSubmit} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' // ボタンの影
          }}
        >
          診断結果を見る
        </button>
      </div>
    </div>
  );
};

export default Diagnosis;
