import { ResourceOwner } from "./auth";

export interface StudyBase {
  title: string;
  institution: string;
  completionDate: string;
}

export interface Study extends StudyBase {
  id: number;
  userId: number;
}

export interface CreateStudyRequest extends StudyBase {
  UserId?: number;
}

export interface UpdateStudyRequest extends StudyBase {}

export interface UseStudiesOptions {
  owner: ResourceOwner;
  onActionSuccess?: () => Promise<void>;
  skipFetch?: boolean;
}