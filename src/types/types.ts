export interface Location {
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
}

export interface AutonomousSystem {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
}

export interface ProxyInfo {
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
}

export interface IPInfo {
  ip: string;
  location: Location;
  domains: string[];
  as: AutonomousSystem;
  isp: string;
  proxy: ProxyInfo;
}
