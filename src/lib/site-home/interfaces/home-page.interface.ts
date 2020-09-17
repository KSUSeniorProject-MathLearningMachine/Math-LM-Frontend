export interface iHomePageState {
  takingPhoto: boolean;
  solutionData: iSolvedImage;
  showOutput: boolean;
}

export interface iSolvedImage {
  confidence: string;
  input_detected: string;
  solved: string;
}
