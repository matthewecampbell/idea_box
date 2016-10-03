class Idea < ApplicationRecord
  default_scope { order(created_at: "desc")}
  # after_save :truncate_body

  # def truncate_body
  #   if self.body.length > 100
  #     self.update_attributes(body: self.body[0..98])
  #   end
  # end
  validates :title, presence: true
  validates :body, presence: true
  enum quality: [:swill, :plausible, :genius]
end
