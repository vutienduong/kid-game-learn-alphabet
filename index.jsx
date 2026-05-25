import React, { useState, useEffect, useRef } from 'react';

const alphabetData = [
  { letter: 'A', lower: 'a', phonic: 'a', word: 'Cái Áo', emoji: '🧥', sentence: 'Bé có cái áo mới màu vàng.' },
  { letter: 'Ă', lower: 'ă', phonic: 'á', word: 'Cái Khăn', emoji: '🧣', sentence: 'Mẹ lau mặt cho bé bằng khăn sạch.' },
  { letter: 'Â', lower: 'â', phonic: 'ớ', word: 'Quả Mận', emoji: '🍑', sentence: 'Quả mận chín ngọt lịm ngọt ngào.' },
  { letter: 'B', lower: 'b', phonic: 'bờ', word: 'Con Bò', emoji: '🐂', sentence: 'Con bò ăn cỏ ngoài đồng xanh.' },
  { letter: 'C', lower: 'c', phonic: 'cờ', word: 'Con Cá', emoji: '🐟', sentence: 'Con cá bơi lội dưới hồ nước.' },
  { letter: 'D', lower: 'd', phonic: 'dờ', word: 'Con Dê', emoji: '🐐', sentence: 'Con dê non nhảy nhót trên đồi.' },
  { letter: 'Đ', lower: 'đ', phonic: 'đờ', word: 'Cái Đàn', emoji: '🎸', sentence: 'Bố gảy đàn cho cả nhà nghe.' },
  { letter: 'E', lower: 'e', phonic: 'e', word: 'Em Bé', emoji: '👶', sentence: 'Em bé cười hớn hở chào mẹ.' },
  { letter: 'Ê', lower: 'ê', phonic: 'ê', word: 'Con Bê', emoji: '🐃', sentence: 'Con bê vàng đi theo mẹ ăn cỏ.' },
  { letter: 'G', lower: 'g', phonic: 'gờ', word: 'Con Gà', emoji: '🐓', sentence: 'Con gà gáy ò ó o chào ngày mới.' },
  { letter: 'H', lower: 'h', phonic: 'hờ', word: 'Hoa Hồng', emoji: '🌹', sentence: 'Bông hoa hồng đỏ thắm thơm ngát.' },
  { letter: 'I', lower: 'i', phonic: 'i', word: 'Viên Bi', emoji: '🔮', sentence: 'Bé chơi bắn bi tròn xoe cùng bạn.' },
  { letter: 'K', lower: 'k', phonic: 'cờ', word: 'Cái Kéo', emoji: '✂️', sentence: 'Bé dùng cái kéo nhựa cắt giấy.' },
  { letter: 'L', lower: 'l', phonic: 'lờ', word: 'Quả Lê', emoji: '🍐', sentence: 'Quả lê ngọt mát lành và nhiều nước.' },
  { letter: 'M', lower: 'm', phonic: 'mờ', word: 'Con Mèo', emoji: '🐱', sentence: 'Con mèo mướp ngủ ngoan trong nắng.' },
  { letter: 'N', lower: 'n', phonic: 'nờ', word: 'Quả Na', emoji: '🍈', sentence: 'Quả na mở mắt thơm lừng cả phòng.' },
  { letter: 'O', lower: 'o', phonic: 'o', word: 'Con Ong', emoji: '🐝', sentence: 'Con ong chăm chỉ bay đi tìm mật.' },
  { letter: 'Ô', lower: 'ô', phonic: 'ô', word: 'Cái Ô', emoji: '☂️', sentence: 'Bé che chiếc ô hồng đi dưới mưa.' },
  { letter: 'Ơ', lower: 'ơ', phonic: 'ơ', word: 'Lá Cờ', emoji: '🚩', sentence: 'Lá cờ đỏ sao vàng bay phấp phới.' },
  { letter: 'P', lower: 'p', phonic: 'pờ', word: 'Đèn Pin', emoji: '🔦', sentence: 'Bố bật đèn pin khi trời tối.' },
  { letter: 'Q', lower: 'q', phonic: 'quờ', word: 'Quả Quýt', emoji: '🍊', sentence: 'Quả quýt có vị chua chua ngọt ngọt.' },
  { letter: 'R', lower: 'r', phonic: 'rờ', word: 'Con Rùa', emoji: '🐢', sentence: 'Con rùa bò chậm rãi tìm thức ăn.' },
  { letter: 'S', lower: 's', phonic: 'sờ', word: 'Ngôi Sao', emoji: '⭐', sentence: 'Ngôi sao lấp lánh trên trời đêm.' },
  { letter: 'T', lower: 't', phonic: 'tờ', word: 'Quả Táo', emoji: '🍎', sentence: 'Bé rất thích ăn quả táo đỏ giòn.' },
  { letter: 'U', lower: 'u', phonic: 'u', word: 'Con Cú', emoji: '🦉', sentence: 'Con cú mèo mở to mắt trong đêm.' },
  { letter: 'Ư', lower: 'ư', phonic: 'ư', word: 'Sư Tử', emoji: '🦁', sentence: 'Sư tử dũng mãnh là chúa sơn lâm.' },
  { letter: 'V', lower: 'v', phonic: 'vờ', word: 'Con Voi', emoji: '🐘', sentence: 'Con voi có chiếc vòi dài tinh nghịch.' },
  { letter: 'X', lower: 'x', phonic: 'xờ', word: 'Xe Đạp', emoji: '🚲', sentence: 'Bé tập đi xe đạp nhỏ ở sân trường.' },
  { letter: 'Y', lower: 'y', phonic: 'i', word: 'Cái Yếm', emoji: '🎽', sentence: 'Mẹ đeo yếm xinh cho bé ăn dặm.' }
];

const complexConsonants = ['ch', 'gh', 'kh', 'nh', 'ph', 'th', 'tr', 'ng', 'ngh'];
const complexRhymes = ['anh', 'ach', 'oanh', 'uyên', 'oang', 'uông', 'iêng', 'ương', 'oanh', 'uynh'];

const toneList = [
  { name: 'Không dấu', symbol: '◌', sound: 'ngang', icon: '⚪', example: 'ba' },
  { name: 'Dấu Huyền', symbol: '◌̀', sound: 'huyền', icon: '📉', example: 'bà' },
  { name: 'Dấu Sắc', symbol: '◌́', sound: 'sắc', icon: '📈', example: 'bá' },
  { name: 'Dấu Hỏi', symbol: '◌̉', sound: 'hỏi', icon: '❓', example: 'bả' },
  { name: 'Dấu Ngã', symbol: '◌̃', sound: 'ngã', icon: '〰️', example: 'bã' },
  { name: 'Dấu Nặng', symbol: '◌̣', sound: 'nặng', icon: '⚫', example: 'bạ' }
];

const vowelTones = {
  'a': ['a', 'à', 'á', 'ả', 'ã', 'ạ'],
  'e': ['e', 'è', 'é', 'ẻ', 'ẽ', 'ẹ'],
  'ê': ['ê', 'ề', 'ế', 'ể', 'ễ', 'ệ'],
  'i': ['i', 'ì', 'í', 'ỉ', 'ĩ', 'ị'],
  'o': ['o', 'ò', 'ó', 'ỏ', 'õ', 'ọ'],
  'ô': ['ô', 'ồ', 'ố', 'ổ', 'ỗ', 'ộ'],
  'ơ': ['ơ', 'ờ', 'ớ', 'ở', 'ỡ', 'ợ'],
  'u': ['u', 'ù', 'ú', 'ủ', 'ũ', 'ụ'],
  'ư': ['ư', 'ừ', 'ứ', 'ử', 'ữ', 'ự'],
  'y': ['y', 'ỳ', 'ý', 'ỷ', 'ỹ', 'ỵ']
};

