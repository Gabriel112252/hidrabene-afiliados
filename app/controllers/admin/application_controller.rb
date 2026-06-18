class Admin::ApplicationController < ApplicationController
  layout "admin"
  before_action :require_admin

  private

  def require_admin
    unless session[:admin_user_id]
      redirect_to admin_login_path, alert: "Faça login para continuar."
    end
  end
end
