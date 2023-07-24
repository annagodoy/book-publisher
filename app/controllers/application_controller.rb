class ApplicationController < ActionController::Base
  include CurrentUserConcern
  
  def authenticate_user!
    head :unauthorized unless signed_in?
  end

  def signed_in?
    @current_user.present?
  end
end
