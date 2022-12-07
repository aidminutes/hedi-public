export interface EmailLink {
  id: string;
  emailSubject: string;
  email: string;
  emailBody?: string;
  addMetaData: boolean;
  beforeText?: string;
  linkText: string;
  afterText?: string;
}
