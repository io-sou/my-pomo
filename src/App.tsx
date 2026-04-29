import { useState, useEffect } from 'react'

// タイマーの秒数を定数として定義（変更しやすくするため）
const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

function App() {
  const [seconds, setSeconds] = useState<number>(WORK_TIME);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      // タイマーが終了した時の処理
      handleSwitchMode();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // モードを切り替える関数
  const handleSwitchMode = () => {
    const nextMode = mode === 'work' ? 'break' : 'work';
    const nextSeconds = nextMode === 'work' ? WORK_TIME : BREAK_TIME;
    
    setMode(nextMode);
    setSeconds(nextSeconds);
    setIsActive(false); // 切り替え時は一旦停止（自動開始にする場合は true）
    
    alert(nextMode === 'break' ? "お疲れ様です！休憩しましょう。" : "休憩終了！作業開始です。");
  };

  // 時間の表示形式を整える (00:00)
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
      mode === 'work' ? 'bg-red-500' : 'bg-teal-600'
    }`}>
      <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-md shadow-xl text-center">
        <h1 className="text-white text-2xl font-bold mb-4 uppercase tracking-widest">
          {mode === 'work' ? 'Focus Time' : 'Short Break'}
        </h1>
        
        <div className="text-white text-8xl font-mono font-bold mb-8">
          {formatTime(seconds)}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsActive(!isActive)}
            className="bg-white text-gray-800 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all"
          >
            {isActive ? 'PAUSE' : 'START'}
          </button>
          
          <button
            onClick={() => {
              setIsActive(false);
              setSeconds(mode === 'work' ? WORK_TIME : BREAK_TIME);
            }}
            className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-gray-800 transition-all"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;