import * as XLSX from 'xlsx';

export interface SurveyAnswer {
  id: string;
  nilai: number;
  jawaban: string;
}

export interface ProfilBisnis {
  namaBisnis: string;
  industri: string;
  skalaBisnis: string;
  tahunBerdiri: string;
  lokasi: string;
  jumlahKaryawan: string;
}

export interface ParseResult {
  answers: Record<string, SurveyAnswer>;
  notes: string[];
  profil: Partial<ProfilBisnis>;
}

const PROFIL_KEY_MAP: Record<string, keyof ProfilBisnis> = {
  // English field names (from app-generated Excel)
  'company name': 'namaBisnis',
  'industry': 'industri',
  'company size': 'skalaBisnis',
  'establishment year': 'tahunBerdiri',
  'total employees': 'jumlahKaryawan',
  // Indonesian field names (manual entry)
  'nama bisnis': 'namaBisnis',
  'nama_bisnis': 'namaBisnis',
  'industri': 'industri',
  'skala bisnis': 'skalaBisnis',
  'skala_bisnis': 'skalaBisnis',
  'tahun berdiri': 'tahunBerdiri',
  'tahun_berdiri': 'tahunBerdiri',
  'lokasi': 'lokasi',
  'jumlah karyawan': 'jumlahKaryawan',
  'jumlah_karyawan': 'jumlahKaryawan',
};

export function parseExcel(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames.find(
          (n) => n.trim().toUpperCase() === 'SURVEY_RESULT'
        );
        if (!sheetName) {
          reject(new Error('File is not an assessment file, SURVEY_RESULT not found.'));
          return;
        }

        const sheet = workbook.Sheets[sheetName];
        // Expected columns: No | Kode Pertanyaan | Pertanyaan | Nilai | Jawaban
        const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

        const answers: Record<string, SurveyAnswer> = {};
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length < 4) continue;
          const id = String(row[1] ?? '').trim();
          const nilai = Number(row[3]);
          const jawaban = String(row[4] ?? '').trim();
          if (id && !isNaN(nilai)) {
            answers[id] = { id, nilai, jawaban };
          }
        }

        const notes: string[] = [];
        const profil: Partial<ProfilBisnis> = {};

        const assessmentSheetName = workbook.SheetNames.find(
          (n) => n.trim().toUpperCase() === 'ASSESSMENT'
        );
        if (assessmentSheetName) {
          const assessmentSheet = workbook.Sheets[assessmentSheetName];
          const aRows: string[][] = XLSX.utils.sheet_to_json(assessmentSheet, {
            header: 1,
            defval: '',
          }) as string[][];

          // Build a flat map of field→value pairs (col A = key, col B = value).
          // Rows where col B is empty are section headers or recommendation items.
          let city = '';
          let province = '';
          let rekomendasiIndex = -1;

          for (let i = 0; i < aRows.length; i++) {
            const raw0 = String(aRows[i][0] ?? '').trim();
            const raw1 = String(aRows[i][1] ?? '').trim();

            if (!raw0) continue;

            if (raw0.toUpperCase() === 'REKOMENDASI' || raw0.toUpperCase() === 'RECOMMENDATIONS') {
              rekomendasiIndex = i;
              break;
            }

            // Skip header row
            if (raw0.toLowerCase() === 'field') continue;

            const key = raw0.toLowerCase();
            const mapped = PROFIL_KEY_MAP[key];
            if (mapped && raw1) {
              (profil as Record<string, string>)[mapped] = raw1;
            }

            // Capture city/province separately to combine into lokasi
            if (key === 'city' && raw1) city = raw1;
            if (key === 'province' && raw1) province = raw1;
          }

          // Combine city + province as lokasi if not already set
          if (!profil.lokasi) {
            const parts = [city, province].filter(Boolean);
            if (parts.length) profil.lokasi = parts.join(', ');
          }

          // Parse REKOMENDASI: text in col A after the header row
          if (rekomendasiIndex !== -1) {
            for (let i = rekomendasiIndex + 1; i < aRows.length && notes.length < 5; i++) {
              const text = String(aRows[i][0] ?? '').trim();
              if (text) notes.push(text);
            }
          }
        }

        resolve({ answers, notes, profil });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsArrayBuffer(file);
  });
}
