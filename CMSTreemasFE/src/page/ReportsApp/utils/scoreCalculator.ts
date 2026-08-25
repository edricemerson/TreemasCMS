// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { surveyData } from './data/surveyQuestions.js';
import type { SurveyAnswer } from './excelParser';

interface SurveyOption {
  value: number;
  label: string;
}

interface SurveyQuestion {
  id: string;
  order: number;
  enabled: boolean;
  text: string;
  options: SurveyOption[];
}

interface SurveySubsection {
  id: string;
  order: number;
  name: string;
  questions: SurveyQuestion[];
}

type SurveySection = {
  id: string;
  order: number;
  weight: number;
  group: string;
  name: string;
  fullName: string;
  subsections: SurveySubsection[];
};

export interface SubsectionScore {
  name: string;
  score: number; // 1–4 for radar sections, 0–100 for financial
  standard: number;
  keterangan: string;
  answeredCount: number;
  totalEnabled: number;
}

export interface SectionResult {
  id: string;
  name: string;
  group: string;
  score: number;
  subsections: SubsectionScore[];
}

function getKeteranganRadar(score: number): string {
  if (score >= 3.5) return 'Sangat Bagus (Jauh di atas standard)';
  if (score >= 2.5) return 'Bagus (Sedikit di atas standard)';
  if (score >= 1.5) return 'Kurang (Jauh di bawah standard)';
  return 'Sangat Kurang (Sangat jauh di bawah standard)';
}

function getKeteranganFinancial(score: number): string {
  if (score >= 85) return 'Sangat Bagus (Jauh di atas standard)';
  if (score >= 70) return 'Bagus (Sedikit di atas standard)';
  if (score >= 55) return 'Kurang (Jauh di bawah standard)';
  return 'Sangat Kurang (Sangat jauh di bawah standard)';
}

function getKeteranganFinancialMax4(score: number): string {
  if (score >= 3.4) return 'Sangat Bagus (Jauh di atas standard)';
  if (score >= 2.8) return 'Bagus (Sedikit di atas standard)';
  if (score >= 2.2) return 'Kurang (Jauh di bawah standard)';
  return 'Sangat Kurang (Sangat jauh di bawah standard)';
}

function avg(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function calculateScores(answers: Record<string, SurveyAnswer>, useMax4 = false): SectionResult[] {
  return (surveyData as SurveySection[]).map((section) => {
    const isFinancial = section.group === 'financial';
    const STANDARD_RADAR = 2.5;
    const STANDARD_FINANCIAL = useMax4 ? 2.8 : 70;

    const subsections: SubsectionScore[] = section.subsections.map((sub) => {
      const enabledQs = sub.questions.filter((q) => q.enabled);
      const values = enabledQs
        .map((q) => answers[q.id]?.nilai)
        .filter((v: number | undefined): v is number => v !== undefined && !isNaN(v));

      const rawScore = avg(values); // 1–4
      const score = isFinancial ? (useMax4 ? rawScore : rawScore * 25) : rawScore;
      const standard = isFinancial ? STANDARD_FINANCIAL : STANDARD_RADAR;
      const keterangan =
        score <= 0
          ? ''
          : isFinancial
          ? (useMax4 ? getKeteranganFinancialMax4(score) : getKeteranganFinancial(score))
          : getKeteranganRadar(score);

      return {
        name: sub.name,
        score: Number(score.toFixed(2)),
        standard,
        keterangan,
        answeredCount: values.length,
        totalEnabled: enabledQs.length,
      };
    });

    const subsectionScores = subsections.map((s) => s.score).filter((s) => s > 0);
    const sectionScore = Number(avg(subsectionScores).toFixed(2));

    return {
      id: section.id,
      name: section.name,
      group: section.group,
      score: sectionScore,
      subsections,
    };
  });
}

export function getAnalisisText(
  metricName: string,
  subsections: SubsectionScore[],
  standard: number
): string {
  const below = subsections.filter((s) => s.score < standard && s.score > 0);
  const above = subsections.filter((s) => s.score >= standard);

  if (below.length === 0) {
    return `Perusahaan secara umum sudah menjalankan ${metricName} dengan sangat baik di semua area.`;
  }

  const belowNames = below.map((s) => s.name).join(', ');
  const aboveNames = above.map((s) => s.name).join(', ');

  let text = `Perusahaan secara umum sudah menjalankan fungsi ${metricName} dengan baik.`;
  text += ` Beberapa hal yang masih berpotensi untuk ditingkatkan antara lain: ${belowNames}.`;
  if (above.length > 0) {
    text += ` Sementara itu beberapa hal yang sudah baik namun masih bisa untuk ditingkatkan lagi antara lain: ${aboveNames}.`;
  }
  return text;
}
