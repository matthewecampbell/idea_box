require "rails_helper"

RSpec.describe "Can load home page" do
  it "loads properly" do

    get "/"

    expect(response.status).to eq(200)
  end
end
