class Writer < ApplicationRecord
  has_many :books

  validates :name, :document, presence: true
  validates :document, uniqueness: true
end
