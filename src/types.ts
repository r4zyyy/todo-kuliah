// === Type alias + union type ===
export type Status = "Belum Selesai" | "Selesai";

// === Interface dengan primitive types: string, number, boolean ===
export interface Task {
  id: number;          // number — unique identifier
  judul: string;       // string — judul tugas
  matkul: string;      // string — nama mata kuliah
  deadline: string;    // string — tanggal deadline (ISO date string)
  status: Status;      // union type — status tugas
  selesai: boolean;    // boolean — flag penanda selesai
}
