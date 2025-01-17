export interface IDocumentBase {
    fullName: string;
    dob: Date;
    verified?: boolean;
    verifiedAt?: Date;
  }
  
  export interface IAadharDocument extends IDocumentBase {
    aadharNumber: string;
  }
  
  export interface IPanDocument extends IDocumentBase {
    panNumber: string;
  }
  
  export interface IDematDocument extends IDocumentBase {
    dematNumber: string;
  }
  
  export interface IDocuments {
    aadhar?: IAadharDocument;
    pan?: IPanDocument;
    demat?: IDematDocument;
  }
  
  