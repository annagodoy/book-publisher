if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_book-publisher', domain: 'publisher'
else
  Rails.application.config.session_store :cookie_store, key: '_book-publisher'
end