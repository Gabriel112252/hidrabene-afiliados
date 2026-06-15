class Affiliate < ApplicationRecord
	validates :name, :cpf, :email, :whatsapp, presence: true
	validates :accepted_image_use, inclusion: { in: [true], message: 'must be accepted' }
end
