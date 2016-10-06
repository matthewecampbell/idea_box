require 'rails_helper'

RSpec.describe 'Request ideas', type: :request do
  it 'gets all ideas' do
    idea1 = Idea.create!(:idea)
    idea2 = Idea.create(:idea)

    expect(Idea.count).to eq(2)
    expect(idea1.title).to eq('This is title #2')
    expect(idea2.title).to eq('This is title #3')

    get '/api/v1/ideas'

    ideas = JSON.parse(response.body)

    expect(response.status).to eq(200)
    
  end
end
