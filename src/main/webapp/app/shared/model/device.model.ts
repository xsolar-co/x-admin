import { IHome } from 'app/shared/model/home.model';

export interface IDevice {
  id?: number;
  deviceID?: string | null;
  deviceName?: string | null;
  deviceType?: string | null;
  deviceDesc?: string | null;
  deviceStatus?: string | null;
  mqttServerName?: string | null;
  mqttServerTopic?: string | null;
  home?: IHome | null;
}

export const defaultValue: Readonly<IDevice> = {};
