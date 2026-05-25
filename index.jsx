import React, { useState, useEffect } from 'react';

// Bảng dữ liệu 29 chữ cái Tiếng Việt chuẩn Bộ Giáo Dục
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

// Danh sách các thanh điệu tiếng Việt
const toneList = [
  { name: 'Không dấu', symbol: '◌', sound: 'ngang', icon: '⚪', example: 'ba' },
  { name: 'Dấu Huyền', symbol: '◌̀', sound: 'huyền', icon: '📉', example: 'bà' },
  { name: 'Dấu Sắc', symbol: '◌́', sound: 'sắc', icon: '📈', example: 'bá' },
  { name: 'Dấu Hỏi', symbol: '◌̉', sound: 'hỏi', icon: '❓', example: 'bả' },
  { name: 'Dấu Ngã', symbol: '◌̃', sound: 'ngã', icon: '〰️', example: 'bã' },
  { name: 'Dấu Nặng', symbol: '◌̣', sound: 'nặng', icon: '⚫', example: 'bạ' }
];

// Bản đồ ghép dấu thanh cho các nguyên âm cơ bản
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

// Cấu hình các nhân vật Mascot dẫn dắt
const mascots = {
  bee: {
    name: 'Chị Ong Vàng 🐝',
    themeBg: 'bg-amber-50',
    primary: 'bg-amber-400 hover:bg-amber-500 text-amber-950',
    border: 'border-amber-300',
    accentBg: 'bg-amber-100',
    textColor: 'text-amber-900',
    shadow: 'shadow-amber-200',
    avatar: '🐝',
    greeting: 'Chào bé yêu! Cùng chị Ong Vàng học những chữ cái xinh xắn nào!'
  },
  dino: {
    name: 'Khủng Long Con 🦖',
    themeBg: 'bg-emerald-50',
    primary: 'bg-emerald-400 hover:bg-emerald-500 text-emerald-950',
    border: 'border-emerald-300',
    accentBg: 'bg-emerald-100',
    textColor: 'text-emerald-900',
    shadow: 'shadow-emerald-200',
    avatar: '🦖',
    greeting: 'Chào bạn nhỏ! Tớ là Khủng Long xanh. Hãy cùng tớ vượt qua các thử thách đọc chữ cực vui!'
  },
  cat: {
    name: 'Mèo Máy Thông Minh 🐱',
    themeBg: 'bg-pink-50',
    primary: 'bg-pink-400 hover:bg-pink-500 text-pink-950',
    border: 'border-pink-300',
    accentBg: 'bg-pink-100',
    textColor: 'text-pink-900',
    shadow: 'shadow-pink-200',
    avatar: '🐱',
    greeting: 'Mao meo! Các chữ cái hôm nay ngộ nghĩnh lắm đấy, để tớ hướng dẫn bé nhé!'
  }
};

// Khởi tạo các phần thưởng Sticker
const stickerStore = [
  { id: 'medal', name: 'Huy Chương Vàng', emoji: '🥇', cost: 3, unlocked: false },
  { id: 'crown', name: 'Vương Miện Nhỏ', emoji: '👑', cost: 5, unlocked: false },
  { id: 'rocket', name: 'Tên Lửa Vũ Trụ', emoji: '🚀', cost: 8, unlocked: false },
  { id: 'unicorn', name: 'Kỳ Lân Cầu Vồng', emoji: '🦄', cost: 12, unlocked: false },
  { id: 'trophy', name: 'Cúp Chiến Thắng', emoji: '🏆', cost: 15, unlocked: false },
  { id: 'wizard', name: 'Mũ Phù Thủy', emoji: '🧙', cost: 20, unlocked: false }
];

// Danh sách các bài luyện đọc câu ngắn
const readingLessons = [
  { id: 1, title: 'Bài 1: Bé ở quê', emoji: '🏡', sentence: 'Quê bé có bờ đê xanh dìu dịu.' },
  { id: 2, title: 'Bài 2: Chú gà nhà ta', emoji: '🐓', sentence: 'Chú gà trống gáy vang cả xóm nhỏ.' },
  { id: 3, title: 'Bài 3: Trái khế ngon', emoji: '🌟', sentence: 'Khỉ con đu cành bẻ quả khế chín ngọt.' },
  { id: 4, title: 'Bài 4: Bữa cơm ấm áp', emoji: '🍲', sentence: 'Mẹ nấu canh cá ngon cho bé và bố.' },
  { id: 5, title: 'Bài 5: Học vẽ tranh', emoji: '🎨', sentence: 'Bé vẽ ông mặt trời đỏ rực rỡ.' },
  { id: 6, title: 'Bài 6: Chăm chỉ học bài', emoji: '🎒', sentence: 'Bé ngoan tự giác đọc sách mỗi tối.' }
];

