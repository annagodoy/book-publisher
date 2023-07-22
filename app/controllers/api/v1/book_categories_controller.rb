module Api
  module V1
    class BookCategoriesController < ApplicationController

      def index
        category = BookCategory.all
        render json: BookCategorySerializer.new(category).serialized_json
      end
    end
  end
end