const mascots = {
  bee: {
    name: 'Chị Ong Vàng 🐝',
    themeBg: 'bg-amber-50',
    primary: 'bg-amber-400 hover:bg-amber-500 text-amber-950',
    border: 'border-amber-300',
    accentBg: 'bg-amber-100',
    textColor: 'text-amber-900',
    avatar: '🐝',
    greeting: 'Chào bé yêu! Tớ là Ong Vàng chăm học. Chúng ta cùng vượt thử thách nhé!'
  },
  dino: {
    name: 'Khủng Long Con 🦖',
    themeBg: 'bg-emerald-50',
    primary: 'bg-emerald-400 hover:bg-emerald-500 text-emerald-950',
    border: 'border-emerald-300',
    accentBg: 'bg-emerald-100',
    textColor: 'text-emerald-900',
    avatar: '🦖',
    greeting: 'Chào bạn nhỏ! Cùng tớ luyện đọc to và chăm sóc bạn thú cưng nào!'
  }
};

const readingLessons = [
  { id: 1, title: 'Bài 1: Bé ở quê', emoji: '🏡', sentence: 'Quê bé có bờ đê xanh dìu dịu.' },
  { id: 2, title: 'Bài 2: Chú gà nhà ta', emoji: '🐓', sentence: 'Chú gà trống gáy vang cả xóm nhỏ.' },
  { id: 3, title: 'Bài 3: Trái khế ngon', emoji: '🌟', sentence: 'Khỉ con đu cành bẻ quả khế chín ngọt.' }
];

