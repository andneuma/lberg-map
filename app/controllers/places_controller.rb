class PlacesController < ApplicationController
  http_basic_authenticate_with name: 'admin', password: 'secret'

  def index
    @place = Place.new
    @places = Place.all

    @errors = []
  end

  def update
    @place = Place.find(params[:id])
    @place.update(place_params)
      
    @errors = @place.errors
    @place = Place.new
    @places = Place.all
    render 'index'
  end

  def create
    @place = Place.new(place_params)
    @place.save

    @errors = @place.errors
    @place = Place.new
    @places = Place.all
    render 'index'
  end

  def destroy
    @place = Place.find(params[:id])
    @place.delete

    redirect_to action: 'index'
  end

  private

  def place_params
    params.require(:place).permit(:latitude, :longitude)
  end
end