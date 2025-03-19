class CreateKpts < ActiveRecord::Migration[7.1]
  def change
    create_table :kpts do |t|
      t.references :user, foreign_key: true
      t.date :date, null: false
      t.text :keep
      t.text :problem
      t.text :try
      t.timestamps
    end

    add_index :kpts, [:user_id, :date], unique: true
  end
end
