export interface FigmaComponentStatus {
  name: string;
  category: string;
  version: string;
  isDeprecated: boolean;
  devStatus: {
    type: string;
    description: string | null;
  } | null;
}
