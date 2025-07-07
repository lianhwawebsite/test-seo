export interface Service {
  id?: string;
  title: string;
  description: string;
  imgSrcPc?: string;
  imgSrcMo?: string;
  imgSrc?: string;
}

export interface NavbarItem {
  label: string;
  href: string;
}