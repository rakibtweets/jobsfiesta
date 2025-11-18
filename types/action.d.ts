interface ISignUpEmailParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeOnTerms: boolean;
  accountType: "candidate" | "employee";
}
