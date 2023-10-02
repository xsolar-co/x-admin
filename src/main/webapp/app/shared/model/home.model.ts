import { IDevice } from 'app/shared/model/device.model';
import { ILocation } from 'app/shared/model/location.model';

export interface IHome {
  id?: number;
  homeId?: string | null;
  homeDesc?: string | null;
  homeAddress?: string | null;
  lastUpdate?: string | null;
  devices?: IDevice[] | null;
  locations?: ILocation[] | null;
}

export const defaultValue: Readonly<IHome> = {};
