import { useRef, useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// import { parseExcel } from './utils/excelParser'; ga di pakai karena g pakai file excel
import type { SurveyAnswer, ProfilBisnis } from './utils/excelParser';
import { calculateScores } from './utils/scoreCalculator';
import type { SectionResult } from './utils/scoreCalculator';

import RadarChartComponent from './utils/RadarChartComponent';
import QuadrantChart from './utils/QuadrantChart';
import pbLogoPutih from "../../../public/probizlogoPNGputih-01.png"

// Toggle financial scale: set to true for max 4, false for max 100
const USE_FINANCIAL_MAX_4 = false;

// ---- Colour helpers ----

function getRatingLabel(score100: number): string {
    if (score100 >= 85) return 'Sangat Bagus';
    if (score100 >= 70) return 'Bagus';
    if (score100 >= 55) return 'Cukup';
    if (score100 >= 40) return 'Kurang';
    return 'Sangat Kurang';
}

function getRatingColor(score100: number): string {
    if (score100 >= 85) return '#1DB200'; // Sangat Bagus
    if (score100 >= 70) return '#D6E5BD'; // Bagus
    if (score100 >= 55) return '#FFDA31'; // Cukup
    if (score100 >= 40) return '#FFAD00'; // Kurang
    return '#EE210C';                     // Sangat Kurang
}

function getRatingBg(score100: number): string {
    if (score100 >= 85) return '#DCF2D6';
    if (score100 >= 70) return '#EFF4E5';
    if (score100 >= 55) return '#FFF6D0';
    if (score100 >= 40) return '#FFEBC2';
    return '#FBD5D0';
}

// Warna teks (lebih gelap dari getRatingColor) supaya terbaca di atas latar pastel getRatingBg.
function getRatingTextColor(score100: number): string {
    if (score100 >= 85) return '#127A00'; // hijau tua
    if (score100 >= 70) return '#5A7D2B'; // hijau olive tua (utk pastel Bagus)
    if (score100 >= 55) return '#8A6D00'; // kuning tua
    if (score100 >= 40) return '#8A5E00'; // amber tua
    return '#B5160A';                     // merah tua
}

function to100(score: number, isFinancial: boolean): number {
    if (isFinancial) {
        if (USE_FINANCIAL_MAX_4) return Math.round(((score - 1) / 3) * 100);
        return Math.round(score);
    }
    return Math.round(((score - 1) / 3) * 100);
}

function calcOverallScore(sv: number, fh: number, cd: number): number {
    const svN = to100(sv, false);
    const fhN = to100(fh, true);
    const cdN = to100(cd, false);
    return Math.round((svN + fhN + cdN) / 3);
}

function getKeterangan(score: number, isFinancial: boolean, _useMax4 = false): string {
    if (score <= 0) return '-';
    return getRatingLabel(to100(score, isFinancial));
}

function isBelowStandard(score: number, isFinancial: boolean): boolean {
    if (score <= 0) return false;
    const std = isFinancial ? (USE_FINANCIAL_MAX_4 ? 2.8 : 70) : 2.5;
    return score < std;
}

// Map keterangan label -> representative 0-100 score so badges reuse the
// single rating palette (getRatingColor/getRatingBg) shared with the legend.
function ketToScore100(ket: string): number {
    if (ket.includes('Sangat Bagus')) return 85;
    if (ket.includes('Bagus')) return 70;
    if (ket.includes('Cukup')) return 55;
    if (ket.includes('Kurang') && !ket.includes('Sangat')) return 40;

    return 0; // Sangat Kurang / '-'
}

function badgeColor(ket: string): string {
    return getRatingTextColor(ketToScore100(ket));
}

function badgeBg(ket: string): string {
    return getRatingBg(ketToScore100(ket));
}

function riskLevel(ket: string): 'HIGH' | 'MEDIUM' | null {
    if (ket.includes('Sangat Kurang')) return 'HIGH';
    if (ket.includes('Kurang')) return 'MEDIUM';
    return null;
}

// ---- Component ----

export default function AssessmentPage({ profilData, notesData, bhiScore, scoreData }: { profilData?: Partial<ProfilBisnis>; notesData?: string[]; bhiScore?: number; scoreData?: any }) {
    // const navigate = useNavigate();
    const resultsRef = useRef<HTMLDivElement>(null);
    const [answers] = useState<Record<string, SurveyAnswer> | null>(null);
    const [notes] = useState<string[]>([]);
    const [profil] = useState<Partial<ProfilBisnis>>({});
    // const [setError] = useState('');
    // const [setLoading] = useState(false);
    // const [setPdfLoading] = useState(false);
    // const [setFileName] = useState('');

    const results: SectionResult[] | null = useMemo(
        () => (answers ? calculateScores(answers, USE_FINANCIAL_MAX_4) : null),
        [answers]
    );

    // const FINANCIAL_STANDARD = USE_FINANCIAL_MAX_4 ? 2.8 : 70;

    const laporanId = useMemo(() => {
        const now = new Date();
        const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
        const rand = String(Math.floor(1000 + Math.random() * 9000));
        return `BHI-${ym}-${rand}`;
    }, []);

    const tanggalLaporan = useMemo(() => {
        return new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }, []);

    // function handleLogout() {
    //     sessionStorage.removeItem('auth');
    //     navigate('/');
    // }

    // async function handleFile(file: File) {
    //     // setError('');
    //     setAnswers(null);
    //     setNotes([]);
    //     setProfil({});
    //     // setFileName(file.name);
    //     // setLoading(true);
    //     try {
    //         const { answers: parsed, notes: parsedNotes, profil: parsedProfil } = await parseExcel(file);
    //         setAnswers(parsed);
    //         setNotes(parsedNotes);
    //         setProfil(parsedProfil);
    //     } catch (err) {
    //         // setError(err instanceof Error ? err.message : 'Failed to process file.');
    //     } finally {
    //         // setLoading(false);
    //     }
    // }

    // function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     const file = e.target.files?.[0];
    //     if (file) handleFile(file);
    // }

    // function onDrop(e: React.DragEvent) {
    //     e.preventDefault();
    //     const file = e.dataTransfer.files?.[0];
    //     if (file) handleFile(file);
    // }

    // async function downloadPDF() {
    //     if (!resultsRef.current) return;
    //     setPdfLoading(true);
    //     try {
    //         const canvas = await html2canvas(resultsRef.current, { scale: 2, useCORS: true });
    //         const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    //         const pageW = pdf.internal.pageSize.getWidth();
    //         const pageH = pdf.internal.pageSize.getHeight();
    //         const imgW = pageW - 20;
    //         const imgH = (canvas.height * imgW) / canvas.width;
    //         let remaining = imgH;
    //         let srcY = 0;
    //         while (remaining > 0) {
    //             const sliceH = Math.min(remaining, pageH - 20);
    //             const sliceCanvas = document.createElement('canvas');
    //             sliceCanvas.width = canvas.width;
    //             sliceCanvas.height = (sliceH / imgH) * canvas.height;
    //             const ctx = sliceCanvas.getContext('2d')!;
    //             ctx.drawImage(canvas, 0, srcY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);
    //             if (srcY > 0) pdf.addPage();
    //             pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', 10, 10, imgW, sliceH);
    //             srcY += sliceCanvas.height;
    //             remaining -= sliceH;
    //         }
    //         pdf.save('BHI_Assessment_Report.pdf');
    //     } finally {
    //         setPdfLoading(false);
    //     }
    // }

    // ---- Derived chart data ----
    const strategic = results?.find((r) => r.id === 'strategic');
    const financial = results?.find((r) => r.id === 'financial');
    const coreSections = results?.filter((r) => r.group === 'core') ?? [];

    const digitalizationAvg =
        coreSections.length > 0
            ? Number((coreSections.reduce((a, b) => a + b.score, 0) / coreSections.length).toFixed(2))
            : 0;

    const overallScore = results ? calcOverallScore(strategic?.score ?? 0, financial?.score ?? 0, digitalizationAvg) : (bhiScore ?? 0);

    const coreRadarData = coreSections.map((s) => ({ subject: s.name, value: s.score }));

    // All subsections with pillar context for risk flags
    const allSubsections: Array<{ pillar: string; name: string; score: number; ket: string }> = results
        ? [
            ...(strategic?.subsections.map((s) => ({
                pillar: 'Strategic Value',
                name: s.name,
                score: s.score,
                ket: getKeterangan(s.score, false),
            })) ?? []),
            ...(financial?.subsections.map((s) => ({
                pillar: 'Financial Health',
                name: s.name,
                score: s.score,
                ket: getKeterangan(s.score, true, USE_FINANCIAL_MAX_4),
            })) ?? []),
            ...coreSections.map((s) => ({
                pillar: 'Core Drivers',
                name: s.name,
                score: s.score,
                ket: getKeterangan(s.score, false),
            })),
        ]
        : [];

    const riskItems = allSubsections.filter((s) => riskLevel(s.ket) !== null);

    // const checkUpAnalisis = results
    //     ? getCheckUpAnalisis(strategic?.score ?? 0, financial?.score ?? 0, digitalizationAvg, FINANCIAL_STANDARD)
    //     : '';

    // const coreAnalisis = results
    //     ? getAnalisisText('manajemen', coreSections.map((s) => ({
    //         name: s.name, score: s.score, standard: 2.5, keterangan: '', answeredCount: 0, totalEnabled: 0,
    //     })), 2.5)
    //     : '';

    const hasApi = !results && !!scoreData;

    // Pillar scores (0-100) for display
    const svScore = hasApi
        ? (scoreData.pillar_scores?.strategic_value?.score ?? 0)
        : to100(strategic?.score ?? 0, false);
    const fhScore = hasApi
        ? (scoreData.pillar_scores?.financial_health?.score ?? 0)
        : to100(financial?.score ?? 0, true);
    const cdScore = hasApi
        ? (scoreData.pillar_scores?.core_drivers?.score ?? 0)
        : to100(digitalizationAvg, false);

    const displayOverall = hasApi ? (scoreData.bhi_summary?.score ?? 0) : overallScore;

    // MetrikColumn row arrays
    const svRows = hasApi
        ? (scoreData.detail_metrics?.strategic ?? []).map((m: any) => ({
            name: m.metrik,
            score: m.skor,
            unit: '/100',
            ket: m.status ?? '-',
            below: (m.status ?? '').includes('Kurang'),
        }))
        : (strategic?.subsections ?? []).map((s) => ({
            name: s.name,
            score: USE_FINANCIAL_MAX_4 ? s.score : to100(s.score, false),
            unit: USE_FINANCIAL_MAX_4 ? '/4' : '/100',
            ket: getKeterangan(s.score, false),
            below: isBelowStandard(s.score, false),
        }));

    const fhRows = hasApi
        ? (scoreData.detail_metrics?.financial ?? []).map((m: any) => ({
            name: m.metrik,
            score: m.skor,
            unit: '/100',
            ket: m.status ?? '-',
            below: (m.status ?? '').includes('Kurang'),
        }))
        : (financial?.subsections ?? []).map((s) => ({
            name: s.name,
            score: s.score,
            unit: USE_FINANCIAL_MAX_4 ? '/4' : '/100',
            ket: getKeterangan(s.score, true, USE_FINANCIAL_MAX_4),
            below: isBelowStandard(s.score, true),
        }));

    const cdRows = hasApi
        ? (scoreData.detail_metrics?.core ?? []).map((m: any) => ({
            name: m.subgroup,
            score: m.skor,
            unit: '/100',
            ket: m.status ?? '-',
            below: (m.status ?? '').includes('Kurang'),
        }))
        : coreSections.map((s) => ({
            name: s.name,
            score: USE_FINANCIAL_MAX_4 ? s.score : to100(s.score, false),
            unit: USE_FINANCIAL_MAX_4 ? '/4' : '/100',
            ket: getKeterangan(s.score, false),
            below: isBelowStandard(s.score, false),
        }));

    // Radar data
    const radarData = hasApi
        ? (scoreData.detail_metrics?.core ?? []).map((m: any) => ({ subject: m.metrik, value: m.skor }))
        : coreRadarData;

    // Risk flags
    const displayRiskItems = hasApi
        ? [
            ...(scoreData.detail_metrics?.strategic ?? []).map((m: any) => ({
                pillar: 'Strategic Value', name: m.metrik, score: m.skor, ket: m.status ?? '',
            })),
            ...(scoreData.detail_metrics?.financial ?? []).map((m: any) => ({
                pillar: 'Financial Health', name: m.metrik, score: m.skor, ket: m.status ?? '',
            })),
            ...(scoreData.detail_metrics?.core ?? []).map((m: any) => ({
                pillar: 'Core Drivers', name: m.metrik, score: m.skor, ket: m.status ?? '',
            })),
        ].filter((s) => riskLevel(s.ket) !== null)
        : riskItems;

    const mergedProfil = { ...profilData, ...profil };

    return (
        <div style={{ minHeight: '10vh', background: '#f4f6fa', fontFamily: 'Arial, sans-serif' }}
            className='rounded-xl'>
            {/* Top bar */}
            {/* <div style={topBarStyle}>
                <span style={{ fontWeight: 700, fontSize: 16, color: '#1f3864' }}>BHI Assessment</span>
                <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
            </div> */}

            <div style={{ maxWidth: 1220, margin: '0 auto', padding: '24px 16px', width: 1220 }}>
                {/* Upload area */}
                {/* <div
                    onDrop={onDrop}
                    onDragOver={(e) => e.preventDefault()}
                    style={uploadAreaStyle}
                    onClick={() => document.getElementById('file-input')?.click()}
                >
                    <input
                        id="file-input"
                        type="file"
                        accept=".xlsx,.xls"
                        style={{ display: 'none' }}
                        onChange={onInputChange}
                    />
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📂</div>
                    <p style={{ margin: 0, fontWeight: 600, color: '#1f3864' }}>
                        {fileName ? fileName : 'Upload Survey Excel File'}
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#888' }}>
                        Click or drag & drop an .xlsx file with a SURVEY_RESULT sheet
                    </p>
                </div> */}

                {/* {loading && <p style={{ textAlign: 'center', color: '#555' }}>Processing…</p>}
                {error && <p style={{ textAlign: 'center', color: '#c0392b' }}>{error}</p>} */}

                {/* {results && ( */}
                <>
                    {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                            <button onClick={downloadPDF} disabled={pdfLoading} style={pdfBtnStyle}>
                                {pdfLoading ? 'Generating PDF…' : '⬇ Download PDF'}
                            </button>
                        </div> */}

                    {/* ===== REPORT CARD ===== */}
                    <div ref={resultsRef} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>

                        {/* HEADER */}
                        <div style={{ background: '#5863A8', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                {/* <div style={{ background: '#fff', borderRadius: 6, padding: '6px 10px', fontWeight: 900, fontSize: 18, color: '#1f3864', lineHeight: 1 }}>
                                    BHI<sup style={{ fontSize: 10 }}>™</sup>
                                </div> */}
                                <img src={pbLogoPutih} alt="ProBiz360" style={{ height: 64, display: 'block' }} />
                                <div>
                                    <div style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: 1 }}>
                                        LAPORAN PENILAIAN BUSINESS HEALTH INDEX
                                    </div>
                                    <div style={{ color: '#a8c4e8', fontSize: 11 }}>
                                        Berdasarkan ProBiz Diagnostic Framework
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ color: '#a8c4e8', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Laporan ID</div>
                                <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{laporanId}</div>
                                <div style={{ color: '#a8c4e8', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>Tanggal Laporan</div>
                                <div style={{ color: '#fff', fontSize: 12 }}>{tanggalLaporan}</div>
                            </div>
                        </div>

                        {/* BODY — sidebar + main */}
                        <div style={{ display: 'flex', alignItems: 'stretch' }}>

                            {/* LEFT SIDEBAR */}
                            <div style={{ width: 190, flexShrink: 0, background: '#5863A8', padding: '20px 16px', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#fff', marginBottom: 8 }}>
                                    Ringkasan Skor
                                </div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', marginBottom: 2 }}>BHI SCORE</div>
                                <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, color: '#fff' }}>{displayOverall}</div>
                                <div style={{ fontSize: 12, color: '#fff', marginBottom: 8 }}>/100</div>
                                <div style={{
                                    display: 'inline-block',
                                    background: getRatingBg(displayOverall),
                                    color: getRatingTextColor(overallScore),
                                    fontWeight: 700,
                                    fontSize: 10,
                                    padding: '3px 10px',
                                    borderRadius: 12,
                                    marginBottom: 4,
                                }}>
                                    {getRatingLabel(displayOverall)}
                                </div>
                                <div style={{ fontSize: 9, color: '#fff', marginBottom: 20, lineHeight: 1.4 }}>
                                    Peringkat Kesehatan Bisnis
                                </div>

                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 14, marginBottom: 14 }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#fff', marginBottom: 8 }}>
                                        Profil Bisnis
                                    </div>
                                    {[
                                        { label: 'Nama Bisnis', value: mergedProfil.namaBisnis },
                                        { label: 'Kode Referral', value: profil.kodeReferral },
                                        { label: 'Industri', value: mergedProfil.industri?.toUpperCase() },
                                        { label: 'Skala Bisnis', value: mergedProfil.skalaBisnis?.toUpperCase() },
                                        { label: 'Lokasi', value: mergedProfil.lokasi },
                                        { label: 'Karyawan', value: mergedProfil.jumlahKaryawan },
                                    ].map(({ label, value }) => (
                                        <div key={label} style={{ marginBottom: 10 }}>
                                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
                                            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', wordBreak: 'break-word', lineHeight: 1.2 }}>{value || '—'}</div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 14 }}>
                                     <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#fff', marginBottom: 8 }}>
                                        Data Digunakan
                                    </div>
                                    {['Laporan Keuangan', 'Data Operasional', 'Data Penjualan', 'Wawancara & Kuesioner'].map((d) => (
                                        <div key={d} style={{ fontSize: 9, color: '#fff', lineHeight: 1.7 }}>• {d}</div>
                                    ))}
                                </div>
                            </div>

                            {/* MAIN CONTENT */}
                            <div style={{ flex: 1, padding: '20px 20px 0' }}>

                                {/* ROW 1: Pillar scores + Quadrant + Radar */}
                                <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>

                                    {/* Skor per Pilar */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <SectionTitle>Skor per Pilar</SectionTitle>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                            <PillarCard
                                                name="Strategic Value"
                                                score={svScore}
                                                unit="/100"
                                                score100={svScore}
                                                ket={getRatingLabel(svScore)}
                                            />
                                            <PillarCard
                                                name="Financial Health"
                                                score={fhScore}
                                                unit="/100"
                                                score100={fhScore}
                                                ket={getRatingLabel(fhScore)}
                                            />
                                            <PillarCard
                                                name="Core Drivers"
                                                score={cdScore}
                                                unit="/100"
                                                score100={cdScore}
                                                ket={getRatingLabel(cdScore)}
                                            />
                                        </div>
                                    </div>

                                    {/* Posisi Kuadran */}
                                    <div style={{ width: 260, flexShrink: 0 }}>
                                        <SectionTitle>Posisi Kuadran</SectionTitle>
                                        <QuadrantChart
                                            coreDrivers={cdScore}
                                            financialHealth={fhScore}
                                            strategicValue={svScore}
                                            financialMax={100}
                                            pointColor={getRatingColor(svScore)}
                                        />
                                    </div>

                                    {/* Radar Overview */}
                                    <div style={{ width: 260, flexShrink: 0 }}>
                                        <SectionTitle>Radar Overview</SectionTitle>
                                        <RadarChartComponent
                                            data={radarData}
                                            color="#5863A8"
                                            fillOpacity={0.3}
                                            width={260}
                                            height={200}
                                        />
                                    </div>
                                </div>

                                {/* ROW: Legend Skala Penilaian */}
                                <div style={{ marginBottom: 20 }}>
                                    <SectionTitle>Skala Penilaian</SectionTitle>
                                    <div style={{
                                        display: 'flex', flexWrap: 'wrap', gap: 10,
                                        padding: '12px 16px', borderRadius: 6,
                                        background: '#f8f9fb', border: '1px solid #e8ecf0',
                                    }}>
                                        {[
                                            { label: 'Sangat Bagus', range: '≥ 85', score: 85 },
                                            { label: 'Bagus', range: '≥ 70', score: 70 },
                                            { label: 'Cukup', range: '≥ 55', score: 55 },
                                            { label: 'Kurang', range: '≥ 40', score: 40 },
                                            { label: 'Sangat Kurang', range: '< 40', score: 0 },

                                        ].map((item) => {
                                            const c = getRatingColor(item.score);
                                            return (
                                                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6, flex: '1 1 0', minWidth: 120 }}>
                                                    <span style={{ width: 12, height: 12, borderRadius: 3, background: c, flexShrink: 0 }} />
                                                    <span style={{ fontSize: 11, color: '#333' }}>
                                                        <strong style={{ color: getRatingTextColor(item.score) }}>{item.range}</strong> {item.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* ROW 2: Detail Skor per Metrik */}
                                <div style={{ marginBottom: 20 }}>
                                    <SectionTitle>Detail Skor per Metrik</SectionTitle>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                        <MetrikColumn
                                            title="Strategic Value"
                                            color="#2980b9"
                                            rows={svRows}
                                        />
                                        <MetrikColumn
                                            title="Financial Health"
                                            color="#5863A8"
                                            rows={fhRows}
                                        />
                                        <MetrikColumn
                                            title="Core Drivers"
                                            color="#5863A8"
                                            rows={cdRows}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* RISK FLAGS — full width, 2 columns */}
                        <div style={{ padding: '16px 20px', borderTop: '1px solid #e8ecf0' }}>
                            <SectionTitle>Risk Flags</SectionTitle>
                            {displayRiskItems.length === 0 ? (
                                <div style={{ fontSize: 12, color: '#27ae60' }}>✓ Tidak ada area yang berisiko.</div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 16, alignItems: 'start' }}>
                                    {[
                                        displayRiskItems.slice(0, Math.ceil(displayRiskItems.length / 2)),
                                        displayRiskItems.slice(Math.ceil(displayRiskItems.length / 2)),
                                    ].map((col, ci) => (
                                        <div key={ci}>
                                            {col.map((item, i) => {
                                                const level = riskLevel(item.ket)!;
                                                const isHigh = level === 'HIGH';
                                                return (
                                                    <div key={`${ci}-${i}`} style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: 8,
                                                        marginBottom: 5,
                                                        padding: '4px 8px',
                                                        background: '#EEF0FB',
                                                        borderRadius: 6,
                                                        borderLeft: `3px solid ${isHigh ? '#c0392b' : '#d68910'}`,
                                                    }}>
                                                        <div style={{ fontSize: 11, marginTop: 1 }}>{isHigh ? '🔴' : '🟡'}</div>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontSize: 10, fontWeight: 700, color: '#333' }}>{item.name}</div>
                                                            <div style={{ fontSize: 9, color: '#666' }}>{item.pillar} — {item.ket}</div>
                                                        </div>
                                                        <div style={{
                                                            fontSize: 8,
                                                            fontWeight: 700,
                                                            color: isHigh ? '#c0392b' : '#d68910',
                                                            background: isHigh ? '#fadbd8' : '#fdebd0',
                                                            padding: '1px 6px',
                                                            borderRadius: 10,
                                                            whiteSpace: 'nowrap',
                                                        }}>
                                                            {level}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* KEY INSIGHTS & REKOMENDASI — full width */}
                        <div style={{ padding: '16px 20px', borderTop: '1px solid #e8ecf0' }}>
                            <SectionTitle>Key Insights &amp; Rekomendasi</SectionTitle>
                            {/* <div style={{ fontSize: 11, color: '#333', lineHeight: 1.7, marginBottom: 10 }}>
                                {checkUpAnalisis}
                            </div> */}
                            {/* {coreAnalisis && (
                                <div style={{ fontSize: 11, color: '#333', lineHeight: 1.7, marginBottom: 10 }}>
                                    {coreAnalisis}
                                </div>
                            )} */}
                            {([...notes, ...(notesData ?? [])].filter(Boolean)).length > 0 && (
                                <div style={{ marginTop: 10 }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: '#1f3864', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                        Rekomendasi
                                    </div>
                                    {[...notes, ...(notesData ?? [])].filter(Boolean).map((note, i) => (
                                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                                            <div style={{ fontSize: 13, color: '#1f3864', marginTop: 1 }}>›</div>
                                            <div style={{ fontSize: 11, color: '#333', lineHeight: 1.5 }}>{note}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        {/* FOOTER */}
                        <div style={{ background: '#f8f9fa', borderTop: '1px solid #e8ecf0', padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: 9, color: '#999', maxWidth: 500 }}>
                                Laporan ini disusun berdasarkan data survei yang diinput. Skor ini bukan merupakan jaminan kelayakan kredit atau rekomendasi investasi.
                            </div>
                            <div style={{ fontSize: 9, color: '#aaa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Powered by BHI Assessment™
                            </div>
                        </div>

                    </div>
                </>
                {/* )} */}
            </div>
        </div>
    );
}

// ---- Sub-components ----

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: '#1f3864',
            borderBottom: '2px solid #1f3864',
            paddingBottom: 4,
            marginBottom: 10,
        }}>
            {children}
        </div>
    );
}

function PillarCard({
    name,
    score,
    unit,
    score100,
    ket,
}: {
    name: string;
    score: number;
    unit: string;
    score100: number;
    ket: string;
}) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            background: '#f8f9fb',
            borderRadius: 6,
            borderLeft: `4px solid #5863A8`,
        }}>
            <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#5863A8' }}>{name}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#1f3864', lineHeight: 1.2 }}>
                    {typeof score === 'number' ? (unit === '/100' ? Math.round(score) : score.toFixed(2)) : '—'}
                    <span style={{ fontSize: 11, fontWeight: 400, color: '#888' }}>{unit}</span>
                </div>
            </div>
            <div style={{
                background: badgeBg(ket),
                color: badgeColor(ket),
                fontSize: 10,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 12,
                textAlign: 'center',
            }}>
                {ket}
                <div style={{ fontSize: 8, fontWeight: 400, opacity: 0.8 }}>{score100}/100</div>
            </div>
        </div>
    );
}

function MetrikColumn({
    title,
    color,
    rows,
}: {
    title: string;
    color: string;
    rows: Array<{ name: string; score: number; unit: string; ket: string; below: boolean }>;
}) {
    return (
        <div>
            <div style={{
                background: color,
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                padding: '5px 8px',
                borderRadius: '4px 4px 0 0',
                letterSpacing: 0.3,
            }}>
                {title}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
                <thead>
                    <tr style={{ background: '#f0f3f8' }}>
                        <th style={thStyle}>Metrik</th>
                        <th style={{ ...thStyle, textAlign: 'center', width: 46 }}>Skor</th>
                        <th style={{ ...thStyle, textAlign: 'center', width: 70 }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} style={{ background: '#EEF0FB' }}>
                            <td style={tdStyle}>{row.name}</td>
                            <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 700 }}>
                                {row.unit === '/100' ? Math.round(row.score) : row.score.toFixed(2)}
                            </td>
                            <td style={{ ...tdStyle, textAlign: 'center', padding: '3px 4px' }}>
                                <span style={{
                                    display: 'inline-block',
                                    background: badgeBg(row.ket),
                                    color: badgeColor(row.ket),
                                    fontSize: 8,
                                    fontWeight: 700,
                                    padding: '2px 5px',
                                    borderRadius: 8,
                                    whiteSpace: 'nowrap',
                                }}>
                                    {row.ket}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ---- Utility ----

// function getCheckUpAnalisis(sv: number, fh: number, cd: number, financialStandard = 70): string {
//     const lines: string[] = [];
//     if (sv >= 2.5) {
//         lines.push('Perusahaan memiliki Strategic Value yang sangat baik, artinya secara potensi produk jika dikelola dengan baik dapat jauh berkembang.');
//     } else {
//         lines.push('Perusahaan perlu meningkatkan Strategic Value untuk memperkuat potensi pertumbuhan bisnisnya.');
//     }
//     if (fh < financialStandard) {
//         lines.push('Namun secara Financial Health perusahaan masih memiliki beberapa permasalahan keuangan yang perlu diselesaikan.');
//     } else {
//         lines.push('Perusahaan memiliki kondisi Financial Health yang baik.');
//     }
//     if (cd >= 2.5) {
//         lines.push('Dari sisi Core Drivers, perusahaan telah menjalankan berbagai fungsi manajemen usahanya dengan sangat baik.');
//     } else {
//         lines.push('Dari sisi Core Drivers, perusahaan masih perlu meningkatkan berbagai fungsi manajemen usahanya.');
//     }
//     return lines.join(' ');
// }

// ---- Styles ----

// const topBarStyle: React.CSSProperties = {
//     background: '#fff',
//     borderBottom: '1px solid #e0e0e0',
//     padding: '12px 24px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
// };

// const logoutBtnStyle: React.CSSProperties = {
//     background: 'transparent',
//     border: '1px solid #ccc',
//     borderRadius: 6,
//     padding: '6px 14px',
//     cursor: 'pointer',
//     fontSize: 13,
//     color: '#555',
// };

// const uploadAreaStyle: React.CSSProperties = {
//     border: '2px dashed #ccc',
//     borderRadius: 12,
//     padding: '32px',
//     textAlign: 'center',
//     cursor: 'pointer',
//     background: '#fafbff',
//     marginBottom: 24,
//     transition: 'border-color 0.2s',
// };

// const pdfBtnStyle: React.CSSProperties = {
//     background: '#1f3864',
//     color: '#fff',
//     border: 'none',
//     borderRadius: 8,
//     padding: '10px 20px',
//     cursor: 'pointer',
//     fontSize: 14,
//     fontWeight: 600,
// };

const thStyle: React.CSSProperties = {
    padding: '4px 6px',
    textAlign: 'left',
    fontWeight: 700,
    color: '#555',
    borderBottom: '1px solid #dde3ec',
    fontSize: 9,
};

const tdStyle: React.CSSProperties = {
    padding: '4px 6px',
    borderBottom: '1px solid rgba(255,255,255,0.4)',
    color: '#333',
    verticalAlign: 'middle',
};
