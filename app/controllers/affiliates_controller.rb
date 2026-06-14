class AffiliatesController < ApplicationController
  before_action :set_affiliate, only: %i[ show edit update destroy ]

  # GET /affiliates or /affiliates.json
  def index
    @affiliates = Affiliate.all
  end

  # GET /affiliates/1 or /affiliates/1.json
  def show
  end

  # GET /affiliates/new
  def new
    @affiliate = Affiliate.new
  end

  # GET /affiliates/1/edit
  def edit
  end

  # POST /affiliates or /affiliates.json
  def create
    @affiliate = Affiliate.new(affiliate_params)

    respond_to do |format|
      if @affiliate.save
        format.html { redirect_to @affiliate, notice: "Affiliate was successfully created." }
        format.json { render :show, status: :created, location: @affiliate }
      else
        format.html { render :new, status: :unprocessable_content }
        format.json { render json: @affiliate.errors, status: :unprocessable_content }
      end
    end
  end

  # PATCH/PUT /affiliates/1 or /affiliates/1.json
  def update
    respond_to do |format|
      if @affiliate.update(affiliate_params)
        format.html { redirect_to @affiliate, notice: "Affiliate was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @affiliate }
      else
        format.html { render :edit, status: :unprocessable_content }
        format.json { render json: @affiliate.errors, status: :unprocessable_content }
      end
    end
  end

  # DELETE /affiliates/1 or /affiliates/1.json
  def destroy
    @affiliate.destroy!

    respond_to do |format|
      format.html { redirect_to affiliates_path, notice: "Affiliate was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_affiliate
      @affiliate = Affiliate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def affiliate_params
      params.require(:affiliate).permit(:name, :cpf, :email, :whatsapp, :cep, :street, :number, :complement, :neighborhood, :city, :state, :accepted_image_use, :accepted_at, :signature_name)
    end
end
