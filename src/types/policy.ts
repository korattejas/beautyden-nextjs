export type PolicyType =
  | "payment_policy"
  | "privacy_policy"
  | "terms_conditions";

export interface Policy {
  id: number;
  type: PolicyType;
  description: string;
}

export interface PolicyResponse {
  code: number;
  status: boolean;
  message: string;
  data: Policy[];
}
