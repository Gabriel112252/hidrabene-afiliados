class AddTiktokToAffiliates < ActiveRecord::Migration[7.2]
  def change
    add_column :affiliates, :tiktok, :string
  end
end
