class Api::V1::IdeasController < ApplicationController

  def index
    @ideas = Idea.all
  end

  def destroy
    @idea = Idea.find(params[:id])
    @idea.destroy
  end

  def create
    @idea = Idea.create(idea_params)

    render 'api/v1/ideas/show'
  end

  private

  def idea_params
    params.required(:idea).permit(:title, :body, :quality)
  end

end
