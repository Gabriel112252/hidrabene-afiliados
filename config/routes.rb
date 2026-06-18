Rails.application.routes.draw do
  root "landing#index"
  post '/', to: 'landing#create', as: :landing_create
  get 'success', to: 'landing#success', as: :landing_success
  get 'regulamento', to: 'landing#regulamento', as: :landing_regulamento

  resources :affiliates

  namespace :admin do
    get  'login',  to: 'sessions#new',     as: :login
    post 'login',  to: 'sessions#create'
    delete 'logout', to: 'sessions#destroy', as: :logout
    resources :affiliates, only: [:index, :show, :edit, :update]
  end
end