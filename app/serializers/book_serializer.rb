class BookSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :isbn, :summary

  attribute :writer do |object|
    "#{object.writer.name}"
  end

  attribute :book_category do |object|
    "#{object.book_category.name}"
  end

  attribute :publish_date do |object|
    "#{object.publish_date.strftime("%d/%m/%Y")}"
  end
end
