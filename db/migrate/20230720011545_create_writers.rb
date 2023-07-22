class CreateWriters < ActiveRecord::Migration[6.0]
  def up
    create_table :writers do |t|
      t.string :name
      t.string :document

      t.timestamps
    end
  end

  def down
    drop_table :writers
  end
end