export default function App() {
  // Tabs: 'alphabet' | 'spelling' | 'sentences' | 'game' | 'pet' | 'parents'
  const [activeTab, setActiveTab] = useState('alphabet');
  const [selectedMascot, setSelectedMascot] = useState('bee');
  const [stars, setStars] = useState(15); // Bắt đầu tặng bé ít sao để trải nghiệm đổi quà nuôi thú
  const [userName, setUserName] = useState('Bé Yêu');
  const [showConfetti, setShowConfetti] = useState(false);

  // States giọng nói
  const [useCloudVoice, setUseCloudVoice] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);

  // States Tab 1 (Học chữ + Vẽ + Đọc To AI)
  const [selectedLetter, setSelectedLetter] = useState(alphabetData[0]);
  const [showWritingModal, setShowWritingModal] = useState(false);
  const [speechResult, setSpeechResult] = useState({ active: false, status: '', text: '' });

  // Canvas Refs cho bảng vẽ
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // States Tab 2 (Ghép vần nâng cao)
  const [useAdvancedSpelling, setUseAdvancedSpelling] = useState(false);
  const [selectedConsonant, setSelectedConsonant] = useState('b');
  const [selectedVowel, setSelectedVowel] = useState('a');
  const [selectedTone, setSelectedTone] = useState(0);
  const [spellingStage, setSpellingStage] = useState('idle');
  const [isSpelling, setIsSpelling] = useState(false);

  // States Tab 3 (Trò chơi đập chuột chũi mới)
  const [gameMode, setGameMode] = useState('quiz'); // 'quiz' | 'whack'
  const [gameScore, setGameScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gameFeedback, setGameFeedback] = useState({ show: false, correct: false, text: '' });
  
  // Whack-a-mole game states
  const [whackTarget, setWhackTarget] = useState('');
  const [moles, setMoles] = useState([
    { id: 0, letter: 'A', active: false },
    { id: 1, letter: 'B', active: false },
    { id: 2, letter: 'C', active: false },
    { id: 3, letter: 'D', active: false }
  ]);
  const [whackMessage, setWhackMessage] = useState('Hãy bấm "Bắt đầu chơi" để đập chuột chũi nhé!');
  const [whackIsPlaying, setWhackIsPlaying] = useState(false);

  // States Tab 4 (Nuôi thú cưng thông minh)
  const [petHappiness, setPetHappiness] = useState(40);
  const [petStage, setPetStage] = useState('egg'); // 'egg' | 'baby' | 'grown'
  const [petInteractiveMessage, setPetInteractiveMessage] = useState('Tớ đang là quả trứng nhỏ. Hãy cho tớ ăn táo để nở ra nhé!');

  // States Tab 5 (Góc Phụ huynh & Bảo mật toán)
  const [isParentUnlocked, setIsParentUnlocked] = useState(false);
  const [parentMathQuiz, setParentMathQuiz] = useState({ q: '', a: 0 });
  const [parentMathInput, setParentMathInput] = useState('');
  const [parentTimeLimit, setParentTimeLimit] = useState(0); // 0: không khóa, 10, 20, 30 phút
  const [timeLeft, setTimeLeft] = useState(0);
  const [appIsBlocked, setAppIsBlocked] = useState(false);
  const [studyLogs, setStudyLogs] = useState([]); // Ghi nhận lỗi phát âm của bé để phụ huynh theo dõi

  useEffect(() => {
    // 1. Load Voices
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        const hasVi = voices.some(v => v.lang.includes('vi'));
        if (!hasVi) setUseCloudVoice(true);
      }
    };
    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // 2. Load LocalStorage
    const savedStars = localStorage.getItem('be_tap_doc_stars_v2');
    if (savedStars) setStars(parseInt(savedStars));
    const savedPet = localStorage.getItem('be_tap_doc_pet');
    if (savedPet) setPetStage(savedPet);
    const savedLogs = localStorage.getItem('be_tap_doc_logs');
    if (savedLogs) setStudyLogs(JSON.parse(savedLogs));
  }, []);

  // Bộ đếm thời gian hạn chế thời lượng chơi của trẻ
  useEffect(() => {
    let interval = null;
    if (parentTimeLimit > 0 && timeLeft > 0 && !appIsBlocked) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setAppIsBlocked(true);
            speakText("Bé ơi, mắt đã mệt rồi. Chúng mình cùng nghỉ ngơi một chút nhé!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [parentTimeLimit, timeLeft, appIsBlocked]);

  const updateStars = (amount) => {
    const newStars = Math.max(0, stars + amount);
    setStars(newStars);
    localStorage.setItem('be_tap_doc_stars_v2', newStars.toString());
  };

  const addStudyLog = (type, detail) => {
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      type, // 'pronunciation_error' | 'writing' | 'correct_answer'
      detail
    };
    const updated = [newLog, ...studyLogs].slice(0, 30);
    setStudyLogs(updated);
    localStorage.setItem('be_tap_doc_logs', JSON.stringify(updated));
  };

  const speakTextLocal = (text, rate = 0.8) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const viVoice = availableVoices.find(v => v.lang.includes('vi-VN') || v.lang.toLowerCase().startsWith('vi'));
      if (viVoice) utterance.voice = viVoice;
      utterance.lang = 'vi-VN';
      utterance.rate = rate;
      utterance.pitch = 1.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakText = (text, rate = 0.8) => {
    speakTextLocal(text, rate);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const speakTextPromise = (text, rate = 0.8) => {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const viVoice = availableVoices.find(v => v.lang.includes('vi-VN') || v.lang.toLowerCase().startsWith('vi'));
      if (viVoice) utterance.voice = viVoice;
      utterance.lang = 'vi-VN';
      utterance.rate = rate;
      utterance.pitch = 1.3;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  };

  const playSoundEffect = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (type === 'success') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + index * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + index * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + index * 0.1);
          osc.stop(ctx.currentTime + index * 0.1 + 0.4);
        });
      } else if (type === 'fail') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechResult({
        active: true,
        status: 'error',
        text: 'Micro nhận diện giọng nói không được hỗ trợ trên thiết bị này. Hãy dùng trình duyệt Google Chrome hoặc Apple Safari nhé!'
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setSpeechResult({ active: true, status: 'listening', text: 'Bé hãy nói thật to rõ chữ cái hoặc từ minh họa đi nào! 🎤' });
    recognition.start();

    recognition.onresult = (event) => {
      const resultText = event.results[0][0].transcript.toLowerCase().trim();
      const targetText = selectedLetter.letter.toLowerCase();
      const targetWord = selectedLetter.word.toLowerCase();

      // So khớp từ khóa gần nhất
      if (resultText.includes(targetText) || resultText.includes(targetWord) || resultText.includes(selectedLetter.phonic.toLowerCase())) {
        playSoundEffect('success');
        updateStars(1);
        setSpeechResult({
          active: true,
          status: 'success',
          text: `Tuyệt vời quá! Bé phát âm rất chuẩn: "${resultText.toUpperCase()}"! Tặng bé 1 sao 🌟!`
        });
        addStudyLog('pronunciation_success', `Đọc đúng âm "${selectedLetter.letter}"`);
      } else {
        playSoundEffect('fail');
        setSpeechResult({
          active: true,
          status: 'fail',
          text: `Ồ bé đọc nghe gần giống: "${resultText.toUpperCase()}". Bé hãy bấm micro và đọc lại rõ chữ "${selectedLetter.letter}" nhé!`
        });
        addStudyLog('pronunciation_error', `Đọc nhầm chữ "${selectedLetter.letter}" thành "${resultText}"`);
      }
    };

    recognition.onerror = () => {
      setSpeechResult({ active: true, status: 'error', text: 'Tớ chưa nghe thấy tiếng bé nói. Bé hãy thử lại và bấm đồng ý cho trình duyệt thu âm nhé!' });
    };
  };

  const openWritingBoard = () => {
    setShowWritingModal(true);
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Vẽ dòng kẻ ô ly xanh lá cây học sinh tiểu học
        ctx.strokeStyle = '#86efac';
        ctx.lineWidth = 1;
        // Dòng kẻ ngang ô ly
        for (let i = 0; i < canvas.height; i += 40) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
          ctx.stroke();
        }
        // Dòng kẻ dọc ô ly
        for (let j = 0; j < canvas.width; j += 40) {
          ctx.beginPath();
          ctx.moveTo(j, 0);
          ctx.lineTo(j, canvas.height);
          ctx.stroke();
        }

        // Vẽ chữ mờ làm mẫu cho bé tô theo
        ctx.font = 'bold 260px sans-serif';
        ctx.fillStyle = 'rgba(156, 163, 175, 0.25)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(selectedLetter.letter, canvas.width / 2, canvas.height / 2);
      }
    }, 200);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    setIsDrawing(true);
    
    // Tự động nhận diện toạ độ chuột hoặc toạ độ ngón tay (Touch)
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#f43f5e'; // Màu phấn viết tươi sáng
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSpellingProcess = async () => {
    if (isSpelling) return;
    setIsSpelling(true);

    const phonicC = complexConsonants.includes(selectedConsonant) ? selectedConsonant : (alphabetData.find(item => item.letter.toLowerCase() === selectedConsonant)?.phonic || selectedConsonant);
    const phonicV = complexRhymes.includes(selectedVowel) ? selectedVowel : (alphabetData.find(item => item.letter.toLowerCase() === selectedVowel)?.phonic || selectedVowel);
    
    const baseCombined = selectedConsonant + selectedVowel;
    
    // Tạo từ hoàn chỉnh tuỳ thuộc vào việc có dùng dấu thanh hay không
    let finalWord = baseCombined;
    if (vowelTones[selectedVowel]) {
      const accentedVowel = vowelTones[selectedVowel][selectedTone];
      finalWord = selectedConsonant + accentedVowel;
    }
    const toneObj = toneList[selectedTone];

    try {
      setSpellingStage('consonant');
      await speakTextPromise(phonicC, 0.65);
      await sleep(200);

      setSpellingStage('vowel');
      await speakTextPromise(phonicV, 0.65);
      await sleep(200);

      setSpellingStage('base');
      await speakTextPromise(baseCombined, 0.65);
      await sleep(300);

      if (selectedTone > 0) {
        setSpellingStage('tone');
        await speakTextPromise(toneObj.sound, 0.65);
        await sleep(200);

        setSpellingStage('final');
        await speakTextPromise(finalWord, 0.6);
      } else {
        setSpellingStage('final');
        await speakTextPromise(baseCombined, 0.6);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSpellingStage('idle');
      setIsSpelling(false);
    }
  };

  const generateNewQuestion = () => {
    setGameFeedback({ show: false, correct: false, text: '' });
    const types = ['listen-letter', 'word-to-pic', 'fill-blank'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    if (randomType === 'listen-letter') {
      const correctItem = alphabetData[Math.floor(Math.random() * alphabetData.length)];
      const incorrects = alphabetData
        .filter(item => item.letter !== correctItem.letter)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const options = [correctItem, ...incorrects]
        .sort(() => 0.5 - Math.random())
        .map(item => item.letter);

      setCurrentQuestion({
        type: randomType,
        title: 'Bé Lắng Nghe & Tìm Chữ',
        speechPrompt: `Bé hãy tìm chữ ${correctItem.phonic} nào!`,
        displayPrompt: `Bé ơi, hãy tìm chữ có âm phát là: "${correctItem.phonic.toUpperCase()}"`,
        correctAnswer: correctItem.letter,
        options
      });
      setTimeout(() => speakText(`Bé hãy tìm chữ ${correctItem.phonic}!`), 350);
      return;
    }

    if (randomType === 'word-to-pic') {
      const correctItem = alphabetData[Math.floor(Math.random() * alphabetData.length)];
      const incorrects = alphabetData
        .filter(item => item.emoji !== correctItem.emoji)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      const options = [correctItem, ...incorrects]
        .sort(() => 0.5 - Math.random())
        .map(item => item.emoji);

      setCurrentQuestion({
        type: randomType,
        title: 'Bé Đọc Chữ Chọn Hình',
        speechPrompt: `Tìm hình vẽ thích hợp với từ: ${correctItem.word}`,
        displayPrompt: `Hình vẽ nào phù hợp nhất với từ: "${correctItem.word.toUpperCase()}"?`,
        correctAnswer: correctItem.emoji,
        options
      });
      setTimeout(() => speakText(`Hình vẽ nào phù hợp nhất với từ ${correctItem.word} hả bé?`), 350);
      return;
    }

    const candidates = alphabetData.filter(item => item.word.split(' ').length === 2 && item.word.startsWith('C'));
    const chosenItem = candidates.length > 0
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : alphabetData[3];
    const words = chosenItem.word.split(' ');
    const missingLetter = chosenItem.letter;
    const displayBlank = `${words[0]} _${words[1].substring(1)}`;
    const incorrects = alphabetData
      .filter(item => item.letter !== missingLetter)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    setCurrentQuestion({
      type: randomType,
      title: 'Nhà Thông Thái Nhỏ: Điền Chữ',
      speechPrompt: 'Bé hãy chọn chữ cái thích hợp điền vào chỗ trống',
      displayPrompt: `Điền chữ cái còn thiếu để tạo thành từ: "${chosenItem.word}"`,
      displayBlank,
      hintEmoji: chosenItem.emoji,
      correctAnswer: missingLetter,
      options: [missingLetter, ...incorrects.map(item => item.letter)].sort(() => 0.5 - Math.random())
    });
    setTimeout(() => speakText(`Hãy điền chữ cái còn thiếu của từ ${chosenItem.word} nhé!`), 350);
  };

  const handleAnswerSubmit = (option) => {
    if (!currentQuestion || gameFeedback.show) return;

    if (option === currentQuestion.correctAnswer) {
      playSoundEffect('success');
      setGameScore(prev => prev + 1);
      updateStars(1);
      setGameFeedback({
        show: true,
        correct: true,
        text: 'Tuyệt vời quá! Bé trả lời chính xác rồi! Tặng bé 1 sao vàng nhé! 🌟'
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
      addStudyLog('correct_answer', `Trả lời đúng câu hỏi "${currentQuestion.title}"`);
      speakText('Ồ de! Bé thật là giỏi!');
    } else {
      playSoundEffect('fail');
      setGameFeedback({
        show: true,
        correct: false,
        text: `Chưa chính xác rồi. Đáp án đúng là "${currentQuestion.correctAnswer}". Bé thử câu tiếp theo nhé!`
      });
      speakText('Chưa đúng rồi bé ơi, mình thử câu khác nhé!');
    }
  };

  useEffect(() => {
    if (activeTab === 'game' && gameMode === 'quiz' && !currentQuestion) {
      generateNewQuestion();
    }
  }, [activeTab, gameMode, currentQuestion]);

  const startWhackGame = () => {
    setWhackIsPlaying(true);
    setGameScore(0);
    nextWhackTurn();
  };

  const nextWhackTurn = () => {
    // 1. Chọn một chữ cái ngẫu nhiên làm đích đến
    const randomLetterObj = alphabetData[Math.floor(Math.random() * alphabetData.length)];
    const target = randomLetterObj.letter;
    setWhackTarget(target);
    setWhackMessage(`Bé ơi! Hãy tìm và đập nhanh chú chuột chũi mang chữ: "${target}"!`);
    speakText(`Tìm chữ ${randomLetterObj.phonic} cho tớ nhé!`);

    // 2. Phân bổ chữ cái cho các chú chuột, trong đó có một chú chuột chắc chắn mang chữ đúng
    const otherLetters = alphabetData.filter(l => l.letter !== target).sort(() => 0.5 - Math.random()).slice(0, 3).map(l => l.letter);
    const lettersPool = [target, ...otherLetters].sort(() => 0.5 - Math.random());

    // 3. Cho các con chuột nhô lên ngẫu nhiên
    const newMoles = moles.map((m, idx) => ({
      ...m,
      letter: lettersPool[idx],
      active: Math.random() > 0.35 // Ngẫu nhiên nhô lên hay không
    }));
    
    // Đảm bảo tối thiểu có một con mang chữ đúng nhô lên
    const correctMoleIndex = newMoles.findIndex(m => m.letter === target);
    if (correctMoleIndex !== -1) {
      newMoles[correctMoleIndex].active = true;
    }

    setMoles(newMoles);
  };

  const handleWhackMole = (mole) => {
    if (!whackIsPlaying) return;

    if (mole.letter === whackTarget) {
      playSoundEffect('success');
      setGameScore(prev => prev + 1);
      updateStars(1);
      setWhackMessage('Tuyệt vời! Bé đập rất chuẩn! Cộng cho bé 1 sao vàng 🌟!');
      nextWhackTurn();
    } else {
      playSoundEffect('fail');
      setWhackMessage('Ồ, nhầm chú chuột chũi rồi bé ơi! Hãy nhìn kỹ lại xem nào.');
      speakText('Chưa đúng rồi bé ơi!');
    }
  };

  const playWithPet = (action) => {
    if (action === 'feed-apple') {
      if (stars < 3) {
        speakText('Bé cần đạt thêm sao bằng cách luyện chữ để mua táo cho tớ nhé!');
        return;
      }
      updateStars(-3);
      setPetHappiness(prev => Math.min(100, prev + 25));
      playSoundEffect('success');
      
      if (petStage === 'egg' && petHappiness + 25 >= 80) {
        setPetStage('baby');
        localStorage.setItem('be_tap_doc_pet', 'baby');
        setPetInteractiveMessage('Oa! Tớ đã nứt vỏ nở thành chú Khủng Long Sơ Sinh siêu đáng yêu rồi đây! 🦖');
        speakText('Ôi! Khủng long con nở rồi!');
      } else {
        setPetInteractiveMessage('Yăm yăm! Quả táo ngọt lịm ngọt ngào quá! Cảm ơn bạn nhỏ nhé!');
        speakText('Ngon tuyệt bé ơi!');
      }
    } else if (action === 'feed-candy') {
      if (stars < 5) {
        speakText('Tớ cần 5 sao để đổi kẹo cầu vồng cơ.');
        return;
      }
      updateStars(-5);
      setPetHappiness(prev => Math.min(100, prev + 40));
      playSoundEffect('success');

      if (petStage === 'baby' && petHappiness + 40 >= 90) {
        setPetStage('grown');
        localStorage.setItem('be_tap_doc_pet', 'grown');
        setPetInteractiveMessage('Vô địch! Tớ đã lớn phổng phao và sẵn sàng đi học lớp một cùng bạn rồi! 🎒🦖');
        speakText('Khủng long đã lớn phổng phao!');
      } else {
        setPetInteractiveMessage('Kẹo dẻo ngọt ngào làm tớ muốn bay lên bầu trời luôn! Cảm ơn bé nha!');
        speakText('Kẹo ngọt quá!');
      }
    }
  };

  const tryOpenParentsTab = () => {
    const num1 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * 7) + 2;
    setParentMathQuiz({ q: `${num1} + ${num2}`, a: num1 + num2 });
    setParentMathInput('');
    setIsParentUnlocked(false);
    setActiveTab('parents');
  };

  const verifyParentPass = (e) => {
    e.preventDefault();
    if (parseInt(parentMathInput) === parentMathQuiz.a) {
      setIsParentUnlocked(true);
      playSoundEffect('success');
      speakText("Xin chào ba mẹ!");
    } else {
      playSoundEffect('fail');
      speakText("Chưa đúng rồi ạ!");
    }
  };

  const setScreenTimeLimit = (minutes) => {
    setParentTimeLimit(minutes);
    setTimeLeft(minutes * 60);
    setAppIsBlocked(false);
    speakText(`Đã đặt giờ sử dụng là ${minutes} phút`);
  };

  // Tránh hiển thị linh vật trống khi lỗi tên thuộc tính
  const theme = mascots[selectedMascot] || mascots['bee'];

  useEffect(() => {
    window.render_game_to_text = () => JSON.stringify({
      mode: activeTab,
      mascot: selectedMascot,
      stars,
      userName,
      screenTime: {
        limitMinutes: parentTimeLimit,
        timeLeft,
        blocked: appIsBlocked
      },
      alphabet: {
        selectedLetter: selectedLetter.letter,
        selectedWord: selectedLetter.word,
        writingBoardOpen: showWritingModal,
        speechResult
      },
      spelling: {
        advanced: useAdvancedSpelling,
        consonant: selectedConsonant,
        vowel: selectedVowel,
        tone: toneList[selectedTone].name,
        stage: spellingStage,
        isSpelling,
        finalText: `${selectedConsonant}${vowelTones[selectedVowel] ? vowelTones[selectedVowel][selectedTone] : selectedVowel}`
      },
      game: {
        mode: gameMode,
        score: gameScore,
        quiz: currentQuestion ? {
          type: currentQuestion.type,
          title: currentQuestion.title,
          prompt: currentQuestion.displayPrompt,
          options: currentQuestion.options,
          feedback: gameFeedback
        } : null,
        whack: {
          target: whackTarget,
          message: whackMessage,
          isPlaying: whackIsPlaying,
          moles
        }
      },
      pet: {
        stage: petStage,
        happiness: petHappiness,
        message: petInteractiveMessage
      },
      parents: {
        unlocked: isParentUnlocked,
        quiz: parentMathQuiz.q,
        logsCount: studyLogs.length
      }
    });

    if (typeof window.advanceTime !== 'function') {
      window.advanceTime = () => Promise.resolve();
    }

    return () => {
      delete window.render_game_to_text;
    };
  }, [
    activeTab,
    selectedMascot,
    stars,
    userName,
    parentTimeLimit,
    timeLeft,
    appIsBlocked,
    selectedLetter,
    showWritingModal,
    speechResult,
    useAdvancedSpelling,
    selectedConsonant,
    selectedVowel,
    selectedTone,
    spellingStage,
    isSpelling,
    gameMode,
    gameScore,
    currentQuestion,
    gameFeedback,
    whackTarget,
    whackMessage,
    whackIsPlaying,
    moles,
    petStage,
    petHappiness,
    petInteractiveMessage,
    isParentUnlocked,
    parentMathQuiz,
    studyLogs
  ]);

  return (
    <div className={`min-h-screen ${theme.themeBg} transition-all duration-500 pb-24 font-sans select-none relative overflow-x-hidden bg-[radial-gradient(#fed7aa_1px,transparent_1px)] [background-size:24px_24px]`}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 36 }).map((_, index) => (
            <div
              key={index}
              className="absolute top-[-20px] h-3 w-3 rounded-full bg-yellow-400 opacity-90 animate-confetti-fall"
              style={{
                left: `${(index * 29) % 100}%`,
                animationDelay: `${(index % 9) * 0.08}s`,
                backgroundColor: ['#facc15', '#38bdf8', '#fb7185', '#34d399', '#a78bfa'][index % 5]
              }}
            />
          ))}
        </div>
      )}
      
      {/* KHÓA BẢO VỆ MẮT (SCREEN-TIME LIMIT BLOCKER) */}
      {appIsBlocked && (
        <div className="fixed inset-0 bg-orange-950/95 z-50 flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="text-9xl animate-bounce">🦖💤</div>
          <h2 className="text-4xl font-extrabold mt-6 text-orange-400">ĐẾN GIỜ NGHỈ NGƠI RỒI!</h2>
          <p className="text-lg max-w-md mt-4 text-orange-100 font-semibold">
            Ba mẹ đã hẹn giờ để bảo vệ đôi mắt sáng của bé. Bé hãy đứng lên chạy nhảy hoặc nhìn ra cửa sổ xanh mát một chút nhé!
          </p>
          <button
            onClick={() => {
              setAppIsBlocked(false);
              setParentTimeLimit(0);
            }}
            className="mt-8 px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-2xl font-black text-white shadow-xl transform active:scale-95 transition-all text-sm"
          >
            🔓 Mở khóa cho ba mẹ (Cần cài đặt lại)
          </button>
        </div>
      )}

      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white border-4 border-dashed border-orange-300 rounded-3xl p-4 shadow-xl gap-4">
          
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-bounce">🎒</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-orange-600 tracking-wide drop-shadow-sm font-sans">
                BÉ VUI HỌC CHỮ
              </h1>
              <p className="text-xs text-gray-500 font-bold">App Tập Đọc Lớp 1 Dành Cho Bé Yêu</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 bg-orange-100 p-2 rounded-2xl">
            <span className="text-xs font-bold text-orange-800 px-1">Linh vật:</span>
            {Object.keys(mascots).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedMascot(key);
                  speakText(`Xin chào, tớ là ${mascots[key].name}. Chúng mình cùng chơi nhé!`);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all transform active:scale-95 ${
                  selectedMascot === key 
                    ? 'bg-orange-500 text-white shadow-md scale-105' 
                    : 'bg-white text-orange-800 hover:bg-orange-50'
                }`}
              >
                <span>{mascots[key].avatar}</span>
                <span>{mascots[key].name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-yellow-100 border-2 border-yellow-300 px-4 py-2 rounded-2xl shadow-inner animate-pulse">
            <span className="text-3xl">⭐</span>
            <div className="text-left">
              <div className="text-xs font-black text-yellow-800 leading-tight">SAO CỦA BÉ</div>
              <div className="text-xl font-extrabold text-yellow-900 leading-none">{stars} sao</div>
            </div>
          </div>
        </div>
      </header>

      {/* LỜI CHÀO MASCOT */}
      <section className="max-w-6xl mx-auto px-4 my-3">
        <div className={`flex items-start gap-4 p-4 rounded-2xl border-2 ${theme.border} ${theme.accentBg} shadow-sm`}>
          <div className="text-4xl animate-float-slow">{theme.avatar}</div>
          <div>
            <div className={`font-bold text-sm ${theme.textColor}`}>{theme.name} gợi ý:</div>
            <p className="text-base text-gray-700 font-semibold">{theme.greeting}</p>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4">
        
        {/* ======================================= */}
        {/* TAB 1: BẢNG CHỮ CÁI + VẼ + ĐỌC TO AI */}
        {/* ======================================= */}
        {activeTab === 'alphabet' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Cột Trái: Bảng 29 chữ cái */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border-4 border-orange-200 shadow-xl">
              <h3 className="text-xl font-black text-orange-600 mb-4 flex items-center gap-2">
                <span>🔤</span> Bảng Chữ Cái Tiếng Việt
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-3">
                {alphabetData.map((item) => (
                  <button
                    key={item.letter}
                    onClick={() => {
                      setSelectedLetter(item);
                      speakText(item.letter.toLowerCase());
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all transform active:scale-90 hover:scale-105 shadow-sm ${
                      selectedLetter.letter === item.letter
                        ? `${theme.primary} border-transparent scale-105 font-black ring-4 ring-orange-200`
                        : 'bg-orange-50/50 border-orange-100 text-orange-950 hover:bg-orange-100/50'
                    }`}
                  >
                    <span className="text-2xl font-black">{item.letter}</span>
                    <span className="text-xs font-semibold text-gray-400">{item.lower}</span>
                  </button>
                ))}
              </div>

              {/* Bảng Dấu Thanh */}
              <h3 className="text-xl font-black text-sky-600 mt-6 mb-4 flex items-center gap-2">
                <span>🎨</span> Học 5 Thanh Điệu
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {toneList.map((tone) => (
                  <button
                    key={tone.name}
                    onClick={() => speakText(tone.sound)}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-sky-100 bg-sky-50/50 hover:bg-sky-100/50 hover:scale-105 transition-all text-sky-950"
                  >
                    <span className="text-2xl mb-1">{tone.icon}</span>
                    <span className="text-sm font-bold">{tone.name}</span>
                    <span className="text-xs text-sky-600 font-semibold">({tone.example})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cột Phải: Các hoạt động tương tác với chữ cái đang chọn */}
            <div className="bg-white rounded-3xl p-6 border-4 border-orange-200 shadow-xl flex flex-col justify-between items-center text-center">
              <div className="w-full">
                <span className="text-xs font-black bg-orange-100 text-orange-800 px-3 py-1 rounded-full uppercase tracking-wider">
                  Bé Học Toàn Diện
                </span>
                
                <div className="my-4 text-8xl font-black text-orange-500 drop-shadow-md animate-bounce">
                  {selectedLetter.letter} <span className="text-4xl text-gray-400 font-normal">{selectedLetter.lower}</span>
                </div>

                {/* Hoạt động 1: Tập Đọc (Web Speech TTS) */}
                <button
                  onClick={() => speakText(selectedLetter.letter.toLowerCase())}
                  className={`w-full py-3 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg ${theme.primary} transition-all active:scale-95 mb-3`}
                >
                  <span className="text-xl">🔊</span> 1. Nghe Phát Âm: <span className="text-lg font-black underline">"{selectedLetter.phonic.toUpperCase()}"</span>
                </button>

                {/* Hoạt động 2: Tập Viết vẽ (Canvas vẽ trên dòng kẻ ô ly) */}
                <button
                  onClick={openWritingBoard}
                  className="w-full py-3 px-6 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 mb-3"
                >
                  <span className="text-xl">📝</span> 2. Bé Tập Viết Chữ "{selectedLetter.letter}"
                </button>

                {/* Hoạt động 3: Thử thách bé đọc AI nghe (Web Speech Recognition) */}
                <button
                  onClick={handleVoiceRecognition}
                  className="w-full py-3 px-6 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 mb-3"
                >
                  <span className="text-xl">🎤</span> 3. Bé Đọc To Cho AI Lắng Nghe
                </button>

                {/* Kết quả phản hồi của AI cho giọng nói */}
                {speechResult.active && (
                  <div className={`p-3 rounded-xl border text-xs font-bold leading-relaxed mb-4 ${
                    speechResult.status === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
                    speechResult.status === 'listening' ? 'bg-amber-50 border-amber-300 text-amber-800 animate-pulse' :
                    'bg-rose-50 border-rose-300 text-rose-800'
                  }`}>
                    {speechResult.text}
                  </div>
                )}

                <hr className="my-3 border-dashed border-orange-100" />

                {/* Hình minh họa */}
                <div className="flex items-center justify-center gap-4 bg-orange-50/50 p-3 rounded-2xl border-2 border-orange-100">
                  <span className="text-5xl">{selectedLetter.emoji}</span>
                  <div className="text-left">
                    <div className="text-xs font-bold text-gray-400">Từ minh họa</div>
                    <div className="text-xl font-extrabold text-gray-800">{selectedLetter.word}</div>
                  </div>
                </div>
              </div>

              {/* Câu luyện đọc */}
              <div className="mt-4 w-full p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl text-left">
                <span className="text-xs font-extrabold text-yellow-800 block mb-1">💡 Câu tập đọc nhỏ:</span>
                <p className="text-xs font-semibold text-gray-700 mb-2">"{selectedLetter.sentence}"</p>
                <button
                  onClick={() => speakText(selectedLetter.sentence)}
                  className="w-full py-1.5 px-3 bg-yellow-300 hover:bg-yellow-400 text-yellow-950 rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all"
                >
                  <span>🗣️</span> Bé luyện đọc câu này
                </button>
              </div>

            </div>
          </div>
        )}

        {/* MODAL TẬP VIẾT CHỮ (CANVAS Ô LY TIỂU HỌC) */}
        {showWritingModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-emerald-950 border-8 border-orange-300 rounded-3xl p-6 shadow-2xl max-w-lg w-full">
              <div className="flex justify-between items-center mb-4 text-white">
                <h4 className="text-lg font-black text-orange-300">📝 Bảng Tập Viết Nét Chữ "{selectedLetter.letter}"</h4>
                <button
                  onClick={() => setShowWritingModal(false)}
                  className="px-3 py-1 bg-rose-500 rounded-lg text-xs font-black hover:bg-rose-600 transition-all"
                >
                  Đóng Bảng ✖
                </button>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-inner flex justify-center border-4 border-emerald-900">
                <canvas
                  ref={canvasRef}
                  width={360}
                  height={360}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="cursor-crosshair touch-none"
                />
              </div>

              <p className="text-xs text-orange-200 font-bold text-center mt-3">
                Bé hãy dùng ngón tay hoặc chuột để tô vẽ phấn màu Hồng theo chữ mẫu nhé!
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={openWritingBoard} // Vẽ lại chữ mờ
                  className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-all"
                >
                  🔄 Viết Lại Từ Đầu
                </button>
                <button
                  onClick={() => {
                    playSoundEffect('success');
                    updateStars(2);
                    setShowWritingModal(false);
                    addStudyLog('writing_success', `Tập viết chữ "${selectedLetter.letter}"`);
                    speakText("Hoan hô! Bé viết chữ đẹp quá!");
                  }}
                  className="flex-1 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-black rounded-xl text-xs transition-all"
                >
                  ⭐ Nộp Bài & Nhận 2 Sao
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* TAB 2: XƯỞNG GHÉP VẦN NÂNG CAO */}
        {/* ======================================= */}
        {activeTab === 'spelling' && (
          <div className="bg-white rounded-3xl p-6 border-4 border-pink-200 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
              <h3 className="text-2xl font-black text-pink-600 flex items-center gap-2">
                <span>🧬</span> Xưởng Ghép Vần Kỳ Diệu
              </h3>
              
              {/* Công tắc chuyển đổi Phụ âm/Vần ghép phức tạp */}
              <button
                onClick={() => {
                  setUseAdvancedSpelling(!useAdvancedSpelling);
                  setSelectedConsonant(useAdvancedSpelling ? 'b' : 'ch');
                  setSelectedVowel(useAdvancedSpelling ? 'a' : 'anh');
                }}
                className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-900 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5"
              >
                {useAdvancedSpelling ? "📚 Quay lại vần Cơ Bản" : "🚀 Mở rộng vần Nâng Cao (ch, kh, uyên...)"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Cột 1: Phụ âm đầu */}
              <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
                <h4 className="text-center font-black text-amber-800 mb-3 flex items-center justify-center gap-1">
                  <span>1️⃣</span> Phụ Âm Đầu
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {(useAdvancedSpelling ? complexConsonants : ['b', 'c', 'd', 'đ', 'g', 'h', 'l', 'm', 'n', 'p', 't', 'v']).map(consonant => (
                    <button
                      key={consonant}
                      onClick={() => {
                        setSelectedConsonant(consonant);
                        speakText(consonant);
                      }}
                      className={`py-2 rounded-xl font-bold text-base transition-all transform active:scale-95 ${
                        selectedConsonant === consonant
                          ? 'bg-amber-400 text-amber-950 shadow-md border-2 border-amber-600 scale-105'
                          : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100/50'
                      }`}
                    >
                      {consonant.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cột 2: Nguyên âm / Vần ghép */}
              <div className="bg-sky-50 p-4 rounded-2xl border-2 border-sky-200">
                <h4 className="text-center font-black text-sky-800 mb-3 flex items-center justify-center gap-1">
                  <span>2️⃣</span> Nguyên Âm / Vần
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {(useAdvancedSpelling ? complexRhymes : Object.keys(vowelTones)).map(vowel => (
                    <button
                      key={vowel}
                      onClick={() => {
                        setSelectedVowel(vowel);
                        speakText(vowel);
                      }}
                      className={`py-2 rounded-xl font-bold text-sm transition-all transform active:scale-95 ${
                        selectedVowel === vowel
                          ? 'bg-sky-400 text-sky-950 shadow-md border-2 border-sky-600 scale-105'
                          : 'bg-white text-sky-900 border border-sky-200 hover:bg-sky-100/50'
                      }`}
                    >
                      {vowel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cột 3: Dấu thanh */}
              <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
                <h4 className="text-center font-black text-purple-800 mb-3 flex items-center justify-center gap-1">
                  <span>3️⃣</span> Dấu Thanh
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {toneList.map((tone, idx) => (
                    <button
                      key={tone.name}
                      onClick={() => {
                        setSelectedTone(idx);
                        speakText(tone.sound);
                      }}
                      className={`py-3 px-2 rounded-xl font-bold text-xs transition-all transform active:scale-95 flex flex-col items-center justify-center ${
                        selectedTone === idx
                          ? 'bg-purple-400 text-purple-950 shadow-md border-2 border-purple-600 scale-105'
                          : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-100/50'
                      }`}
                    >
                      <span className="text-lg">{tone.icon}</span>
                      <span>{tone.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bảng kết quả ghép vần */}
            <div className="bg-pink-50 border-4 border-dashed border-pink-300 rounded-3xl p-6 text-center max-w-2xl mx-auto shadow-inner">
              <h4 className="text-xs font-black text-pink-700 tracking-widest mb-2 uppercase">Bảng tập đánh vần</h4>
              
              <div className="flex justify-center items-center gap-3 my-6">
                <div className={`p-3 rounded-2xl border-2 w-20 text-center transition-all ${
                  spellingStage === 'consonant' ? 'bg-amber-400 border-amber-600 scale-110 shadow-lg' : 'bg-white border-amber-200'
                }`}>
                  <div className="text-2xl font-extrabold">{selectedConsonant.toUpperCase()}</div>
                </div>
                <div className="text-xl font-black text-gray-300">+</div>
                <div className={`p-3 rounded-2xl border-2 w-20 text-center transition-all ${
                  spellingStage === 'vowel' ? 'bg-sky-400 border-sky-600 scale-110 shadow-lg' : 'bg-white border-sky-200'
                }`}>
                  <div className="text-2xl font-extrabold">{selectedVowel}</div>
                </div>
                <div className="text-xl font-black text-gray-300">+</div>
                <div className={`p-3 rounded-2xl border-2 w-20 text-center transition-all ${
                  spellingStage === 'tone' ? 'bg-purple-400 border-purple-600 scale-110 shadow-lg' : 'bg-white border-purple-200'
                }`}>
                  <div className="text-xl font-extrabold">{toneList[selectedTone].icon}</div>
                </div>
              </div>

              <div className="my-6">
                <span className="text-xs font-bold text-gray-400">Từ ghép hoàn chỉnh của bé:</span>
                <div className="text-6xl font-black text-pink-600 tracking-wider my-2">
                  {selectedConsonant}{vowelTones[selectedVowel] ? vowelTones[selectedVowel][selectedTone] : selectedVowel}
                </div>
              </div>

              <button
                onClick={handleSpellingProcess}
                disabled={isSpelling}
                className="py-3 px-8 bg-gradient-to-r from-pink-400 to-rose-500 text-white hover:opacity-95 font-black text-lg rounded-2xl shadow-lg transition-all transform active:scale-95"
              >
                {isSpelling ? '🤖 Đang đọc âm...' : '📣 Bé Luyện Đánh Vần'}
              </button>
            </div>

          </div>
        )}

        {/* ======================================= */}
        {/* TAB 3: TRÒ CHƠI HOẠT ĐỘNG (MINI GAME) */}
        {/* ======================================= */}
        {activeTab === 'game' && (
          <div className="bg-white rounded-3xl p-6 border-4 border-yellow-200 shadow-xl max-w-2xl mx-auto">
            
            {/* Thanh menu chọn chế độ chơi */}
            <div className="flex justify-center gap-3 mb-6 bg-yellow-50 p-2 rounded-2xl border">
              <button
                onClick={() => setGameMode('quiz')}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                  gameMode === 'quiz' ? 'bg-yellow-400 text-yellow-950 shadow' : 'bg-white text-yellow-800'
                }`}
              >
                🧩 Trắc Nghiệm Thông Minh
              </button>
              <button
                onClick={() => {
                  setGameMode('whack');
                  startWhackGame();
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                  gameMode === 'whack' ? 'bg-yellow-400 text-yellow-950 shadow' : 'bg-white text-yellow-800'
                }`}
              >
                🔨 Game Đập Chuột Chũi Tìm Chữ
              </button>
            </div>

            {/* CHẾ ĐỘ 1: TRẮC NGHIỆM ĐỐ VUI */}
            {gameMode === 'quiz' && currentQuestion && (
              <div>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="font-extrabold text-lg text-yellow-700">{currentQuestion.title}</h3>
                  <span className="text-xs font-black bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    Điểm số: {gameScore} 🔥
                  </span>
                </div>

                <div className="text-center my-6 bg-yellow-50/50 border rounded-2xl p-5">
                  <p className="text-sm font-bold text-gray-600 mb-4">{currentQuestion.displayPrompt}</p>
                  
                  {currentQuestion.type === 'listen-letter' && (
                    <button
                      onClick={() => speakText(currentQuestion.speechPrompt)}
                      className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shadow mx-auto animate-pulse"
                    >
                      🔊
                    </button>
                  )}

                  {currentQuestion.type === 'word-to-pic' && <div className="text-5xl">❓</div>}

                  {currentQuestion.type === 'fill-blank' && (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-5xl">{currentQuestion.hintEmoji}</span>
                      <div className="text-3xl font-black tracking-wider">{currentQuestion.displayBlank}</div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={gameFeedback.show}
                      className={`py-4 px-3 rounded-xl font-black text-xl border-2 transition-all ${
                        gameFeedback.show
                          ? option === currentQuestion.correctAnswer
                            ? 'bg-emerald-400 border-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-400'
                          : 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-950'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {gameFeedback.show && (
                  <div className="mt-4 p-4 rounded-xl text-center bg-emerald-50 text-emerald-900 border border-emerald-200">
                    <p className="font-bold text-sm mb-2">{gameFeedback.text}</p>
                    <button
                      onClick={generateNewQuestion}
                      className="py-1.5 px-6 bg-yellow-400 rounded-xl font-bold text-xs"
                    >
                      Tiếp tục ➡️
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CHẾ ĐỘ 2: ĐẬP CHUỘT CHŨI (ACTION GAME) */}
            {gameMode === 'whack' && (
              <div className="text-center">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="font-extrabold text-lg text-yellow-700">🔨 Đập Chuột Chũi Học Chữ</h3>
                  <span className="text-xs font-black bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    Điểm số: {gameScore} 🔥
                  </span>
                </div>

                <div className="p-4 bg-orange-100 rounded-2xl mb-6 font-bold text-sm text-orange-950 border border-orange-200">
                  {whackMessage}
                </div>

                {/* Bản đồ 4 cái hố chuột chũi nhô lên */}
                <div className="grid grid-cols-2 gap-6 max-w-md mx-auto my-8">
                  {moles.map((mole) => (
                    <div key={mole.id} className="relative h-32 flex flex-col items-center justify-end">
                      {/* Đất hố */}
                      <div className="absolute bottom-0 w-full h-8 bg-amber-800 rounded-full border-b-4 border-amber-950"></div>
                      
                      {/* Chú chuột chũi */}
                      {mole.active && (
                        <button
                          onClick={() => handleWhackMole(mole)}
                          className="w-24 h-24 bg-amber-700 hover:bg-amber-600 rounded-full flex flex-col items-center justify-center border-4 border-yellow-400 shadow-lg transform active:scale-95 transition-all z-10 animate-bounce cursor-pointer text-center"
                        >
                          <span className="text-2xl">🐹</span>
                          <span className="text-xl font-black text-white bg-black/40 px-2 py-0.5 rounded-lg mt-0.5 leading-none">
                            {mole.letter}
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {!whackIsPlaying && (
                  <button
                    onClick={startWhackGame}
                    className="py-3 px-8 bg-yellow-400 hover:bg-yellow-500 rounded-2xl font-black text-yellow-950 shadow transition-all transform active:scale-95 text-base"
                  >
                    🚀 Bắt đầu chơi ngay!
                  </button>
                )}
              </div>
            )}

          </div>
        )}

        {/* ======================================= */}
        {/* TAB 4: GÓC NUÔI THÚ CƯNG THÔNG MINH */}
        {/* ======================================= */}
        {activeTab === 'pet' && (
          <div className="bg-white rounded-3xl p-6 border-4 border-emerald-200 shadow-xl max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-black text-emerald-600 mb-2 flex items-center justify-center gap-2">
              <span>🦕</span> Nuôi Khủng Long Con Chăm Ngoan
            </h3>
            <p className="text-xs font-bold text-gray-400 mb-6">
              Bé hãy cố gắng tích lũy thật nhiều Sao bằng cách đọc đúng chữ để mua quà tặng khủng long con mau lớn nhé!
            </p>

            {/* Mô tả trạng thái Thú cưng */}
            <div className="bg-emerald-50 rounded-3xl p-6 border-2 border-emerald-100 inline-block w-full max-w-md my-4 shadow-inner relative">
              <div className="absolute top-4 right-4 text-xs font-black text-emerald-800 bg-white border border-emerald-200 px-3 py-1 rounded-full">
                Hạnh phúc: {petHappiness}% ❤️
              </div>

              {/* Hình ảnh hoạt hình khủng long bằng Emoji khổng lồ */}
              <div className="text-8xl my-6 animate-bounce">
                {petStage === 'egg' && '🥚'}
                {petStage === 'baby' && '🦖'}
                {petStage === 'grown' && '🦕🎒'}
              </div>

              <div className="p-3 bg-white rounded-xl border text-sm font-semibold text-gray-700 leading-relaxed min-h-12 flex items-center justify-center">
                "{petInteractiveMessage}"
              </div>
            </div>

            {/* Cửa hàng thức ăn tương tác bằng Sao */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-6">
              
              <button
                onClick={() => playWithPet('feed-apple')}
                disabled={petStage === 'grown'}
                className="p-4 bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all transform active:scale-95 text-center"
              >
                <span className="text-3xl">🍎</span>
                <span className="text-xs font-bold text-gray-700">Táo đỏ ngọt</span>
                <span className="text-xs font-black text-orange-600 bg-orange-100 px-3 py-0.5 rounded-full mt-1">
                  Mất 3 Sao ⭐
                </span>
              </button>

              <button
                onClick={() => playWithPet('feed-candy')}
                disabled={petStage === 'egg' || petStage === 'grown'}
                className="p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all transform active:scale-95 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-3xl">🍬</span>
                <span className="text-xs font-bold text-gray-700">Kẹo sắc màu</span>
                <span className="text-xs font-black text-purple-600 bg-purple-100 px-3 py-0.5 rounded-full mt-1">
                  Mất 5 Sao ⭐
                </span>
              </button>

            </div>

            {petStage === 'grown' && (
              <div className="mt-6 p-4 bg-yellow-100 border-2 border-dashed border-yellow-300 rounded-2xl text-yellow-900 font-bold max-w-md mx-auto">
                🎉 Chúc mừng bạn nhỏ! Chú Khủng Long đã trưởng thành và sẵn sàng đeo balo cùng bé yêu tự tin bước vào lớp 1 học tập!
              </div>
            )}
          </div>
        )}

        {/* ======================================= */}
        {/* TAB 5: GÓC PHỤ HUYNH & BẢO MẬT */}
        {/* ======================================= */}
        {activeTab === 'parents' && (
          <div className="bg-white rounded-3xl p-6 border-4 border-indigo-200 shadow-xl max-w-2xl mx-auto">
            
            {/* Lớp khóa toán ngăn trẻ nhỏ ấn nhầm */}
            {!isParentUnlocked ? (
              <div className="text-center">
                <span className="text-5xl">🔒</span>
                <h3 className="text-lg font-black text-indigo-900 mt-3">Vùng Bảo Mật Của Bố Mẹ</h3>
                <p className="text-xs text-gray-400 mt-1 mb-6">Bố mẹ hãy giúp tính phép toán này để mở bảng kiểm soát nhé!</p>
                
                <form onSubmit={verifyParentPass} className="max-w-xs mx-auto">
                  <div className="text-2xl font-black bg-indigo-50 border-2 border-indigo-200 rounded-xl py-3 mb-4 text-indigo-900">
                    {parentMathQuiz.q} = ?
                  </div>
                  <input
                    type="number"
                    value={parentMathInput}
                    onChange={(e) => setParentMathInput(e.target.value)}
                    placeholder="Nhập kết quả..."
                    className="w-full px-4 py-2 border rounded-xl text-center text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full mt-3 py-2 bg-indigo-600 text-white font-black rounded-xl text-xs shadow hover:bg-indigo-700 transition-all"
                  >
                    Mở Khóa Góc Ba Mẹ
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-black text-indigo-950 mb-4 pb-2 border-b flex items-center justify-between">
                  <span>⚙️ Bảng Điều Khiển Của Phụ Huynh</span>
                  <button
                    onClick={() => setIsParentUnlocked(false)}
                    className="text-xs bg-indigo-50 text-indigo-800 border px-3 py-1 rounded-lg"
                  >
                    Khóa lại
                  </button>
                </h3>

                {/* Phần 1: Đặt hẹn giờ sử dụng bảo vệ sức khỏe bé */}
                <div className="mb-6 p-4 bg-indigo-50/50 border rounded-2xl">
                  <h4 className="font-extrabold text-indigo-900 text-sm mb-3">🕒 Giới Hạn Thời Gian Chơi (Bảo Vệ Mắt)</h4>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Khi hết giờ hẹn, ứng dụng sẽ tự động khóa lại và hiện màn hình nhắc nhở bé nghỉ ngơi cho đôi mắt sáng đẹp.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[0, 10, 20, 30].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setScreenTimeLimit(mins)}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                          parentTimeLimit === mins
                            ? 'bg-indigo-600 text-white shadow'
                            : 'bg-white border text-indigo-800 hover:bg-indigo-50'
                        }`}
                      >
                        {mins === 0 ? "Không giới hạn" : `${mins} Phút`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phần 2: Thống kê lỗi phát âm và luyện vẽ của bé */}
                <div className="p-4 border rounded-2xl">
                  <h4 className="font-extrabold text-indigo-900 text-sm mb-3">📊 Nhật Ký Học Tập Của Bé</h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Xem những nội dung bé vừa học hoặc những chữ cái bé còn phát âm chưa chuẩn để ba mẹ dễ dàng kèm thêm:
                  </p>

                  <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                    {studyLogs.length === 0 ? (
                      <p className="text-xs text-gray-400 italic text-center py-6">Chưa có nhật ký học tập nào được lưu.</p>
                    ) : (
                      studyLogs.map((log) => (
                        <div key={log.id} className="flex justify-between items-center text-xs p-2.5 bg-gray-50 border rounded-lg">
                          <span className="font-semibold text-gray-700">{log.detail}</span>
                          <span className="text-[10px] text-gray-400">{log.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* DOCK CHUYỂN TAB CỐ ĐỊNH PHÍA DƯỚI (MOBILE-FRIENDLY) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-orange-200 shadow-2xl z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-around items-center">
          
          <button
            onClick={() => {
              setSpeechResult({ active: false, status: '', text: '' });
              setActiveTab('alphabet');
            }}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'alphabet' ? 'text-orange-500 scale-110 font-bold' : 'text-gray-400 hover:text-orange-300'
            }`}
          >
            <span className="text-2xl">📚</span>
            <span className="text-xs font-black">Học Chữ</span>
          </button>

          <button
            onClick={() => setActiveTab('spelling')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'spelling' ? 'text-pink-500 scale-110 font-bold' : 'text-gray-400 hover:text-pink-300'
            }`}
          >
            <span className="text-2xl">🧬</span>
            <span className="text-xs font-black">Ghép Vần</span>
          </button>

          <button
            onClick={() => setActiveTab('game')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'game' ? 'text-yellow-500 scale-110 font-bold' : 'text-gray-400 hover:text-yellow-300'
            }`}
          >
            <span className="text-2xl">🎮</span>
            <span className="text-xs font-black">Trò Chơi</span>
          </button>

          <button
            onClick={() => setActiveTab('pet')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'pet' ? 'text-emerald-500 scale-110 font-bold' : 'text-gray-400 hover:text-emerald-300'
            }`}
          >
            <span className="text-2xl">🦕</span>
            <span className="text-xs font-black">Nuôi Thú</span>
          </button>

          <button
            onClick={tryOpenParentsTab}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'parents' ? 'text-indigo-500 scale-110 font-bold' : 'text-gray-400 hover:text-indigo-300'
            }`}
          >
            <span className="text-2xl">⚙️</span>
            <span className="text-xs font-black">Ba Mẹ</span>
          </button>

        </div>
      </footer>

    </div>
  );
}
