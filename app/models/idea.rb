class Idea < ApplicationRecord
  has_many :taggings
  has_many :tags, through: :taggings
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

  def tag_list
    tags.join(", ")
  end

  def tag_list=(tags_string)
    tag_names = tags_string.split(",").collect{|s| s.strip.downcase}.uniq
    new_or_found_tags = tag_names.collect { |name| Tag.find_or_create_by(name: name) }
    self.tags = new_or_found_tags
  end

end
