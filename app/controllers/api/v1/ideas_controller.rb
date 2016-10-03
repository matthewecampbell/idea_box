class Api::V1::IdeasController < ApplicationController

  def index
    @ideas = Idea.all
  end

  def destroy
    @idea = Idea.find(params[:id])
    @idea.destroy
  end

end
