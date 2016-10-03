class Idea < ApplicationRecord
  enum quality: [:swill, :plausible, :genius]
end
