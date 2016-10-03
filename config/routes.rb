Rails.application.routes.draw do
  namespace :api, defaults: {format: "json"} do
    namespace :v1 do
      resources :ideas, only: [:index, :destroy]
    end
  end

  root to: 'homes#show'
end
