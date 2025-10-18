const BASE_URL = 'https://api.alquran.cloud/v1';

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  hizbQuarter: number;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs?: Ayah[];
}

export interface Translation {
  number: number;
  text: string;
  numberInSurah: number;
}

export interface SurahWithTranslation {
  arabic: Surah;
  urduTranslation?: { ayahs: Translation[] };
  englishTranslation?: { ayahs: Translation[] };
}

export interface AudioRecitation {
  identifier: string;
  name: string;
  englishName: string;
  format: string;
}

// Fetch all Surahs list
export const fetchAllSurahs = async (): Promise<Surah[]> => {
  const response = await fetch(`${BASE_URL}/surah`);
  const data = await response.json();
  return data.data;
};

// Fetch single Surah with Arabic text
export const fetchSurah = async (surahNumber: number): Promise<Surah> => {
  const response = await fetch(`${BASE_URL}/surah/${surahNumber}`);
  const data = await response.json();
  return data.data;
};

// Fetch Surah with multiple translations
export const fetchSurahWithTranslations = async (
  surahNumber: number
): Promise<SurahWithTranslation> => {
  const [arabic, urdu, english] = await Promise.all([
    fetch(`${BASE_URL}/surah/${surahNumber}`).then(r => r.json()),
    fetch(`${BASE_URL}/surah/${surahNumber}/ur.ahmedali`).then(r => r.json()),
    fetch(`${BASE_URL}/surah/${surahNumber}/en.sahih`).then(r => r.json()),
  ]);

  return {
    arabic: arabic.data,
    urduTranslation: urdu.data,
    englishTranslation: english.data,
  };
};

// Fetch by Juz (Para)
export const fetchJuz = async (juzNumber: number) => {
  const response = await fetch(`${BASE_URL}/juz/${juzNumber}`);
  const data = await response.json();
  return data.data;
};

// Fetch available audio reciters
export const fetchReciters = async (): Promise<AudioRecitation[]> => {
  const response = await fetch(`${BASE_URL}/edition/format/audio`);
  const data = await response.json();
  return data.data;
};

// Fetch audio for specific Surah and reciter
export const fetchSurahAudio = async (
  surahNumber: number,
  reciter: string = 'ar.alafasy'
) => {
  const response = await fetch(`${BASE_URL}/surah/${surahNumber}/${reciter}`);
  const data = await response.json();
  return data.data;
};

// Search in Quran
export const searchQuran = async (keyword: string, surahNumber?: number) => {
  const url = surahNumber
    ? `${BASE_URL}/search/${keyword}/${surahNumber}`
    : `${BASE_URL}/search/${keyword}/all`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

// Get Ayah by page number
export const fetchPage = async (pageNumber: number) => {
  const response = await fetch(`${BASE_URL}/page/${pageNumber}`);
  const data = await response.json();
  return data.data;
};
