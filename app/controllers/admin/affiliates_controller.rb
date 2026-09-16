class Admin::AffiliatesController < Admin::ApplicationController
  before_action :set_affiliate, only: [:show, :edit, :update, :acceptance_pdf]

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

  def acceptance_pdf
    send_data AffiliateAcceptancePdf.new(@affiliate).render,
      filename: "comprovante_aceite_hidrabene_#{@affiliate.id}.pdf",
      type: "application/pdf",
      disposition: "attachment"
  end

  private

  def set_affiliate
    @affiliate = Affiliate.find(params[:id])
  end

  def affiliate_params
    params.require(:affiliate).permit(:name, :cpf, :email, :whatsapp, :tiktok, :cep, :street, :number, :complement, :neighborhood, :city, :state, :accepted_image_use)
  end
end
