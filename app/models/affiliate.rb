class Affiliate < ApplicationRecord
  before_validation :normalize_tiktok

  validates :name, :cpf, :email, :whatsapp, :tiktok, presence: true
  validates :accepted_image_use, inclusion: { in: [true], message: 'must be accepted' }

  private

  def normalize_tiktok
    return if tiktok.blank?
    self.tiktok = tiktok.strip
    self.tiktok = "@#{tiktok}" unless tiktok.start_with?("@")
  end
end
