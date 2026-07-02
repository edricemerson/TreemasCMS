/**
 * API service untuk mengirim data form Informasi Perusahaan ke backend Express.
 * Base URL dari env: VITE_API_URL (default di dev: http://localhost:5000)
 */

export interface CompanyInfoPayload {
  namaUmkm: string;
  produkUtama: string;
  alamat: string;
  kotaKabupaten: string;
  kategoriCheckUp: string;
  industri: string;
  provinsi: string;
  namaKontak: string;
  jabatan: string;
  email: string;
  nomorTelepon: string;
  website: string;
  ukuranPerusahaan: string;
  tantanganBisnis: string;
  tujuanBisnis: string;
}

const getBaseUrl = () => {
  return import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
};

export async function submitCompanyInfo(data: CompanyInfoPayload): Promise<{ id: number }> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/company-info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    let message = `Error ${res.status}`;
    try {
      const json = JSON.parse(text);
      if (json.message) message = json.message;
      else if (json.error) message = json.error;
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }

  return res.json();
}
