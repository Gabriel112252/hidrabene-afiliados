class Admin::SessionsController < ApplicationController
  layout "admin"
  def new
    redirect_to admin_affiliates_path if session[:admin_user_id]
  end

  def create
    admin = AdminUser.find_by(email: params[:email].to_s.strip.downcase)
    if admin&.authenticate(params[:password])
      session[:admin_user_id] = admin.id
      redirect_to admin_affiliates_path
    else
      flash.now[:alert] = "E-mail ou senha inválidos."
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    session.delete(:admin_user_id)
    redirect_to admin_login_path
  end
end
