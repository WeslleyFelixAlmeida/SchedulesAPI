export type multipleSchedulesType = {
  days: { day: number; schedules: string[] }[];
  month: number;
  image: Blob;
  name: string;
  shortDescription: string;
  longDescription: string;
};

export type uniqueSchedulesType = {
  day: number;
  maxAmount: number;
  month: number;
  image: Blob;
  name: string;
  shortDescription: string;
  longDescription: string;
};
