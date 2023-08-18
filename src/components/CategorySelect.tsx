type SelectProps = {
    label: string;
    page: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClick: () => void;
  };
  
  const categories = [
    { key: "all", label: "All Categories" },
    { key: "inspirational", label: "Inspirational" },
    { key: "love", label: "Love/Relationships" },
    { key: "philosophy", label: "Philosophy" },
    { key: "success", label: "Career/Success" },
    { key: "funny", label: "Funny" },
  ];
  
  const CategorySelect = ({ 
    label,
    page,
    value,
    onChange,
    onClick, 
}: SelectProps) => {
    const categoryMap = page !== "create" ? categories : categories.slice(1);

    return (
      <div className="category-search">
        <label className="category-label" htmlFor="category">
          {label}
        </label>
        <select
          className="category-select"
          id="category"
          value={value}
          onChange={onChange}
        >
          {categoryMap.map((category) => (
            <option key={category.key} value={category.key}>
              {category.label}
            </option>
          ))}
        </select>
        {page !== "create" && (
            <button
            className="search-btn"
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
          >
            Search
          </button>    
        )}
      </div>
    );
  };
  
  export default CategorySelect;
  