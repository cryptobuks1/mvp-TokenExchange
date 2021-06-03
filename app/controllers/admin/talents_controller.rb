class Admin::TalentsController < ApplicationController
  before_action :set_talent, only: [:show, :edit, :update, :destroy]

  def index
    @talents = Talent.all
  end

  def show
  end

  def new
    @talent = Talent.new
  end

  def create
    @talent = Talent.new(talent_params)

    if @talent.save
      redirect_to(
        admin_talent_path(@talent),
        notice: "Talent successfully created."
      )
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @talent.update(talent_params)
      redirect_to(
        admin_talent_path(@talent),
        notice: "Talent successfully updated."
      )
    else
      render :edit
    end
  end

  def destroy
    if @talent.destroy
      redirect_to(
        admin_talents_path,
        notice: "Talent successfully destroyed."
      )
    else
      render :show
    end
  end

  private

  def set_talent
    @talent =
      if params[:id].to_i > 0
        Talent.find(params[:id])
      else
        Talent.find_by!(public_key: params[:id])
      end
  end

  def talent_params
    params.require(:talent).permit(
      :username,
      :wallet_id,
      :public_key,
      :description
    )
  end
end