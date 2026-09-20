export interface Brochure {
  title: string;
  url: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  brochures: Brochure[];
}

export type Category = 'All' | 'Mechanical' | 'Ultrasonic' | 'Bulk/Industrial';

export const getCategories = (id: string): Category[] => {
  const categories: Category[] = [];
  if (['ds-trp', 'ds-asd', 'composite-ds-trp'].includes(id)) categories.push('Mechanical');
  if (['electo-sonic', 'e-bulk'].includes(id)) categories.push('Ultrasonic');
  if (['wmap-evo', 'e-bulk', 'wt'].includes(id)) categories.push('Bulk/Industrial');
  return categories;
};
