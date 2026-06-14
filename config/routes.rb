Rails.application.routes.draw do
  root "landing#index"
  post '/', to: 'landing#create', as: :landing_create
  get 'success', to: 'landing#success', as: :landing_success

  resources :affiliates
end