// Bộ chuyển đổi PCM sang WAV cần thiết cho phát nhạc từ Gemini TTS
function pcmToWav(base64Pcm, sampleRate = 24000) {
  const binaryString = window.atob(base64Pcm);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const buffer = bytes.buffer;

  const wavHeader = new ArrayBuffer(44);
  const view = new DataView(wavHeader);

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + buffer.byteLength, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM Integer
  view.setUint16(22, 1, true); // Mono channel
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // Byte rate (16-bit Mono)
  view.setUint16(32, 2, true);              // Block align
  view.setUint16(34, 16, true);             // Bits per sample
  writeString(view, 36, 'data');
  view.setUint32(40, buffer.byteLength, true);

  const blob = new Blob([wavHeader, buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

export default function App() {
  // States ứng dụng
  const [activeTab, setActiveTab] = useState('alphabet');
  const [selectedMascot, setSelectedMascot] = useState('bee');
  const [stars, setStars] = useState(0);
  const [unlockedStickers, setUnlockedStickers] = useState([]);
  const [userName, setUserName] = useState('');
  const [hasCertificate, setHasCertificate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Thêm các State cấu hình giọng nói thông minh
  const [availableVoices, setAvailableVoices] = useState([]);
  const [useCloudVoice, setUseCloudVoice] = useState(false); // Ưu tiên Giọng đọc đám mây AI nếu thiết bị không hỗ trợ tiếng Việt
  const [isSpeakingCloud, setIsSpeakingCloud] = useState(false);

  // States của Tab 1: Alphabet
  const [selectedLetter, setSelectedLetter] = useState(alphabetData[0]);

  // States của Tab 2: Spelling
  const [selectedConsonant, setSelectedConsonant] = useState('b');
  const [selectedVowel, setSelectedVowel] = useState('a');
  const [selectedTone, setSelectedTone] = useState(0);
  const [spellingStage, setSpellingStage] = useState('idle');
  const [isSpelling, setIsSpelling] = useState(false);

  // States của Tab 4: Game
  const [gameScore, setGameScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gameFeedback, setGameFeedback] = useState({ show: false, correct: false, text: '' });

  // Khởi động nạp giọng nói hệ thống và kiểm tra tính tương thích
  useEffect(() => {
    const loadSystemVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);

        // Tìm kiếm xem hệ thống có giọng tiếng Việt nào không
        const hasViVoice = voices.some(v => v.lang.includes('vi-VN') || v.lang.toLowerCase().startsWith('vi'));
        // Nếu không có giọng đọc tiếng Việt nào trong máy, mặc định bật chế độ Cloud Voice của Gemini
        if (!hasViVoice) {
          setUseCloudVoice(true);
        }
      } else {
        // Trình duyệt cũ không có SpeechSynthesis -> Bắt buộc dùng Cloud Voice
        setUseCloudVoice(true);
      }
    };

    loadSystemVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadSystemVoices;
    }

    // Tải thông tin lưu trữ từ LocalStorage
    const savedStars = localStorage.getItem('be_tap_doc_stars');
    if (savedStars) setStars(parseInt(savedStars));

    const savedStickers = localStorage.getItem('be_tap_doc_stickers');
    if (savedStickers) setUnlockedStickers(JSON.parse(savedStickers));

    const savedName = localStorage.getItem('be_tap_doc_name');
    if (savedName) setUserName(savedName);
  }, []);

  const updateStars = (amount) => {
    const newStars = Math.max(0, stars + amount);
    setStars(newStars);
    localStorage.setItem('be_tap_doc_stars', newStars.toString());
  };

  // PHÁT ÂM THANH QUA CLOUD (Sử dụng mô hình AI gemini-2.5-flash-preview-tts)
  const speakTextCloud = async (text, customVoice = "Aoede") => {
    setIsSpeakingCloud(true);
    const apiKey = ""; // API key tự động tiêm lúc chạy
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

    // Tối ưu hóa câu lệnh ngữ cảnh giọng đọc giúp AI đọc chuẩn âm vị ghép vần hơn
    let modifiedText = text;
    const isSingleChar = text.length === 1 || (text.length <= 3 && text.toLowerCase() === text);

    if (isSingleChar) {
      const match = alphabetData.find(i => i.letter.toLowerCase() === text.toLowerCase());
      if (match) {
        modifiedText = `Hãy phát âm rõ ràng âm tiết: "${match.phonic}"`;
      } else {
        modifiedText = `Hãy phát âm rõ ràng âm tiết: "${text}"`;
      }
    } else {
      modifiedText = `Đọc chậm, truyền cảm câu tiếng Việt sau: "${text}"`;
    }

    const payload = {
      contents: [{
        parts: [{
          text: `Đóng vai cô giáo dạy học tiểu học, đọc bằng tiếng Việt chuẩn: ${modifiedText}`
        }]
      }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: customVoice // Các giọng hỗ trợ tốt: Aoede, Leda, Kore
            }
          }
        }
      },
      model: "gemini-2.5-flash-preview-tts"
    };

    let retries = 5;
    let delay = 1000;
    let success = false;
    let base64Data = null;
    let mimeType = "audio/L16;rate=24000";

    while (retries > 0 && !success) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error("API call error");
        const data = await response.json();
        const inlineData = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData;
        if (inlineData && inlineData.data) {
          base64Data = inlineData.data;
          mimeType = inlineData.mimeType || "audio/L16;rate=24000";
          success = true;
        } else {
          throw new Error("No inline sound data");
        }
      } catch (err) {
        retries--;
        if (retries === 0) {
          console.error("Gemini TTS thất bại sau 5 lần thử.");
          // Fallback cuối cùng sang giọng hệ thống nếu mạng lỗi
          fallbackToLocalSpeak(text, 0.7);
        } else {
          await new Promise(r => setTimeout(r, delay));
          delay *= 2;
        }
      }
    }

    if (success && base64Data) {
      try {
        let sampleRate = 24000;
        const rateMatch = mimeType.match(/rate=(\d+)/);
        if (rateMatch && rateMatch[1]) {
          sampleRate = parseInt(rateMatch[1], 10);
        }
        const audioUrl = pcmToWav(base64Data, sampleRate);
        const audio = new Audio(audioUrl);
        await audio.play();
      } catch (e) {
        console.error("Lỗi phát tệp WAV:", e);
      }
    }
    setIsSpeakingCloud(false);
  };

  // PHÁT GIỌNG ĐỌC LOCAL (Sử dụng Web Speech API hệ thống)
  const speakTextLocal = (text, customRate = 0.8) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // Ưu tiên chọn giọng đọc tiếng Việt hệ thống thực sự
      const viVoice = availableVoices.find(v => v.lang.includes('vi-VN') || v.lang.toLowerCase().startsWith('vi'));
      if (viVoice) {
        utterance.voice = viVoice;
      } else {
        utterance.lang = 'vi-VN';
      }
      utterance.rate = customRate;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Fallback khẩn cấp nếu Cloud lỗi
  const fallbackToLocalSpeak = (text, customRate) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = customRate;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Điều phối giọng đọc chính của ứng dụng
  const speakText = (text, customRate = 0.8) => {
    if (useCloudVoice) {
      speakTextCloud(text);
    } else {
      speakTextLocal(text, customRate);
    }
  };

  // PROMISE GIỌNG ĐỌC CLOUD (Dùng cho quá trình đánh vần từng chữ chậm rãi)
  const speakTextCloudPromise = (text) => {
    return new Promise(async (resolve) => {
      const apiKey = "";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

      let modifiedText = text;
      const isSingleChar = text.length === 1 || (text.length <= 3 && text.toLowerCase() === text);
      if (isSingleChar) {
        const match = alphabetData.find(i => i.letter.toLowerCase() === text.toLowerCase());
        modifiedText = `Hãy phát âm rõ: "${match ? match.phonic : text}"`;
      } else {
        modifiedText = `Đọc rõ từ: "${text}"`;
      }

      const payload = {
        contents: [{
          parts: [{ text: `Đọc bằng tiếng Việt: ${modifiedText}` }]
        }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: "Aoede"
              }
            }
          }
        },
        model: "gemini-2.5-flash-preview-tts"
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        const inlineData = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData;
        if (inlineData && inlineData.data) {
          let sampleRate = 24000;
          const rateMatch = (inlineData.mimeType || "").match(/rate=(\d+)/);
          if (rateMatch && rateMatch[1]) {
            sampleRate = parseInt(rateMatch[1], 10);
          }
          const audioUrl = pcmToWav(inlineData.data, sampleRate);
          const audio = new Audio(audioUrl);
          audio.onended = () => resolve();
          audio.onerror = () => resolve();
          await audio.play();
        } else {
          resolve();
        }
      } catch (e) {
        fallbackToLocalSpeak(text, 0.7);
        setTimeout(resolve, 1000); // Tự động bỏ qua sau 1 giây nếu lỗi mạng
      }
    });
  };

  // PROMISE GIỌNG ĐỌC LOCAL
  const speakTextLocalPromise = (text, customRate = 0.8) => {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const viVoice = availableVoices.find(v => v.lang.includes('vi-VN') || v.lang.toLowerCase().startsWith('vi'));
      if (viVoice) {
        utterance.voice = viVoice;
      } else {
        utterance.lang = 'vi-VN';
      }
      utterance.rate = customRate;
      utterance.pitch = 1.2;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  };

  // Điều phối âm thanh hứa hẹn cho chuỗi ghép vần
  const speakTextPromise = (text, customRate = 0.8) => {
    if (useCloudVoice) {
      return speakTextCloudPromise(text);
    } else {
      return speakTextLocalPromise(text, customRate);
    }
  };

  // Tổng hợp hiệu ứng nhạc vui tai (Đúng / Sai)
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
      console.log('Không khởi động được AudioContext:', e);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Trình ghép vần kỳ diệu
  const handleSpellingProcess = async () => {
    if (isSpelling) return;
    setIsSpelling(true);

    const phonicC = alphabetData.find(item => item.letter.toLowerCase() === selectedConsonant)?.phonic || selectedConsonant;
    const phonicV = alphabetData.find(item => item.letter.toLowerCase() === selectedVowel)?.phonic || selectedVowel;

    const baseCombined = selectedConsonant + selectedVowel;
    const accentedVowel = vowelTones[selectedVowel][selectedTone];
    const finalWord = selectedConsonant + accentedVowel;
    const toneObj = toneList[selectedTone];

    try {
      // 1. Phát âm Phụ âm đầu
      setSpellingStage('consonant');
      await speakTextPromise(phonicC, 0.7);
      await sleep(200);

      // 2. Phát âm Nguyên âm
      setSpellingStage('vowel');
      await speakTextPromise(phonicV, 0.7);
      await sleep(200);

      // 3. Đánh vần hợp âm cơ sở (ví dụ: bờ - a - ba)
      setSpellingStage('base');
      await speakTextPromise(baseCombined, 0.7);
      await sleep(300);

      if (selectedTone > 0) {
        // 4. Phát âm dấu thanh
        setSpellingStage('tone');
        await speakTextPromise(toneObj.sound, 0.7);
        await sleep(200);

        // 5. Đọc hoàn chỉnh từ có dấu thanh
        setSpellingStage('final');
        await speakTextPromise(finalWord, 0.65);
      } else {
        setSpellingStage('final');
        await speakTextPromise(baseCombined, 0.65);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSpellingStage('idle');
      setIsSpelling(false);
    }
  };

  // Thiết lập câu hỏi mới cho trò chơi
  const generateNewQuestion = () => {
    setGameFeedback({ show: false, correct: false, text: '' });
    const types = ['listen-letter', 'word-to-pic', 'fill-blank'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    if (randomType === 'listen-letter') {
      const correctItem = alphabetData[Math.floor(Math.random() * alphabetData.length)];
      let incorrects = alphabetData.filter(i => i.letter !== correctItem.letter);
      incorrects = incorrects.sort(() => 0.5 - Math.random()).slice(0, 3);

      const options = [correctItem, ...incorrects].sort(() => 0.5 - Math.random());

      setCurrentQuestion({
        type: randomType,
        title: 'Bé Lắng Nghe & Tìm Chữ',
        speechPrompt: `Bé hãy tìm chữ ${correctItem.phonic} nào!`,
        displayPrompt: `Bé ơi, hãy tìm chữ có âm phát là: "${correctItem.phonic.toUpperCase()}"`,
        correctAnswer: correctItem.letter,
        options: options.map(o => o.letter)
      });
      setTimeout(() => speakText(`Bé hãy tìm chữ ${correctItem.phonic}!`), 350);

    } else if (randomType === 'word-to-pic') {
      const correctItem = alphabetData[Math.floor(Math.random() * alphabetData.length)];
      let incorrects = alphabetData.filter(i => i.emoji !== correctItem.emoji);
      incorrects = incorrects.sort(() => 0.5 - Math.random()).slice(0, 2);

      const options = [correctItem, ...incorrects].sort(() => 0.5 - Math.random());

      setCurrentQuestion({
        type: randomType,
        title: 'Bé Đọc Chữ Chọn Hình',
        speechPrompt: `Tìm hình vẽ thích hợp với từ: ${correctItem.word}`,
        displayPrompt: `Hình vẽ nào phù hợp nhất với từ: "${correctItem.word.toUpperCase()}" ?`,
        correctAnswer: correctItem.emoji,
        options: options.map(o => o.emoji)
      });
      setTimeout(() => speakText(`Hình vẽ nào phù hợp nhất với từ ${correctItem.word} hả bé?`), 350);

    } else if (randomType === 'fill-blank') {
      const candidates = alphabetData.filter(i => i.word.split(' ').length === 2 && i.word.startsWith('C'));
      const chosenItem = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : alphabetData[3];
      const words = chosenItem.word.split(' ');
      const missingLetter = chosenItem.letter;
      const displayBlank = `${words[0]} _${words[1].substring(1)}`;

      let incorrects = alphabetData.filter(i => i.letter !== missingLetter);
      incorrects = incorrects.sort(() => 0.5 - Math.random()).slice(0, 2);

      // SỬA LỖI TẠI ĐÂY: map các đối tượng trong incorrects thành chuỗi ký tự text trước khi nạp vào options
      const options = [missingLetter, ...incorrects.map(i => i.letter)].sort(() => 0.5 - Math.random());

      setCurrentQuestion({
        type: randomType,
        title: 'Nhà Thông Thái Nhỏ: Điền Chữ',
        speechPrompt: `Bé hãy chọn chữ cái thích hợp điền vào chỗ trống`,
        displayPrompt: `Điền chữ cái còn thiếu để tạo thành từ: "${chosenItem.word}"`,
        displayBlank: displayBlank,
        hintEmoji: chosenItem.emoji,
        correctAnswer: missingLetter,
        options: options
      });
      setTimeout(() => speakText(`Hãy điền chữ cái còn thiếu của từ ${chosenItem.word} nhé!`), 350);
    }
  };

  useEffect(() => {
    if (activeTab === 'game') {
      generateNewQuestion();
    }
  }, [activeTab]);

  const handleAnswerSubmit = (option) => {
    if (gameFeedback.show) return;

    if (option === currentQuestion.correctAnswer) {
      playSoundEffect('success');
      setGameScore(gameScore + 1);
      updateStars(1);
      setGameFeedback({
        show: true,
        correct: true,
        text: 'Tuyệt vời quá! Bé trả lời hoàn toàn chính xác rồi! Tặng bé 1 sao vàng nhé! 🌟'
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      speakText('Ồ de! Bé thật là giỏi!');
    } else {
      playSoundEffect('fail');
      setGameFeedback({
        show: true,
        correct: false,
        text: 'Ồ, chưa chính xác rồi. Bé thử suy nghĩ lại một chút nhé!'
      });
      speakText('Chưa đúng rồi bé ơi, thử lại xem nào!');
    }
  };

  const buySticker = (sticker) => {
    if (unlockedStickers.includes(sticker.id)) return;
    if (stars < sticker.cost) {
      speakText('Bé cần cố gắng học để tích lũy thêm sao vàng nhé!');
      return;
    }
    const updated = [...unlockedStickers, sticker.id];
    setUnlockedStickers(updated);
    updateStars(-sticker.cost);
    localStorage.setItem('be_tap_doc_stickers', JSON.stringify(updated));
    playSoundEffect('success');
    speakText(`Chúc mừng bé đã đổi thành công sticker ${sticker.name}!`);
  };

  const saveName = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem('be_tap_doc_name', userName);
      setHasCertificate(true);
      playSoundEffect('success');
      speakText(`Chúc mừng bé ${userName} đã hoàn thành xuất sắc khoá học đọc chữ!`);
    }
  };

  const theme = mascots[selectedMascot];

  useEffect(() => {
    window.render_game_to_text = () => JSON.stringify({
      mode: activeTab,
      mascot: selectedMascot,
      stars,
      selectedLetter: selectedLetter.letter,
      spelling: {
        consonant: selectedConsonant,
        vowel: selectedVowel,
        tone: toneList[selectedTone].name,
        stage: spellingStage,
        isSpelling
      },
      game: {
        score: gameScore,
        questionType: currentQuestion?.type || null,
        prompt: currentQuestion?.displayPrompt || null,
        options: currentQuestion?.options || [],
        feedback: gameFeedback
      },
      rewards: {
        unlockedStickers,
        userName,
        hasCertificate
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
    selectedLetter,
    selectedConsonant,
    selectedVowel,
    selectedTone,
    spellingStage,
    isSpelling,
    gameScore,
    currentQuestion,
    gameFeedback,
    unlockedStickers,
    userName,
    hasCertificate
  ]);

  return (
    <div className={`min-h-screen ${theme.themeBg} transition-all duration-500 pb-24 font-sans select-none relative overflow-x-hidden bg-[radial-gradient(#fed7aa_1px,transparent_1px)] [background-size:24px_24px]`}>

      {/* Hiệu ứng Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const size = Math.random() * 15 + 10;
            const duration = 2 + Math.random() * 2;
            const colors = ['bg-yellow-400', 'bg-sky-400', 'bg-rose-400', 'bg-emerald-400', 'bg-purple-400', 'bg-orange-400'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
              <div
                key={i}
                className={`absolute rounded-full opacity-95 ${randomColor}`}
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `-20px`,
                  animation: `fall ${duration}s linear ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* CSS Styles */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float-slow {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white border-4 border-dashed border-orange-300 rounded-3xl p-4 shadow-xl gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-bounce">🎒</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-orange-600 tracking-wide drop-shadow-sm">
                BÉ VUI HỌC CHỮ
              </h1>
              <p className="text-xs text-gray-500 font-bold">App Tập Đọc Lớp 1 Dành Cho Bé Yêu</p>
            </div>
          </div>

          {/* Chọn Mascot */}
          <div className="flex flex-wrap justify-center items-center gap-2 bg-orange-100 p-2 rounded-2xl">
            <span className="text-xs font-bold text-orange-800 px-1">Bạn nhỏ:</span>
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

          {/* Thùng chứa sao tích lũy */}
          <div className="flex items-center gap-3 bg-yellow-100 border-2 border-yellow-300 px-4 py-2 rounded-2xl shadow-inner animate-pulse">
            <span className="text-3xl">⭐</span>
            <div className="text-left">
              <div className="text-xs font-black text-yellow-800 leading-tight">SAO CỦA BÉ</div>
              <div className="text-xl font-extrabold text-yellow-900 leading-none">{stars} sao</div>
            </div>
          </div>
        </div>
      </header>

      {/* CÀI ĐẶT GIỌNG NÓI CHUYÊN SÂU */}
      <section className="max-w-6xl mx-auto px-4 mt-3">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗣️</span>
            <div>
              <div className="text-sm font-black text-indigo-900">Bảng Điều Khiển Giọng Đọc của Bé</div>
              <p className="text-xs text-gray-500 font-bold">
                {useCloudVoice
                  ? "Đang dùng: Giọng đám mây AI ☁️ (Tránh lỗi phát âm giọng lơ lớ tiếng Anh)"
                  : "Đang dùng: Giọng đọc thiết bị 📱 (Tốc độ phản hồi tức thì)"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-indigo-50 p-2 rounded-xl">
            <button
              onClick={() => {
                setUseCloudVoice(false);
                speakTextLocal("Đã chuyển sang giọng đọc thiết bị");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !useCloudVoice
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              📱 Giọng Thiết Bị
            </button>
            <button
              onClick={() => {
                setUseCloudVoice(true);
                speakTextCloud("Đã kết nối giọng đọc đám mây AI");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                useCloudVoice
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              ☁️ Giọng Đám Mây AI (Khuyên dùng)
              {isSpeakingCloud && <span className="animate-spin text-xs">🌀</span>}
            </button>
          </div>
        </div>
      </section>

      {/* LỜI CHÀO CỦA LINH VẬT */}
      <section className="max-w-6xl mx-auto px-4 my-3">
        <div className={`flex items-start gap-4 p-4 rounded-2xl border-2 ${theme.border} ${theme.accentBg} shadow-sm`}>
          <div className="text-4xl animate-float-slow">{theme.avatar}</div>
          <div>
            <div className={`font-bold text-sm ${theme.textColor}`}>{theme.name} gợi ý:</div>
            <p className="text-base text-gray-700 font-semibold">{theme.greeting}</p>
          </div>
        </div>
      </section>

      {/* KHU VỰC CHÍNH CHỨA TAB NỘI DUNG */}
      <main className="max-w-6xl mx-auto px-4">

        {/* ======================================= */}
        {/* TAB 1: BẢNG CHỮ CÁI (ALPHABET) */}
        {/* ======================================= */}
        {activeTab === 'alphabet' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Cột trái: Bảng chữ cái 29 chữ */}
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
                    onClick={() => {
                      speakText(tone.sound);
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-sky-100 bg-sky-50/50 hover:bg-sky-100/50 hover:scale-105 transition-all text-sky-950"
                  >
                    <span className="text-2xl mb-1">{tone.icon}</span>
                    <span className="text-sm font-bold">{tone.name}</span>
                    <span className="text-xs text-sky-600 font-semibold">({tone.example})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cột phải: Chi tiết chữ cái được chọn */}
            <div className="bg-white rounded-3xl p-6 border-4 border-orange-200 shadow-xl flex flex-col justify-between items-center text-center">
              <div>
                <span className="text-xs font-black bg-orange-100 text-orange-800 px-3 py-1 rounded-full uppercase tracking-wider">
                  Chữ cái hiện tại
                </span>

                {/* Chữ cái cực đại */}
                <div className="my-4 text-8xl md:text-9xl font-black text-orange-500 drop-shadow-md animate-bounce">
                  {selectedLetter.letter} <span className="text-4xl text-gray-400 font-normal">{selectedLetter.lower}</span>
                </div>

                {/* Nút phát âm âm tiết */}
                <button
                  onClick={() => speakText(selectedLetter.letter.toLowerCase())}
                  className={`w-full py-3 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg ${theme.primary} transition-all active:scale-95 mb-6`}
                >
                  <span className="text-xl">🔊</span> Đọc âm: <span className="text-lg font-black underline">"{selectedLetter.phonic.toUpperCase()}"</span>
                </button>

                <hr className="my-4 border-dashed border-orange-100" />

                {/* Từ minh họa */}
                <div className="flex items-center justify-center gap-4 bg-orange-50/50 p-4 rounded-2xl border-2 border-orange-100">
                  <span className="text-5xl">{selectedLetter.emoji}</span>
                  <div className="text-left">
                    <div className="text-xs font-bold text-gray-400">Từ minh họa</div>
                    <div className="text-2xl font-extrabold text-gray-800">{selectedLetter.word}</div>
                  </div>
                </div>

                {/* Nút phát âm từ minh họa */}
                <button
                  onClick={() => speakText(selectedLetter.word)}
                  className="w-full mt-3 py-2 px-4 bg-sky-100 hover:bg-sky-200 text-sky-900 border-2 border-sky-300 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>📢</span> Nghe từ: "{selectedLetter.word}"
                </button>
              </div>

              {/* Câu ví dụ sinh động */}
              <div className="mt-6 w-full p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl text-left">
                <span className="text-xs font-extrabold text-yellow-800 block mb-1">💡 Câu tập đọc nhỏ:</span>
                <p className="text-sm font-semibold text-gray-700 mb-2">"{selectedLetter.sentence}"</p>
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

        {/* ======================================= */}
        {/* TAB 2: XƯỞNG GHÉP VẦN KỲ DIỆU (SPELLING) */}
        {/* ======================================= */}
        {activeTab === 'spelling' && (
          <div className="bg-white rounded-3xl p-6 border-4 border-pink-200 shadow-xl">
            <h3 className="text-2xl font-black text-pink-600 mb-6 flex items-center gap-2 justify-center">
              <span>🧬</span> Xưởng Ghép Vần Kỳ Diệu
            </h3>

            <p className="text-center text-sm font-bold text-gray-500 mb-6">
              Bé hãy lựa chọn một chữ cái ở mỗi cột dưới đây để ghép thành một từ hoàn chỉnh nhé!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

              {/* Cột 1: Chọn Phụ Âm Đầu */}
              <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
                <h4 className="text-center font-black text-amber-800 mb-3 flex items-center justify-center gap-1">
                  <span>1️⃣</span> Phụ Âm Đầu
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {['b', 'c', 'd', 'đ', 'g', 'h', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'x'].map(consonant => (
                    <button
                      key={consonant}
                      onClick={() => {
                        setSelectedConsonant(consonant);
                        speakText(consonant);
                      }}
                      className={`py-3 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${
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

              {/* Cột 2: Chọn Nguyên Âm */}
              <div className="bg-sky-50 p-4 rounded-2xl border-2 border-sky-200">
                <h4 className="text-center font-black text-sky-800 mb-3 flex items-center justify-center gap-1">
                  <span>2️⃣</span> Nguyên Âm
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(vowelTones).map(vowel => (
                    <button
                      key={vowel}
                      onClick={() => {
                        setSelectedVowel(vowel);
                        speakText(vowel);
                      }}
                      className={`py-3 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${
                        selectedVowel === vowel
                          ? 'bg-sky-400 text-sky-950 shadow-md border-2 border-sky-600 scale-105'
                          : 'bg-white text-sky-900 border border-sky-200 hover:bg-sky-100/50'
                      }`}
                    >
                      {vowel.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cột 3: Chọn Dấu Thanh */}
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
                      className={`py-3 px-2 rounded-xl font-bold text-sm transition-all transform active:scale-95 flex flex-col items-center justify-center ${
                        selectedTone === idx
                          ? 'bg-purple-400 text-purple-950 shadow-md border-2 border-purple-600 scale-105'
                          : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-100/50'
                      }`}
                    >
                      <span className="text-xl">{tone.icon}</span>
                      <span>{tone.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* BẢNG ĐÁNH VẦN THỰC TẾ TRỰC QUAN */}
            <div className="bg-pink-50 border-4 border-dashed border-pink-300 rounded-3xl p-6 text-center max-w-2xl mx-auto shadow-inner">
              <h4 className="text-xs font-black text-pink-700 tracking-widest mb-2 uppercase">Bảng tập đánh vần</h4>

              {/* Thể hiện quá trình ghép từ theo thời gian thực */}
              <div className="flex justify-center items-center gap-4 my-6">

                {/* 1. Phụ âm */}
                <div className={`p-4 rounded-2xl border-2 w-20 text-center transition-all ${
                  spellingStage === 'consonant'
                    ? 'bg-amber-400 border-amber-600 scale-110 shadow-lg text-amber-950 font-black'
                    : 'bg-white border-amber-200 text-amber-900'
                }`}>
                  <div className="text-3xl font-extrabold">{selectedConsonant.toUpperCase()}</div>
                  <div className="text-xs font-bold text-gray-400">({
                    alphabetData.find(i => i.letter.toLowerCase() === selectedConsonant)?.phonic
                  })</div>
                </div>

                <div className="text-2xl font-black text-gray-300">+</div>

                {/* 2. Nguyên âm */}
                <div className={`p-4 rounded-2xl border-2 w-20 text-center transition-all ${
                  spellingStage === 'vowel'
                    ? 'bg-sky-400 border-sky-600 scale-110 shadow-lg text-sky-950 font-black'
                    : 'bg-white border-sky-200 text-sky-900'
                }`}>
                  <div className="text-3xl font-extrabold">{selectedVowel.toUpperCase()}</div>
                  <div className="text-xs font-bold text-gray-400">({
                    alphabetData.find(i => i.letter.toLowerCase() === selectedVowel)?.phonic
                  })</div>
                </div>

                <div className="text-2xl font-black text-gray-300">+</div>

                {/* 3. Dấu thanh */}
                <div className={`p-4 rounded-2xl border-2 w-20 text-center transition-all ${
                  spellingStage === 'tone'
                    ? 'bg-purple-400 border-purple-600 scale-110 shadow-lg text-purple-950 font-black'
                    : 'bg-white border-purple-200 text-purple-900'
                }`}>
                  <div className="text-2xl font-extrabold">{toneList[selectedTone].icon}</div>
                  <div className="text-xs font-bold text-gray-400">{toneList[selectedTone].name}</div>
                </div>

              </div>

              {/* TỪ KẾT QUẢ ĐẠT ĐƯỢC */}
              <div className="my-8">
                <span className="text-xs font-bold text-gray-400">Từ hoàn chỉnh của bé:</span>
                <div className={`text-7xl font-black tracking-wider transition-all my-2 ${
                  spellingStage === 'final' || spellingStage === 'base'
                    ? 'text-pink-600 scale-110'
                    : 'text-gray-800'
                }`}>
                  {selectedConsonant}{vowelTones[selectedVowel][selectedTone]}
                </div>
              </div>

              {/* NÚT PHÁT ÂM VÀ ĐÁNH VẦN ĐỘNG */}
              <button
                onClick={handleSpellingProcess}
                disabled={isSpelling}
                className={`py-4 px-8 rounded-2xl text-xl font-extrabold shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 mx-auto ${
                  isSpelling
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-400 to-rose-500 text-white hover:opacity-95'
                }`}
              >
                <span>{isSpelling ? '🤖 Đang đọc...' : '📣 Bé Luyện Đánh Vần'}</span>
              </button>

              {/* Cảnh báo sư phạm nhỏ cho phụ huynh */}
              {['c', 'k', 'g', 'gh'].includes(selectedConsonant) && (
                <div className="mt-4 p-2.5 bg-yellow-100 border border-yellow-200 rounded-xl text-xs text-yellow-800 font-bold">
                  ⚠️ <span className="underline">Mẹo sư phạm:</span> Chữ "C" chỉ đứng trước "A, O, Ô, Ơ, U, Ư". Khi đi với "E, Ê, I" bé sẽ dùng âm "K" tương ứng nhé!
                </div>
              )}

            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* TAB 3: LUYỆN ĐỌC CÂU HAY (SENTENCES) */}
        {/* ======================================= */}
        {activeTab === 'sentences' && (
          <div className="bg-white rounded-3xl p-6 border-4 border-emerald-200 shadow-xl">
            <h3 className="text-2xl font-black text-emerald-600 mb-6 flex items-center gap-2 justify-center">
              <span>🗣️</span> Bé Thử Thách Đọc Câu Hay
            </h3>
            <p className="text-center text-sm font-bold text-gray-500 mb-6">
              Mỗi câu chuyện là một niềm vui. Bé nhấn vào <strong className="text-emerald-600">từng chữ</strong> để nghe đọc, hoặc bấm <strong className="text-emerald-600">nút loa to</strong> để nghe cả câu dài nhé!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {readingLessons.map((lesson) => (
                <div key={lesson.id} className="border-4 border-dashed border-emerald-100 rounded-2xl p-5 hover:border-emerald-300 transition-all bg-emerald-50/20">
                  <div className="flex items-center justify-between mb-3 border-b-2 border-emerald-50 pb-2">
                    <span className="font-extrabold text-emerald-800 text-base flex items-center gap-1.5">
                      <span>{lesson.emoji}</span> {lesson.title}
                    </span>
                    <button
                      onClick={() => speakText(lesson.sentence, 0.75)}
                      className="p-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-all active:scale-90 flex items-center gap-1"
                      title="Đọc cả câu"
                    >
                      🔊 Đọc cả câu
                    </button>
                  </div>

                  {/* Cắt câu thành từng từ riêng rẽ tương tác */}
                  <div className="flex flex-wrap gap-2 py-3">
                    {lesson.sentence.split(' ').map((word, wIdx) => {
                      const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                      return (
                        <button
                          key={wIdx}
                          onClick={() => speakText(cleanWord, 0.65)}
                          className="px-3 py-2 bg-white hover:bg-emerald-100 text-gray-700 hover:text-emerald-900 border-2 border-gray-100 hover:border-emerald-300 rounded-xl font-bold text-lg shadow-sm transition-all transform active:scale-90"
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* TAB 4: TRÒ CHƠI ÔN LUYỆN (GAME) */}
        {/* ======================================= */}
        {activeTab === 'game' && currentQuestion && (
          <div className="bg-white rounded-3xl p-6 border-4 border-yellow-200 shadow-xl max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4 border-b-2 border-yellow-100 pb-3">
              <h3 className="text-xl font-black text-yellow-600 flex items-center gap-1.5">
                <span>🎮</span> {currentQuestion.title}
              </h3>
              <span className="text-xs font-black bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                Chuỗi đúng: {gameScore} 🔥
              </span>
            </div>

            {/* Khung câu hỏi chính */}
            <div className="text-center my-6 bg-yellow-50/50 border-2 border-yellow-100 rounded-2xl p-5 relative">
              <p className="text-base font-bold text-gray-600 mb-4">{currentQuestion.displayPrompt}</p>

              {/* Nếu là dạng nghe âm tiết, hiện nút loa to */}
              {currentQuestion.type === 'listen-letter' && (
                <button
                  onClick={() => speakText(currentQuestion.speechPrompt)}
                  className="w-24 h-24 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-white transform active:scale-95 transition-all mx-auto animate-pulse"
                >
                  🔊
                </button>
              )}

              {/* Nếu là dạng nhìn hình chọn từ */}
              {currentQuestion.type === 'word-to-pic' && (
                <div className="text-6xl my-4">❓</div>
              )}

              {/* Nếu là dạng điền chữ */}
              {currentQuestion.type === 'fill-blank' && (
                <div className="flex flex-col items-center justify-center gap-3">
                  <span className="text-6xl animate-float-slow">{currentQuestion.hintEmoji}</span>
                  <div className="text-4xl font-black text-gray-700 tracking-wider">
                    {currentQuestion.displayBlank}
                  </div>
                </div>
              )}
            </div>

            {/* Khu vực hiển thị các đáp án cho bé lựa chọn */}
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSubmit(option)}
                  disabled={gameFeedback.show}
                  className={`py-5 px-4 rounded-2xl font-black text-2xl border-4 transition-all transform active:scale-95 shadow-md ${
                    gameFeedback.show
                      ? option === currentQuestion.correctAnswer
                        ? 'bg-emerald-400 border-emerald-600 text-white'
                        : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-950 hover:scale-102'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Phản hồi sau câu trả lời */}
            {gameFeedback.show && (
              <div className={`mt-6 p-4 rounded-2xl text-center border-2 ${
                gameFeedback.correct
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <p className="font-extrabold text-base mb-3">{gameFeedback.text}</p>
                <button
                  onClick={generateNewQuestion}
                  className="py-2.5 px-6 bg-yellow-400 hover:bg-yellow-500 border-2 border-yellow-500 rounded-xl font-bold text-sm text-yellow-950 transition-all active:scale-95 shadow-md"
                >
                  Câu tiếp theo ➡️
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================= */}
        {/* TAB 5: GÓC THÀNH TÍCH & ĐỔI QUÀ (REWARDS) */}
        {/* ======================================= */}
        {activeTab === 'rewards' && (
          <div className="bg-white rounded-3xl p-6 border-4 border-purple-200 shadow-xl">
            <h3 className="text-2xl font-black text-purple-600 mb-6 flex items-center gap-2 justify-center">
              <span>🏆</span> Góc Thành Tích & Đổi Quà Của Bé
            </h3>

            {/* Phần 1: Cửa hàng đổi sticker */}
            <div className="mb-8">
              <h4 className="text-lg font-black text-purple-800 mb-4 flex items-center gap-2">
                <span>🧸</span> Đổi Sticker Siêu Ngộ Nghĩnh
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {stickerStore.map((sticker) => {
                  const isUnlocked = unlockedStickers.includes(sticker.id);
                  return (
                    <div
                      key={sticker.id}
                      className={`border-2 rounded-2xl p-3 text-center flex flex-col justify-between items-center transition-all ${
                        isUnlocked
                          ? 'border-emerald-300 bg-emerald-50/30'
                          : 'border-purple-100 bg-purple-50/10'
                      }`}
                    >
                      <span className="text-4xl mb-1 animate-float-slow">{sticker.emoji}</span>
                      <span className="text-xs font-black text-gray-700 leading-tight mb-2">
                        {sticker.name}
                      </span>

                      {isUnlocked ? (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Đã sở hữu
                        </span>
                      ) : (
                        <button
                          onClick={() => buySticker(sticker)}
                          className="w-full py-1 px-2 bg-purple-400 hover:bg-purple-500 text-white rounded-lg text-xs font-black flex items-center justify-center gap-1 active:scale-95 transition-all"
                        >
                          ⭐ {sticker.cost}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="my-6 border-dashed border-purple-100" />

            {/* Phần 2: Nhận Bằng Khen Danh Dự */}
            <div>
              <h4 className="text-lg font-black text-purple-800 mb-4 flex items-center gap-2">
                <span>📜</span> Nhận Bằng Khen Danh Dự
              </h4>

              {!hasCertificate ? (
                <form onSubmit={saveName} className="max-w-md bg-purple-50 p-6 rounded-2xl border-2 border-purple-200">
                  <p className="text-sm font-semibold text-gray-600 mb-4">
                    Nhập tên đầy đủ của bé để ông thầy Mascot tự động viết một chiếc Bằng khen vinh danh gửi tặng bé yêu nhé!
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Gia Hân"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl border-2 border-purple-300 font-bold focus:outline-none focus:border-purple-500 text-purple-900"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transition-all active:scale-95"
                    >
                      Tạo bằng
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-amber-50 border-8 border-double border-amber-300 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl relative text-center">
                  <div className="absolute top-0 right-8 transform -translate-y-4 text-4xl">🏅</div>

                  <span className="text-lg font-black text-amber-800 block mb-1 tracking-wider">
                    CHỨNG NHẬN HOÀN THÀNH
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600 uppercase mb-4 tracking-wide">
                    Bé Ngoan Học Giỏi
                  </h2>

                  <p className="text-sm text-gray-500 font-bold">Ban Giám Hiệu Mascot hân hoan chứng nhận bé:</p>
                  <p className="text-3xl font-black text-yellow-900 my-4 underline decoration-double decoration-orange-400">
                    {userName}
                  </p>

                  <p className="text-sm font-semibold text-gray-700 max-w-md mx-auto mb-6">
                    Đã hoàn thành xuất sắc các bài học đọc Tiếng Việt cơ bản lớp 1, phát âm chuẩn chữ cái và tự lập ghép vần cực siêu!
                  </p>

                  <div className="flex justify-around items-center border-t-2 border-dashed border-amber-200 pt-6">
                    <div className="text-left text-xs font-extrabold text-gray-400">
                      <div>Ngày cấp: Hôm Nay</div>
                      <div>Mã số: HOC-CHU-SIEU-PHAM</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-amber-800 block">Ký tên từ linh vật:</span>
                      <span className="text-3xl">{theme.avatar}</span>
                      <span className="text-xs font-bold text-gray-500 block italic">({theme.name})</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setHasCertificate(false);
                      setUserName('');
                    }}
                    className="mt-6 text-xs font-bold text-purple-600 hover:underline block mx-auto"
                  >
                    🔄 Nhập lại tên khác
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* DOCK CHUYỂN TAB CỐ ĐỊNH PHÍA DƯỚI (MOBILE-FRIENDLY) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-orange-200 shadow-2xl z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-around items-center">

          <button
            onClick={() => setActiveTab('alphabet')}
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
            onClick={() => setActiveTab('sentences')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'sentences' ? 'text-emerald-500 scale-110 font-bold' : 'text-gray-400 hover:text-emerald-300'
            }`}
          >
            <span className="text-2xl">🗣️</span>
            <span className="text-xs font-black">Luyện Đọc</span>
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
            onClick={() => setActiveTab('rewards')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'rewards' ? 'text-purple-500 scale-110 font-bold' : 'text-gray-400 hover:text-purple-300'
            }`}
          >
            <span className="text-2xl">🏆</span>
            <span className="text-xs font-black">Đổi Quà</span>
          </button>

        </div>
      </footer>

    </div>
  );
}
