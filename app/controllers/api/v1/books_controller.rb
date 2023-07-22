module Api
  module V1
    class BooksController < ApplicationController
      protect_from_forgery with: :null_session
      
      def index
        books = Book.all
        render json: BookSerializer.new(books).serialized_json
      end

      def show
        # byebug
        book = Book.find_by(id: params[:id])
        render json: BookSerializer.new(book).serialized_json
      end

      def create
        book = writer.books.new(book_params)

        if book.save
          render json: BookSerializer.new(book).serialized_json
        else
          render json: { error: book.errors.messages}, status: 422
        end
      end

      def update
        book = Book.find_by(id: params[:id])

        if book.update(book_params)
          render json: BookSerializer.new(book).serialized_json
        else
          render json: { error: book.errors.messages}, status: 422
        end
      end

       def destroy
        book = Book.find_by(id: params[:id])

        if book.destroy
          head :no_content
        else
          render json: { error: book.errors.messages}, status: 422
        end
      end

      def search
        books = Book.search(params[:query])
        render json: BookSerializer.new(books).serialized_json
      end

      private

      def writer
        @writer ||= Writer.find(params[:writer_id])
      end

      def book_params
        params.require(:book).permit(:title, :writer_id, :book_category_id, :isbn, :publish_date, :summary)
      end
    end
  end
end