FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password { "password" }
  end
end
