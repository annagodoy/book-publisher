# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
require 'faker'

BookCategory.create([ 
  { name: 'Artes'}, 
  { name: 'Gastronomia e Culinária'}, 
  { name: 'Literatura e Ficção'},
  { name: 'Romance'}
])  

writers = [
  { name: 'Carlos Drummond de Andrade'},
  { name: 'Conceição Evaristo'},
  { name: 'Adélia Prado'},
  { name: 'Cora Coralina'},
]

writers.each do |writer|
  Writer.create(name: writer[:name], document: Faker::IDNumber.brazilian_citizen_number)
end


BookCategory.all.each do |category|
  Writer.all.each do |writer|
    Book.create(
      isbn: Faker::Number.number(digits: 13), 
      title: Faker::Book.title, 
      publish_date: Faker::Date.between(from: 10.years.ago, to: Date.today),
      summary: Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 4),
      writer_id: writer.id, 
      book_category_id: category.id
    )
  end
end
