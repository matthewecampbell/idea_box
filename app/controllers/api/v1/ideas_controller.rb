class Api::V1::IdeasController < ApplicationController

  def index
    @ideas = Idea.all
  end

end
