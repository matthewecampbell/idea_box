class Idea < ApplicationRecord
  default_scope { order(created_at: "desc")}
  # after_save :truncate_body

  def change_quality?(change)
    if change == "increase"
      if self.quality == "swill"
        self.update_attributes(quality: "plausible")
      elsif self.quality == "plausible"
        self.update_attributes(quality: "genius")
      else
        self.quality = "genius"
      end
    elsif change == "decrease"
      if self.quality == "genius"
        self.update_attributes(quality: "plausible")
      elsif self.quality == "plausible"
        self.update_attributes(quality: "swill")
      else
        self.quality = "swill"
      end
    end
  end

  validates :title, presence: true
  validates :body, presence: true
  enum quality: [:swill, :plausible, :genius]
end
