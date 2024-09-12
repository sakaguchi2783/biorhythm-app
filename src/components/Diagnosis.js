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

// 選択肢 (各質問に対して異なる選択肢)
const options = [
  [  // 質問1の選択肢
    { label: 'a) とても安定している', value: '1' },
    { label: 'b) 少し揺れ動いているが、コントロールできる', value: '2' },
    { label: 'c) 感情が不安定である', value: '3' },
    { label: 'd) 非常に不安定で、コントロールが難しい', value: '4' }
  ],
  [  // 質問2の選択肢
    { label: 'a) ほとんど感じない', value: '1' },
    { label: 'b) 時々感じる', value: '2' },
    { label: 'c) 頻繁に感じる', value: '3' },
    { label: 'd) ほぼ常に感じる', value: '4' }
  ],
  [  // 質問3の選択肢
    { label: 'a) とても円滑で、スムーズに交流できている', value: '1' },
    { label: 'b) 時々難しいが、全般的に問題ない', value: '2' },
    { label: 'c) しばしば衝突や誤解がある', value: '3' },
    { label: 'd) 現在、他者とのコミュニケーションが難しいと感じる', value: '4' }
  ],
  [  // 質問4の選択肢
    { label: 'a) まったく感じない', value: '1' },
    { label: 'b) たまに感じる', value: '2' },
    { label: 'c) 頻繁に感じる', value: '3' },
    { label: 'd) ほぼ毎日感じる', value: '4' }
  ],
  [  // 質問5の選択肢
    { label: 'a) 完全にコントロールできている', value: '1' },
    { label: 'b) 大部分はコントロールできている', value: '2' },
    { label: 'c) 時々コントロールが難しい', value: '3' },
    { label: 'd) ほとんどコントロールできていない', value: '4' }
  ],
  [  // 質問6の選択肢
    { label: 'a) まったくない', value: '1' },
    { label: 'b) 少しだけある', value: '2' },
    { label: 'c) かなりの頻度である', value: '3' },
    { label: 'd) すぐ気分が変わってしまう自分に嫌気がさす', value: '4' }
  ],
  [  // 質問7の選択肢
    { label: 'a) 十分に確保できている', value: '1' },
    { label: 'b) 時々確保できている', value: '2' },
    { label: 'c) あまり確保できていない', value: '3' },
    { label: 'd) ほとんど確保できていない', value: '4' }
  ]
];

const Diagnosis = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const navigate = useNavigate();

  // ラジオボタンの選択を処理
  const handleChange = (questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // 診断ロジック: 回答の合計値を計算
    const total = answers.reduce((acc, curr) => acc + Number(curr), 0);
    let result = '';

    if (total <= 7) {
      result = '激しい戦い・復讐劇';
    } else if (total <= 14) {
      result = 'サバイバル系';
    } else if (total <= 21) {
      result = '弱者が強者を打ち負かす';
    } else {
      result = '平和な日常';
    }

    // 結果画面に遷移
    navigate(`/result?result=${result}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>バイオリズム診断</h2>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} style={{ marginBottom: '20px' }}>
          <p>{question}</p>
          {options[questionIndex].map((option, optionIndex) => (
            <label key={optionIndex} style={{ display: 'block', marginBottom: '8px' }}>
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={option.value}
                checked={answers[questionIndex] === option.value}
                onChange={(e) => handleChange(questionIndex, e.target.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>診断結果を見る</button>
    </div>
  );
};

export default Diagnosis;
