export interface SubmissionsResponse {
  competition: string;
  payment_status: string;
  current_stageID: number;
  current_stage: string;
  next_stage: string;
  stages: IStage[];
}

export interface IStage {
  stage_name: string;
  stage_deadline: string;
  link_submission: string;
  status_submission: string;
}

export interface PostSubmissionsResponse {
  gdrive_link: string;
}
export interface PostPaymentResponse {
  data: FormData;
}
