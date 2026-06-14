class CreateAffiliates < ActiveRecord::Migration[7.2]
  def change
    create_table :affiliates do |t|
      t.string :name
      t.string :cpf
      t.string :email
      t.string :whatsapp
      t.string :cep
      t.string :street
      t.string :number
      t.string :complement
      t.string :neighborhood
      t.string :city
      t.string :state
      t.boolean :accepted_image_use
      t.datetime :accepted_at
      t.string :signature_name

      t.timestamps
    end
  end
end
