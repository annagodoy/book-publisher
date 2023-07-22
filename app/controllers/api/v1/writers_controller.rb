module Api
  module V1
    class WritersController < ApplicationController
      protect_from_forgery with: :null_session
      def index
        writers = Writer.all
        render json: WriterSerializer.new(writers, options).serialized_json
      rescue => e
        render json: e
      end

      def show
        writer = Writer.find_by(id: params[:id])
        render json: WriterSerializer.new(writer, options).serialized_json
      end

      def create
        writer = Writer.new(writer_params)  

        if writer.save  
          render json: WriterSerializer.new(writer).serialized_json
        else
          render json: { error: writer.errors.messages}, status: 422
        end
      end

      def update
        writer = Writer.find_by(id: params[:id])
        
         if writer.update(writer_params) 
          render json: WriterSerializer.new(writer, options).serialized_json
        else
          render json: { error: writer.errors.messages}, status: 422
        end
      end

      def destroy
        writer = Writer.find_by(id: params[:id])
        
         if writer.destroy
          head :no_content
        else
          render json: { error: writer.errors.messages}, status: 422
        end
      end

      private

      def writer_params
        params.require(:writer).permit(:name, :document)
      end

      def options
        @options ||= { include: %i[ books ]}
      end
    end
  end
end