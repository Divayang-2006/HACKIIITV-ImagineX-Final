
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        onClick={() => onSelectCategory('all')}
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        className={selectedCategory === 'all' ? 'bg-farm-green hover:bg-farm-green-dark' : ''}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onSelectCategory(category)}
          variant={selectedCategory === category ? 'default' : 'outline'}
          className={selectedCategory === category ? 'bg-farm-green hover:bg-farm-green-dark' : ''}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default ProductFilter;
