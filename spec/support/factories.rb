FactoryGirl.define do
  factory :idea do
    sequence :title do |n|
      "This is my title"
    end
    body "This is my body"

    factory :swill do
      quality 0
    end

    factory :plausible do
      quality 1
    end

    factory :genius do
      quality 2
    end
  end
end
