class Book < ApplicationRecord
  
  belongs_to :writer
  belongs_to :book_category

  validates :isbn, :title, :publish_date, presence: true
  validates :isbn, uniqueness: true

  scope :search, -> (query) do
    self.joins('
      INNER JOIN "writers" ON "writers"."id" = "books"."writer_id" 
      INNER JOIN "book_categories" ON "book_categories"."id" = "books"."book_category_id" 
    ')
    .where('isbn LIKE :query OR title LIKE :query OR CAST(publish_date AS text) LIKE :query OR writers.name LIKE :query OR book_categories.name LIKE :query', query: "%#{query}%")
  end
end
