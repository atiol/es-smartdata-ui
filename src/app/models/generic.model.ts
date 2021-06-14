export interface IGenericModel {
  id: number;
  name: string;
  formerName?: string;
  streetAddress?: string;
  city?: string;
  market: string;
  state: string;
  lat?: number;
  lng?: number;
}
