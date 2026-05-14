import Dexie, { Table } from 'dexie';

export interface MasjidEntity {
  id: number;
  name: string;
  version: number;
  profile_picture_url?: string | null;
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  monthly_schedule?: any; // The raw JSON script data returned in sync data
  is_default?: boolean;
}

export class AppDB extends Dexie {
  masjids!: Table<MasjidEntity, number>;

  constructor() {
    super('NoorTimeDB');
    this.version(1).stores({
      masjids: 'id, name, is_default' // Primary key and indexed props
    });
  }
}

export const db = new AppDB();
