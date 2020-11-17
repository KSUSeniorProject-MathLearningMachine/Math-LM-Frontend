export interface iHomePageState {
  takingPhoto: boolean;
  solutionData: iSolvedImage;
  showOutput: boolean;
  loading: boolean;
}

export interface iSolvedImage {
  confidence: string;
  input_detected: string;
  solved: string;
}

export interface iModalAction {
  text: string;
  type: 'Primary' | 'Subtle' | 'Cancel';
  value: string;
}

export interface iSolved {
  solved: string;
}
