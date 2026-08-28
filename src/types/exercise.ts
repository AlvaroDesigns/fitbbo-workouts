export interface Exercise {
  id: string;
  name: string;
  category: string;
  body_part: string;
  equipment: string;
  instructions: Record<string, string>;
  instruction_steps: string[] | Record<string, string[]>;
  muscle_group: string | string[];
  secondary_muscles: string[];
  target: string;
  image: string;
  gif_url: string;
  media_id?: string;
  created_at?: string;
  attribution?: string;
}
