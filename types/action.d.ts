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
