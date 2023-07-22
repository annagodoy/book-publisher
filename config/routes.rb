Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do 
      resources :writers
      
      resources :books
        get 'books_search', to: 'books#search'
      
      resources :book_categories, only: [:index]
      resources :imports, only: [:index, :create]
    end
  end

  get '*path', to: 'pages#index', via: :all
end
