module Api
  module V1
    class BookCategoriesController < ApplicationController
      before_action :authenticate_user!

      def index
        category = BookCategory.all
        render json: BookCategorySerializer.new(category).serialized_json
      end
    end
  end
end