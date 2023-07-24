# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
require 'faker'

User.create(name: 'Anna', email: 'anna@anna.com', password: '!12345678@')

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

sum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tortor eros, pulvinar quis tincidunt vestibulum, facilisis nec risus. Sed efficitur, nibh non feugiat vestibulum, sapien nisi ultricies enim, a facilisis tellus tellus non lacus. Cras ut laoreet felis, at faucibus odio. Ut eget purus quam. Pellentesque et enim a libero dignissim bibendum. Nam et vehicula mi. Praesent pellentesque tristique nisl, sed varius mauris mattis eu. Cras efficitur lorem eu nunc scelerisque euismod. Vivamus ultrices sem quis dolor lacinia feugiat ornare consequat metus. Proin tortor dolor, euismod a vulputate eget, pharetra sed diam. Sed tempus arcu ac arcu vulputate scelerisque. Pellentesque sed ligula ut nisl pellentesque aliquam et at nisl. Fusce viverra sem ut neque rhoncus vestibulum."

BookCategory.all.each do |category|
  Writer.all.each do |writer|
    Book.create(
      isbn: Faker::Number.number(digits: 13), 
      title: Faker::Book.title, 
      publish_date: Faker::Date.between(from: 10.years.ago, to: Date.today),
      summary: sum,
      writer_id: writer.id, 
      book_category_id: category.id
    )
  end
end
