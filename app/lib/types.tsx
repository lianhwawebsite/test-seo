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
export interface Product {
  id: string;
  name: string;
  alternativeName: string;
  type: string;
  animals: string[];
  medicineCode?: string;
  ingredientsNote?: string;
  mainIngredients?: { name?: string; amount?: string }[];
  ingredientsNoteSecond?: string;
  mainIngredientsSecond?: { name?: string; amount?: string }[];
  indications?: string;
  dosageAndAdministration?: string;
  precautions?: { id: string; precaution: string }[];
  packaging?: string;
  licenseUrl?: string;
  animalCategories?: string[];
}

export interface AnimalGroup {
  label: string;
  children: string[];
}

export interface AllData {
  navbarItems: {
    label: string;
    href: string;
  }[];
  footerItems: {
    name: string;
    label: string;
    href?: string;
  }[];
  home: {
    title: string;
    description: string;
    imgSrcPc: string;
    imgSrcMo: string;
    services: {
      id: string;
      title: string;
      description: string;
      imgSrcPc?: string;
      imgSrcMo?: string;
      imgSrc?: string;
    }[];
  };
  products: Product[];
}