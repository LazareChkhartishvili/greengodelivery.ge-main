export interface SessionUser {
  user: {
    success: boolean;
    data: {
      token: string;
      name: string;
    };
    message: string;
    id: string;
  };
}

export interface CategoryResponseType {
  description_en: string;
  description_ka: string;
  name_en: string;
  name_ka: string;
  picture: string | null;
  show_count: string;
  slug: string;
  svg: string | null;
}

export interface ProductType {
  id: number;
  description_en: string | null;
  description_ka: string | null;
  name_en: string;
  name_ka: string;
  old_price: string;
  picture: string;
  price: string;
  product_category_name_en: string | null;
  product_category_name_ka: string | null;
  product_category_slug: string;
  show_count: string;
  status: number;
}

export interface ProductCategoryType {
  slug: string;
  name_ka: string;
  name_en: string | null;
  description_ka: string | null;
  description_en: string | null;
  picture: string | null;
  icon: string | null;
  show_count: string;
  products: ProductType[];
  status: number | null;
}

export interface CityType {
  id: number;
  name_ka: string;
  name_en: string | null;
  slug: string;
}

export interface CompanyResponseType {
  slug: string;
  name_ka: string;
  name_en: string | null;
  description_ka: string | null;
  description_en: string | null;
  category_id: number;
  category_name_ka: string;
  category_name_en: string;
  category_slug: string;
  city_name_ka: string;
  city_name_en: string;
  city_slug: string;
  address_ka: string | null;
  address_en: string | null;
  address_latitude: number | null;
  address_longitude: number | null;
  phone: string | null;
  email: string | null;
  soc_facebook: string | null;
  soc_instagram: string | null;
  soc_youtobe: string | null;
  picture: string | null;
  product_category: ProductCategoryType[];
  show_count: string;
}
