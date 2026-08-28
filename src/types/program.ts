export interface ProgramWeek {
  week: number;
  routine: string;
}

export interface Program {
  key: string;
  version: number;
  name: string;
  description: string;
  weeks: ProgramWeek[];
}
