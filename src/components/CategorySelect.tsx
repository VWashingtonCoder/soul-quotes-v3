type SelectProps = {
  label: string;
  btnClick: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const categories = [
  { key: "all", label: "All Categories" },
  { key: "inspirational", label: "Inspirational" },
  { key: "love", label: "Love/Relationships" },
  { key: "philosophy", label: "Philosophy" },
  { key: "success", label: "Career/Success" },
  { key: "funny", label: "Funny" },
];

const CategorySelect = ({ label, btnClick, value, onChange }: SelectProps) => {
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
        {categories.map((category) => (
          <option key={category.key} value={category.key}>
            {category.label}
          </option>
        ))}
      </select>
      <button
        className="search-btn"
        onClick={(e) => {
          e.preventDefault();
          btnClick();
        }}
      >
        Filter/Search
      </button>
    </div>
  );
};

export default CategorySelect;
