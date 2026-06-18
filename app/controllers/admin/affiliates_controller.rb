class Admin::AffiliatesController < Admin::ApplicationController
  before_action :set_affiliate, only: [:show, :edit, :update]

  def index
    @affiliates = Affiliate.order(created_at: :desc)
  end

  def show
  end

  def edit
  end

  def update
    if @affiliate.update(affiliate_params)
      redirect_to admin_affiliate_path(@affiliate), notice: "Afiliada atualizada com sucesso."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_affiliate
    @affiliate = Affiliate.find(params[:id])
  end

  def affiliate_params
    params.require(:affiliate).permit(:name, :cpf, :email, :whatsapp, :tiktok, :cep, :street, :number, :complement, :neighborhood, :city, :state, :accepted_image_use)
  end
end
