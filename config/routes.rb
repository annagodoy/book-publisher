Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do 
      resources :writers
      
      resources :books
        get 'books_search', to: 'books#search'
      
      resources :book_categories, only: [:index]
      resources :imports, only: [:index, :create]

      resources :sessions, only: [:create]
        delete 'logout', to: 'sessions#logout'
        get 'logged_in', to: 'sessions#logged_in'

      post 'sign_in', to: 'registrations#create'
    end
  end

  get '*path', to: 'pages#index', via: :all
end
