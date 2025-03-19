FactoryBot.define do
  factory :kpt do
    date { Date.current }
    keep { Faker::Lorem.paragraph(sentence_count: 2) }
    problem { Faker::Lorem.paragraph(sentence_count: 2) }
    try { Faker::Lorem.paragraph(sentence_count: 2) }
    association :user
  end
end
