export default interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  city: string | null;
  state: string | null;
  safe_email: string;
  email: string;
  full_name?: string;
  initials?: string;
  logins: Date[] | { date: string }[];
}
