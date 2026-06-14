class Affiliate < ApplicationRecord
	validates :name, :cpf, :email, :whatsapp, :signature_name, presence: true
	validates :accepted_image_use, inclusion: { in: [true], message: 'must be accepted' }
end
