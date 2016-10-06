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

  def update
    @idea = Idea.find(params[:id])
    change_quality?
    @idea.update(idea_params) if params[:change] == nil
    render 'api/v1/ideas/show'
  end

  private

  def idea_params
    params.permit(:title, :body, :quality, :tag_list)
  end

  def change_quality?
    if params[:change] == "increase"
      if @idea.quality == "swill"
        @idea.update_attributes(quality: "plausible")
      elsif @idea.quality == "plausible"
        @idea.update_attributes(quality: "genius")
      else
        @idea.quality = "genius"
      end
    elsif params[:change] == "decrease"
      if @idea.quality == "genius"
        @idea.update_attributes(quality: "plausible")
      elsif @idea.quality == "plausible"
        @idea.update_attributes(quality: "swill")
      else
        @idea.quality = "swill"
      end
    end
  end

end
