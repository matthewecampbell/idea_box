require "rails_helper"

RSpec.describe "Can crud Ideas" do
  it "returns all ideas" do
    idea1 = create(:idea)
    idea2 = create(:idea)

    get "/api/v1/ideas"
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)
    expect(json.count).to eq(2)
    expect(json.first["title"]).to eq(idea2.title)
    expect(json.first["body"]).to eq(idea2.body)
    expect(json.first["quality"]).to eq(idea2.quality)
    expect(json.second["title"]).to eq(idea1.title)
    expect(json.second["body"]).to eq(idea1.body)
    expect(json.second["quality"]).to eq(idea1.quality)
  end

  context "user sends correct info" do
    it "creates an item in the db" do
      idea = create(:idea)

      post "/api/v1/ideas"

      expect(response.status).to eq(200)
      expect(Idea.count).to eq(1)
      expect(Idea.first.title).to eq("This is my title")
      expect(Idea.first.body).to eq("This is my body")
    end
  end

  context "User can delete an idea" do
    it "returns 204 no content" do
      idea = create(:idea)

      delete "/api/v1/ideas/#{idea.id}"

      expect(response.status).to eq(204)
      expect(Idea.first).to eq(nil)
    end
  end

  context "send put to /ideas" do
    it "it saves in the database" do
      idea = create(:idea)
      title = "title"
      body = "body"

      expect(idea.title).to eq("This is my title")
      expect(idea.body).to eq("This is my body")

      patch "/api/v1/ideas/#{idea.id}?title=#{title}&body=#{body}"

      expect(response.status).to eq(200)
      expect(Idea.count).to eq(1)
      expect(Idea.first.title).to eq("title")
      expect(Idea.first.body).to eq("body")
    end
  end

  it "changes quality with thumbs up" do
    idea = create(:idea)

    expect(idea.quality).to eq("swill")

    put "/api/v1/ideas/#{idea.id}?change=increase"

    expect(response.status).to eq(200)
    updated_idea = Idea.last
    expect(updated_idea.quality).to eq("plausible")
  end

  it "changes quality with thumbs up" do
    idea = create(:plausible)

    expect(idea.quality).to eq("plausible")

    put "/api/v1/ideas/#{idea.id}?change=increase"

    expect(response.status).to eq(200)
    updated_idea = Idea.last
    expect(updated_idea.quality).to eq("genius")
  end

  it "changes quality with thumbs up" do
    idea = create(:genius)

    expect(idea.quality).to eq("genius")

    put "/api/v1/ideas/#{idea.id}?change=increase"

    expect(response.status).to eq(200)
    updated_idea = Idea.last
    expect(updated_idea.quality).to eq("genius")
  end

  it "changes quality with thumbs down" do
    idea = create(:genius)

    expect(idea.quality).to eq("genius")

    put "/api/v1/ideas/#{idea.id}?change=decrease"

    expect(response.status).to eq(200)
    updated_idea = Idea.last
    expect(updated_idea.quality).to eq("plausible")
  end

  it "changes quality with thumbs down" do
    idea = create(:plausible)

    expect(idea.quality).to eq("plausible")

    put "/api/v1/ideas/#{idea.id}?change=decrease"

    expect(response.status).to eq(200)
    updated_idea = Idea.last
    expect(updated_idea.quality).to eq("swill")
  end

  it "changes quality with thumbs down" do
    idea = create(:swill)

    expect(idea.quality).to eq("swill")

    put "/api/v1/ideas/#{idea.id}?change=decrease"

    expect(response.status).to eq(200)
    updated_idea = Idea.last
    expect(updated_idea.quality).to eq("swill")
  end
end
