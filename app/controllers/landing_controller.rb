class LandingController < ApplicationController
  def index
    @affiliate = Affiliate.new
  end

  def create
    @affiliate = Affiliate.new(affiliate_params)
    @affiliate.accepted_image_use = params.dig(:affiliate, :accepted_image_use) == '1'
    @affiliate.accepted_at = Time.current if @affiliate.accepted_image_use

    if @affiliate.save
      redirect_to "https://hidrabene-afiliadaselite.com/", allow_other_host: true
    else
      render :index
    end
  end

  def success
  end

  def regulamento
  end

  private

  def affiliate_params
    params.require(:affiliate).permit(:name, :cpf, :email, :whatsapp, :tiktok, :cep, :street, :number, :complement, :neighborhood, :city, :state, :accepted_image_use)
  end
end
