class CreateBook < ActiveRecord::Migration[6.0]
  def up
    create_table :books do |t|
      t.belongs_to :writer, null: false, foreign_key: true
      t.belongs_to :book_category, null: false, foreign_key: true
      t.string     :isbn
      t.string     :title
      t.datetime   :publish_date
      t.text       :summary

      t.timestamps
    end
  end

  def down
    drop_table :books
  end
end
