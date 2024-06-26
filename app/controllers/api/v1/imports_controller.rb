module Api
  module V1
    class ImportsController < ApplicationController
      before_action :authenticate_user!

      def index; end

      def create
        klass = import_params[:kind].capitalize.constantize
        
        result = ImportFile.call(klass: klass, file: import_params[:file])
        raise result.error if result.failure?

        render json: { error: false }
      end

      private

      def import_params
        params.require(:imports).permit(:file, :kind, :doc)
      end
    end
  end
end