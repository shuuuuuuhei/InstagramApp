Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'articles#index'

  resources :articles, only: [:create, :show, :edit, :update, :new, :destroy]
  resource :profile, only: [:show, :edit, :update, :create]
end
