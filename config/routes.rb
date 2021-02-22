require 'sidekiq/web'
Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq' if Rails.env.development?
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'articles#index'

  resources :articles do
    resource :like, only: [:create, :destroy, :show]
    resources :comments, only: [:create, :new, :destroy, :index]
  end

  resources :accounts, only: [:show] do
    resources :follows, only: [:create]
    resources :unfollows, only: [:create]
    resource :following, only: [:show]
    resource :follower, only: [:show]
  end

  resource :profile, only: [:show, :edit, :update, :create] do
    resource :following, only: [:show]
    resource :follower, only: [:show]
  end

  resources :favorites, only: [:index]
end
