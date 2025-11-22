interface ISignUpEmailParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeOnTerms: boolean;
  accountType: "candidate" | "employee";
}

interface ISignInEmailParams {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface PaginatedSearchParams {
  search?: string;
  country?: string;
  status?: string;
  skill?: string;
  page?: number;
  location?: string;
  jobType?: string;
  filter?: string;
  limit?: number;
}

interface PaginationResponse {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}
