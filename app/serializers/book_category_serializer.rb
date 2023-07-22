class BookCategorySerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name
end
