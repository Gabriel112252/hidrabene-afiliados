Rails.application.routes.draw do
  root "landing#index"
  post '/', to: 'landing#create', as: :landing_create
  get 'success', to: 'landing#success', as: :landing_success
  get 'regulamento', to: 'landing#regulamento', as: :landing_regulamento

  resources :affiliates
end