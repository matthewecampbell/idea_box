require 'rails_helper'

RSpec.describe Idea, type: :model do
  describe "validations" do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:body) }
    it { is_expected.to respond_to(:title) }
    it { is_expected.to respond_to(:body) }
    it { is_expected.to respond_to(:quality) }
  end

  it "should have quality default to swill" do
    idea = create(:idea)

    expect(idea.quality).to eq("swill")
  end

  it "can change quality" do
    idea = create(:idea)

    idea.change_quality?("increase")

    expect(idea.quality).to eq("plausible")

    idea.change_quality?("increase")

    expect(idea.quality).to eq("genius")

    idea.change_quality?("increase")

    expect(idea.quality).to eq("genius")

    idea.change_quality?("decrease")

    expect(idea.quality).to eq("plausible")

    idea.change_quality?("decrease")

    expect(idea.quality).to eq("swill")
    
    idea.change_quality?("decrease")

    expect(idea.quality).to eq("swill")
  end
end
