Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  namespace :api do
    namespace :v1 do
      get "health_check" => "health_check#show"
      mount_devise_token_auth_for "User", at: "auth"

      get "kpts/:date" => "kpts#show"
      resources :kpts, only: %i[create]
    end
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
