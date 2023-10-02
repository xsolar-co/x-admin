import { IHome } from 'app/shared/model/home.model';

export interface ILocation {
  id?: number;
  locID?: string | null;
  locName?: string | null;
  locDesc?: string | null;
  home?: IHome | null;
}

export const defaultValue: Readonly<ILocation> = {};
